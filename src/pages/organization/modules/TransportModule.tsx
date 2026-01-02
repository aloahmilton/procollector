import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Bus, MapPin, Users, Calendar, AlertCircle, Plus, ChevronRight, Settings, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function TransportModule() {
    const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'bookings'>('fleet');

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Fleet & Logistics</h2>
                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Smart Transport Management System</p>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-dark/60">
                            <Users className="h-4 w-4" />
                            <span>150+ Active Users</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-dark/60">
                            <Calendar className="h-4 w-4" />
                            <span>Real-time Scheduling</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-brand-dark/5 bg-white shadow-sm font-black uppercase tracking-tight text-[10px] h-12">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                    </Button>
                    <Button className="rounded-2xl bg-brand-dark text-white shadow-xl font-black uppercase tracking-tight text-[10px] h-12 px-6">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-brand-dustGold/20 p-2 rounded-[2rem] w-fit">
                {(['fleet', 'routes', 'bookings'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                            activeTab === tab
                                ? "bg-brand-dark text-white shadow-lg shadow-brand-dark/20"
                                : "text-brand-dark/40 hover:text-brand-dark hover:bg-white/50"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'fleet' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { id: 'BUS-001', type: 'Luxury Bus', capacity: 54, status: 'On Route', driver: 'Moussa D.', location: 'Bonapriso' },
                        { id: 'VAN-042', type: 'Shuttle Van', capacity: 18, status: 'Maintenance', driver: 'Alice N.', location: 'Garage A' },
                        { id: 'BUS-015', type: 'School Bus', capacity: 42, status: 'Standby', driver: 'Samuel K.', location: 'Main Campus' }
                    ].map((vehicle) => (
                        <Card key={vehicle.id} className="rounded-[3rem] border-none shadow-premium bg-white group hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                            <CardHeader className="bg-brand-dark text-white p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Bus className="h-16 w-16" />
                                </div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{vehicle.type}</div>
                                        <CardTitle className="text-2xl font-black italic tracking-tighter">{vehicle.id}</CardTitle>
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        vehicle.status === 'On Route' ? "bg-brand-green text-white" :
                                            vehicle.status === 'Maintenance' ? "bg-rose-500 text-white" : "bg-white/20 text-white"
                                    )}>
                                        {vehicle.status}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest leading-none">Driver</p>
                                        <p className="text-sm font-black uppercase tracking-tight">{vehicle.driver}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest leading-none">Capacity</p>
                                        <p className="text-sm font-black uppercase tracking-tight">{vehicle.capacity} Seats</p>
                                    </div>
                                </div>
                                <div className="bg-brand-dustGold/10 p-4 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-brand-green" />
                                        <p className="text-xs font-bold italic">{vehicle.location}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-brand-dark/20" />
                                </div>
                                <Button variant="outline" className="w-full rounded-2xl border-brand-dark/10 font-black uppercase tracking-tight text-[10px] h-14 group-hover:bg-brand-dark group-hover:text-white transition-colors">
                                    View Logs
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Additional tabs would be implemented similarly */}
            {activeTab !== 'fleet' && (
                <div className="bg-white rounded-[3rem] shadow-premium p-16 text-center space-y-6">
                    <div className="h-20 w-20 bg-brand-dustGold/20 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="h-10 w-10 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight italic">Module Expansion Pending</h3>
                        <p className="text-sm font-medium text-brand-dark/40">The {activeTab} sub-module is currently being synchronized with the central database.</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">System Status</p>
                        <p className="text-sm text-amber-600 mt-1">Database synchronization in progress. Please check back soon.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
