import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

type Deposit = { id: string; amount: string; type: string; date: string; note?: string; proof?: string; status: 'Pending'|'Approved'|'Rejected' };
type Withdrawal = { id: string; amount: string; method: string; reason?: string; status: 'Pending'|'Approved'|'Paid'|'Rejected' };

export function DepositWithdrawal() {
    const [tab, setTab] = useState<'deposit'|'withdrawal'>('deposit');
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

    // deposit form
    const [dAmount, setDAmount] = useState('');
    const [dType, setDType] = useState('Cash');
    const [dDate, setDDate] = useState('');
    const [dNote, setDNote] = useState('');
    const [dProof, setDProof] = useState<File | null>(null);

    // withdrawal form
    const [wAmount, setWAmount] = useState('');
    const [wMethod, setWMethod] = useState('Cash');
    const [wReason, setWReason] = useState('');

    const submitDeposit = () => {
        const newD: Deposit = {
            id: `D-${Date.now()}`,
            amount: dAmount,
            type: dType,
            date: dDate || new Date().toISOString(),
            note: dNote,
            proof: dProof ? dProof.name : undefined,
            status: 'Pending'
        };
        setDeposits([newD, ...deposits]);
        setDAmount(''); setDNote(''); setDProof(null); setDDate('');
    };

    const submitWithdrawal = () => {
        const newW: Withdrawal = { id: `W-${Date.now()}`, amount: wAmount, method: wMethod, reason: wReason, status: 'Pending' };
        setWithdrawals([newW, ...withdrawals]);
        setWAmount(''); setWReason('');
    };

    const adminApproveDeposit = (id: string) => {
        setDeposits(ds => ds.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    };

    const adminApproveWithdrawal = (id: string) => {
        setWithdrawals(ws => ws.map(w => w.id === id ? { ...w, status: 'Paid' } : w));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => setTab('deposit')} className={`px-4 py-2 rounded-xl font-black ${tab==='deposit' ? 'bg-brand-dark text-white' : 'bg-brand-dark/5'}`}>Save / Deposit</button>
                <button onClick={() => setTab('withdrawal')} className={`px-4 py-2 rounded-xl font-black ${tab==='withdrawal' ? 'bg-brand-dark text-white' : 'bg-brand-dark/5'}`}>Request Withdrawal</button>
            </div>

            {tab === 'deposit' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-black">Save / Deposit</CardTitle>
                        <CardDescription className="text-xs">Declare deposits made outside the system. Attach proof (mock).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <input placeholder="Amount" type="number" value={dAmount} onChange={e=>setDAmount(e.target.value)} className="p-3 rounded" />
                            <select value={dType} onChange={e=>setDType(e.target.value)} className="p-3 rounded">
                                <option>Cash</option>
                                <option>Mobile Money</option>
                                <option>Bank Transfer</option>
                            </select>
                            <input type="date" value={dDate} onChange={e=>setDDate(e.target.value)} className="p-3 rounded" />
                            <input placeholder="Note (optional)" value={dNote} onChange={e=>setDNote(e.target.value)} className="p-3 rounded" />
                            <input type="file" accept="image/*,application/pdf" onChange={e=>setDProof(e.target.files?.[0] ?? null)} />
                            <div className="flex gap-2">
                                <Button onClick={submitDeposit} variant="secondary">Submit (Pending)</Button>
                                <Button variant="outline" onClick={()=>{setDAmount(''); setDNote(''); setDProof(null);}}>Clear</Button>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-black">Pending Deposits</h4>
                                {deposits.map(d => (
                                    <div key={d.id} className="p-3 border rounded flex items-center justify-between">
                                        <div>
                                            <div className="font-black">{d.amount} - {d.type}</div>
                                            <div className="text-xs text-brand-dark/50">{d.note} {d.proof && `• Proof: ${d.proof}`}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            {d.status === 'Pending' && <Button onClick={()=>adminApproveDeposit(d.id)}>Approve</Button>}
                                            <div className="text-sm font-black">{d.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {tab === 'withdrawal' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-black">Request Withdrawal</CardTitle>
                        <CardDescription className="text-xs">Request payout; admins can approve and mark as paid (mock).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <input placeholder="Amount" type="number" value={wAmount} onChange={e=>setWAmount(e.target.value)} className="p-3 rounded" />
                            <select value={wMethod} onChange={e=>setWMethod(e.target.value)} className="p-3 rounded">
                                <option>Cash</option>
                                <option>Mobile Money</option>
                                <option>Bank Transfer</option>
                            </select>
                            <input placeholder="Reason (optional)" value={wReason} onChange={e=>setWReason(e.target.value)} className="p-3 rounded" />
                            <div className="flex gap-2">
                                <Button onClick={submitWithdrawal} variant="secondary">Submit Request</Button>
                                <Button variant="outline" onClick={()=>{setWAmount(''); setWReason('');}}>Clear</Button>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-black">Withdrawal Requests</h4>
                                {withdrawals.map(w => (
                                    <div key={w.id} className="p-3 border rounded flex items-center justify-between">
                                        <div>
                                            <div className="font-black">{w.amount} - {w.method}</div>
                                            <div className="text-xs text-brand-dark/50">{w.reason}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            {w.status === 'Pending' && <Button onClick={()=>adminApproveWithdrawal(w.id)}>Mark Paid</Button>}
                                            <div className="text-sm font-black">{w.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default DepositWithdrawal;
