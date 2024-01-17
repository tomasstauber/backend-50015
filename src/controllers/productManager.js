import fs from "fs";
import products from "../products.js";

class ProductManager {
    constructor(path) {
        this.products = products;
        this.path = path;
        this.prevId = 0;
    }

    async addProduct(newObjet) {
        let { title, description, code, price, status, stock, category, thumbnail } = newObjet;
        console.log(newObjet);
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Error! Todos los campos son obligatorios!");
            return;
        };

        for (const product of this.products) {
            if (product.code === code) {
                console.log("El código proporcionado ya está en uso!")
            }
        };

        this.prevId++;

        const newProduct = {
            id: this.prevId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        };

        this.products.push(newProduct);
        await this.saveProduct(this.products);
        console.log(newProduct);
    }

    getProducts() {
        try {
            return this.products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id) {
        try {
            const arrayProducts = await this.readFile(); 
            const result = arrayProducts.find(item => toString(item.id) === String(id));
            if (!result) {
                console.log("No se encontró ningún producto!");
            } else {
                console.log("Producto encontrado!");
                return result;
            }
        } catch (error) {
            console.log("Ha ocurrido un  error al leer el archivo", error);
        }
    }

    async readFile() {
        try {
            const result = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(result);
            return arrayProducts;
        } catch (error) {
            console.log("Ha ocurrido un error al leer el archivo!");
        }
    }

    async saveProduct(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log("Ha ocurrido un error al guardar el archivo!", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts.splice(index, 1, productoActualizado);
                await this.saveProduct(arrayProducts);
                const updatedProduct = arrayProducts.find(item => item.id === id);
                return { success: true, message: "Producto actualizado correctamente.", updatedProduct };
            } else {
                console.log("No se encontró ningún producto!");
                return { success: false, message: "No se encontró ningún producto con el ID proporcionado." };
            }
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto!");
            return { success: false, message: "Error al actualizar el producto." };
        }
    }

    deleteProduct(id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1); (0,1)
            this.saveProduct(this.products);
            console.log("Producto #" + id + " eliminado correctamente!");

            return true;
        } else {
            console.log("No se pudo encontrar el producto!");

            return false;
        }
    }
}

export default ProductManager;