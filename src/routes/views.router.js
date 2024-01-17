import express from "express";
import ProductManager from "../controllers/productManager.js";

const PM = new ProductManager();
const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
    try {
        const products = PM.getProducts();
        res.render("index", { title: "REVOLVER", products: products });
    } catch (error) {
        console.error("Ha ocurrido un error al obtener los productos!", error);
        res.status(500).json({error: "Ha ocurrido un error en el servidor!"});
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error en el servidor!"});
    }
});

export default viewsRouter;
