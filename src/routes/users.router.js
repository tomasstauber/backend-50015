import express from "express";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.post("/register", passport.authenticate("register", { failureRedirect: "/api/users/failedregister" }), async (req, res) => {
    if (!req.user) return res.status(403).send({ status: "error", message: "Error al registrar el usuario!" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;
    res.redirect("/profile");
});

usersRouter.get("/failedregister", (req, res) => {
    res.render("failedregister");
})
export default usersRouter;