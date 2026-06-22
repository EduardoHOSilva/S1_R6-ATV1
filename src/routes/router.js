import { Router } from "express";
import categoriaRoutes from "./categoria.routes.js";
import produtoRoutes from "./produtos.routes.js";
import pedidoRoutes from "./pedido.routes.js";

const routes = Router();

routes.use('/pedidos', pedidoRoutes);
routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);

export default routes;