import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
  criar: async (req, res) => {
    try {
      const nome = String(req.body.nome);
      const idCategoria = Number(req.body.idCategoria);
      const preco = Number(req.body.preco);
      const estoque = Number(req.body.estoque);
      const Imagem = `/uploads/images/${req.file.filename}`;
      const produto = Produto.criar({ idCategoria, nome, preco, estoque, Imagem }); 
      const resultado = await produtoRepository.criar(produto);
      
      res.status(201).json(resultado);
    
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Erro ao criar produto", errorMessage: error.message});
    }
  },
  
  atualizar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      let { preco, estoque } = req.body;
      
      const Imagem = `/uploads/images/${req.file.filename}`
      
      if (isNaN(id) || preco === undefined || estoque === undefined || Imagem === undefined) {
        return res.status(400).json({message: 'ID, preco, estoque e imagem são obrigatórios.'});
      }
      
      const produtoExistente = await produtoRepository.selecionarPorId(id);
      
      if (produtoExistente[0] == undefined) {
        return res.status(404).json({message: 'Produto não encontrado.'});
      }
      
      preco = Number(preco);
      estoque = Number(estoque);
      
      const produto = Produto.editar({
        idCategoria: produtoExistente[0].idCategoria,
        nomeProduto: produtoExistente[0].nome,
        preco: preco ?? produtoExistente[0].preco,
        estoque: estoque ?? produtoExistente[0].estoque,
        Imagem: Imagem ?? produtoExistente[0].Imagem
      }, id);
      
      const resultado = await produtoRepository.editar(produto);
      return res.status(200).json({ resultado });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    }
  },
  
  selecionar: async (req, res) => {
    try {
      const result = await produtoRepository.selecionar();
      
      res.status(200).json(result);
    
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Erro no servidor.", errorMessage: error.message});
    }
  },
  
  deletar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await produtoRepository.deletar(id);
      
      res.status(200).json({ result });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Ocorreu um erro no servidor.', errorMessage: error.message});
    }
  },
  selecionarPorId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await produtoRepository.selecionarPorId(id);

      res.status(200).json({ result });
    
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Ocorreu um erro no servidor.', errorMessage: error.message});
    }
  }
};

export default produtoController;