import { connection } from "../config/Database.js";
import { ItensPedido } from "../models/Item_Pedido.js";

const pedidoRepositories = {
  criarPedido: async (pedido, itemPed) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      const sqlPedido = "INSERT INTO pedidos (Subtotal, Status) VALUES (?, ?);";
      const valuesPedido = [pedido.subTotal, pedido.status];
      const [rowsPedido] = await conn.execute(sqlPedido, valuesPedido);

      for (const item of itemPed) {
        const sqlCheckProduto =
          "SELECT idProduto FROM produtos WHERE idProduto = ?;";
        const [produtoRows] = await conn.execute(sqlCheckProduto, [item.idProduto]);

        if (!produtoRows.length) {
          throw new Error(`Produto não encontrado: ${item.idProduto}`);
        }

        const sqlItemPed = "INSERT INTO itens_pedidos (idPedido, idProduto, quantidade, valorItem) VALUES (?, ?, ?, ?);";
        const valuesItemPed = [rowsPedido.insertId, item.idProduto, item.quantidade, item.valorItem];
        await conn.execute(sqlItemPed, valuesItemPed);
      }

      await conn.commit();
      return rowsPedido;
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  listarPedidos: async () => {
    const sql = "SELECT * FROM pedidos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  listarIDPedido: async id => {
    const sql = "SELECT * FROM pedidos WHERE idPedido = ?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  alterarPedido: async pedido => {
    const sql = "UPDATE pedidos SET status = ? WHERE idPedido = ?;";
    const values = [pedido.status, pedido.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  alterarStatusPedido: async pedido => {
    const sql = "UPDATE pedidos SET Status = ? WHERE idPedido = ?;";
    const values = [pedido.status, pedido.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  deletarPedido: async id => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      const sqlDeleteItens = "DELETE FROM itens_pedidos WHERE idPedido = ?;";
      await conn.execute(sqlDeleteItens, [id]);

      const sqlDeletePedido = "DELETE FROM pedidos WHERE idPedido = ?;";
      const [rows] = await conn.execute(sqlDeletePedido, [id]);

      await conn.commit();
      return rows;
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  listarItensPorPedido: async pedidoId => {
    const sql = "SELECT quantidade, valorItem, idItensPedidos, idPedido, idProduto FROM itens_pedidos WHERE idPedido = ?;";
    const values = [pedidoId];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  listarItens: async () => {
    const sql = "SELECT * FROM itens_pedidos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  listarIDItem: async id => {
    const sql = "SELECT * FROM itens_pedidos WHERE idItensPedidos = ?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  alterarItem: async (itemId, item) => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      const sqlUpdate = "UPDATE itens_pedidos SET idProduto = ?, quantidade = ?, valorItem = ? WHERE idItensPedidos = ?;";
      const valuesUpdate = [item.idProduto, item.quantidade, item.valorItem, itemId];
      await conn.execute(sqlUpdate, valuesUpdate);

      const sqlGetPedidoId = "SELECT idPedido FROM itens_pedidos WHERE idItensPedidos = ?;";
      const [itemRows] = await conn.execute(sqlGetPedidoId, [itemId]);
      if (!itemRows.length) {
        throw new Error("Item não encontrado após atualização");
      }
      const pedidoId = itemRows[0].idPedido;

      await conn.commit();
      return { pedidoId };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  deletarItem: async itemId => {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();

      const sqlGetItem = "SELECT idPedido FROM itens_pedidos WHERE idItensPedidos = ?;";
      const [itemRows] = await conn.execute(sqlGetItem, [itemId]);

      if (!itemRows.length) {
        throw new Error("Item não encontrado");
      }

      const pedidoId = itemRows[0].idPedido;

      const sqlDeleteItem = "DELETE FROM itens_pedidos WHERE idItensPedidos = ?;";
      await conn.execute(sqlDeleteItem, [itemId]);

      await conn.commit();
      return { pedidoId };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      conn.release();
    }
  },

  atualizarSubtotalPedido: async (pedidoId, novoSubtotal) => {
    const sqlUpdatePedido = "UPDATE pedidos SET subTotal = ? WHERE idPedido = ?;";
    const values = [novoSubtotal, pedidoId];
    const [rows] = await connection.execute(sqlUpdatePedido, values);
    return rows;
  },
};

export default pedidoRepositories;