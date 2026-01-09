import express from 'express';
import { Organization, User, Client, Collection } from '../models/index.js';
import { authenticate } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/dashboard/overview
 * @desc    Get main dashboard overview data
 * @access  Private
 */
router.get('/overview', async (req, res) => {
    try {
        const organizationId = req.organizationId;
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Get collection statistics
        const [monthlyRevenue, todayRevenue, activeAgents, pendingCollections] = await Promise.all([
            Collection.sum('amount', {
                where: { organizationId, status: 'verified', createdAt: { [Op.gte]: startOfMonth } }
            }),
            Collection.sum('amount', {
                where: {
                    organizationId,
                    status: 'verified',
                    createdAt: { [Op.gte]: new Date(today.getFullYear(), today.getMonth(), today.getDate()) }
                }
            }),
            User.count({
                where: { organizationId, role: 'collector', status: 'active' }
            }),
            Collection.count({
                where: { organizationId, status: 'pending' }
            })
        ]);

        // Calculate success rate (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const [totalRecent, verifiedRecent] = await Promise.all([
            Collection.count({
                where: { organizationId, createdAt: { [Op.gte]: thirtyDaysAgo } }
            }),
            Collection.count({
                where: { organizationId, createdAt: { [Op.gte]: thirtyDaysAgo }, status: 'verified' }
            })
        ]);

        const successRate = totalRecent > 0 ? ((verifiedRecent / totalRecent) * 100).toFixed(1) : '0';

        // Recent transactions
        const recentTransactions = await Collection.findAll({
            where: { organizationId },
            limit: 4,
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, as: 'collector', attributes: ['name'] },
                { model: Client, as: 'client', attributes: ['fullName'] }
            ]
        });

        res.json({
            success: true,
            data: {
                stats: [
                    {
                        title: 'Total Revenue',
                        value: `FCFA ${(monthlyRevenue || 0).toLocaleString()}`,
                        change: '+12.5%',
                        trend: 'up'
                    },
                    {
                        title: 'Active Agents',
                        value: activeAgents.toString(),
                        change: '+2',
                        trend: 'up'
                    },
                    {
                        title: 'Daily Collections',
                        value: `FCFA ${(todayRevenue || 0).toLocaleString()}`,
                        change: '+8.2%',
                        trend: 'up'
                    },
                    {
                        title: 'Anomalies',
                        value: pendingCollections.toString(),
                        change: '-25%',
                        trend: 'down'
                    }
                ],
                recentTransactions: recentTransactions.map(tx => ({
                    id: tx.id,
                    agent: tx.collector?.name || 'Unknown',
                    client: tx.client?.fullName || 'Unknown Client',
                    amount: `FCFA ${tx.amount.toLocaleString()}`,
                    status: tx.status,
                    time: tx.createdAt.toISOString()
                }))
            }
        });
    } catch (error) {
        console.error('Dashboard overview error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch dashboard data'
        });
    }
});

/**
 * @route   GET /api/v1/dashboard/admin
 * @desc    Get admin dashboard data
 * @access  Private (Admin only)
 */
router.get('/admin', async (req, res) => {
    try {
        // System-wide statistics for admin
        const [totalOrganizations, totalUsers, totalCollections, systemHealth] = await Promise.all([
            Organization.count(),
            User.count(),
            Collection.sum('amount', { where: { status: 'verified' } }),
            Promise.resolve('Normal') // Mock system health
        ]);

        // Recent system activity (mock data for now)
        const recentActivity = [
            { id: 1, action: 'New organization registered', time: '2 minutes ago', user: 'System' },
            { id: 2, action: 'Security update applied', time: '1 hour ago', user: 'Admin' },
            { id: 3, action: 'Bulk data sync completed', time: '3 hours ago', user: 'System' }
        ];

        res.json({
            success: true,
            data: {
                stats: [
                    { label: 'Total Organizations', value: totalOrganizations.toString(), change: '+15%', trend: 'up' },
                    { label: 'Total Users', value: totalUsers.toString(), change: '+8%', trend: 'up' },
                    { label: 'System Collections', value: `FCFA ${(totalCollections || 0).toLocaleString()}`, change: '+12%', trend: 'up' },
                    { label: 'System Health', value: systemHealth, change: 'Stable', trend: 'up' }
                ],
                recentActivity
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch admin dashboard data'
        });
    }
});

/**
 * @route   GET /api/v1/dashboard/collector
 * @desc    Get collector dashboard data
 * @access  Private (Collector only)
 */
router.get('/collector', async (req, res) => {
    try {
        const collectorId = req.user.id;
        const organizationId = req.organizationId;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Collector's personal stats
        const [todayCollections, monthlyCollections, clientCount, successRate] = await Promise.all([
            Collection.sum('amount', {
                where: { collectorId, status: 'verified', createdAt: { [Op.gte]: startOfDay } }
            }),
            Collection.sum('amount', {
                where: { collectorId, status: 'verified', createdAt: { [Op.gte]: new Date(today.getFullYear(), today.getMonth(), 1) } }
            }),
            Client.count({
                where: { organizationId, assignedCollectorId: collectorId }
            }),
            Collection.findAll({
                where: { collectorId, createdAt: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
                attributes: ['status']
            }).then(collections => {
                const total = collections.length;
                const verified = collections.filter(c => c.status === 'verified').length;
                return total > 0 ? `${((verified / total) * 100).toFixed(1)}%` : '0%';
            })
        ]);

        // Today's schedule
        const todaySchedule = await Collection.findAll({
            where: {
                collectorId,
                status: 'pending',
                createdAt: { [Op.gte]: startOfDay }
            },
            limit: 3,
            include: [{ model: Client, as: 'client', attributes: ['fullName', 'address'] }],
            order: [['createdAt', 'ASC']]
        });

        res.json({
            success: true,
            data: {
                stats: [
                    { label: "Today's Collections", value: `FCFA ${(todayCollections || 0).toLocaleString()}`, change: '+$350', trend: 'up' },
                    { label: 'Total Clients', value: clientCount.toString(), change: '+2', trend: 'up' },
                    { label: 'Success Rate', value: successRate, change: '+0.5%', trend: 'up' },
                    { label: 'Pending Collections', value: todaySchedule.length.toString(), change: '-2', trend: 'down' }
                ],
                schedule: todaySchedule.map(item => ({
                    id: item.id,
                    client: item.client?.fullName || 'Unknown Client',
                    amount: `FCFA ${item.amount.toLocaleString()}`,
                    address: item.client?.address || 'No address',
                    time: item.createdAt.toTimeString().slice(0, 5)
                }))
            }
        });
    } catch (error) {
        console.error('Collector dashboard error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch collector dashboard data'
        });
    }
});

export default router;