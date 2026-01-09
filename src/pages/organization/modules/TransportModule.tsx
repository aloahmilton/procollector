import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Bus, MapPin, Users, Calendar, AlertCircle, Plus, ChevronRight, Settings, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function TransportModule() {
    const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'bookings'>('fleet');

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Fleet & Logistics</h2>
                    <p className="text-sm text-gray-600 mt-1">Smart Transport Management System</p>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Loading... Active Users</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Real-time Scheduling</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-9 px-3 text-sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                    </Button>
                    <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                    </Button>
                </div>
            </div>

            <div className="flex border-b border-gray-200">
                {(['fleet', 'routes', 'bookings'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === tab
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'fleet' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Fleet Overview</h3>
                        <Button className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Vehicle
                        </Button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Vehicle ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Capacity</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Driver</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 'Loading...', type: 'Loading...', capacity: 'Loading...', status: 'Loading...', driver: 'Loading...', location: 'Loading...' }
                                ].map((vehicle, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{vehicle.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{vehicle.type}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{vehicle.capacity}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{vehicle.driver}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{vehicle.location}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">View</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Additional tabs would be implemented similarly */}
            {activeTab !== 'fleet' && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center space-y-4">
                    <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Module Under Development</h3>
                        <p className="text-sm text-gray-600 mt-2">The {activeTab} section is currently being implemented.</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                        <p className="text-xs font-medium text-yellow-800 uppercase tracking-wide">Coming Soon</p>
                        <p className="text-sm text-yellow-700 mt-1">This feature will be available in the next update.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
