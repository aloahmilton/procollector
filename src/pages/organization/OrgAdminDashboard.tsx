import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Users, CreditCard, AlertTriangle, Bus, Home, Package, Plus, X, Loader2, Save, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function OrgAdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'collectors' | 'clients' | 'rules' | 'reports' | 'reconciliation'>('overview');

    // Collector Management State
    const [collectors, setCollectors] = useState([]);
    const [isCreateCollectorOpen, setIsCreateCollectorOpen] = useState(false);
    const [editingCollector, setEditingCollector] = useState(null);
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

    // Fetch collectors
    useEffect(() => {
        if (activeTab === 'collectors') {
            fetchCollectors();
        }
    }, [activeTab]);

    const fetchCollectors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/v1/users/collectors', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            // Check if response is valid JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Failed to fetch collectors: Server returned non-JSON response', response.status);
                return;
            }
            
            const data = await response.json();
            if (data.success) {
                setCollectors(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch collectors:', error);
        }
    };

    const handleCreateCollector = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/v1/users/collectors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(collectorForm)
            });
            const data = await response.json();
            if (response.ok) {
                setIsCreateCollectorOpen(false);
                setCollectorForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
                fetchCollectors();
                alert('Collector created successfully!');
            } else {
                alert(data.error || 'Failed to create collector');
            }
        } catch (error) {
            console.error('Failed to create collector:', error);
            alert('Failed to create collector');
        } finally {
            setCreateLoading(false);
        }
    };

    const handleEditCollector = (collector) => {
        setEditingCollector(collector);
        setCollectorForm({
            name: collector.name,
            email: collector.email,
            phone: collector.phone,
            baseSalary: collector.baseSalary,
            commissionRate: collector.commissionRate
        });
    };

    const handleUpdateCollector = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/v1/users/collectors/${editingCollector.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(collectorForm)
            });
            const data = await response.json();
            if (response.ok) {
                setEditingCollector(null);
                setCollectorForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
                fetchCollectors();
                alert('Collector updated successfully!');
            } else {
                alert(data.error || 'Failed to update collector');
            }
        } catch (error) {
            console.error('Failed to update collector:', error);
            alert('Failed to update collector');
        }
    };

    const handleDeleteCollector = async (collectorId) => {
        if (!confirm('Are you sure you want to delete this collector?')) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/v1/users/collectors/${collectorId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchCollectors();
                alert('Collector deleted successfully!');
            } else {
                alert('Failed to delete collector');
            }
        } catch (error) {
            console.error('Failed to delete collector:', error);
            alert('Failed to delete collector');
        }
    };

    return (
        <div className="space-y-8 relative">
            {/* Create/Edit Collector Modal Overlay */}
            {(isCreateCollectorOpen || editingCollector) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingCollector ? 'Edit Collector' : 'Add New Collector'}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsCreateCollectorOpen(false);
                                    setEditingCollector(null);
                                    setCollectorForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={editingCollector ? handleUpdateCollector : handleCreateCollector} className="px-6 py-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                    placeholder="Enter full name"
                                    value={collectorForm.name}
                                    onChange={e => setCollectorForm({ ...collectorForm, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                    placeholder="collector@example.com"
                                    value={collectorForm.email}
                                    onChange={e => setCollectorForm({ ...collectorForm, email: e.target.value })}
                                    disabled={editingCollector}
                                />
                                {!editingCollector && <p className="text-xs text-gray-500 mt-1">Credentials will be sent here securely.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                    placeholder="Enter phone number"
                                    value={collectorForm.phone}
                                    onChange={e => setCollectorForm({ ...collectorForm, phone: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary (FCFA)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                        placeholder="150000"
                                        value={collectorForm.baseSalary}
                                        onChange={e => setCollectorForm({ ...collectorForm, baseSalary: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        max="100"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                        placeholder="2.5"
                                        value={collectorForm.commissionRate}
                                        onChange={e => setCollectorForm({ ...collectorForm, commissionRate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsCreateCollectorOpen(false);
                                        setEditingCollector(null);
                                        setCollectorForm({ name: '', email: '', phone: '', baseSalary: '', commissionRate: '' });
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createLoading}
                                    className="bg-gray-900 hover:bg-gray-800"
                                >
                                    {createLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            {editingCollector ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {editingCollector ? 'Update Collector' : 'Create Collector'}
                                        </>
                                    )}
                                </Button>
                            </div>
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
                    <div className="grid md:grid-cols-4 gap-3">
                        <Card className="border border-brand-slate-200 shadow-sm bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 rounded-lg bg-brand-slate-100">
                                        <TrendingUp className="h-4 w-4 text-brand-slate-600" />
                                    </div>
                                    <span className="text-xs font-medium text-brand-slate-700 bg-brand-slate-100 px-2 py-0.5 rounded">+12%</span>
                                </div>
                                <div className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide mb-1">Total Revenue</div>
                                <div className="text-xl font-bold text-brand-dark">FCFA 45.2M</div>
                            </CardContent>
                        </Card>

                        <Card className="border border-brand-slate-200 shadow-sm bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 rounded-lg bg-brand-slate-100">
                                        <Users className="h-4 w-4 text-brand-slate-600" />
                                    </div>
                                    <span className="text-xs font-medium text-brand-slate-700 bg-brand-slate-100 px-2 py-0.5 rounded">+8</span>
                                </div>
                                <div className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide mb-1">Active Collectors</div>
                                <div className="text-xl font-bold text-brand-dark">124</div>
                            </CardContent>
                        </Card>

                        <Card className="border border-brand-slate-200 shadow-sm bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 rounded-lg bg-brand-slate-100">
                                        <CreditCard className="h-4 w-4 text-brand-slate-600" />
                                    </div>
                                    <span className="text-xs text-brand-slate-500">Today</span>
                                </div>
                                <div className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide mb-1">Daily Collections</div>
                                <div className="text-xl font-bold text-brand-dark">FCFA 2.4M</div>
                            </CardContent>
                        </Card>

                        <Card className="border border-brand-slate-200 shadow-sm bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 rounded-lg bg-rose-100">
                                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                                    </div>
                                    <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded">↑</span>
                                </div>
                                <div className="text-xs font-medium text-brand-slate-600 uppercase tracking-wide mb-1">Anomalies</div>
                                <div className="text-xl font-bold text-brand-dark">3</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardHeader>
                                <CardTitle className="font-black">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => { setActiveTab('collectors'); setIsCreateCollectorOpen(true); }}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Collector
                                    </Button>
                                    <Button variant="outline" onClick={() => setActiveTab('clients')}>
                                        Register Client
                                    </Button>
                                    <Button variant="outline" onClick={() => setActiveTab('rules')}>
                                        Set Rules
                                    </Button>
                                    <Button variant="outline" onClick={() => setActiveTab('reports')}>
                                        View Reports
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-brand-dark/5 bg-white shadow-premium">
                            <CardHeader>
                                <CardTitle className="font-black">Service Modules</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">School & Institutional Management</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-3 gap-3">
                                <NavLink to="/organization/transport" className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                                        <Bus className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase text-center">Transport</span>
                                </NavLink>
                                <NavLink to="/organization/hostel" className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                                        <Home className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase text-center">Hostel</span>
                                </NavLink>
                                <NavLink to="/organization/inventory" className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200">
                                    <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                                        <Package className="h-5 w-5" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase text-center">Inventory</span>
                                </NavLink>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* COLLECTORS TAB */}
            {activeTab === 'collectors' && (
                <div className="space-y-4">
                    {editingCollector ? (
                        <div className="relative">
                            <Button
                                variant="outline"
                                className="mb-4"
                                onClick={() => setEditingCollector(null)}
                            >
                                <X className="w-4 h-4 mr-2" /> Back to Collectors
                            </Button>
                            <UserProfile userId={editingCollector.id} onProfileUpdated={() => {
                                fetchCollectors();
                                setEditingCollector(null);
                            }} />
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black">Collector Management</h3>
                                <Button className="h-10 gap-2 bg-gray-900 hover:bg-gray-800" onClick={() => setIsCreateCollectorOpen(true)}>
                                    <Plus className="h-4 w-4" /> Add Collector
                                </Button>
                            </div>

                            {/* Collectors List */}
                            <div className="space-y-3">
                                {collectors.length === 0 ? (
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <p className="text-gray-500">No collectors found. Create your first collector to get started.</p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    collectors.map((collector) => (
                                        <Card key={collector.id} className="border border-gray-200 shadow-sm">
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
                                                                {collector.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{collector.name}</h4>
                                                                <p className="text-sm text-gray-500">{collector.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-sm text-gray-600">Salary: FCFA {collector.baseSalary}</div>
                                                            <div className="text-sm text-gray-600">Commission: {collector.commissionRate}%</div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditCollector(collector)}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                                <span className="ml-2">Edit</span>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-red-600 border-red-200 hover:bg-red-50"
                                                                onClick={() => handleDeleteCollector(collector.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                                <span className="ml-2">Delete</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* CLIENTS TAB */}
            {activeTab === 'clients' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900">Client Management</h3>
                        <Button className="h-10 bg-gray-900 hover:bg-gray-800" onClick={() => setActiveTab('overview')}>
                            <Plus className="w-4 h-4 mr-2" />
                            Register Client
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Clients</p>
                                        <p className="text-2xl font-bold text-gray-900">2,450</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Active Clients</p>
                                        <p className="text-2xl font-bold text-green-600">2,100</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Inactive Clients</p>
                                        <p className="text-2xl font-bold text-gray-600">350</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <XCircle className="h-5 w-5 text-gray-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border border-gray-200 shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-lg font-semibold text-gray-900">Recent Client Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {[
                                    { name: 'ABC Company', action: 'Payment received', amount: 'FCFA 50,000', time: '2 hours ago' },
                                    { name: 'XYZ Store', action: 'Client registered', amount: '', time: '4 hours ago' },
                                    { name: 'Quick Mart', action: 'Balance updated', amount: 'FCFA 25,000', time: '1 day ago' }
                                ].map((activity, index) => (
                                    <div key={index} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">{activity.name}</p>
                                                <p className="text-sm text-gray-500">{activity.action} {activity.amount && `- ${activity.amount}`}</p>
                                            </div>
                                            <span className="text-xs text-gray-400">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
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
                        <Card className="border-gray-200 bg-gray-50">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-900">Global Transaction Fee</CardTitle>
                                <CardDescription>Fee applied to every client monthly unless overridden.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={transactionFee}
                                        onChange={(e) => setTransactionFee(e.target.value)}
                                        className="p-4 border border-gray-300 rounded-lg w-full text-2xl font-black text-brand-dark focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
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
                                <div className="text-sm font-medium text-gray-700">✓ Reconciliation Complete</div>
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
