import { useState } from 'react';
import { Building2, Plus, Globe, CheckCircle2, CreditCard, Settings } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

const mockOrgs = [
    { id: '1', name: 'Douala City Council', subdomain: 'douala-council', type: 'Government', agents: 45, status: 'Active', revenue: 'FCFA 120M' },
    { id: '2', name: 'Commercial Bank of Africa', subdomain: 'cba-collections', type: 'Bank', agents: 120, status: 'Active', revenue: 'FCFA 450M' },
    { id: '3', name: 'Transport Syndicat Nord', subdomain: 'trans-nord', type: 'Union', agents: 15, status: 'Suspended', revenue: 'FCFA 5M' },
    { id: '4', name: 'Elite Property Management', subdomain: 'elitemgt', type: 'Business', agents: 8, status: 'Active', revenue: 'FCFA 25M' },
];

export function Organizations() {
    const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'billing' | 'settings'>('overview');

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-brand-dark uppercase">Organizations</h2>
                    <p className="text-brand-dark/60 mt-1 font-bold">Manage tenant portals and organization-level configurations.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-brand-dark/5 p-1 rounded-2xl border border-brand-dark/5">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'collectors', label: 'Collectors' },
                            { id: 'billing', label: 'Billing' },
                            { id: 'settings', label: 'Settings' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    activeTab === tab.id ? "bg-brand-dark text-white shadow-lg" : "text-brand-dark/40 hover:text-brand-dark"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <Button variant="secondary" className="shadow-lg shadow-black/10">
                        <Plus className="mr-2 h-4 w-4" /> Create Portal
                    </Button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid gap-6">
                    {mockOrgs.map((org) => (
                        <Card key={org.id} className="overflow-hidden hover:border-brand-green border-brand-dark/5 transition-all group bg-white/50 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row">
                                <div className="bg-brand-dark/5 w-full md:w-48 flex items-center justify-center p-8 border-r border-brand-dark/5 group-hover:bg-brand-green/20 transition-colors">
                                    <Building2 className="h-10 w-10 text-brand-dark/20 group-hover:text-brand-dark transition-colors" />
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-black text-brand-dark tracking-tight">{org.name}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${org.status === 'Active' ? 'bg-brand-green text-brand-dark' : 'bg-rose-500 text-white'
                                                    }`}>
                                                    {org.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-brand-dark/50 mt-1 font-bold">
                                                <Globe className="h-3 w-3" /> {org.subdomain}.procollector.com
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="h-9 px-4 border-brand-dark/20 text-brand-dark hover:bg-brand-dark hover:text-white transition-all">Settings</Button>
                                            <Button variant="outline" size="sm" className="h-9 px-4 border-brand-green text-brand-dark bg-brand-green/20 hover:bg-brand-green transition-all">Launch Portal</Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-brand-dark/5">
                                        <div>
                                            <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Entity Type</p>
                                            <p className="text-sm font-black text-brand-dark italic">{org.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Agents</p>
                                            <p className="text-sm font-black text-brand-dark">{org.agents}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Total Revenue</p>
                                            <p className="text-sm font-black text-brand-green">{org.revenue}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">Compliance</p>
                                            <div className="flex items-center gap-1 text-sm font-black text-brand-dark">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" /> Verified
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === 'collectors' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black uppercase tracking-tight">Top Collectors</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-9">Export</Button>
                            <Button className="h-9">Manage Collectors</Button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {mockOrgs.flatMap(o => Array.from({ length: Math.min(3, Math.max(1, Math.floor(o.agents / 20))) }).map((_, i) => ({
                            id: `${o.id}-c${i}`,
                            name: `Agent ${i + 1} - ${o.name.split(' ')[0]}`,
                            org: o.name,
                            collected: `FCFA ${Math.floor(Math.random() * 200000)}`
                        }))).map((c) => (
                            <Card key={c.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black text-brand-dark uppercase">{c.name}</div>
                                    <div className="text-[10px] font-bold text-brand-dark/50">{c.org}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-brand-green italic">{c.collected}</div>
                                    <div className="text-[10px] font-black text-brand-dark/40">Today</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="grid md:grid-cols-3 gap-6">
                    {mockOrgs.map((org) => (
                        <Card key={org.id} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-brand-dark/5 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-brand-dark" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black uppercase">{org.name}</div>
                                        <div className="text-[10px] font-bold text-brand-dark/50">Plan: {org.status === 'Active' ? 'Enterprise' : 'Standard'}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-black text-brand-dark italic">{org.revenue}</div>
                                    <div className="text-[10px] font-black text-brand-dark/40">Last: Dec 18, 2025</div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">Manage Billing</Button>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black uppercase tracking-tight">Platform Settings</h3>
                        <Button variant="outline" size="sm" className="h-9"><Settings className="mr-2 h-4 w-4" />Global Settings</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <div className="text-sm font-black uppercase">Default Currency</div>
                            <div className="text-lg font-black mt-2">FCFA</div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-sm font-black uppercase">Timezone</div>
                            <div className="text-lg font-black mt-2">Africa/Douala</div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
