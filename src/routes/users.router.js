import express from "express";
import { usersModel } from "../models/user.model.js";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    try {
        const existUser = await usersModel.findOne({ email : email});
        if(existUser) {
            return res.status(400).send({error: "Este correo ya se encuentra registrado!"});
        }
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const newUser = await usersModel.create({ first_name, last_name, email, password, age, role: "admin" });
            req.session.login = true;
            req.session.user = { ...newUser._doc };
            return res.redirect("/profile")
        }
        const newUser = await usersModel.create({ first_name, last_name, email, password, age });
        req.session.login = true;
        req.session.user = {...newUser._doc}
        res.redirect("/profile")
    } catch (error) {
        res.status(400).send({ error: "Ha ocurrido un error al crear el usuario!", error });
        throw error;
    }
})

export default usersRouter;