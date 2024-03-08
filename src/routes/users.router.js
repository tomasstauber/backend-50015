import express from "express";
import { usersModel } from "../models/user.model.js";
import { createHash } from "../utils.js";
import passport from "passport";

const usersRouter = express.Router();

/* usersRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        const existUser = await usersModel.findOne({ email: email });
        if (existUser) {
            return res.status(400).send({ error: "Este correo ya se encuentra registrado!" });
        }
        if (email === "adminCoder@coder.com") {
            const newUser = await usersModel.create({ first_name, last_name, email, password: createHash(password), age, role: "admin" });
            req.session.login = true;
            req.session.user = { ...newUser._doc };
            return res.redirect("/profile")
        }
        const newUser = await usersModel.create({ first_name, last_name, email, password: createHash(password), age });
        req.session.login = true;
        req.session.user = { ...newUser._doc }
        res.redirect("/profile")
    } catch (error) {
        res.status(400).send({ error: "Ha ocurrido un error al crear el usuario!", error });
        throw error;
    }
}) */

usersRouter.post("/register", passport.authenticate("register", { failureRedirect: "/api/users/failedregister" }), async (req, res) => {
    if (!req.user) return res.status(403).send({ status: "error", message: "Error al registrar el usuario!" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.eamil
    }
    req.session.login = true;
    res.redirect("/profile");
});

usersRouter.get("/failedregister", (req, res) => {
    res.render("failedregister");
})
export default usersRouter;