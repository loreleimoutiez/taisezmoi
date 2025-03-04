/* eslint-disable */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user.js');

const SIGNUP_ACCESS = 10;

// INSCRIPTION 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, SIGNUP_ACCESS)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });

            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// CONNEXION 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Paire login/mot de passe incorrecte !" });
            }

            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }

                    const token = jwt.sign({ userId: user._id }, process.env.AUTH_TOKEN, { expiresIn: "24h" });

                    res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; SameSite=None; Secure; Path=/; Partitioned`);

                    res.status(200).json({ message: "Connexion réussie !" });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// LOGOUT
exports.logout = (req, res) => {
    res.setHeader('Set-Cookie', 'auth_token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=None; Secure; Path=/; Partitioned');
    res.status(200).json({ message: "Déconnecté avec succès" });
};

// VERIFICATION
exports.checkAuthStatus = (req, res) => {
    try {
        const token = req.cookies.auth_token;
        //console.log("Token reçu :", token); // Affiche le token reçu pour vérifier
        if (!token) {
            console.log("Pas de token trouvé dans les cookies");
            return res.status(401).json({ isAuthenticated: false });
        }

        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
        res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        console.error("Erreur de vérification du token :", error);
        res.status(401).json({ isAuthenticated: false, message: "Unauthorized" });
    }
};
