export class Produtos {
  #id;
  #idCategoria;
  #nome;
  #preco;
  #Imagem;
  #estoque;
  #dataCad;

  // Contructor //
  constructor(pIdCategoria, pNome, pPreco, pImagem, pEstoque, pId) {
    this.idCategoria = pIdCategoria;
    this.nome = pNome;
    this.preco = pPreco;
    this.Imagem = pImagem;
    this.estoque = pEstoque;
    this.id = pId;
  }

  // Getters //
  get id() {
    return this.#id;
  }

  get idCategoria() {
    return this.#idCategoria;
  }

  get nome() {
    return this.#nome;
  }

  get preco() {
    return this.#preco;
  }

  get Imagem() {
    return this.#Imagem;
  }

  get estoque() {
    return this.#estoque;
  }

  // Setters //
  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  set idCategoria(value) {
    this.#validarIdCategoria(value);
    this.#idCategoria = value;
  }

  set nome(value) {
    this.#validarNome(value);
    this.#nome = value;
  }

  set preco(value) {
    this.#validarPreco(value);
    this.#preco = value;
  }

  set Imagem(value) {
    this.#validarImagem(value);
    this.#Imagem = value;
  }

  set estoque(value) {
    this.#validarEstoque(value);
    this.#estoque = value;
  }

  // Métodos auxiliares //
  #validarId(value) {
    if (value !== null && value !== undefined && value <= 0) {
      throw new Error('O valor do ID não corresponde ao esperado.');
    }
  }

  #validarIdCategoria(value) {
    if (value !== undefined && value !== null && value <= 0) {
      throw new Error('O idCategoria deve ser maior que zero');
    }
  }

  #validarNome(value) {
    if (value !== undefined && (!value || value.trim().length < 3 || value.trim().length > 150)) {
      throw new Error('O nome do produto deve ter entre 3 e 150 caracteres');
    }
  }

  #validarPreco(value) {
    if (!value || value < 0) {
      throw new Error("O preço do produto deve ser maior que zero.");
    }
  }

  #validarImagem(value) {
    if (value && value.trim().length < 5) {
      throw new Error('O caminho da imagem deve ter pelo menos 5 caracteres');
    }
  }

  #validarEstoque(value) {
    if (value === null || value === undefined || !Number.isInteger(value) || value < 0) {
      throw new Error('O estoque deve ser um número inteiro maior ou igual a zero');
    }
  }

  // Desing Pattern //
  static criar(dados) {
    return new Produtos(dados.idCategoria, dados.nome, dados.preco, dados.Imagem, dados.estoque, null);
  }

  static editar(dados, id) {
    return new Produtos(dados.idCategoria, dados.nome, dados.preco, dados.Imagem, dados.estoque, id);
  }
}