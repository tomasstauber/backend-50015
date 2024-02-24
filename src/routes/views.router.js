import express from "express";
import CartManager from "../dao/cartManagerDB.js";
import ProductManager from "../dao/productManagerDB.js";
import { productsModel } from "../models/products.model.js";

const viewsRouter = express.Router();
const PM = new ProductManager();
const CM = new CartManager();

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

viewsRouter.get("/products", async (req, res) => {
    try {
       const { page = 1, limit = 10 } = req.query;
       const products = await PM.getProducts({
          page: parseInt(page),
          limit: parseInt(limit)
       });
 
       const arrayProducts = products.docs.map(product => {
          const { _id, ...rest } = product.toObject();
          return rest;
       });
 
       res.render("products", {
          products: arrayProducts,
          hasPrevPage: products.hasPrevPage,
          hasNextPage: products.hasNextPage,
          prevPage: products.prevPage,
          nextPage: products.nextPage,
          currentPage: products.page,
          totalPages: products.totalPages
       });
 
    } catch (error) {
       console.log("Ha ocurrido un error al obtener productos", error);
       res.status(500).json({ status: 'error', error: "Ha ocurrido un error en el servidor!" });
    }
 });

 viewsRouter.get("/products/:pid", async (req, res) => {
   const pid = req.params.pid;
   const product = await PM.getProductById(pid);
   res.render("product", {product});
});

 viewsRouter.get("/carts/:cid", async (req, res) => {
    const cid = req.params.cid;
 
    try {
       const cart = await CM.getCart(cid);
 
       if (!cart) {
          console.log("No existe un carrito con ese id");
          return res.status(404).json({ error: "Carrito no encontrado" });
       }
 
       const productsCart = cart.products.map(item => ({
          product: item.product.toObject(),
          quantity: item.quantity
       }));
 
 
       res.render("cart", { products: productsCart });
    } catch (error) {
       console.log("Ha ocurrido un error al obtener el carrito", error);
       res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
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