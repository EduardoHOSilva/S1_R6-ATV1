export class Categoria {
  #id;
  #nome;
  #descricao;

  // Contructor //
  constructor(pNome, pDescricao, pId) {
    this.#nome = pNome;
    this.#descricao = pDescricao;
    this.#id = pId;
  }

  // Getters //
  get nome() {
    return this.#nome;
  }

  get descricao() {
    return this.#descricao;
  }

  get id() {
    return this.#id;
  }

  // Setters //
  set nome(value) {
    this.#validarNome(value);
    this.#nome = value;
  }

  set descricao(value) {
    this.#validarDescricao(value);
    this.#descricao = value;
  }

  set id(value) {
    this.#validarId(value);
    this.#id = value;
  }

  // Métodos auxiliares //
  #validarNome(value) {
    if (!value || value.trim() < 3 || value.trim().length > 45) {
      throw new Error(
        "O campo nome é obrigatório e deve ter três e quarenta e cinco caracteres.",
      );
    }
  }

  #validarDescricao(value) {
    if (value && (value.trim() < 5 || value.trim().length > 100)) {
      throw new Error("O campo descrição deve ter cinco e cem caracteres.");
    }
  }

  #validarId(value) {
    if (value && value.trim() <= 0) {
      throw new Error("O valor do ID não corresponde ao esperado.");
    }
  }

  // Factory Methods //
  static criar(dados) {
    return new Categoria(dados.nome, dados.descricao, null);
  }
  static editar(dados, id) {
    return new Categoria(dados.nome, dados.descricao, id);
  }
}