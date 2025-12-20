import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Users, CreditCard, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function OrgAdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'clients' | 'rules' | 'reports' | 'reconciliation'>('overview');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark uppercase">Organization Admin</h2>
                    <p className="text-brand-dark/50 mt-1 font-bold uppercase tracking-widest text-xs italic">Douala City Council • Total Revenue: FCFA 45.2M</p>
                </div>

                <div className="flex bg-brand-dark/5 p-1 rounded-2xl border border-brand-dark/5">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'collectors', label: 'Collectors' },
                        { id: 'clients', label: 'Clients' },
                        { id: 'rules', label: 'Rules' },
                        { id: 'reports', label: 'Reports' },
                        { id: 'reconciliation', label: 'Reconciliation' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
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

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <TrendingUp className="h-5 w-5 text-brand-green" />
                                    <span className="text-[10px] font-black text-brand-green bg-brand-green/10 px-2 py-1 rounded">+12%</span>
                                </div>
                                <div className="text-[10px] font-black text-brand-dark/50 uppercase">Total Revenue</div>
                                <div className="text-2xl font-black text-brand-dark italic mt-2">FCFA 45.2M</div>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <Users className="h-5 w-5 text-brand-green" />
                                    <span className="text-[10px] font-black text-brand-green bg-brand-green/10 px-2 py-1 rounded">+8</span>
                                </div>
                                <div className="text-[10px] font-black text-brand-dark/50 uppercase">Active Collectors</div>
                                <div className="text-2xl font-black text-brand-dark italic mt-2">124</div>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <CreditCard className="h-5 w-5 text-brand-green" />
                                    <span className="text-[10px] font-black text-brand-dark/50">Today</span>
                                </div>
                                <div className="text-[10px] font-black text-brand-dark/50 uppercase">Daily Collections</div>
                                <div className="text-2xl font-black text-brand-dark italic mt-2">FCFA 2.4M</div>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <AlertTriangle className="h-5 w-5 text-rose-500" />
                                    <span className="text-[10px] font-black text-rose-600">↑</span>
                                </div>
                                <div className="text-[10px] font-black text-brand-dark/50 uppercase">Anomalies</div>
                                <div className="text-2xl font-black text-brand-dark italic mt-2">3</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-black">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Button variant="secondary">Create Collector</Button>
                            <Button variant="outline">Register Client</Button>
                            <Button variant="outline">Set Collection Rules</Button>
                            <Button variant="outline">View Reports</Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* COLLECTORS TAB */}
            {activeTab === 'collectors' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black">Collector Management</h3>
                        <Button className="h-10">Add Collector</Button>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-brand-dark/60">Collector list with performance metrics, status, and zone assignments.</p>
                            <div className="mt-4 space-y-2">
                                {['Jean Dupont (Zone 1)', 'Marie Kline (Zone 2)', 'Sarah Ngono (Zone 1)'].map((c) => (
                                    <div key={c} className="p-3 bg-brand-dark/5 rounded flex justify-between items-center">
                                        <span className="font-black text-sm">{c}</span>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* CLIENTS TAB */}
            {activeTab === 'clients' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black">Client Management</h3>
                        <Button className="h-10">Register Client</Button>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-sm text-brand-dark/60">Register new clients, assign collectors, set exemptions, and manage balances.</p>
                            <div className="mt-4">
                                <p className="font-black text-sm">Total Clients: 2,450</p>
                                <p className="text-sm text-brand-dark/60 mt-1">Active: 2,100 | Inactive: 350</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* RULES TAB */}
            {activeTab === 'rules' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black">Collection Rules & Fees</h3>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Minimum Deposit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input type="number" placeholder="FCFA 5,000" className="p-3 border rounded w-full" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Fixed Monthly Fee</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input type="number" placeholder="FCFA 2,500" className="p-3 border rounded w-full" />
                            <p className="text-xs text-brand-dark/60 mt-2">Applied only to clients with balance ≥ minimum deposit</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Penalty Rule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input type="number" placeholder="FCFA 1,000" className="p-3 border rounded w-full" />
                            <p className="text-xs text-brand-dark/60 mt-2">Applied for missed payments after 30 days</p>
                        </CardContent>
                    </Card>

                    <Button className="w-full">Save Rules</Button>
                </div>
            )}

            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black">Reports & Analytics</h3>
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Reports</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">📊 Daily Collection Report</Button>
                            <Button variant="outline" className="w-full justify-start">📈 Weekly Summary</Button>
                            <Button variant="outline" className="w-full justify-start">📉 Monthly Financial Report</Button>
                            <Button variant="outline" className="w-full justify-start">👤 Collector Performance</Button>
                            <Button variant="outline" className="w-full justify-start">📋 Non-Paying Clients</Button>
                            <Button variant="outline" className="w-full justify-start">📊 Revenue Growth Analysis</Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* RECONCILIATION TAB */}
            {activeTab === 'reconciliation' && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black">Daily Reconciliation</h3>
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Reconciliation</CardTitle>
                            <CardDescription>Compare collected vs. deposited amounts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-brand-dark/5 rounded-xl">
                                    <div className="text-sm font-black text-brand-dark/50 uppercase">Total Collected</div>
                                    <div className="text-2xl font-black text-brand-dark mt-2">FCFA 2,450,000</div>
                                </div>
                                <div className="p-4 bg-brand-dark/5 rounded-xl">
                                    <div className="text-sm font-black text-brand-dark/50 uppercase">Total Deposited</div>
                                    <div className="text-2xl font-black text-brand-dark mt-2">FCFA 2,450,000</div>
                                </div>
                            </div>

                            <div className="p-4 bg-brand-green/10 border-2 border-brand-green rounded-xl">
                                <div className="text-sm font-black text-brand-green">✓ Reconciliation Complete</div>
                                <div className="text-xs text-brand-dark/60 mt-1">No discrepancies found</div>
                            </div>

                            <Button className="w-full">Flag Discrepancy</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default OrgAdminDashboard;
