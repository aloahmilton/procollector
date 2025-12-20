import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download, AlertCircle } from 'lucide-react';

type Payment = { id: string; amount: string; date: string; collector: string; status: 'Confirmed' | 'Pending'; method: string };

const mockPayments: Payment[] = [
    { id: 'PAY-001', amount: 'FCFA 15,000', date: '2025-12-20', collector: 'Jean Dupont', status: 'Confirmed', method: 'Mobile Money' },
    { id: 'PAY-002', amount: 'FCFA 10,000', date: '2025-12-18', collector: 'Marie Kline', status: 'Confirmed', method: 'Cash' },
    { id: 'PAY-003', amount: 'FCFA 7,500', date: '2025-12-15', collector: 'Jean Dupont', status: 'Confirmed', method: 'Bank Transfer' },
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
        <div className="min-h-screen bg-brand-dustGold p-4 md:p-8 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">My Account</h1>
                        <p className="text-sm text-brand-dark/60 mt-1">Verified Client Portal</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow">
                        <div className="h-12 w-12 rounded-xl bg-brand-green/20 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-brand-dark" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-brand-dark/50 uppercase">Current Balance</div>
                            <div className="text-2xl font-black text-brand-dark italic">FCFA 25,000</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 bg-white p-3 rounded-2xl shadow">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'history', label: 'Payments' },
                        { id: 'statements', label: 'Statements' },
                        { id: 'disputes', label: 'Disputes' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as any)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                tab === t.id
                                    ? 'bg-brand-dark text-white shadow'
                                    : 'text-brand-dark/40 hover:text-brand-dark'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW TAB */}
                {tab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-black">Assigned Collector</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="text-xl font-black text-brand-dark">Jean Dupont</div>
                                    <div className="text-xs text-brand-dark/60">Agent ID: 4421 • Zone: Douala</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-black">Last Payment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="text-xl font-black text-brand-green">FCFA 15,000</div>
                                    <div className="text-xs text-brand-dark/60">Dec 20, 2025 • Mobile Money</div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="font-black">Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockPayments.slice(0, 3).map((p) => (
                                        <div key={p.id} className="flex items-center justify-between pb-3 border-b border-brand-dark/5 last:border-b-0">
                                            <div>
                                                <div className="font-black text-sm">{p.amount}</div>
                                                <div className="text-xs text-brand-dark/50">{p.date} • {p.collector}</div>
                                            </div>
                                            <div className="text-[10px] font-black bg-brand-green text-brand-dark px-2 py-1 rounded">{p.status}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* PAYMENT HISTORY TAB */}
                {tab === 'history' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black">Payment History</h3>
                            <Button variant="outline">Export PDF</Button>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-brand-dark text-white">
                                                <th className="px-4 py-3 text-xs font-black">Reference</th>
                                                <th className="px-4 py-3 text-xs font-black">Amount</th>
                                                <th className="px-4 py-3 text-xs font-black">Collector</th>
                                                <th className="px-4 py-3 text-xs font-black">Method</th>
                                                <th className="px-4 py-3 text-xs font-black">Date</th>
                                                <th className="px-4 py-3 text-xs font-black">Status</th>
                                                <th className="px-4 py-3 text-xs font-black">Receipt</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-brand-dark/5">
                                            {mockPayments.map((p) => (
                                                <tr key={p.id} className="odd:bg-white even:bg-brand-dustGold/50 hover:bg-brand-green/10">
                                                    <td className="px-4 py-3 text-xs font-black">{p.id}</td>
                                                    <td className="px-4 py-3 text-sm font-black text-brand-green italic">{p.amount}</td>
                                                    <td className="px-4 py-3 text-xs">{p.collector}</td>
                                                    <td className="px-4 py-3 text-xs font-bold">{p.method}</td>
                                                    <td className="px-4 py-3 text-xs text-brand-dark/50">{p.date}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-[9px] font-black bg-brand-green text-brand-dark px-2 py-1 rounded">
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                                            <Download className="h-4 w-4" />
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
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black">Account Statements</h3>
                            <Button variant="outline">Download All</Button>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="font-black">Monthly Statement</CardTitle>
                                <CardDescription className="text-xs">December 2025</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-brand-dustGold rounded-xl">
                                        <div className="text-[10px] font-black text-brand-dark/50 uppercase">Opening Balance</div>
                                        <div className="text-2xl font-black text-brand-dark mt-1">FCFA 10,000</div>
                                    </div>
                                    <div className="p-4 bg-brand-dustGold rounded-xl">
                                        <div className="text-[10px] font-black text-brand-dark/50 uppercase">Total Paid</div>
                                        <div className="text-2xl font-black text-brand-green mt-1">FCFA 32,500</div>
                                    </div>
                                </div>

                                <div className="border-t border-brand-dark/5 pt-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-black">Closing Balance</span>
                                        <span className="text-2xl font-black text-brand-dark italic">FCFA 25,000</span>
                                    </div>
                                </div>

                                <Button className="w-full">Download PDF Statement</Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* DISPUTES TAB */}
                {tab === 'disputes' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-black">Report an Issue</CardTitle>
                                <CardDescription className="text-xs">Describe the payment discrepancy or issue</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <textarea
                                    placeholder="Describe the issue (e.g., payment not recorded, amount mismatch)..."
                                    value={newDispute}
                                    onChange={(e) => setNewDispute(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border border-brand-dark/10 rounded-xl focus:ring-2 focus:ring-brand-green/20"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={submitDispute} variant="secondary">Submit Dispute</Button>
                                    <Button variant="outline" onClick={() => setNewDispute('')}>Clear</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {disputes.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-black">Dispute Tracking</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {disputes.map((d) => (
                                        <div key={d.id} className="p-4 border border-brand-dark/10 rounded-xl flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="h-5 w-5 text-brand-dark/50 mt-0.5 shrink-0" />
                                                <div>
                                                    <div className="font-black text-sm">{d.issue}</div>
                                                    <div className="text-xs text-brand-dark/50 mt-1">{d.id}</div>
                                                </div>
                                            </div>
                                            <div className="text-[9px] font-black bg-brand-dustGold px-2 py-1 rounded">{d.status}</div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="text-center pt-8 border-t border-brand-dark/10">
                    <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">Powered by Altonixa Group Ltd • All transactions are immutable and auditable</p>
                </div>
            </div>
        </div>
    );
}

export default ClientPortal;
