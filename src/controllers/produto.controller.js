import fs from "fs";
import path from "path";
import produtoRepositories from "../repositories/produto.repositories.js";
import { Produtos } from "../models/Produtos.js";
import categoriaRepositories from "../repositories/categoria.repositories.js";

const produtoController = {
  listarProdutos: async (req, res) => {
    try {
      const result = await produtoRepositories.listar();

      if (result.length === 0) {
        return res.status(200).json({message: "Produtos não existem nessa tabela"});
      }

      res.status(200).json({message: "Produtos Listados:", data: result});

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor"});
    }
  },
  listarIdProduto: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || id === undefined || isNaN(id) || id < 0) {
        return res.status(400).json({message: "Digite um ID válido"});
      }

      const result = await produtoRepositories.listarId(id);

      if (result.length === 0) {
        return res.status(200).json({message: "Esse ID não existe"});
      }

      res.status(200).json({message: "Produto Encontrado:", data: result});

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor"});
    }
  },

  criarProdutos: async (req, res) => {
    try {
      const { idCategoria, nome, descricao, preco, estoque } = req.body;

      if (!req.file) {
        return res.status(400).json({message: "Arquivo de imagem não enviado"});
      }
      const Imagem = `uploads/images/${req.file.filename}`;

      const produto = Produtos.criar({
        idCategoria, nome, descricao, preco, Imagem, estoque
      });

      const result = await produtoRepositories.criar(produto);
      res.status(201).json({message: "Produto criado com sucesso", data: result});

    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Ocorreu um erro no servidor", error: error.message});
    }
  },

  alterarProduto: async (req, res) => {
    try {
      const { id } = req.params;
      let { idCategoria, nome, descricao, preco, estoque } = req.body;

      if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({message: "Digite um id válido"});
      }

      const produtoExistente = await produtoRepositories.listarId(id);
      if (produtoExistente.length === 0) {
        return res.status(400).json({message: "Produto não encontrado"});
      }
      const Imagem = `uploads/images/${req.file.filename}`; 
      const produto = Produtos.editar(
        {idCategoria, nome, descricao, preco, Imagem, estoque}, id
      );

      const result = await produtoRepositories.alterar(produto);

      if (result.affectedRows === 0) {
        return res.status(400).json({message: "Erro ao alterar produto"});
      }

      console.log("Produto alterado", result);
      res.status(200).json({message: "Produto alterado com sucesso", data: result});

    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Ocorreu um erro no servidor", error: error.message});
    }
  },

  deletarProduto: async (req, res) => {
    try {
      const { id } = req.params;
      const buscaId = await produtoRepositories.listarId(id);

      if (!id || buscaId.length === 0) {
        return res.status(400).json({message: "Insira um Id válido"});
      }

      const result = await produtoRepositories.deletar(id);

      console.log("Produto Deletado", result);
      res.status(200).json({message: "Produto deletado!", data: result

      });
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor", error: error.message});
    }
  },
};

export default produtoController;