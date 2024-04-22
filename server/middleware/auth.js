const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
exports.authenticate = (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
      
        const decoded = jwt.verify(token, 'saidulSecretKey');
        const userId = decoded.userId;

        User.findByPk(userId)
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
            
                req.user = user; 
                next(); 
            })
            .catch(err => {
                console.error(err);
                throw new Error('Failed to authenticate user');
            });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};

