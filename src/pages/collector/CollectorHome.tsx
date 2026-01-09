import React, { useState, useEffect } from 'react';
import { BarChart3, Wallet, Users, TrendingUp, Plus, DollarSign, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectorHome() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/dashboard/collector', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchDashboardData} className="px-4 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand-slate-700">
          Retry
        </button>
      </div>
    );
  }

  const stats = data?.stats || [];
  const schedule = data?.schedule || [];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome back, here's your overview</p>
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">{stat.label}</h3>
            <p className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
              stat.trend === 'up'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        <Link
          to="/collector/add-client"
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Add New Client</h3>
              <p className="text-xs text-gray-500">Onboard new clients</p>
            </div>
          </div>
        </Link>

        <Link
          to="/collector/collect"
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">Record Collection</h3>
              <p className="text-xs text-gray-500">Save daily contributions</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Today's Schedule - Responsive Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Today's Schedule</h2>
          <p className="text-xs text-gray-500 mt-1">Upcoming collection appointments</p>
        </div>
        <div className="divide-y divide-gray-100">
          {schedule.length > 0 ? schedule.map((item) => (
            <div key={item.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.client}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.address}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No collections scheduled for today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
