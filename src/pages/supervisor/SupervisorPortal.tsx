import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, AlertCircle, CheckCircle2, Clock, Users, User } from 'lucide-react';
import { cn } from '../../lib/utils';

type Collector = { id: string; name: string; collected: string; clients: number; status: 'Active' | 'Idle' | 'Offline'; lastUpdate: string; zone: string };

const mockCollectors: Collector[] = [
    { id: 'C001', name: 'Jean Dupont', collected: 'FCFA 45,000', clients: 12, status: 'Active', lastUpdate: '2 mins ago', zone: 'Centre Douala' },
    { id: 'C002', name: 'Marie Kline', collected: 'FCFA 32,500', clients: 8, status: 'Active', lastUpdate: '5 mins ago', zone: 'Port Area' },
    { id: 'C003', name: 'Sarah Ngono', collected: 'FCFA 18,000', clients: 5, status: 'Idle', lastUpdate: '45 mins ago', zone: 'Akwa' },
    { id: 'C004', name: 'Pierre Mboh', collected: 'FCFA 0', clients: 0, status: 'Offline', lastUpdate: '3 hours ago', zone: 'Bonanjo' },
];

export function SupervisorPortal() {
    const [tab, setTab] = useState<'dashboard' | 'collectors' | 'alerts'>('dashboard');
    const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);

    const totalCollected = mockCollectors.reduce((sum, c) => sum + parseInt(c.collected.replace(/\D/g, '')), 0);
    const activeCount = mockCollectors.filter(c => c.status === 'Active').length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Supervisor Dashboard</h2>
                    <p className="text-sm text-brand-dark/60 mt-1">Real-time field collector monitoring</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 rounded-2xl shadow">
                    <div className="h-8 w-8 rounded-xl bg-brand-slate-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-brand-slate-600" />
                    </div>
                    <div>
                        <div className="text-[9px] font-black text-brand-dark/50 uppercase">Today Total</div>
                        <div className="text-xl font-black text-brand-dark italic">FCFA {(totalCollected / 1000000).toFixed(0)}M</div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 bg-brand-dark/5 p-1 rounded-2xl border border-brand-dark/5 w-fit">
                {[
                    { id: 'dashboard', label: 'Dashboard' },
                    { id: 'collectors', label: 'Collectors' },
                    { id: 'alerts', label: 'Alerts' },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id as any)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            tab === t.id ? "bg-brand-dark text-white shadow-lg" : "text-brand-dark/40 hover:text-brand-dark"
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* DASHBOARD TAB */}
            {tab === 'dashboard' && (
                <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <Users className="h-4 w-4 text-brand-slate-600" /> Active Collectors
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-brand-dark italic">{activeCount}</div>
                                <div className="text-xs text-brand-dark/50 mt-1">out of {mockCollectors.length} assigned</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-brand-slate-600" /> Total Collected
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-black text-brand-dark italic">FCFA {(totalCollected / 1000).toFixed(0)}K</div>
                                <div className="text-xs text-brand-dark/50 mt-1">+15% vs yesterday</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-black flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-rose-500" /> Issues
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-brand-dark italic">2</div>
                                <div className="text-xs text-rose-600 mt-1">Requires attention</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-black">Collector Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockCollectors.map((c) => (
                                    <div key={c.id} className="flex items-center justify-between pb-4 border-b border-brand-dark/5 last:border-b-0 last:pb-0">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="h-10 w-10 rounded-xl bg-brand-slate-100 flex items-center justify-center text-[10px] font-black text-brand-slate-600">
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-black text-brand-dark">{c.name}</div>
                                                <div className="text-xs text-brand-dark/50">{c.zone} • {c.clients} clients</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-brand-slate-600 italic">{c.collected}</div>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-widest mt-1 px-2 py-0.5 rounded",
                                                c.status === 'Active' ? "bg-brand-slate-100 text-brand-slate-700" :
                                                c.status === 'Idle' ? "bg-brand-dustGold text-brand-dark" :
                                                "bg-gray-200 text-gray-700"
                                            )}>
                                                {c.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* COLLECTORS TAB */}
            {tab === 'collectors' && (
                <div className="space-y-6">
                    {!selectedCollector ? (
                        <div className="grid gap-4">
                            {mockCollectors.map((c) => (
                                <Card key={c.id} className="hover:border-brand-slate-300 transition-all cursor-pointer" onClick={() => setSelectedCollector(c)}>
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="h-14 w-14 rounded-xl bg-brand-slate-100 flex items-center justify-center text-[10px] font-black text-brand-slate-600">
                                                {c.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-black text-lg text-brand-dark">{c.name}</div>
                                                <div className="flex gap-4 text-[10px] font-bold text-brand-dark/50 mt-1">
                                                    <span>📍 {c.zone}</span>
                                                    <span>👥 {c.clients} clients</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-brand-slate-600 italic">{c.collected}</div>
                                            <div className={cn(
                                                "text-[10px] font-black uppercase tracking-widest mt-1 px-2 py-0.5 rounded inline-block",
                                                c.status === 'Active' ? "bg-brand-slate-100 text-brand-slate-700" :
                                                c.status === 'Idle' ? "bg-brand-dustGold text-brand-dark" :
                                                "bg-gray-200 text-gray-700"
                                            )}>
                                                {c.status}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <Button variant="outline" onClick={() => setSelectedCollector(null)}>← Back</Button>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-black">{selectedCollector.name}</CardTitle>
                                    <CardDescription className="text-xs">{selectedCollector.zone} • Agent ID: {selectedCollector.id}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-brand-dustGold rounded-xl">
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase">Status</div>
                                            <div className="text-lg font-black text-brand-dark mt-1">{selectedCollector.status}</div>
                                        </div>
                                        <div className="p-4 bg-brand-dustGold rounded-xl">
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase">Last Update</div>
                                            <div className="text-lg font-black text-brand-dark mt-1">{selectedCollector.lastUpdate}</div>
                                        </div>
                                        <div className="p-4 bg-brand-dustGold rounded-xl">
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase">Collected Today</div>
                                            <div className="text-xl font-black text-brand-slate-600 mt-1 italic">{selectedCollector.collected}</div>
                                        </div>
                                        <div className="p-4 bg-brand-dustGold rounded-xl">
                                            <div className="text-[10px] font-black text-brand-dark/50 uppercase">Clients</div>
                                            <div className="text-lg font-black text-brand-dark mt-1">{selectedCollector.clients}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="secondary" className="flex-1">Send Message</Button>
                                        <Button variant="outline">View Activity Log</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            )}

            {/* ALERTS TAB */}
            {tab === 'alerts' && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-black flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-rose-500" /> Active Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-4 border-l-4 border-rose-500 bg-rose-50 rounded flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
                                <div>
                                    <div className="font-black text-sm text-rose-900">Offline Collector</div>
                                    <div className="text-xs text-rose-700 mt-1">Pierre Mboh (C004) offline for 3+ hours</div>
                                </div>
                            </div>

                            <div className="p-4 border-l-4 border-brand-dustGold bg-brand-dustGold/20 rounded flex items-start gap-3">
                                <Clock className="h-5 w-5 text-brand-dark/60 mt-0.5 shrink-0" />
                                <div>
                                    <div className="font-black text-sm text-brand-dark">Idle Collector</div>
                                    <div className="text-xs text-brand-dark/60 mt-1">Sarah Ngono (C003) idle for 45+ minutes</div>
                                </div>
                            </div>

                            <div className="p-4 border-l-4 border-brand-slate-400 bg-brand-slate-50 rounded flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-brand-slate-600 mt-0.5 shrink-0" />
                                <div>
                                    <div className="font-black text-sm text-brand-dark">Performance Alert</div>
                                    <div className="text-xs text-brand-dark/60 mt-1">Jean Dupont exceeded daily target (FCFA 45K vs 40K goal)</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default SupervisorPortal;
