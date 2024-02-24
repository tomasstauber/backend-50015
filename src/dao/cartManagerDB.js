import { cartsModel } from "../models/carts.model.js";

class CartManager {

    async createCart() {
        try {
            const newCart = new cartsModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Ha ocurrido un error al crear el carrito!", error);
            throw error;
        }
    }

    async getCart(cid) {
        try {
            const cart = await cartsModel.findById(cid);
            if(!cart) {
                console.log("Ningún carrito coincide con ese Id!");
                return null;
            }
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            throw error;
        }
    }


    async getCarts() {
        return await cartsModel.find().lean();
    }

    async addToCart(cid, pid, quantity = 1) {
        try {
            const cart = await this.getCart(cid);
            const existProduct = cart.products.find(item => item.product.toString() === pid);
            if(existProduct){
                existProduct.quantity += quantity;
            } else {
                cart.products.push({product: pid, quantity});
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Ha ocurrido un error al agregar el producto al carrito!", error);
            throw error;
        }
    }

    async updateQuantityProductCart(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            if(!cart){
                throw new error("No se encontró el carrito!");
            }
            const indexProduct = cart.products.findIndex(item => item.product._id.toString() === pid);
            if(indexProduct !== -1) {
                cart.products[indexProduct].quantity = quantity;
                cart.markModified("products");
                await cart.save();
                return cart;
            } else {
                throw new error("No existe el producto en el carrito!");
            }
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar el carrito!", error);
            throw error;
        }
    }


    async updateProducts(cid, product) {
        try {
            const cart = await cartsModel.findById(cid);
            if(!cart) {
                throw new error("No se encontró el carrito!");
            }
            cart.products = product;
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Ha ocurrido un error al actualizar los productos!", error);
            throw error;
        }
    }

    async deleteProductCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            if(!cart) {
                throw new Error("No se encontró el carrito!");
            }
            cart.products = cart.products.filter(item => item.product._id.toString() !== pid);
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar el producto del carrito!", error);
            throw error;
        }
    }

    async deleteProductsCart(cid) {
        try {
            const cart = await cartsModel.findByIdAndUpdate(cid, {products: []}, {new: true});
            if(!cart) {
                throw new error("No se encontró el carrito!");
            }
            return cart;
        } catch (error) {
            console.log("Ha ocurrido un error al eliminar los productos del carrito!", error);
            throw error;
        }
    }
}

export default CartManager;