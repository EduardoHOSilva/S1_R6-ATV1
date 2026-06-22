import { connection } from "../config/Database.js";

const pedidoRepository = {
  criar: async (pedido, itensPedido) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();
      
      const sqlPedido = 'INSERT INTO pedidos (subTotal, status) VALUES (?, ?)';
      const valuesPedidos = [pedido.subTotal, pedido.status];
      const [rowsPedido] = await conn.execute(sqlPedido, valuesPedidos);
      
      for (const element of itensPedido) {
        const sqlItensPedidos = 'INSERT INTO itens_pedidos (idPedido, idProduto, quantidade, valorItem) VALUES (?, ?, ?, ?)';
        const valuesItensPedidos = [rowsPedido.insertId, element.idProduto, element.quantidade, element.valorItem];
        await conn.execute(sqlItensPedidos, valuesItensPedidos);
      }
      
      conn.commit();
      return { rowsPedido, itensPedido };
    
    } catch (error) {
      conn.rollback();
      throw new Error(error);
    
    } finally {
      conn.release();
    }
  },
  
  editarRemover: async (pedido, idItemPedido) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();
      
      const sqlItemPedidosDelete = 'DELETE FROM itens_pedidos WHERE id = ?';
      const valuesItemPedidosDelete = [idItemPedido];
      
      await conn.execute(sqlItemPedidosDelete, valuesItemPedidosDelete);
      
      const sqlPedido = 'UPDATE pedidos SET subTotal = ? WHERE id = ?';
      const valuesPedido = [pedido.subTotal, pedido.id];
      
      await conn.execute(sqlPedido, valuesPedido);
      await conn.commit();
    
    } catch (error) {
      conn.rollback();
      throw new Error(error);
    
    } finally {
      conn.release();
    }
  },
  
  editarAdicionar: async (pedido, itemPedido) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();
      
      const sqlItemPedidosInsert = 'INSERT INTO itens_pedidos (idPedido, idProduto, quantidade, valorItem) VALUES (?, ?, ?, ?)';
      const valuesItemPedidosInsert = [pedido.id, itemPedido.idProduto, itemPedido.quantidade, itemPedido.valorItem];
        
      await conn.execute(sqlItemPedidosInsert, valuesItemPedidosInsert);
        
      const sqlPedido = 'UPDATE pedidos SET subTotal = ? WHERE id = ?';
      const valuesPedido = [pedido.subTotal, pedido.id];
        
      await conn.execute(sqlPedido, valuesPedido);
      await conn.commit();
      
    } catch (error) {
      conn.rollback();
      throw new Error(error);

    } finally {
      conn.release();
    }
  },
  
  editarQuantidade: async (pedido, itensPedido, idItem) => {
    const conn = await connection.getConnection();
    
    try {
      await conn.beginTransaction();
        
      const sqlQuantidadeUpdate = 'UPDATE itens_pedidos SET quantidade = ? WHERE id = ?';
      const valuesItemUpdate = [itensPedido.quantidade, idItem];

      await conn.execute(sqlQuantidadeUpdate, valuesItemUpdate);
        
      const sqlPedido = 'UPDATE pedidos SET subTotal = ? WHERE id = ?';
      const valuesPedido = [pedido.valorTotal, pedido.id];

      await conn.execute(sqlPedido, valuesPedido);
      await conn.commit();
      
    } catch (error) {
      conn.rollback();
      throw new Error(error);
      
    } finally{
      conn.release();
    }
  },
  
  editarStatus: async (pedido) => {
    const sql = 'UPDATE pedidos SET status = ? WHERE id = ?';
    const values = [pedido.status, pedido.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
  
  selecionar: async () => {
    const sql = 'SELECT id, subTotal, status, dataPedido FROM pedidos ORDER BY dataPedido DESC';
    const [rows] = await connection.execute(sql);
    return rows;
  },
    
  recuperarItemPedido: async (idItem) => {
    const conn = await connection.getConnection();
    
    try {
      const sql = 'SELECT * FROM itens_pedidos WHERE id = ?';
      const values = [idItem];
      const [rows] = await conn.execute(sql, values);
      return rows[0];
      
    } catch (error) {
      throw new Error(error.message);
      
    } finally {
      conn.release();
    }
  },
    
  recuperarPedido: async (idPedido) => {
    const conn = await connection.getConnection();
      
    try {
      const sql = 'SELECT * FROM pedidos WHERE id = ?';
      const values = [idPedido];
      const [rows] = await conn.execute(sql, values);
      return rows[0];
    
    } catch (error) {
      throw new Error(error.message);
      
    } finally {
      conn.release();
    }
  }
};

export default pedidoRepository;