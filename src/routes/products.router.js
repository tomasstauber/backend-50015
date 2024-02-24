import express from "express";
import ProductManager from "../dao/productManagerDB.js";

const productsRouter = express.Router();
const PM = new ProductManager();

productsRouter.get("/products", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const products = await PM.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({ status: 'error', error: "Error interno del servidor" });
        throw error;
    }
});


productsRouter.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
        const product = await PM.getProductById(pid);
        if (!product) {
            return res.json({ error: "No se encontró el producto!" });
        }
        res.json(product);
    } catch (error) {
        console.log("Ha ocurrido un error al encontrar el producto!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});

productsRouter.post("/products", async (req, res) => {
    const newProduct = req.body;
    try {
        await PM.createProduct(newProduct);
        res.status(501).json({ message: "Producto agregado correctamente!" })
    } catch (error) {
        console.log("Ha ocurrido un error al cargar el producto!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});

productsRouter.put("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    const productUp = req.body;

    try {
        await PM.updateProduct(pid, productUp);
        res.json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        console.error("Ha ocurrido un error al actualizar producto!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});

productsRouter.delete("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
        await PM.deleteProduct(pid);
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Ha ocurrido un error al eliminar producto!", error);
        res.status(500).json({ error: "Ha ocurrido un error en el servidor!" });
        throw error;
    }
});

export default productsRouter;