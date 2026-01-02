import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Package, BarChart3, AlertTriangle, Plus, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function InventoryModule() {
    const [view, setView] = useState<'grid' | 'table'>('grid');

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Smart Inventory Control</h2>
                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Resource planning & Procurement tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-brand-dustGold/20 p-1.5 rounded-2xl mr-4">
                        <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')} className="rounded-xl h-10 px-4 text-[10px] font-black uppercase">Grid</Button>
                        <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('table')} className="rounded-xl h-10 px-4 text-[10px] font-black uppercase">Table</Button>
                    </div>
                    <Button className="rounded-2xl bg-brand-dark text-white shadow-xl font-black uppercase tracking-tight text-[10px] h-12 px-6">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Stock
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Assets', value: '1,280', icon: Package, color: 'brand-dark' },
                    { label: 'Out of Stock', value: '4', icon: AlertTriangle, color: 'rose-500' },
                    { label: 'Low Stock', value: '18', icon: AlertTriangle, color: 'amber-500' },
                    { label: 'Daily Movement', value: '+42', icon: BarChart3, color: 'brand-green' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-premium border border-white flex items-center justify-between">
                        <div>
                            <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-black italic tracking-tighter">{stat.value}</h4>
                        </div>
                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-brand-dustGold/10", `text-${stat.color}`)}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-premium overflow-hidden border border-white">
                <div className="p-8 border-b border-brand-dark/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-dark/20" />
                        <input
                            type="text"
                            placeholder="Search inventory assets..."
                            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-dustGold/10 border-none text-sm font-bold placeholder:text-brand-dark/10 outline-none focus:ring-2 focus:ring-brand-dark/5"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl border-brand-dark/10 h-12 px-6 font-black uppercase tracking-widest text-[9px]">
                            <Filter className="h-4 w-4 mr-2" />
                            All Categories
                        </Button>
                        <Button variant="outline" className="rounded-xl border-brand-dark/10 h-12 px-6 font-black uppercase tracking-widest text-[9px]">
                            Procurement History
                        </Button>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Dell Latitude 5420', category: 'IT Assets', sku: 'IT-LT-098', stock: 42, unit: 'pcs', status: 'In Stock' },
                            { name: 'Office Chairs (Ergo)', category: 'Furniture', sku: 'FN-CH-012', stock: 8, unit: 'pcs', status: 'Low Stock' },
                            { name: 'Standard Uniforms (M)', category: 'Apparel', sku: 'AP-UN-331', stock: 156, unit: 'sets', status: 'In Stock' },
                            { name: 'Catering Trays', category: 'Kitchen', sku: 'KT-TR-110', stock: 0, unit: 'pcs', status: 'Out of Stock' },
                            { name: 'A4 Printing Paper', category: 'Stationery', sku: 'ST-PP-001', stock: 24, unit: 'reams', status: 'In Stock' },
                            { name: 'Liquid Soap (5L)', category: 'Janitorial', sku: 'JN-SP-044', stock: 5, unit: 'gallons', status: 'Low Stock' }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-[2.5rem] bg-brand-dustGold/5 border-2 border-transparent hover:border-brand-dark/5 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-14 w-14 rounded-2xl bg-brand-dark text-white flex items-center justify-center">
                                        <Package className="h-7 w-7" />
                                    </div>
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                        item.status === 'In Stock' ? "bg-brand-green/10 text-brand-green" :
                                            item.status === 'Low Stock' ? "bg-amber-100 text-amber-600" : "bg-rose-100 text-rose-600"
                                    )}>
                                        {item.status}
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mb-1">{item.category}</p>
                                    <h4 className="text-xl font-black uppercase tracking-tight leading-tight">{item.name}</h4>
                                    <p className="text-[9px] font-bold text-brand-dark/20 uppercase tracking-[0.2em] mt-2">SKU: {item.sku}</p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-widest mb-1">Stock Level</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black italic tracking-tighter">{item.stock}</span>
                                            <span className="text-[10px] font-black uppercase text-brand-dark/40 italic">{item.unit}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl border-brand-dark/5 hover:bg-brand-green hover:text-white transition-all shadow-sm">
                                            <ArrowDownLeft className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl border-brand-dark/5 hover:bg-brand-dark hover:text-white transition-all shadow-sm">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
