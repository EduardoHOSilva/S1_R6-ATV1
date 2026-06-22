import { Router } from "express";
import categoriaRoutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import pedidosRoutes from "./pedidosRoutes.js";

const routes = Router();

routes.use('/pedidos', pedidosRoutes);
routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);

export default routes;