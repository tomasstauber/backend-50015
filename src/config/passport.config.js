import passport from "passport";
import local from "passport-local";
import { usersModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import githubStrategy from "passport-github2";

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("register", new localStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const user = await usersModel.findOne({ email });
            if (user) return done(null, false);
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            const result = await usersModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("login", new localStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await usersModel.findOne({ email });
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById({ _id: id });
        done(null, user);
    });

    passport.use("github", new githubStrategy({
        clientID: "Iv1.a71f0b3fb34e356c",
        clientSecret: "f577a3e0e5ee1b9d5149f209a48f0270c278caec",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await usersModel.findOne({ email: profile._json.email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 20,
                    email: profile._json.email,
                    password: ""
                }
                const result = await usersModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))


}

export default initializePassport;