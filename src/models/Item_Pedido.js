export class ItensPedido{
  #id;
  #idPedido;
  #idProduto;
  #quantidade;
  #valorItem;

  // Contructor //
  constructor(pIdProduto, pQuantidade, pValorItem, pId, pIdPedido){
    this.idPedido = pIdPedido;
    this.idProduto = pIdProduto;
    this.quantidade = pQuantidade;
    this.valorItem = pValorItem;
    this.id = pId;
  }

  // Getters //
  get id(){
    return this.#id;
  }

  get idPedido(){
    return this.#idPedido;
  }

  get idProduto(){
    return this.#idProduto;
  }

  get quantidade(){
    return this.#quantidade;
  }

  get valorItem(){
    return this.#valorItem;
  }

  // Setters //
  set id(value){
    this.#validarId(value);
    this.#id = value;
  }

  set idPedido(value){
    this.#validarIdPedido(value);
    this.#idPedido = value;
  }

  set idProduto(value){
    this.#validarIdProduto(value);
    this.#idProduto = value;
  }

  set quantidade(value){
    this.#validarQuantidade(value);
    this.#quantidade = value;
  }

  set valorItem(value){
    this.#validarValorItem(value);
    this.#valorItem = value;
  }

  // Métodos auxiliares //
  #validarId(value){
    if(value <= 0 && value){
      throw new Error("Verifique o id inserido!");
    }
  }

  #validarIdPedido(value){
    if(value <= 0 && value){
      throw new Error("Verifique o id do pedido inserido!");
    }
  }

  #validarIdProduto(value){
    if(value <= 0 || !value){
      throw new Error("Verifique o id do produto inserido!");
    }
  }

  #validarQuantidade(value){
    if(value <= 0 || !value){
      throw new Error("Verifique a quantidade inserida!");
    }
  }

  #validarValorItem(value){
    if(value < 0 || !value){
      throw new Error("Verifique o valor do item inserido!");
    }
  }

   // Desing Pattern //
  static calcularTotal(itens){
    return(itens.reduce((total, item) => total + (item.quantidade * item.valorItem), 0));
  }
  
  static criar(dados){
    return new ItensPedido(dados.idProduto, dados.quantidade, dados.valorItem, null, null);
  }
  
  static editar(dados){
    return new ItensPedido(dados.idPedido, dados.idProduto, dados.quantidade, dados.valorItem, id);
  }
};