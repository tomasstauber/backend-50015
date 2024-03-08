import express from "express";
import passport from "passport";

const sessionsRouter = express.Router();

sessionsRouter.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {
    if (!req.user) return res.status(401).send({ status: "error", message: "Credenciales inválidas!" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.eamil
    }
    req.session.login = true;
    res.redirect("/profile");
});

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