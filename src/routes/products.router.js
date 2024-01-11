import express from "express";
import ProductManager from "../controllers/productManager.js"

const productsRouter = express.Router();
const PM = new ProductManager("./src/models/products.json");

productsRouter.get("/products", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        const products = await PM.getProducts();
        if (limit) {
            let arrayProducts = [...products];
            const limitedProducts = arrayProducts.slice(0, limit);
            return res.send(limitedProducts);
        }
        return res.json(products);
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor");
    }
});


productsRouter.get("/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const products = await PM.getProducts();
        const existProduct = products.find(product => product.id === id);
        console.log(existProduct)
        const response = existProduct ? existProduct : { error: `No se encontró ningún producto con el ID: ${id}` };
        res.status(existProduct ? 200 : 400).send(response);
    } catch (error) {
        res.status(500).send("Ha ocurrido un error en el servidor");
    }
});

productsRouter.post("/products", (req, res) => {
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
    } else if ((!Array.isArray(thumbnail)) || thumbnail.length == 0) {
        res.status(400).send({ status: "error", message: "Debe cargar una imagen en el array Thumbnails!" });
        return false;
    }

    if (PM.addProduct({ title, description, code, price, status, stock, category, thumbnail })) {
        res.send({ status: "OK", message: "El producto se ha cargado exitosamente!" })
    } else {
        res.status(500).send({ status: "error", message: "Error al cargar el producto!" })
    }
});

productsRouter.put("/products/:pid", (req, res) => {
    let pid = Number(req.params.pid);
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
    } else if ((!Array.isArray(thumbnail)) || thumbnail.length == 0) {
        res.status(400).send({ status: "error", message: "Debe cargar una imagen en el array Thumbnails!" });
        return false;
    }

    if (PM.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnail })) {
        res.send({ status: "OK", message: "El producto se actualizó correctamente!" })
    } else {
        res.status(500).send({ status: "error", message: "Error al actualizar el producto!" })
    }
});

productsRouter.delete("/products/:pid", (req, res) => {
    let pid = Number(req.params.pid);

    if (PM.deleteProduct(pid)) {
        res.send({ status: "ok", message: "El Producto se eliminó correctamente!" });
    } else {
        res.status(500).send({ status: "error", message: "Error! No se pudo eliminar el Producto!" });
    }
});

export default productsRouter;