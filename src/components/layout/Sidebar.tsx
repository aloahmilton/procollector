import {
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    FileText,
    Building2,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    Upload,
    PiggyBank,
    Wallet,
    Eye
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
    { icon: Building2, label: 'Organizations', to: '/admin/organizations' },
    { icon: Users, label: 'Agents', to: '/supervisor/agents' },
    { icon: CreditCard, label: 'Collections', to: '/admin/collections' },
    { icon: FileText, label: 'Reports', to: '/organization/reports' },
    { icon: Upload, label: 'CSV Import', to: '/admin/csv-import' },
    { icon: PiggyBank, label: 'Deposits', to: '/collector/deposits' },
    { icon: Eye, label: 'Supervisor', to: '/supervisor' },
    { icon: Wallet, label: 'Client Portal', to: '/client' },
    { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

export function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn(
            "relative flex flex-col h-full bg-brand-green text-white transition-all duration-300 shadow-2xl z-20 overflow-hidden",
            collapsed ? "w-20" : "w-64",
            className
        )}>
            {/* Logo Area */}
            <div className="flex items-center h-20 px-6 border-b border-white/5">
                <Link to="/" className="flex items-center justify-center w-full">
                    <img
                        src="/favicon.jpg"
                        alt="Logo"
                        className="h-12 w-12 rounded-2xl shadow-lg border border-white/10 group-hover:scale-110 transition-transform"
                    />
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-8 space-y-1 px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                            isActive
                                ? "bg-white text-brand-dark shadow-lg shadow-black/10"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-brand-dark" : "text-white/60 group-hover:text-white")} />
                                {!collapsed && <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>}
                                {isActive && !collapsed && (
                                    <div className="absolute right-3 h-1.5 w-1.5 rounded-full bg-brand-dark"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-white/5 space-y-4">
                {!collapsed && (
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Authenticated</p>
                        <p className="text-xs font-black truncate text-brand-dustGold">admin@procollector.com</p>
                    </div>
                )}
                <Link to="/login" className="w-full">
                    <Button variant="ghost" className={cn("w-full justify-start text-white/60 hover:text-white hover:bg-rose-500/10 hover:text-rose-400", collapsed && "justify-center px-0")}>
                        <LogOut className="h-5 w-5 mr-3 shrink-0" />
                        {!collapsed && <span className="font-black text-sm uppercase tracking-wider">Sign Out</span>}
                    </Button>
                </Link>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute top-24 -right-3 h-6 w-6 bg-brand-dustGold rounded-full flex items-center justify-center text-brand-dark shadow-xl hover:scale-110 transition-transform z-30"
            >
                {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>
        </div>
    );
}
