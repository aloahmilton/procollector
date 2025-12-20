import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Building2, Activity, Globe, Plus, Shield, CreditCard, Search, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export function GlobalOverview() {
    const [activeTab, setActiveTab] = useState<'overview' | 'orgs' | 'billing'>('overview');

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">System Admin</h2>
                    <p className="text-brand-dark/50 mt-1 font-bold uppercase tracking-widest text-xs italic">Altonixa Global Infrastructure Management</p>
                </div>

                <div className="flex bg-brand-dark/5 p-1 rounded-2xl border border-brand-dark/5">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'orgs', label: 'Organizations' },
                        { id: 'billing', label: 'Billing' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                activeTab === tab.id
                                    ? "bg-brand-dark text-white shadow-lg"
                                    : "text-brand-dark/40 hover:text-brand-dark"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="border-brand-dark/5 bg-white shadow-premium hover:scale-[1.02] transition-transform group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                                <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Active Organizations</CardTitle>
                                <Building2 className="h-5 w-5 text-brand-green group-hover:scale-125 transition-transform" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-2xl font-black text-brand-dark tracking-tighter">42</div>
                                <p className="text-[10px] font-black text-brand-green uppercase tracking-widest mt-1">+3 this month</p>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium hover:scale-[1.02] transition-transform group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                                <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">System Load</CardTitle>
                                <Activity className="h-5 w-5 text-indigo-500 group-hover:scale-125 transition-transform" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-2xl font-black text-brand-dark tracking-tighter">Normal</div>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">LATENCY: 42ms</p>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium hover:scale-[1.02] transition-transform group">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                                <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Global Volume</CardTitle>
                                <Globe className="h-5 w-5 text-amber-500 group-hover:scale-125 transition-transform" />
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-2xl font-black text-brand-dark tracking-tighter italic">FCFA 1.2B</div>
                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Total platform revenue</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden">
                        <CardHeader className="border-b border-brand-dark/5 bg-brand-dark/5 px-8 py-6">
                            <CardTitle className="font-black uppercase tracking-tight text-brand-dark italic">Platform Audit Log</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase tracking-widest text-brand-dark/40">Real-time system health and organization activity</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-brand-dark/5">
                                {[
                                    { event: 'New Organization Registered', detail: 'Douala City Council', time: '12 min ago' },
                                    { event: 'Security Update Applied', detail: 'v2.4.1 Encryption Patch', time: '1 hr ago' },
                                    { event: 'Bulk Agent Sync', detail: 'Central Bank Union', time: '3 hrs ago' },
                                ].map((log, i) => (
                                    <div key={i} className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-brand-dark/5 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-brand-dark/10 rounded-xl flex items-center justify-center font-black group-hover:bg-brand-green group-hover:text-brand-dark transition-colors">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{log.event}</p>
                                                <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">{log.detail}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest italic">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'orgs' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-brand-dark/5 shadow-premium">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/30" />
                            <input
                                type="text"
                                placeholder="Search institutions..."
                                className="w-full pl-12 pr-6 py-3 bg-brand-dark/5 border-none rounded-2xl text-xs font-black uppercase tracking-widest placeholder:opacity-30 focus:ring-4 focus:ring-brand-green/20"
                            />
                        </div>
                        <Button className="ml-4 h-12 px-8 rounded-2xl shadow-xl shadow-brand-green/20">
                            <Plus className="mr-2 h-4 w-4" /> Add Institution
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { name: 'Douala City Council', type: 'COUNCIL', agents: 156, status: 'Active', plan: 'Enterprise' },
                            { name: 'National Teachers Union', variant: 'blue', type: 'UNION', agents: 42, status: 'Active', plan: 'Standard' },
                            { name: 'Eco Bank Cameroon', variant: 'green', type: 'BANK', agents: 89, status: 'Pending', plan: 'Gold' },
                        ].map((org, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] border border-brand-dark/5 shadow-premium flex items-center justify-between hover:border-brand-green transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-brand-dustGold rounded-[1.5rem] flex items-center justify-center border-2 border-brand-dark/5 group-hover:bg-brand-green transition-colors">
                                        <Shield className="h-8 w-8 text-brand-dark" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black uppercase tracking-tight text-brand-dark">{org.name}</h4>
                                        <div className="flex gap-4">
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-brand-dark/5 px-2 py-0.5 rounded text-brand-dark/60">{org.type}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-brand-green">{org.agents} Active Collectors</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">Billing Plan</p>
                                        <p className="text-sm font-black text-brand-dark italic">{org.plan}</p>
                                    </div>
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        org.status === 'Active' ? "bg-brand-green text-brand-dark" : "bg-brand-dark/5 text-brand-dark/40"
                                    )}>
                                        {org.status}
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-brand-dark/5">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Standard Plan', price: 'FCFA 250,000', per: 'month', features: ['Up to 50 Agents', 'Basic Analytics', 'Email Support'] },
                            { title: 'Enterprise Plan', price: 'FCFA 750,000', per: 'month', features: ['Unlimited Agents', 'Real-time GPS', 'Audit APIs'], highlight: true },
                            { title: 'Revenue Share', price: '2.5%', per: 'transaction', features: ['Zero recurring', 'Full Features', '24/7 Priority'] },
                        ].map((plan, i) => (
                            <Card key={i} className={cn(
                                "border-2 overflow-hidden shadow-premium flex flex-col justify-between",
                                plan.highlight ? "border-brand-green bg-brand-green/5" : "border-brand-dark/5 bg-white"
                            )}>
                                <div className="p-8 space-y-6">
                                    {plan.highlight && <div className="text-brand-green font-black text-[9px] uppercase tracking-[0.3em] mb-4 text-center">Most Popular</div>}
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-dark text-center italic">{plan.title}</h3>
                                    <div className="text-center">
                                        <span className="text-3xl font-black text-brand-dark italic">{plan.price}</span>
                                        <span className="text-[10px] uppercase font-black text-brand-dark/30 ml-2">/ {plan.per}</span>
                                    </div>
                                    <div className="space-y-3 pt-6">
                                        {plan.features.map((f, j) => (
                                            <div key={j} className="flex items-center gap-3 text-[10px] font-bold text-brand-dark/60 uppercase">
                                                <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 bg-brand-dark/5 border-t border-brand-dark/5">
                                    <Button variant={plan.highlight ? "secondary" : "outline"} className="w-full font-black uppercase tracking-widest text-[10px]">Configure Plan</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-brand-dark/5 bg-white shadow-premium">
                        <CardHeader className="border-b border-brand-dark/5 px-8 pt-8 pb-4">
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Platform Revenue Feed</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-brand-dark/5">
                                {[
                                    { org: 'Douala City Council', amount: 'FCFA 750,000', type: 'Subscription', date: 'Dec 20, 2025' },
                                    { org: 'National Teachers Union', amount: 'FCFA 250,000', type: 'Subscription', date: 'Dec 18, 2025' },
                                    { org: 'Bank of Central Africa', amount: 'FCFA 124,500', type: 'Usage Fee', date: 'Dec 18, 2025' },
                                ].map((item, i) => (
                                    <div key={i} className="px-8 py-5 flex items-center justify-between group hover:bg-brand-dark/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                                                <CreditCard className="h-5 w-5 text-brand-dark" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{item.org}</p>
                                                <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">{item.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-brand-dark italic">{item.amount}</p>
                                            <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
