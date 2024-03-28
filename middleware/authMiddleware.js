const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Récupérer le token JWT de l'en-tête Authorization
    const token = req.header('Authorization');

    // Vérifier si le token JWT est présent
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        // Vérifier et décoder le token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter les données décodées de l'utilisateur à la requête
        req.user = decoded.user;

        // Passer au middleware suivant
        next();
    } catch (error) {
        // En cas d'erreur lors de la vérification du token
        console.error(error);
        return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
    }
}

module.exports = authMiddleware;