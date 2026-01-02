import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'No token provided. Please include Authorization header with Bearer token.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database
        const user = await User.findByPk(decoded.userId, {
            include: ['organization']
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found or has been deleted.'
            });
        }

        if (user.status !== 'active') {
            return res.status(401).json({
                success: false,
                error: `User account is ${user.status}. Please contact administrator.`
            });
        }

        // Attach user to request object
        req.user = user;
        req.userId = user.id;
        req.organizationId = user.organizationId;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token. Please login again.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired. Please login again.'
            });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error: 'Authentication failed. Please try again.'
        });
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (user && user.status === 'active') {
            req.user = user;
            req.userId = user.id;
            req.organizationId = user.organizationId;
        }

        next();
    } catch (error) {
        // Silently fail for optional auth
        next();
    }
};
