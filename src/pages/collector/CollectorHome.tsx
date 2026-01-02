import React from 'react';
import { BarChart3, Wallet, Users, TrendingUp, Plus, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectorHome() {
  const stats = [
    { label: 'Today\'s Collections', value: '$2,450.00', change: '+$350.00', trend: 'up' },
    { label: 'Total Clients', value: '45', change: '+2', trend: 'up' },
    { label: 'Success Rate', value: '98.5%', change: '+0.5%', trend: 'up' },
    { label: 'Pending Collections', value: '5', change: '-2', trend: 'down' },
  ];

  const upcomingCollections = [
    { id: 1, client: 'ABC Company', amount: '$500.00', time: '10:00 AM', address: '123 Business St' },
    { id: 2, client: 'XYZ Store', amount: '$750.00', time: '11:30 AM', address: '456 Commerce Ave' },
    { id: 3, client: 'Quick Mart', amount: '$300.00', time: '2:00 PM', address: '789 Market Rd' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Collector Dashboard</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/collector/add-client"
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Add New Client</h3>
              <p className="text-sm text-gray-600">Onboard new clients to your portfolio</p>
            </div>
          </div>
        </Link>
        
        <Link
          to="/collector/collect"
          className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Record Collection</h3>
              <p className="text-sm text-gray-600">Save client daily contributions</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.label}</h3>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <div className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Today's Collection Schedule</h2>
        <div className="space-y-3">
          {upcomingCollections.map((collection) => (
            <div key={collection.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{collection.client}</p>
                <p className="text-xs text-gray-500">{collection.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{collection.amount}</p>
                <p className="text-xs text-gray-500">{collection.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
