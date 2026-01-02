import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User, Organization } from '../models/index.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// @route   POST /api/v1/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login',
    authLimiter,
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty().withMessage('Password is required'),
        body('subdomain').optional().trim()
    ],
    async (req, res) => {
        try {
            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { email, password, subdomain } = req.body;

            // Find user by email
            const user = await User.findOne({
                where: { email },
                include: [{
                    model: Organization,
                    as: 'organization',
                    ...(subdomain && { where: { subdomain } })
                }]
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials.'
                });
            }

            // Verify password
            const isValidPassword = await user.verifyPassword(password);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid credentials.'
                });
            }

            // Check user status
            if (user.status !== 'active') {
                return res.status(403).json({
                    success: false,
                    error: `Account is ${user.status}. Please contact administrator.`
                });
            }

            // Generate JWT tokens
            const accessToken = jwt.sign(
                { userId: user.id, role: user.role },
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );

            const refreshToken = jwt.sign(
                { userId: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
            );

            // Update last login
            await user.update({ lastLoginAt: new Date() });

            res.json({
                success: true,
                data: {
                    user: user.toAuthJSON(),
                    organization: user.organization,
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                error: 'Login failed. Please try again.'
            });
        }
    }
);

// @route   POST /api/v1/auth/refresh-token
// @desc    Refresh access token
// @access  Public
router.post('/refresh-token',
    [body('refreshToken').notEmpty()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { refreshToken } = req.body;

            // Verify refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Find user
            const user = await User.findByPk(decoded.userId);
            if (!user || user.status !== 'active') {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid refresh token.'
                });
            }

            // Generate new access token
            const accessToken = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
            );

            res.json({
                success: true,
                data: { accessToken }
            });
        } catch (error) {
            console.error('Token refresh error:', error);
            res.status(401).json({
                success: false,
                error: 'Invalid or expired refresh token.'
            });
        }
    }
);

// @route   POST /api/v1/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Public
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully. Please remove tokens from client.'
    });
});

export default router;
