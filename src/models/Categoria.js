export class Categoria {
  #id;
  #nome;
  #descricao; 
  #dataCad;

  // Contructor //
  constructor(pNome, pDescricao, pId) {
    this.nome = pNome;
    this.descricao = pDescricao;
    this.id = pId;
    this.#dataCad = new Date();
  }

  // Getters //
  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome
  }

  get descricao() {
    return this.#descricao
  }

  get dataCad() {
    return this.#dataCad;
  }

  // Setters //
  set nome(value) {
    this.#validarNome(value);
    this.#nome = value
  }

  set descricao(value) {
    this.#validarDescricao(value);
    this.#descricao = value;
  }

  set id(value) {
    this.#validarId(value)
    this.#id = value
  }

  // Métodos auxiliares //
  #validarNome(value) {
    if (!value || value.trim().length < 3 || value.trim().length > 45) {
      throw new Error('O campo nome é obrigatório e deve ter entre 3 a 45 caracteres')
    }
  }

  #validarDescricao(value) {
    if (value && (value.trim().length < 5 || value.trim().length > 100)) {
      throw new Error('O campo descrição  deve ter entre 5 a 100 caracteres')
    }
  }

  #validarId(value) {
    if (value && value <= 0) {
      throw new Error('O valor do ID não corresponde ao esperado')
    }
  }

  // Desing Pattern //
  static criar(dados) {
    return new Categoria(dados.nome, dados.descricao, null);
  }

  static editar(dados, id) {
    return new Categoria(dados.nome, dados.descricao, id);
  }
};