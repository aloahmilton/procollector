import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Users, CreditCard, AlertTriangle, Bus, Home, Package, Plus, X, Loader2, Save } from 'lucide-react';
import { cn } from '../../lib/utils';
// uuidv4 removed

export function OrgAdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'clients' | 'rules' | 'reports' | 'reconciliation'>('overview');

    // Collector Creation State
    const [isCreateCollectorOpen, setIsCreateCollectorOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [collectorForm, setCollectorForm] = useState({
        name: '',
        email: '',
        phone: '',
        baseSalary: '',
        commissionRate: ''
    });

    // Rules State
    const [transactionFee, setTransactionFee] = useState('100');

    const handleCreateCollector = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);
        // Simulate API call to /api/v1/users/collectors
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Creating collector:", collectorForm);
            alert("Collector created! Access credentials sent to " + collectorForm.email);
            setIsCreateCollectorOpen(false);
            setCollectorForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
        } catch (error) {
            console.error("Failed to create collector:", error);
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="space-y-8 relative">
            {/* Create Collector Modal Overlay */}
            {isCreateCollectorOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-brand-dark p-6 flex justify-between items-center text-white">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight italic">New Collector</h3>
                                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Add to Organization Staff</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsCreateCollectorOpen(false)} className="text-white hover:bg-white/10 rounded-xl">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <form onSubmit={handleCreateCollector} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Full Name</label>
                                        <input
                                            required
                                            className="w-full bg-brand-light border-none rounded-xl p-3 text-sm font-bold text-brand-dark focus:ring-2 focus:ring-brand-green/20 outline-none"
                                            placeholder="Jean Dupont"
                                            value={collectorForm.name}
                                            onChange={e => setCollectorForm({ ...collectorForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Details</label>
                                        <input
                                            required
                                            className="w-full bg-brand-light border-none rounded-xl p-3 text-sm font-bold text-brand-dark focus:ring-2 focus:ring-brand-green/20 outline-none"
                                            placeholder="Phone Number"
                                            value={collectorForm.phone}
                                            onChange={e => setCollectorForm({ ...collectorForm, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-brand-light border-none rounded-xl p-3 text-sm font-bold text-brand-dark focus:ring-2 focus:ring-brand-green/20 outline-none"
                                        placeholder="collector@example.com"
                                        value={collectorForm.email}
                                        onChange={e => setCollectorForm({ ...collectorForm, email: e.target.value })}
                                    />
                                    <p className="text-[10px] text-brand-dark/40 italic">Credentials will be sent here securely.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-green">Base Salary (FCFA)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full bg-brand-green/5 border border-brand-green/20 rounded-xl p-3 text-lg font-black text-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none"
                                            placeholder="150000"
                                            value={collectorForm.baseSalary}
                                            onChange={e => setCollectorForm({ ...collectorForm, baseSalary: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dustGold">Commission (%)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            max="100"
                                            className="w-full bg-brand-dustGold/10 border border-brand-dustGold/30 rounded-xl p-3 text-lg font-black text-brand-dustGold focus:ring-2 focus:ring-brand-dustGold/20 outline-none"
                                            placeholder="2.5"
                                            value={collectorForm.commissionRate}
                                            onChange={e => setCollectorForm({ ...collectorForm, commissionRate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" disabled={createLoading} className="w-full h-12 text-sm font-black uppercase tracking-widest rounded-xl bg-brand-dark hover:bg-brand-dark/90 text-white shadow-xl">
                                {createLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Create & Send Credentials'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}

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

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardHeader>
                                <CardTitle className="font-black">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Button variant="secondary" className="rounded-xl" onClick={() => { setActiveTab('collectors'); setIsCreateCollectorOpen(true); }}>Create Collector</Button>
                                <Button variant="outline" className="rounded-xl">Register Client</Button>
                                <Button variant="outline" className="rounded-xl">Set Rules</Button>
                                <Button variant="outline" className="rounded-xl">View Reports</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardHeader>
                                <CardTitle className="font-black">Service Modules</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">School & Institutional Management</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-3">
                                <NavLink to="/organization/transport" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-brand-dustGold/10 hover:bg-brand-dark hover:text-white transition-all group">
                                    <div className="h-10 w-10 rounded-xl bg-brand-dark text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-colors">
                                        <Bus className="h-5 w-5" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-center">Transport</span>
                                </NavLink>
                                <NavLink to="/organization/hostel" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-brand-dustGold/10 hover:bg-brand-dark hover:text-white transition-all group">
                                    <div className="h-10 w-10 rounded-xl bg-brand-dark text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-colors">
                                        <Home className="h-5 w-5" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-center">Hostel</span>
                                </NavLink>
                                <NavLink to="/organization/inventory" className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-brand-dustGold/10 hover:bg-brand-dark hover:text-white transition-all group">
                                    <div className="h-10 w-10 rounded-xl bg-brand-dark text-white flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-colors">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-center">Inventory</span>
                                </NavLink>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* COLLECTORS TAB */}
            {activeTab === 'collectors' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black">Collector Management</h3>
                        <Button className="h-10 gap-2 bg-brand-green text-brand-dark hover:bg-brand-green/90" onClick={() => setIsCreateCollectorOpen(true)}>
                            <Plus className="h-4 w-4" /> Add Collector
                        </Button>
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
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black">Collection Rules & Fees</h3>
                        <Button variant="outline" className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-brand-green/20 bg-brand-green/5">
                            <CardHeader>
                                <CardTitle className="text-lg text-brand-green">Global Transaction Fee</CardTitle>
                                <CardDescription>Fee applied to every client monthly unless overridden.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={transactionFee}
                                        onChange={(e) => setTransactionFee(e.target.value)}
                                        className="p-4 border-2 border-brand-green/20 rounded-xl w-full text-2xl font-black text-brand-dark focus:ring-4 focus:ring-brand-green/10 outline-none"
                                    />
                                    <span className="font-black text-lg text-brand-dark/50">FCFA</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Minimum Deposit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <input type="number" placeholder="5000" className="p-3 border rounded-xl w-full" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Penalty Rule</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <input type="number" placeholder="1000" className="p-3 border rounded-xl w-full" />
                                <p className="text-xs text-brand-dark/60 mt-2">Applied for missed payments after 30 days</p>
                            </CardContent>
                        </Card>
                    </div>
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
