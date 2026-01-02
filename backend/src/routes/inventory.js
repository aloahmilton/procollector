import express from 'express';
import { InventoryItem, ProcurementRequest } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize(['admin', 'manager', 'organization']));

// --- INVENTORY ---

router.get('/items', async (req, res) => {
    try {
        const items = await InventoryItem.findAll({
            where: { organizationId: req.user.organizationId }
        });
        res.json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/items', async (req, res) => {
    try {
        const item = await InventoryItem.create({
            ...req.body,
            organizationId: req.user.organizationId
        });
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// --- PROCUREMENT ---

router.get('/requests', async (req, res) => {
    try {
        const requests = await ProcurementRequest.findAll({
            where: { organizationId: req.user.organizationId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, count: requests.length, data: requests });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/requests', async (req, res) => {
    try {
        const request = await ProcurementRequest.create({
            ...req.body,
            organizationId: req.user.organizationId,
            requestedBy: req.user.email
        });
        res.status(201).json({ success: true, data: request });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

export default router;
