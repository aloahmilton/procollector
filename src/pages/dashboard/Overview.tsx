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
    FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

// Mock Data
const stats = [
    {
        title: 'Total Revenue',
        value: 'FCFA 45,231,000',
        change: '+20.1%',
        trend: 'up',
        icon: Wallet,
        color: 'text-brand-dark',
        bg: 'bg-brand-green'
    },
    {
        title: 'Active Agents',
        value: '124',
        change: '+12',
        trend: 'up',
        icon: Users,
        color: 'text-brand-dark',
        bg: 'bg-brand-green/20'
    },
    {
        title: 'Daily Collections',
        value: 'FCFA 2.4M',
        change: '+4.5%',
        trend: 'up',
        icon: CreditCard,
        color: 'text-brand-dark',
        bg: 'bg-brand-green/20'
    },
    {
        title: 'Anomalies',
        value: '3',
        change: '-25%',
        trend: 'down',
        icon: Activity,
        color: 'text-rose-600',
        bg: 'bg-rose-50'
    },
];

const recentTransactions = [
    { id: 'TX-1001', agent: 'Jean Dupont', client: 'Marché Central C3', amount: '15,000', status: 'Verified', time: '2 min ago' },
    { id: 'TX-1002', agent: 'Marie Kline', client: 'Boutique Alpha', amount: '5,000', status: 'Pending', time: '15 min ago' },
    { id: 'TX-1003', agent: 'Paul Biya II', client: 'Transport Union', amount: '50,000', status: 'Verified', time: '1 hr ago' },
    { id: 'TX-1004', agent: 'Sarah N', client: 'Kiosk 24', amount: '2,500', status: 'Rejected', time: '2 hrs ago' },
];

export function Overview() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">Overview</h2>
                    <p className="text-brand-dark/60 font-bold mt-1">Welcome back. Here's a snapshot of your collection ecosystem.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-white border-brand-dark/10 text-brand-dark font-black uppercase tracking-widest text-[10px]">
                        <Calendar className="mr-2 h-4 w-4" /> Dec 20, 2025
                    </Button>
                    <Button variant="secondary" size="sm" className="h-10">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-brand-dark/5 shadow-premium hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/50 backdrop-blur-sm group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                            <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2 rounded-xl transition-colors group-hover:scale-110 duration-300", stat.bg)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-black text-brand-dark tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] font-black mt-2 flex items-center gap-1 uppercase tracking-widest">
                                <span className={cn(
                                    "flex items-center py-0.5 px-2 rounded-full",
                                    stat.trend === 'up' ? "bg-brand-green text-brand-dark" : "bg-rose-100 text-rose-700"
                                )}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {stat.change}
                                </span>
                                <span className="text-brand-dark/30">vs last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Main Chart Area */}
                <Card className="lg:col-span-8 shadow-premium border-brand-dark/5 bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-brand-dark/5">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight text-brand-dark">Revenue Performance</CardTitle>
                            <CardDescription className="font-bold text-brand-dark/40 text-xs uppercase tracking-widest italic">Collection volume in real-time.</CardDescription>
                        </div>
                        <div className="flex bg-brand-dark/5 p-1 rounded-xl">
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white rounded-lg shadow-sm text-brand-dark">Daily</button>
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-dark/30 hover:text-brand-dark transition-colors">Weekly</button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 px-8">
                        <div className="h-[350px] w-full flex items-end justify-between gap-3">
                            {/* Visual Chart Mockup */}
                            {[30, 45, 35, 60, 50, 85, 45, 75, 55, 90, 65, 95].map((h, i) => (
                                <div key={i} className="group relative flex-1 flex flex-col items-center gap-3">
                                    <div
                                        className="w-full bg-brand-green/20 group-hover:bg-brand-green transition-all duration-300 rounded-t-xl group-hover:shadow-[0_0_20px_rgba(46,204,113,0.3)]"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}M
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Collections */}
                <Card className="lg:col-span-4 shadow-premium border-brand-dark/5 bg-white">
                    <CardHeader className="border-b border-brand-dark/5">
                        <CardTitle className="text-xl font-black uppercase tracking-tight text-brand-dark">Live Receipts</CardTitle>
                        <CardDescription className="font-bold text-brand-dark/40 text-xs uppercase tracking-widest italic">Recent incoming digital transactions.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {recentTransactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between group">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-dark/5 flex items-center justify-center font-black text-brand-dark group-hover:bg-brand-green transition-all duration-300 shadow-sm">
                                            {tx.agent.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-brand-dark leading-none mb-1 group-hover:text-brand-green transition-colors">{tx.agent}</p>
                                            <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">{tx.client}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-brand-dark tracking-tighter">+{tx.amount}</p>
                                        <span className={cn(
                                            "text-[9px] px-2 py-0.5 rounded-md uppercase font-black tracking-widest inline-block mt-1 shadow-sm",
                                            tx.status === 'Verified' && "bg-brand-green text-brand-dark",
                                            tx.status === 'Pending' && "bg-amber-100 text-amber-700",
                                            tx.status === 'Rejected' && "bg-rose-100 text-rose-700",
                                        )}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 pt-6 border-t border-brand-dark/5">
                            <Button variant="outline" className="w-full font-black uppercase tracking-widest text-[10px] h-12 border-brand-dark/10 text-brand-dark hover:bg-brand-dark hover:text-white transition-all">View Audit Trail</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Advanced Stats & Reconciliation */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden group">
                    <CardHeader className="bg-brand-dark/5 border-b border-brand-dark/5 px-8 pt-8 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Reconciliation Engine</CardTitle>
                            <TrendingUp className="h-6 w-6 text-brand-green" />
                        </div>
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 italic">Matching Collections vs Bank Deposits</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-brand-dark tracking-tighter italic">98.2%</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green">Match Accuracy</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-brand-dark tracking-tighter">FCFA 42.1M</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30">Cleared Today</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Field Collections', amount: 'FCFA 42.8M', icon: CheckCircle, color: 'text-brand-green' },
                                { label: 'Bank Settlements', amount: 'FCFA 42.1M', icon: CheckCircle, color: 'text-brand-green' },
                                { label: 'Uncleared (Pending)', amount: 'FCFA 700k', icon: AlertTriangle, color: 'text-amber-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-brand-dark/5 group-hover:bg-brand-dark/10 transition-colors">
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

                <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden">
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
                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">Next Payment: Jan 01</p>
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
                                <Button className="flex-1 h-14 bg-brand-dustGold text-brand-dark hover:bg-brand-green uppercase font-black tracking-widest text-[10px]">Upgrade Tier</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
