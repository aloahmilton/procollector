import { ShieldCheck, Eye, Database } from 'lucide-react';

export function Privacy() {
    return (
        <div className="bg-brand-dustGold min-h-screen py-24 px-4 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Privacy <span className="text-brand-green">Policy</span></h1>
                    <p className="text-brand-dark/50 font-bold uppercase tracking-widest text-sm">Effective Date: December 20, 2025</p>
                </div>

                <div className="grid gap-8">
                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <Database className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Data Collection</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            We collect transaction data specifically for the purpose of revenue audit and reconciliation. This includes agent identification, client details, transaction amounts in FCFA, and mandatory real-time geolocation coordinates.
                        </p>
                    </section>

                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <Eye className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Third-Party Usage</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            Altonixa Group Ltd does not sell your organization's data to third parties. Data is only accessible to authorized personnel within your organization and our system administrators for maintenance and support purposes.
                        </p>
                    </section>

                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Security Standards</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            Your data is stored in encrypted cloud environments with strict access controls. We adhere to regional data protection regulations in Central Africa to ensure the highest standards of financial data privacy.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
