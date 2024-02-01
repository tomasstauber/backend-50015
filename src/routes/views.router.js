import express from "express";
//import ProductManager from "../dao/productManager.js";
//import ProductManager from "../dao/productManagerDB.js";
import { productsModel } from "../models/products.model.js";

const viewsRouter = express.Router();
//const PM = new ProductManager("./src/dao/products.json");


viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productsModel.find();
        const arrayProducts = products.map(product => {
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status,
                stock: product.stock,
                category: product.category,
                thumbnail: product.thumbnail
            }
        })
        res.render("index", { title: "REVOLVER", products: arrayProducts });
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});

viewsRouter.get("/chat", (req, res) => {
    res.render("chat");
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
    }
});

export default viewsRouter;