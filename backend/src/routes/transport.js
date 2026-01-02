import express from 'express';
import { Vehicle, Route } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

// Middleware to ensure user belongs to an organization
router.use(authenticate);
router.use(authorize(['admin', 'manager', 'organization']));

// --- VEHICLES ---

// Get all vehicles
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            where: { organizationId: req.user.organizationId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, count: vehicles.length, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create a vehicle
router.post('/vehicles', async (req, res) => {
    try {
        const vehicle = await Vehicle.create({
            ...req.body,
            organizationId: req.user.organizationId
        });
        res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// --- ROUTES ---

// Get all routes
router.get('/routes', async (req, res) => {
    try {
        const routes = await Route.findAll({
            where: { organizationId: req.user.organizationId },
            order: [['name', 'ASC']]
        });
        res.json({ success: true, count: routes.length, data: routes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create a route
router.post('/routes', async (req, res) => {
    try {
        const route = await Route.create({
            ...req.body,
            organizationId: req.user.organizationId
        });
        res.status(201).json({ success: true, data: route });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

export default router;
