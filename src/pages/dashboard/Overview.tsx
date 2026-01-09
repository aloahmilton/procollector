import React, { useState, useEffect } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Users,
    CreditCard,
    Wallet,
    Activity,
    Calendar,
    Filter,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    FileText,
    Loader2,
    RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const iconMap = {
    'Total Revenue': Wallet,
    'Active Agents': Users,
    'Daily Collections': CreditCard,
    'Anomalies': Activity
};

const recentTransactions = [
    { id: 'TX-1001', agent: 'Jean Dupont', client: 'Marché Central C3', amount: '15,000', status: 'Verified', time: '2 min ago' },
    { id: 'TX-1002', agent: 'Marie Kline', client: 'Boutique Alpha', amount: '5,000', status: 'Pending', time: '15 min ago' },
    { id: 'TX-1003', agent: 'Paul Biya II', client: 'Transport Union', amount: '50,000', status: 'Verified', time: '1 hr ago' },
    { id: 'TX-1004', agent: 'Sarah N', client: 'Kiosk 24', amount: '2,500', status: 'Rejected', time: '2 hrs ago' },
];

export function Overview() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();

        // Auto-refresh every 5 minutes
        const interval = setInterval(() => {
            fetchDashboardData(true);
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchDashboardData = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const token = localStorage.getItem('token');
            const response = await fetch('/api/v1/dashboard/overview', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();

            if (result.success) {
                setData(result.data);
                setError(null);
            } else {
                setError(result.error || 'Failed to load dashboard data');
            }
        } catch (err) {
            console.error('Dashboard fetch error:', err);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchDashboardData}>Retry</Button>
            </div>
        );
    }

    const stats = data?.stats || [];
    const recentTransactions = data?.recentTransactions || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">Overview</h2>
                    <p className="text-brand-dark/60 font-bold mt-1">Welcome back. Here's a snapshot of your collection ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-white border-brand-slate-200 text-brand-dark font-medium uppercase tracking-wide text-xs">
                        <Calendar className="mr-2 h-4 w-4" /> {new Date().toLocaleDateString()}
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-10"
                        onClick={() => fetchDashboardData(true)}
                        disabled={refreshing}
                    >
                        <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button variant="secondary" size="sm" className="h-10">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const IconComponent = iconMap[stat.title] || Activity;
                    return (
                        <Card key={stat.title} className="border border-brand-slate-200 shadow-sm bg-white">
                            <CardHeader className="p-4 pb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <CardTitle className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide">
                                        {stat.title}
                                    </CardTitle>
                                    <div className="p-2 rounded-lg bg-brand-slate-100">
                                        <IconComponent className="h-4 w-4 text-brand-slate-600" />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-brand-dark mb-2">{stat.value}</div>
                                <div className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                                    stat.trend === 'up' ? "bg-brand-slate-100 text-brand-slate-700" : "bg-rose-50 text-rose-700"
                                )}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {stat.change}
                                </div>
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Main Chart Area */}
                <Card className="lg:col-span-8 border border-brand-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-brand-slate-200 p-4">
                        <div>
                            <CardTitle className="text-lg font-semibold text-brand-dark">Revenue Performance</CardTitle>
                            <CardDescription className="text-xs text-brand-slate-500">Collection volume over time</CardDescription>
                        </div>
                        <div className="flex bg-brand-slate-100 p-1 rounded-lg">
                            <button className="px-3 py-1.5 text-xs font-medium bg-white rounded shadow-sm text-brand-dark">Daily</button>
                            <button className="px-3 py-1.5 text-xs font-medium text-brand-slate-600 hover:text-brand-dark transition-colors">Weekly</button>
                            <button className="px-3 py-1.5 text-xs font-medium text-brand-slate-600 hover:text-brand-dark transition-colors">Monthly</button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={[
                                    { month: 'Jan', revenue: 40000 },
                                    { month: 'Feb', revenue: 45000 },
                                    { month: 'Mar', revenue: 52000 },
                                    { month: 'Apr', revenue: 48000 },
                                    { month: 'May', revenue: 61000 },
                                    { month: 'Jun', revenue: 55000 },
                                    { month: 'Jul', revenue: 67000 },
                                    { month: 'Aug', revenue: 69000 },
                                    { month: 'Sep', revenue: 72000 },
                                    { month: 'Oct', revenue: 68000 },
                                    { month: 'Nov', revenue: 75000 },
                                    { month: 'Dec', revenue: 82000 }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '12px'
                                        }}
                                        formatter={(value) => [`FCFA ${value.toLocaleString()}`, 'Revenue']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#0f172a"
                                        strokeWidth={3}
                                        dot={{ fill: '#0f172a', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#0f172a', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Collections */}
                <Card className="lg:col-span-4 border border-brand-slate-200 shadow-sm bg-white">
                    <CardHeader className="border-b border-brand-slate-200">
                        <CardTitle className="text-lg font-semibold text-brand-dark">Recent Transactions</CardTitle>
                        <CardDescription className="text-xs text-brand-slate-500">Latest collection activities</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-4">
                            {recentTransactions.length > 0 ? recentTransactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-brand-slate-100 flex items-center justify-center font-medium text-brand-slate-600">
                                            {tx.agent.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-brand-dark">{tx.agent}</p>
                                            <p className="text-xs text-brand-slate-500">{tx.client}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-brand-dark">{tx.amount}</p>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded uppercase font-medium",
                                            tx.status === 'verified' && "bg-gray-100 text-gray-700",
                                            tx.status === 'pending' && "bg-amber-100 text-amber-800",
                                            tx.status === 'rejected' && "bg-rose-100 text-rose-700",
                                        )}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-brand-slate-500 text-center py-4">No recent transactions</p>
                            )}
                        </div>
                        {recentTransactions.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-brand-slate-200">
                                <Button variant="outline" className="w-full text-xs font-medium">
                                    View All Transactions
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Advanced Stats & Reconciliation */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border border-brand-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-brand-dark/5 border-b border-brand-dark/5 px-8 pt-8 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Reconciliation Engine</CardTitle>
                            <TrendingUp className="h-6 w-6 text-brand-slate-600" />
                        </div>
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 italic">Matching Collections vs Bank Deposits</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-brand-dark tracking-tighter italic">98.2%</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-slate-600">Match Accuracy</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-brand-dark tracking-tighter">FCFA 42.1M</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30">Cleared Today</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Field Collections', amount: 'FCFA 42.8M', icon: CheckCircle, color: 'text-brand-slate-600' },
                                { label: 'Bank Settlements', amount: 'FCFA 42.1M', icon: CheckCircle, color: 'text-brand-slate-600' },
                                { label: 'Uncleared (Pending)', amount: 'FCFA 700k', icon: AlertTriangle, color: 'text-amber-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("h-4 w-4", item.color)} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/60">{item.label}</span>
                                    </div>
                                    <span className="text-xs font-black text-brand-dark">{item.amount}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full h-14 uppercase font-black tracking-widest shadow-xl">Run Smart Reconciliation</Button>
                    </CardContent>
                </Card>

                <Card className="border border-brand-slate-200 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="bg-brand-dark text-white border-b border-brand-dark/5 px-8 pt-8 pb-4">
                        <CardTitle className="text-xl font-black uppercase tracking-tight italic">Billing & Yield</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Managed by Altonixa Group Ltd</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pb-4">
                        <div className="space-y-10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-2">Current Billing Model</p>
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 bg-brand-dustGold rounded-2xl flex items-center justify-center border-2 border-brand-dark/5">
                                        <FileText className="h-6 w-6 text-brand-dark" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black uppercase tracking-tight text-brand-dark italic">Enterprise SaaS</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-slate-600">Next Payment: Jan 01</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl border-2 border-brand-dark/5">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">Platform Fee</p>
                                    <p className="text-sm font-black text-brand-dark">FCFA 500k/mo</p>
                                </div>
                                <div className="p-4 rounded-2xl border-2 border-brand-dark/5">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">Usage Overage</p>
                                    <p className="text-sm font-black text-brand-dark">FCFA 0</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-brand-dark/5 flex gap-4">
                                <Button variant="outline" className="flex-1 h-14 uppercase font-black tracking-widest text-[10px] border-brand-dark/10">Invoices</Button>
                                <Button className="flex-1 h-14 bg-brand-dustGold text-brand-dark hover:bg-brand-slate-600 hover:text-white uppercase font-black tracking-widest text-[10px]">Upgrade Tier</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
