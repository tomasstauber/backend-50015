import express from "express";
import { usersModel } from "../models/user.model.js";

const sessionsRouter = express.Router();

sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                req.session.login = true;
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age
                }
                res.redirect("/products");
            } else {
                res.status(401).send({ message: "Credenciales inválidas!" });
            }
        } else {
            res.status(404).send({ error: "Usuario no encontrado!" });
        }
    } catch (error) {
        res.status(400).send({ error: "Ha ocurrido un error en el login!" });
    }
})

sessionsRouter.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login")
})

/* sessionsRouter.get("/login", (req, res) => {
    const user = req.query.user;
    req.session.user = user;
    res.send("Usuario guardado!");
});

sessionsRouter.get("/user", (req, res) => {
    if(req.session.user){
        return res.send(`Usuario registrado: ${req.session.user}`);
    }
    res.send("No hay ningún usuario registrado!");
}); */

export default sessionsRouter;