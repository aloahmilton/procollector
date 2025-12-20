import { Shield, Eye, Download, Search, CheckCircle2, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function AuditorPortal() {
    return (
        <div className="space-y-10 p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-brand-dark pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-brand-dark text-brand-green rounded-xl">
                            <Shield className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dark opacity-40">Regulatory Compliance Portal</span>
                    </div>
                    <h2 className="text-5xl font-black tracking-tighter text-brand-dark uppercase italic leading-none">External <span className="text-brand-green">Audit</span></h2>
                    <p className="text-brand-dark/50 mt-2 font-bold uppercase tracking-widest text-xs italic">Read-only transparency for state & union oversight</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="h-14 px-8 font-black uppercase tracking-widest border-2 border-brand-dark/10">
                        <History className="mr-2 h-5 w-5" /> View Logs
                    </Button>
                    <Button className="h-14 px-10 font-black uppercase tracking-widest shadow-2xl shadow-brand-green/20">
                        <Download className="mr-2 h-5 w-5" /> Request Full Archive
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { label: 'Integrity Hash', value: 'SHA-256 Verified', detail: 'Last Check: 12m ago', icon: CheckCircle2, status: 'valid' },
                    { label: 'Org Coverage', value: '42 Institutions', detail: 'Cameroon / Central Africa', icon: Eye, status: 'active' },
                    { label: 'Anomaly Rate', value: '0.04%', detail: 'Within Threshold', icon: Shield, status: 'secure' },
                ].map((item, i) => (
                    <Card key={i} className="border-brand-dark/5 bg-white shadow-premium group hover:border-brand-green transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-brand-dark/5">
                            <CardTitle className="text-[10px] font-black text-brand-dark/40 uppercase tracking-widest">{item.label}</CardTitle>
                            <item.icon className="h-5 w-5 text-brand-green group-hover:scale-125 transition-transform" />
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-black text-brand-dark tracking-tighter italic uppercase">{item.value}</div>
                            <p className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest mt-1">{item.detail}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden">
                <CardHeader className="p-8 bg-brand-dark/5 border-b border-brand-dark/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight italic">Public Audit Stream</CardTitle>
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mt-1">Immutable transaction records for the current session</CardDescription>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/30" />
                            <input
                                type="text"
                                placeholder="Search by Hash or ID..."
                                className="w-full pl-12 pr-6 py-3 bg-white border border-brand-dark/10 rounded-2xl text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-brand-green/20"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-brand-dark/5">
                        {[
                            { id: 'REC-AD12', org: 'Douala City Council', type: 'MARKET_FEE', amount: 'FCFA 45,000', hash: '8f3d...e21a', time: 'Just now' },
                            { id: 'REC-BC09', org: 'Ecobank Merchant', type: 'LICENSE', amount: 'FCFA 120,000', hash: '4a1b...9c3f', time: '5m ago' },
                            { id: 'REC-XT44', org: 'Transport Union', type: 'ROAD_TAX', amount: 'FCFA 5,000', hash: 'e92f...d552', time: '12m ago' },
                        ].map((rec, i) => (
                            <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-brand-dark/5 transition-colors group">
                                <div className="flex items-center gap-6">
                                    <div className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest h-8 w-8 flex items-center justify-center border border-brand-dark/10 rounded">#{i + 1}</div>
                                    <div>
                                        <p className="text-sm font-black text-brand-dark uppercase tracking-tight">{rec.org}</p>
                                        <p className="text-[10px] font-black text-brand-green uppercase tracking-widest italic">{rec.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12">
                                    <div className="hidden lg:block text-right">
                                        <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest mb-1">Blockchain Hash</p>
                                        <code className="text-[10px] font-mono bg-brand-dark text-white px-2 py-1 rounded">{rec.hash}</code>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-brand-dark italic">{rec.amount}</p>
                                        <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest">{rec.time}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-brand-dark/5">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="p-8 bg-brand-dark rounded-[3rem] text-center space-y-4">
                <h3 className="text-white font-black uppercase tracking-tight text-2xl italic">Secure Integrity Verification</h3>
                <p className="text-white/50 font-bold text-sm max-w-2xl mx-auto italic">
                    This portal provides a window into the Altonixa collection ecosystem for institutional regulators. All data is signed and hashed at the source (field agent device) ensuring 100% audit accuracy.
                </p>
            </div>
        </div>
    );
}
