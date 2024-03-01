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
      const isLoggedIn = req.session.login;
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
            thumbnail: product.thumbnail,
            isLoggedIn: isLoggedIn,
            user: req.session.user
         }
      })
      res.render("index", { title: "REVOLVER", products: arrayProducts, isLoggedIn: isLoggedIn, user: req.session.user });
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

      const isLoggedIn = req.session.login;

      res.render("products", {
         products: products.docs,
         hasPrevPage: products.hasPrevPage,
         hasNextPage: products.hasNextPage,
         prevPage: products.prevPage,
         nextPage: products.nextPage,
         currentPage: products.page,
         totalPages: products.totalPages,
         isLoggedIn: isLoggedIn,
         user: req.session.user,
      });

   } catch (error) {
      console.log("Ha ocurrido un error al obtener productos", error);
      res.status(500).json({ status: 'error', error: "Ha ocurrido un error en el servidor!" });
   }
});


viewsRouter.get("/products/:pid", async (req, res) => {
   const pid = req.params.pid;
   const product = await PM.getProductById(pid);
   const isLoggedIn = req.session.login;
   res.render("product", { product, isLoggedIn: isLoggedIn, user: req.session.user });
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

// En tu archivo de rutas:

viewsRouter.get("/login", (req, res) => {
   const isLoggedIn = req.session.login;
   if (isLoggedIn) {
      return res.redirect("/profile");
   }
   res.render("login", { isLoggedIn: isLoggedIn });
});

viewsRouter.get("/register", (req, res) => {
   const isLoggedIn = req.session.login;
   if (isLoggedIn) {
      return res.redirect("/profile");
   }
   res.render("register", { isLoggedIn: isLoggedIn });
});

viewsRouter.get("/profile", (req, res) => {
   const isLoggedIn = req.session.login;
   if (!isLoggedIn) {
      return res.redirect("/login");
   }
   res.render("profile", { isLoggedIn: isLoggedIn, user: req.session.user });
});


/* viewsRouter.get("/login", (req, res) => {
   if(req.session.login){
      return res.redirect("/profile");
   }
   res.render("login");
});

viewsRouter.get("/register", (req, res) => {
   if(req.session.login){
      return res.redirect("/profile");
   }
   res.render("register");
});

viewsRouter.get("/profile", (req, res) => {
   if(!req.session.login){
      return res.redirect("/login");
   }
   res.render("profile", {user: req.session.user});
}); */

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