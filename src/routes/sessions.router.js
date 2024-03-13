import express from "express";
import passport from "passport";
import { usersModel } from "../models/user.model.js";

const sessionsRouter = express.Router();

sessionsRouter.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {
    if (!req.user) return res.status(401).send({ status: "error", message: "Credenciales inválidas!" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;
    res.redirect("/profile");
});

sessionsRouter.get("/current", async (req, res) => {
    if (req.session.user) {
        const userId = req.user._id;
        try {
            const currentUser = await usersModel.findById(userId);
            res.json({ user: currentUser });
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener el usuario actual' });
        }
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
})

sessionsRouter.get("/faillogin", async (req, res) => {
    res.render("faillogin");
});

sessionsRouter.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login")
});

sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { });

sessionsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/faillogin" }), async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile")
});

export default sessionsRouter;