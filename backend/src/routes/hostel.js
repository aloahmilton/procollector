import express from 'express';
import { HostelBlock, Room } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize(['admin', 'manager', 'organization']));

// --- HOSTEL BLOCKS ---

router.get('/blocks', async (req, res) => {
    try {
        const blocks = await HostelBlock.findAll({
            where: { organizationId: req.user.organizationId },
            include: [{ model: Room, as: 'rooms' }]
        });
        res.json({ success: true, count: blocks.length, data: blocks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/blocks', async (req, res) => {
    try {
        const block = await HostelBlock.create({
            ...req.body,
            organizationId: req.user.organizationId
        });
        res.status(201).json({ success: true, data: block });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// --- ROOMS ---

router.post('/rooms', async (req, res) => {
    try {
        // Ensure block belongs to org
        const block = await HostelBlock.findOne({
            where: { id: req.body.hostelBlockId, organizationId: req.user.organizationId }
        });

        if (!block) {
            return res.status(404).json({ success: false, error: 'Hostel block not found' });
        }

        const room = await Room.create(req.body);
        res.status(201).json({ success: true, data: room });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

export default router;
