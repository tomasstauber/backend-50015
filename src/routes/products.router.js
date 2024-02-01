import express from "express";
import ProductManager from "../dao/productManagerDB.js";

const productsRouter = express.Router();
const PM = new ProductManager();


/* productsRouter.get("/products", async (req, res) => {
    try {
        const products = await PM.getProducts();
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
        res.send({ products: arrayProducts });
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
}); */

productsRouter.get("/products", async (req, res) => {
    try {
        const products = await PM.getProducts(req.query);
        res.send({ products })
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!" + error.message);
        throw error;
    }
});

productsRouter.get("/products/:pid", async (req, res) => {
    try {
        let pid = req.params.pid;
        const product = await PM.getProductById(pid);
        res.send(product)
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!" + error.message);
        throw error;
    }
});

productsRouter.post("/products", (req, res) => {
    try {
        let { title, description, code, price, status, stock, category, thumbnail } = req.body;

        if (!title) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Title!" });
            return false;
        }
        if (!description) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Description!" });
            return false;
        }
        if (!code) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Code!" });
            return false;
        }
        if (!price) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Price!" });
            return false;
        }
        if (!status) {
            status = true;
        }
        if (!stock) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Stock!" });
            return false;
        }
        if (!category) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Category!" });
            return false;
        }
        if (!thumbnail) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Thumbnails!" });
            return false;
        }
        if (PM.createProduct({ title, description, code, price, status, stock, category, thumbnail })) {
            res.send({ status: "OK", message: "El producto se ha cargado exitosamente!" })
        } else {
            res.status(500).send({ status: "error", message: "Error al cargar el producto!" })
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});

productsRouter.put("/products/:pid", (req, res) => {
    try {
        let pid = req.params.pid;
        let { title, description, code, price, status, stock, category, thumbnail } = req.body;

        if (!title) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Title!" });
            return false;
        }
        if (!description) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Description!" });
            return false;
        }
        if (!code) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Code!" });
            return false;
        }
        if (!price) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Price!" });
            return false;
        }
        if (!status) {
            status = true;
        }
        if (!stock) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Stock!" });
            return false;
        }
        if (!category) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Category!" });
            return false;
        }
        if (!thumbnail) {
            res.status(400).send({ status: "error", message: "Debe completar el campo Thumbnails!" });
            return false;
        }
        if (PM.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnail })) {
            res.send({ status: "OK", message: "El producto se actualizó correctamente!" })
        } else {
            res.status(500).send({ status: "error", message: "Error al actualizar el producto!" })
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});

productsRouter.delete("/products/:pid", (req, res) => {
    try {
        let pid = req.params.pid;
        if (PM.deleteProduct(pid)) {
            res.send({ status: "ok", message: "El Producto se eliminó correctamente!" });
        } else {
            res.status(500).send({ status: "error", message: "Error! No se pudo eliminar el Producto!" });
        }
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor!", error.message);
        throw error;
    }
});

export default productsRouter;