import { productsModel } from "../models/products.model.js";

class ProductManager {

    async createProduct(product) {
        try {
            if (await this.validateCode(product.code)) {
                console.log("Ya existe un producto con este código!");
                return false;
            } else {
                await productsModel.create(product);
                console.log("El producto se ha creado correctamente!");
                return true;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al agregar el producto! ", error.message);
            throw error;
        }
    }

    async getProducts() {
        try {
            return await productsModel.find().lean();
        } catch (error) {
            console.log("Ha ocurrido un error al obtener los productos! ", error.message);
            throw error;
        }
    };

    async updateProduct(id, product) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productsModel.updateOne({ _id: id }, product);
                    console.log("El producto se actualizó correctamente!");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el producto! ", error.message);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            if (this.validateId(id)) {
                if (await this.getProductById(id)) {
                    await productsModel.deleteOne({ _id: id });
                    console.log("El producto se eliminó correctamente!");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar el producto!", error.message);
            throw error;
        }
    }

    
    async getProductById(id) {
        try {
            if (this.validateId(id)) {
                return await productsModel.findOne({ _id: id }).lean();
            }
        } catch (error) {
            console.log("Ha ocurrido un error al buscar el Id!", error.message);
            throw error;
        }
    }

    async validateCode(code) {
        return await productsModel.findOne({ code: code }) || false;
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }
}

export default ProductManager;