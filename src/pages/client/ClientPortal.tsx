import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download, AlertCircle, PiggyBank, User } from 'lucide-react';

type Payment = { id: string; amount: string; date: string; collector: string; status: 'Confirmed' | 'Pending'; method: string };

const mockPayments: Payment[] = [
    // This will be replaced with real data from API
    { id: 'Loading...', amount: 'Loading...', date: 'Loading...', collector: 'Loading...', status: 'Pending' as const, method: 'Loading...' },
];

export function ClientPortal() {
    const [tab, setTab] = useState<'overview' | 'history' | 'statements' | 'disputes'>('overview');
    const [disputes, setDisputes] = useState<{ id: string; issue: string; status: string }[]>([]);
    const [newDispute, setNewDispute] = useState('');

    const submitDispute = () => {
        if (!newDispute.trim()) return;
        setDisputes([
            { id: `D-${Date.now()}`, issue: newDispute, status: 'Open' },
            ...disputes
        ]);
        setNewDispute('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Withdrawal Modal */}
            {showWithdrawalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Request Withdrawal</h3>
                            <button onClick={() => setShowWithdrawalModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className="text-sm text-gray-700">Enter the amount you wish to withdraw.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (FCFA)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm"
                                    placeholder="e.g., 10000"
                                />
                            </div>
                            <Button onClick={handleWithdrawalRequest} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
                                Submit Request
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto p-4 lg:p-6">
                {/* Header */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-medium uppercase rounded">Live Portal</span>
                                <span className="text-xs font-medium text-gray-600 uppercase">ID: CLIENT-XXXX</span>
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                My Portfolio
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Access your real-time collection history, track pending deposits, and manage your organization billing.
                            </p>
                        </div>

                        {/* Balance Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[250px]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-gray-600 uppercase">Available Balance</p>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-xs font-medium text-gray-600">FCFA</span>
                                        <span className="text-2xl font-bold text-gray-900">Loading...</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="h-5 w-5 text-gray-600" />
                                </div>
                            </div>
                            <Button onClick={() => setShowWithdrawalModal(true)} className="w-full mt-3 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                                <PiggyBank className="h-3 w-3 mr-2" /> Withdrawal Request
                            </Button>
                        </div>

                        {/* Profile Button */}
                        <div className="flex items-center gap-3">
                            <Button onClick={() => setTab('profile')} variant="outline" className="h-10 px-4 text-sm">
                                <User className="h-4 w-4 mr-2" /> Profile
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Navigation Tabs */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex border-b border-gray-200">
                            {[
                                { id: 'overview', label: 'Overview' },
                                { id: 'history', label: 'Payments' },
                                { id: 'statements', label: 'Statements' },
                                { id: 'disputes', label: 'Disputes' },
                                { id: 'profile', label: 'Profile' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id as any)}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                        tab === t.id
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {/* OVERVIEW TAB */}
                        {tab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Card className="bg-white/80 border-none shadow-premium hover:shadow-2xl transition-all">
                                        <CardHeader>
                                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 italic">Target Insight</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-3xl font-black text-brand-dark tracking-tighter">Loading...</div>
                                            <div className="w-full bg-brand-dustGold h-2 rounded-full mt-4 overflow-hidden">
                                                <div className="bg-brand-slate-500 h-full w-[0%] rounded-full shadow-sm"></div>
                                            </div>
                                            <p className="text-[10px] font-black text-brand-dark/40 mt-3 uppercase">Loading Monthly Goal</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-brand-dark border-none shadow-premium text-white overflow-hidden relative">
                                        <div className="absolute right-[-20%] top-[-20%] w-40 h-40 bg-brand-slate-500/10 rounded-full blur-3xl"></div>
                                        <CardHeader>
                                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 italic">Next Payment Due</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="text-3xl font-black italic tracking-tighter text-brand-dustGold">Loading...</div>
                                            <p className="text-[10px] font-black text-white/40 uppercase leading-tight">Estimated Amount: Loading...</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className="bg-white/80 border-none shadow-premium">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="font-black italic text-xl uppercase tracking-tight">Recent Activity</CardTitle>
                                            <CardDescription className="text-[10px] font-black uppercase text-brand-dark/40">Real-time ledger entries</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-[10px] font-black uppercase text-brand-slate-600 hover:bg-brand-slate-100">View All</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {mockPayments.slice(0, 3).map((p) => (
                                                <div key={p.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-brand-dustGold/30 transition-all border border-transparent hover:border-brand-dark/5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-brand-slate-100 text-brand-dark flex items-center justify-center font-black text-xs italic">
                                                            ?
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-sm tracking-tight">{p.amount}</div>
                                                            <div className="text-[10px] font-black text-brand-dark/40 uppercase">{p.date} • {p.method}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black bg-white border border-brand-dark/5 text-brand-dark px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                                            {p.status}
                                                        </span>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* PAYMENT HISTORY TAB */}
                        {tab === 'history' && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="flex items-center justify-between bg-white/60 p-4 rounded-3xl backdrop-blur-sm border border-white">
                                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Transaction Ledger</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="text-[10px] font-black uppercase h-9">Filters</Button>
                                        <Button className="text-[10px] font-black uppercase h-9 px-6 bg-brand-dark">Export PDF</Button>
                                    </div>
                                </div>

                                <Card className="border-none shadow-premium overflow-hidden rounded-3xl bg-white/80">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-brand-dark text-white">
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Reference</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Value (FCFA)</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Collector</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic">Status</th>
                                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] italic text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-brand-dark/5">
                                                    {mockPayments.map((p) => (
                                                        <tr key={p.id} className="hover:bg-brand-slate-50 transition-colors group">
                                                            <td className="px-6 py-5">
                                                                <div className="text-xs font-black text-brand-dark">{p.id}</div>
                                                                <div className="text-[10px] font-black text-brand-dark/30 uppercase mt-0.5">{p.date}</div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="text-lg font-black text-brand-dark italic tracking-tighter">{p.amount}</div>
                                                                <div className="text-[10px] font-black text-brand-dark/40 uppercase">{p.method}</div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-6 w-6 rounded bg-brand-dustGold flex items-center justify-center font-black text-[10px] italic">XX</div>
                                                                    <span className="text-xs font-bold text-brand-dark/70">{p.collector}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span className="inline-flex items-center px-3 py-1 bg-brand-slate-100 text-brand-slate-700 text-[9px] font-black uppercase tracking-widest rounded-full border border-brand-slate-200 shadow-sm">
                                                                    {p.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-5 text-right">
                                                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-brand-dark hover:text-white rounded-xl transition-all">
                                                                    <Download className="h-5 w-5" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* STATEMENTS TAB */}
                        {tab === 'statements' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <div className="p-8 bg-white/80 rounded-[2rem] shadow-premium border-b-4 border-brand-slate-300 flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-slate-100 flex items-center justify-center mb-4">
                                            <CreditCard className="h-6 w-6 text-brand-slate-600" />
                                        </div>
                                        <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1">Opening</div>
                                        <div className="text-xl font-black text-brand-dark italic">Loading...</div>
                                    </div>
                                    <div className="p-8 bg-white/80 rounded-[2rem] shadow-premium border-b-4 border-brand-dark flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-dark/5 flex items-center justify-center mb-4">
                                            <Download className="h-6 w-6 text-brand-dark" />
                                        </div>
                                        <div className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-1">Total Paid</div>
                                        <div className="text-xl font-black text-brand-slate-600 italic">Loading...</div>
                                    </div>
                                    <div className="p-8 bg-brand-dark rounded-[2rem] shadow-premium flex flex-col items-center text-center">
                                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                            <PiggyBank className="h-6 w-6 text-brand-dustGold" />
                                        </div>
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Closing</div>
                                        <div className="text-xl font-black text-white italic tracking-tighter">Loading...</div>
                                    </div>
                                </div>

                                <Card className="border-none shadow-premium rounded-3xl bg-white/80 p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-brand-dark">Loading...</h3>
                                            <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest">Official Transaction Report</p>
                                        </div>
                                        <Button className="h-12 px-8 rounded-2xl font-black text-xs uppercase bg-brand-dark hover:bg-brand-dark/90 text-white italic tracking-tighter shadow-xl">
                                            Download Analysis PDF
                                        </Button>
                                    </div>

                                    <div className="p-6 bg-brand-dustGold/20 rounded-2xl border border-brand-dark/5">
                                        <p className="text-xs font-bold text-brand-dark/60 italic leading-relaxed">
                                            This statement summarizes all verified collections from <span className="text-brand-dark font-black">Loading...</span> to <span className="text-brand-dark font-black">Loading...</span>. Any discrepancies should be reported via the Disputes tab immediately.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* DISPUTES TAB */}
                        {tab === 'disputes' && (
                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-gray-900">Report a Conflict</h3>
                                                <p className="text-sm text-gray-600">
                                                    Submit a discrepancy report if a payment is missing or incorrectly recorded. Our audit team will investigate within 24 hours.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <textarea
                                                    placeholder="Describe the discrepancy (e.g., Reference PAY-002 shows FCFA 10,000 but I paid FCFA 12,000)..."
                                                    value={newDispute}
                                                    onChange={(e) => setNewDispute(e.target.value)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 text-sm"
                                                />
                                                <div className="flex gap-3">
                                                    <Button onClick={submitDispute} className="h-10 flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium">
                                                        Submit Report
                                                    </Button>
                                                    <Button variant="outline" onClick={() => setNewDispute('')} className="h-10 px-4 text-sm">
                                                        Clear
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-56 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3 items-center flex flex-col justify-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                                <AlertCircle className="h-6 w-6" />
                                            </div>
                                            <div className="text-xs font-medium uppercase text-gray-500">Conflict Hotline</div>
                                            <div className="text-base font-semibold text-gray-900">+237 600-000-000</div>
                                        </div>
                                    </div>
                                </div>

                                {disputes.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-900">Active Investigations</h4>
                                        <div className="space-y-3">
                                            {disputes.map((d) => (
                                                <div key={d.id} className="p-4 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors">
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                                            <AlertCircle className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-sm text-gray-900">{d.issue}</div>
                                                            <div className="text-xs text-gray-600 mt-1">Ticket: {d.id} • Status: <span className="text-orange-600 font-medium">{d.status}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PROFILE TAB */}
                        {tab === 'profile' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-900">My Profile Settings</h3>
                                <div className="bg-black text-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                disabled
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                            />
                                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div className="bg-green-900 p-4 rounded-lg mt-6">
                                            <p className="text-green-100 text-sm">Profile content loaded dynamically from the backend.</p>
                                        </div>
                                        <div className="flex gap-3 mt-6">
                                            <Button
                                                onClick={handleUpdateProfile}
                                                disabled={profileLoading}
                                                className="h-10 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium"
                                            >
                                                {profileLoading ? (
                                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                                ) : (
                                                    <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                                                )}
                                            </Button>
                                            <Button variant="outline" onClick={() => setShowWithdrawalModal(true)} className="h-10 px-4 text-sm font-medium border-gray-600 text-gray-300 hover:bg-gray-700">
                                                <PiggyBank className="w-4 h-4 mr-2" /> Request Withdrawal
                                            </Button>
                                        </div>
                                        {profileMessage && (
                                            <div className={`mt-4 p-3 rounded-lg border ${
                                                profileMessage.type === 'success'
                                                    ? 'bg-green-900 border-green-700 text-green-100'
                                                    : 'bg-red-900 border-red-700 text-red-100'
                                            }`}>
                                                {profileMessage.text}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                    {/* Footer Insight */}
                    <div className="flex flex-col items-center justify-center py-10 border-t border-gray-200 text-center gap-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wide italic"> Altonixa Ecosystem Security Layer </p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide"> 256-bit Encrypted Ledger • Immutable Verification </p>
                    </div>
            </div>
        </div>
    );
}

export default ClientPortal;
