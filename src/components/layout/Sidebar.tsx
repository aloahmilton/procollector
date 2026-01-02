import {
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    FileText,
    Building2,
    ChevronLeft,
    ChevronRight,
    PiggyBank,
    Wallet,
    Eye,
    Bus,
    Home,
    Package,
    Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface SidebarProps {
    className?: string;
}

const navItems = [
    { icon: LayoutDashboard, label: 'Org Dashboard', to: '/organization', end: true },
    { icon: Eye, label: 'Supervisor', to: '/supervisor' },
    { icon: Activity, label: 'Live Map', to: '/supervisor/monitoring' },
    { icon: Bus, label: 'Transport', to: '/organization/transport' },
    { icon: Home, label: 'Hostel', to: '/organization/hostel' },
    { icon: Package, label: 'Inventory', to: '/organization/inventory' },
    { icon: FileText, label: 'Reports', to: '/organization/reports' },
    { icon: Users, label: 'Agents', to: '/supervisor/agents' },
    { icon: Building2, label: 'System Admin', to: '/admin' },
    { icon: PiggyBank, label: 'Deposits', to: '/collector/deposits' },
    { icon: Wallet, label: 'Client Portal', to: '/client' },
    { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn(
            "relative flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 z-20 overflow-hidden",
            collapsed ? "w-16" : "w-64",
            className
        )}>
            {/* Logo Area */}
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
                <Link to="/" className="flex items-center justify-center w-full">
                    <img
                        src="/favicon.jpg"
                        alt="Logo"
                        className="h-10 w-10 rounded-lg border border-gray-300 group-hover:scale-105 transition-transform"
                    />
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-4 space-y-1 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                            isActive
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700")} />
                                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-gray-200 space-y-3">
                {!collapsed && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Authenticated</p>
                        <p className="text-sm font-medium text-gray-900">admin@procollector.com</p>
                    </div>
                )}
                <Link to="/login" className="w-full">
                    <Button variant="ghost" className={cn("w-full justify-start text-gray-600 hover:text-gray-900", collapsed && "justify-center px-0")}>
                        <LogOut className="h-5 w-5 mr-3 shrink-0" />
                        {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
                    </Button>
                </Link>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute top-20 -right-3 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 shadow-lg hover:bg-gray-200 transition-colors z-30"
            >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
        </div>
    );
}
