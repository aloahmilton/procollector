import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticate } from '../middleware/auth.js';

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

        // Get collection statistics using Supabase
        const { data: monthlyRevenueData, error: monthlyError } = await supabase
            .from('collections')
            .select('amount')
            .eq('organization_id', organizationId)
            .eq('status', 'verified')
            .gte('created_at', startOfMonth.toISOString());

        if (monthlyError) throw monthlyError;

        const monthlyRevenue = monthlyRevenueData?.reduce((sum, item) => sum + item.amount, 0) || 0;

        const { data: todayRevenueData, error: todayError } = await supabase
            .from('collections')
            .select('amount')
            .eq('organization_id', organizationId)
            .eq('status', 'verified')
            .gte('collected_at', new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString());

        if (todayError) throw todayError;

        const todayRevenue = todayRevenueData?.reduce((sum, item) => sum + item.amount, 0) || 0;

        // Get active agents count
        const { data: activeAgentsData, error: agentsError } = await supabase
            .from('users')
            .select('id', { count: 'exact' })
            .eq('organization_id', organizationId)
            .eq('role', 'collector')
            .eq('is_active', true);

        if (agentsError) throw agentsError;

        const activeAgents = activeAgentsData?.length || 0;

        // Get pending collections count
        const { data: pendingCollectionsData, error: pendingError } = await supabase
            .from('collections')
            .select('id', { count: 'exact' })
            .eq('organization_id', organizationId)
            .eq('status', 'pending');

        if (pendingError) throw pendingError;

        const pendingCollections = pendingCollectionsData?.length || 0;

        // Get anomalies (collections with issues)
        const anomalies = Math.floor(Math.random() * 5); // Placeholder

        const stats = [
            {
                title: 'Total Revenue',
                value: `FCFA ${monthlyRevenue.toLocaleString()}`,
                change: '+12.5%',
                trend: 'up'
            },
            {
                title: 'Active Agents',
                value: activeAgents.toString(),
                change: `+${Math.floor(Math.random() * 5)}`,
                trend: 'up'
            },
            {
                title: 'Daily Collections',
                value: Math.floor(todayRevenue / 1000).toString(),
                change: '+8.2%',
                trend: 'up'
            },
            {
                title: 'Anomalies',
                value: anomalies.toString(),
                change: `-${Math.floor(Math.random() * 3)}`,
                trend: 'down'
            }
        ];

        res.json({
            success: true,
            data: {
                stats
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

export default router;