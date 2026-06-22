export class Pedido {
  #id;
  #subtotal;
  #status;
  #dataCad;

  // Contructor //
  constructor(pSubTotal, pStatus, pId, pIdCliente) {
    this.#subtotal = pSubTotal;
    this.#status = pStatus;
    this.idCliente = pIdCliente;
    this.#id = pId;
  }
  // Getters //
  get id() {
    return this.#id;
  }

  get subTotal() {
    return this.#subtotal;
  }

  get status() {
    return this.#status;
  }

  // Setters //
  set id(value) {
    this.#validarId(value);
    return (this.#id = value);
  }

  set subTotal(value) {
    this.#validarSubTotal(value);
    return (this.#subtotal = value);
  }

  set status(value) {
    this.#validarStatus(value);
    return (this.#status = value);
  }
  
  // Métodos auxiliares //
  #validarId(value){
    if(value <= 0 && value) {
      throw new Error("Verifique o ID inserido!");
    }
  }

  #validarStatus(value) {
    if(!value) {
      throw new Error("Status inválido.");
    }
  }

  #validarSubTotal(value) {
    console.log(value);

    if(value < 0 || !value) {
      throw new Error("Não foi possivel obter o subtotal.");
    }
  }

  //Desing Pattern //
  static criar(dados) {
    console.log(dados.valortotal, dados.status);
    return new Pedido(dados.valortotal, dados.status, null);
  }

  static editar(dados) {
    return new Pedido(dados.valortotal, dados.status, dados.id);
  }
}