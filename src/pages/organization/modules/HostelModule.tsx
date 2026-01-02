import { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Bed, Users, Settings, Plus, ChevronRight, ShieldCheck, PieChart } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function HostelModule() {
    const [activeTab, setActiveTab] = useState<'rooms' | 'residents' | 'maintenance'>('rooms');

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Hostel & Accommodation</h2>
                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Smart Room Allocation & Residency tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-brand-dark/5 bg-white shadow-sm font-black uppercase tracking-tight text-[10px] h-12">
                        <PieChart className="h-4 w-4 mr-2" />
                        Occupancy Report
                    </Button>
                    <Button className="rounded-2xl bg-brand-dark text-white shadow-xl font-black uppercase tracking-tight text-[10px] h-12 px-6">
                        <Plus className="h-4 w-4 mr-2" />
                        New Admission
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Capacity', value: '450', sub: 'Beds available', icon: Bed, color: 'brand-dark' },
                    { label: 'Current Guests', value: '382', sub: '85% Occupancy', icon: Users, color: 'brand-green' },
                    { label: 'Maintenance', value: '12', sub: 'Active requests', icon: Settings, color: 'rose-500' }
                ].map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-premium bg-white p-8 group overflow-hidden relative">
                        <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-3xl opacity-10", `bg-${stat.color}`)}></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/40 mb-1">{stat.label}</p>
                                <h4 className="text-4xl font-black italic tracking-tighter">{stat.value}</h4>
                                <p className="text-xs font-bold text-brand-dark/30 mt-1 uppercase tracking-tight">{stat.sub}</p>
                            </div>
                            <div className={cn("h-14 w-14 rounded-3xl flex items-center justify-center shadow-2xl", `bg-${stat.color}/10 text-${stat.color}`)}>
                                <stat.icon className="h-7 w-7" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-premium p-10 border border-white">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4 bg-brand-dustGold/10 p-2 rounded-[2rem]">
                        {(['rooms', 'residents', 'maintenance'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                    activeTab === tab
                                        ? "bg-brand-dark text-white shadow-xl"
                                        : "text-brand-dark/40 hover:text-brand-dark"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-green bg-brand-green/5 px-4 py-2 rounded-full">
                        <ShieldCheck className="h-4 w-4" />
                        Biometric Sync Active
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { room: 'BLOCK A - 101', type: '4-Bed Standard', occupancy: 4, status: 'Full', residents: ['John D.', 'Paul S.', 'Jean M.', 'Kevin L.'] },
                        { room: 'BLOCK A - 102', type: '4-Bed Standard', occupancy: 3, status: 'Available', residents: ['Moussa K.', 'Samuel O.', 'David P.'] },
                        { room: 'BLOCK B - 204', type: '2-Bed Premium', occupancy: 2, status: 'Full', residents: ['Alice B.', 'Marie C.'] }
                    ].map((item, i) => (
                        <div key={i} className="group flex items-center justify-between p-6 rounded-[2.5rem] bg-brand-dustGold/5 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-brand-dustGold/20">
                            <div className="flex items-center gap-8">
                                <div className="h-14 w-14 rounded-2xl bg-brand-dark flex items-center justify-center text-white font-black text-sm italic">
                                    {item.room.split(' - ')[1]}
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase tracking-tight">{item.room}</p>
                                    <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest">{item.type} • {item.residents.length}/{item.occupancy} OCCUPIED</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-12">
                                <div className="flex -space-x-3">
                                    {item.residents.map((r, ri) => (
                                        <div key={ri} className="h-10 w-10 rounded-xl bg-white border-2 border-brand-dustGold/20 flex items-center justify-center text-[10px] font-black uppercase italic shadow-sm">
                                            {r.split(' ')[0][0]}{r.split(' ')[1][0]}
                                        </div>
                                    ))}
                                    {item.occupancy > item.residents.length && (
                                        <div className="h-10 w-10 rounded-xl bg-brand-green/10 border-2 border-dashed border-brand-green/30 flex items-center justify-center text-brand-green">
                                            <Plus className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                    item.status === 'Full' ? "bg-brand-dark text-white border-brand-dark" : "bg-brand-green/10 text-brand-green border-brand-green/20"
                                )}>
                                    {item.status}
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-brand-dark hover:text-white transition-all">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
