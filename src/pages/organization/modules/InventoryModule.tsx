import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Package, BarChart3, AlertTriangle, Plus, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export function InventoryModule() {
    const [view, setView] = useState<'grid' | 'table'>('grid');

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Inventory Control</h2>
                    <p className="text-sm text-gray-600 mt-1">Resource planning and procurement tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                        <Button
                            variant={view === 'grid' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('grid')}
                            className="h-9 px-3 text-xs"
                        >
                            Grid
                        </Button>
                        <Button
                            variant={view === 'table' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setView('table')}
                            className="h-9 px-3 text-xs"
                        >
                            Table
                        </Button>
                    </div>
                    <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Stock
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Assets', value: 'Loading...', icon: Package },
                    { label: 'Out of Stock', value: 'Loading...', icon: AlertTriangle },
                    { label: 'Low Stock', value: 'Loading...', icon: AlertTriangle },
                    { label: 'Daily Movement', value: 'Loading...', icon: BarChart3 }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-600 uppercase">{stat.label}</p>
                                <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <stat.icon className="h-5 w-5 text-gray-600" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search inventory assets..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-9 px-3 text-sm">
                            <Filter className="h-4 w-4 mr-2" />
                            All Categories
                        </Button>
                        <Button variant="outline" className="h-9 px-3 text-sm">
                            Procurement History
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    {view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: 'Loading...', category: 'Loading...', sku: 'Loading...', stock: 'Loading...', unit: 'Loading...', status: 'Loading...' }
                ].map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                Loading...
                            </span>
                        </div>
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 uppercase mb-1">{item.category}</p>
                            <h4 className="text-base font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Stock Level</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-semibold text-gray-900">{item.stock}</span>
                                    <span className="text-xs text-gray-500">{item.unit}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <ArrowDownLeft className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">SKU</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Stock</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="px-4 py-3 text-sm text-gray-900">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">Loading...</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">View</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
