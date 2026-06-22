export class Produtos {
  #id;
  #idCategoria;
  #nome;
  #descricao;
  #preco;
  #Imagem;
  #estoque;

  // Contructor //
  constructor(idCategoria, nome, descricao, preco, Imagem, estoque, id) {
    this.idCategoria = idCategoria;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.Imagem = Imagem;
    this.estoque = estoque;
    this.id = id;
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

  get descricao() {
    return this.#descricao;
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

  set descricao(value) {
    this.#validarDescricao(value);
    this.#descricao = value;
  }

  set preco(value) {
    this.#validarPreco(value);
    this.#preco = value;
  }

  set Imagem(value) {
    this.#validarImagem(value);
    this.#Imagem = value || null;
  }

  set estoque(value) {
    this.#validarEstoque(value);
    this.#estoque = value;
  }

  // Métodos auxiliares //
  #validarId(value) {
    if (value !== null && value !== undefined && (isNaN(value) || Number(value) <= 0)) {
      throw new Error("O valor do ID não corresponde ao esperado.");
    }
  }

  #validarIdCategoria(value) {
    if (!value || isNaN(value) || Number(value) <= 0) {
      throw new Error("O valor do IdCategoria não corresponde ao esperado.");
    }
  }

  #validarNome(value) {
    if (!value || value.trim().length < 3 || value.trim().length > 45) {
      throw new Error("O campo nome é obrigatório e deve ter entre três e quarenta e cinco caracteres.");
    }
  }

  #validarDescricao(value) {
    if (!value || value.trim().length < 5 || value.trim().length > 100) {
      throw new Error("O campo descricao é obrigatório e deve ter entre cinco e cem caracteres.");
    }
  }

  #validarPreco(value) {
    if (!value || isNaN(value) || Number(value) <= 0) {
      throw new Error("O campo preco deve ser um número válido e maior do que zero.");
    }
  }

  #validarImagem(value) {
    if (value && value.trim().length < 3) {
      throw new Error("Verifique se o caminho da imagem está correto.");
    }
  }

  #validarEstoque(value) {
    if (value === undefined || value === null || isNaN(value) || Number(value) < 0) {
      throw new Error("O campo estoque deve conter um número válido maior ou igual a zero.");
    }
  }

  //Desing Pattern
  static criar(dados) {
    return new Produtos(dados.idCategoria, dados.nome, dados.descricao, dados.preco, dados.Imagem, dados.estoque, null);
  }

  static editar(dados, id) {
    return new Produtos(
      dados.idCategoria, dados.nome, dados.descricao, dados.preco, dados.Imagem, dados.estoque, id);
  }
}