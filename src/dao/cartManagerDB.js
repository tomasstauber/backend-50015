import { cartsModel } from "../models/carts.model.js";

class CartManager {

    async createCart() {
        await cartsModel.create({ products: [] });
        console.log("Carrito creado correctamente!");
        return true;
    }

    async getCart(id) {
        try {
            if (this.validateId(id)) {
                return await cartsModel.findById(id).lean() || null;
            } else {
                console.log("Ningún carrito coincide con el Id proporcionado!");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el carrito:", error.message);
            throw error;
        }
    }
    

    async getCarts() {
        return await cartsModel.find().lean();
    }

    async addToCart(cid, pid) {
        try {
            if (await cartsModel.exists({ _id: cid, products: { $elemMatch: { product: pid } } })) {
                await cartsModel.updateOne({ _id: cid, products: { $elemMatch: { product: pid } } }, { $inc: { "products.$.quantity": 1 } }, { new: true, upsert: true });
            } else {
                await cartsModel.updateOne({ _id: cid }, { $push: { "product": pid, "quantity": 1 } }, { new: true, upsert: true });
            }
            console.log("Producto agregado correctamente al carrito!");
            return true;
        } catch (error) {
            console.log("Ha ocurrido un error al agregar el producto al carrito!", error.message);
            throw error;
        }
    }

    async updateQuantityProductCart(cid, pid, quantity) {
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const product = cart.products.find(item => item.product === pid);
                if (product) {
                    product.quantity = quantity;
                    await cartsModel.updateOne({ _id: cid }, { products: cart.products });
                    console.log("Carrito actualizado correctamente!");
                    return true;
                } else {
                    console.log("No se encontró el producto en el carrito!");
                    return false;
                }
            } else {
                console.log("Ningún producto o carrito coincide con el Id proporcionado!");
                return false;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el carrito!", error.message);
            throw error;
        }
    }


    async updateProducts(cid, products) {
        try {
            await cartsModel.updateOne({ _id: cid }, { products: products }, { new: true, upsert: true });
            console.log("Productos actualizados correctamente!");
            return true;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar los productos!", error.message);
            throw error;
        }
    }

    async deleteProductCart(cid, pid) {
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const products = cart.products.filter(item => item.product !== pid);
                await cartsModel.updateOne({ _id: cid }, { products: products });
                console.log("Producto eliminado del carrito correctamente!");
                return true;
            } else {
                console.log("Ningún producto o carrito coincide con el Id proporcionado!");
                return false;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar el producto del carrito!", error.message);
            throw error;
        }
    }

    async deleteProductsCart(cid) {
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);

                await cartsModel.updateOne({ _id: cid }, { products: [] });
                console.log("Productos eliminados correctamente!");
                return true;
            } else {
                console.log("Ningún producto o carrito coincide con el Id proporcionado!");
                return false;
            }
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar los productos del carrito!", error.message);
            throw error;
        }
    }

    validateId(id) {
        return id.length === 24 ? true : false;
    }
}

export default CartManager;