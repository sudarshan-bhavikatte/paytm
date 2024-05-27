import express from 'express';
import signinValidation from '../../Schemas/signinValidation.js';

const signinMiddleware = express.Router();

// Apply body parsing middleware first
signinMiddleware.use(express.json());

// Custom middleware for validation
signinMiddleware.post('/signin', (req, res, next) => {
    const userData = {
        name: req.body.name,
        password: req.body.password,
    };

    try {
        const validatedUser = signinValidation.parse(userData);
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error('Validation error:', error.message);
        res.status(400).json({ msg: 'Invalid input' });
    }
});

export default signinMiddleware;
