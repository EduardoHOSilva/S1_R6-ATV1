import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
class Database {
  static #instance = null;
  #pool = null;
  
  #createPool() {
    this.#pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  
  static getInstance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
      Database.#instance.#createPool();
    }
    return Database.#instance;
  }
  getPool() {
    return this.#pool;
  }
}

export const connection = Database.getInstance().getPool();

export async function initializeDatabase() {
  console.log("Inicializando o banco de dados e tabelas...");
  try {
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { 
        rejectUnauthorized: false 
      }
    });
    
    const dbName = process.env.DB_DATABASE || 'S1_R6';
    
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await tempConnection.query(`USE \`${dbName}\`;`);
    
    await tempConnection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
      idCategoria INT NOT NULL AUTO_INCREMENT,
      nome VARCHAR(50) NOT NULL,
      descricao VARCHAR(100) NOT NULL,
      data_cad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
      ) ENGINE=InnoDB;
    `);
    
    await tempConnection.query(`
      CREATE TABLE IF NOT EXISTS produtos (
      idProduto INT NOT NULL AUTO_INCREMENT,
      idCategoria INT NOT NULL,
      nome VARCHAR(50) NOT NULL,
      preco DECIMAL(10,2) NOT NULL,
      estoque INT NOT NULL,
      Imagem VARCHAR(255) NOT NULL,
      dataCad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (idProduto, idCategoria),
      KEY fk_produtos_categorias_idx (idCategoria),
      CONSTRAINT fk_produtos_categorias FOREIGN KEY (idCategoria) REFERENCES categorias (idCategoria) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB;
    `);
      
    await tempConnection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
      idPedido INT NOT NULL AUTO_INCREMENT,
      subTotal DECIMAL(10,2) NOT NULL,
      status ENUM('Aberto', 'Finalizado', 'Pendente') NOT NULL,
      dataPedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (idPedido)
      ) ENGINE=InnoDB;
    `);
      
    await tempConnection.query(`
      CREATE TABLE IF NOT EXISTS itens_pedidos (
      idItensPedidos INT NOT NULL AUTO_INCREMENT,
      idPedido INT NOT NULL,
      idProduto INT NOT NULL,
      quantidade INT NOT NULL,
      valorItem DECIMAL(10,2) NOT NULL,
      PRIMARY KEY (idItensPedidos, idPedido, idProduto),
      KEY fk_pedido_itens_pedido_idx (idPedido),
      KEY fk_produto_itens_pedido_idx (idProduto),
      CONSTRAINT fk_pedido_itens_pedido FOREIGN KEY (idPedido) REFERENCES pedidos (idPedido) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT fk_produto_itens_pedido FOREIGN KEY (idProduto) REFERENCES produtos (idProduto) ON DELETE NO ACTION ON UPDATE NO ACTION
      )
      ENGINE=InnoDB;
    `);
      
    await tempConnection.end();      
    console.log("Banco de dados e tabelas verificados/criados com sucesso.");

  } catch (error) {
    console.error("Erro ao criar o banco ou as tabelas:", error);
    throw error;
  }
}