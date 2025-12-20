import { Shield, Lock, Scale } from 'lucide-react';

export function Terms() {
    return (
        <div className="bg-brand-dustGold min-h-screen py-24 px-4 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Terms of <span className="text-brand-green">Service</span></h1>
                    <p className="text-brand-dark/50 font-bold uppercase tracking-widest text-sm">Effective Date: December 20, 2025</p>
                </div>

                <div className="grid gap-8">
                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <Scale className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">1. Agreement to Terms</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            By accessing or using the ProCollector platform, provided by Altonixa Group Ltd ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree, you must not use our services.
                        </p>
                    </section>

                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">2. Use of Services</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            ProCollector is a digital infrastructure tool for revenue collection. You are responsible for ensuring all agents operating under your organization adhere to local laws and ethical standards. Any misuse for fraudulent purposes will result in immediate termination of service and reporting to relevant authorities in Central Africa.
                        </p>
                    </section>

                    <section className="bg-white p-10 rounded-3xl border border-brand-dark/5 shadow-premium space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-green/20 rounded-2xl text-brand-dark">
                                <Lock className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">3. Data Integrity & Geolocation</h2>
                        </div>
                        <p className="font-bold leading-relaxed text-brand-dark/70">
                            To ensure the validity of collections, ProCollector captures real-time geolocation data. Use of this feature is mandatory for all field agents to maintain audit trails. Altonixa Group Ltd does not provide direct bank connections; reconciliation must be performed within the provided internal tools.
                        </p>
                    </section>

                    <section className="p-10 text-center">
                        <p className="text-brand-dark/40 font-black uppercase tracking-widest text-xs">
                            © 2025 Altonixa Group Ltd. All rights reserved. Registered in Central Africa.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
