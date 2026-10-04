import user from '../Models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, {expiresIn: '7d'});
};

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Cet e-mail est déjà utilisé.' });
        }
        const user = await user.create({ email, password });
        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    email: user.email,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(400).json({ success: false, message: 'Données utilisateur invalides.' });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    email: user.email,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'E-mail ou mot de passe incorrect.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getbyId(req,res) {
    try {
        res.status(200).json({success: true,data: req.user});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}