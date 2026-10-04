import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export async function protect(req, res, next) {
    let token;

    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Utilisateur non trouvé avec ce token.' });
            }
            next(); 
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, message: 'Non autorisé, token invalide ou expiré.' });
        }
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'Non autorisé, aucun token fourni.' });
    }
}