import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function Settings() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-black tracking-tighter text-brand-dark uppercase">Settings</h2>
                <p className="text-brand-dark/60 mt-1 font-bold">Manage your account, organization, and security preferences.</p>
            </div>

            <div className="space-y-6">
                <Card className="border-brand-dark/5 bg-white shadow-md">
                    <CardHeader className="border-b border-brand-dark/5">
                        <CardTitle className="text-lg font-black uppercase tracking-tight text-brand-dark italic">Profile Information</CardTitle>
                        <CardDescription className="text-xs font-bold text-brand-dark/50">Update your personal details and avatar.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="h-20 w-20 rounded-2xl bg-brand-green flex items-center justify-center font-black text-brand-dark text-2xl shadow-lg">
                                AD
                            </div>
                            <Button variant="outline" className="border-brand-dark/20 text-brand-dark font-black tracking-widest uppercase text-xs h-10">Change Avatar</Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/60">Full Name</label>
                                <input type="text" defaultValue="Admin User" className="w-full bg-brand-dark/5 border-brand-dark/10 rounded-lg px-4 py-2 text-sm font-bold text-brand-dark focus:ring-2 focus:ring-brand-green" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/60">Email Address</label>
                                <input type="email" defaultValue="admin@procollector.com" className="w-full bg-brand-dark/5 border-brand-dark/10 rounded-lg px-4 py-2 text-sm font-bold text-brand-dark focus:ring-2 focus:ring-brand-green" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-brand-dark/5 bg-white shadow-md">
                    <CardHeader className="border-b border-brand-dark/5">
                        <CardTitle className="text-lg font-black uppercase tracking-tight text-brand-dark italic">Security</CardTitle>
                        <CardDescription className="text-xs font-bold text-brand-dark/50">Manage your password and authentication methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-brand-dark/5 rounded-2xl border border-brand-dark/5 group hover:border-brand-green/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-brand-green/20 rounded-xl text-brand-dark">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-brand-dark">Two-Factor Authentication</p>
                                    <p className="text-xs font-bold text-brand-dark/40 italic">Add an extra layer of security to your account.</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="border-brand-dark/20 text-brand-dark font-black uppercase tracking-widest text-[10px] h-8">Enable</Button>
                        </div>
                        <Button variant="secondary" className="font-black uppercase tracking-widest text-xs h-11 w-full md:w-auto shadow-lg shadow-black/10">Change Password</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
