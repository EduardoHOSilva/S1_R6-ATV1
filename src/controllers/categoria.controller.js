import { Categoria } from "../models/Categoria.js";
import categoriaRepositories from "../repositories/categoria.repositories.js";

const categoriaController = {
  listarCategorias: async (req, res) => {
    try {
      const result = await categoriaRepositories.listar();
      if (result.length === 0) {
        return res.status(200).json({message: "Categorias não existem nessa tabela"});
      }
      res.status(200).json({data: result});

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor"});
    }
  },

  listarIdCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || id === undefined || isNaN(id) || id < 0) {
        return res.status(400).json({message: "Digite um ID válido"});
      }
      const result = await categoriaRepositories.listarId(id);
      if (result.length === 0) {
        return res.status(404).json({message: "Esse ID não existe"});
      }
      res.status(200).json({data: result});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor"});
    }
  },

  criarCategoria: async (req, res) => {
    try {
      const { nome, descricao } = req.body;
      const categoria = Categoria.criar({ nome, descricao }); 

      const result = await categoriaRepositories.criar(categoria); 
      res.status(201).json({message: "Categoria criada", data: result});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor", error: error});
    }
  },

  alterarCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;
      if (!nome.trim() || !descricao.trim()) {
        return res.status(400).json({message: "Preencha os campos nome e descrição"});
      }
      if (!id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({message: "Digite um id valido"});
      }
      const categoria = Categoria.editar({ nome, descricao }, id); 
      const result = await categoriaRepositories.alterar(categoria);
      if (result.affectedRows === 0) {
        return res.status(400).json({message: "Erro ao alterar categoria"});
      }
      res.status(200).json({message: "Categoria alterada com sucesso", data: result});

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor", error: error});
    }
  },

  deletarCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const buscaId = await categoriaRepositories.listarId(id); 

      if (buscaId.length === 0 || !id || isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({message: "Digite um id valido"});
      }
      const result = await categoriaRepositories.deletar(id);
      if (result.affectedRows === 0) {
        return res.status(400).json({message: "Erro ao deletar", data: result});
      }
      res.status(200).json({message: "Categoria deletada!", data: result});

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ocorreu um erro no servidor"});
    }
  }
};

export default categoriaController;