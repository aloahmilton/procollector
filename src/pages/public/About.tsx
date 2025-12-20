import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { Target, Eye, Shield, Users2 } from "lucide-react";

export function About() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center bg-brand-dark text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                        Accountability <br />
                        <span className="text-brand-green">is our North Star.</span>
                    </h1>
                    <p className="text-xl text-brand-slate-400 max-w-2xl leading-relaxed">
                        We are building the digital backbone for financial transparency across the African continent, starting with field-based revenue collection.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 -skew-x-12 transform translate-x-1/4"></div>
            </section>

            {/* Narrative */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl font-bold text-brand-dark">The Problem we saw.</h2>
                            <p className="text-lg text-brand-dark/60 leading-relaxed font-bold">
                                Millions of FCFA are lost every year in field collections due to manual processes, paper receipts, and lack of real-time oversight. We saw city councils struggling to fund infrastructure and banks losing track of millions in agent deposits.
                            </p>
                            <p className="text-lg text-brand-dark/60 leading-relaxed font-bold">
                                ProCollector was born out of a simple question: <span className="text-brand-dark font-black tracking-tighter uppercase">"What if every transaction was instantly verifiable?"</span>
                            </p>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { icon: Target, title: "Our Mission", text: "To eliminate revenue leakages using world-class financial technology." },
                                { icon: Eye, title: "Our Vision", text: "To be the standard digital collection infrastructure for the African continent." },
                                { icon: Shield, title: "Our Values", text: "Transparency, Integrity, and Pixel-perfect execution." },
                                { icon: Users2, title: "Our Community", text: "Empowering thousands of collectors with tools of integrity." },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-brand-slate-100 bg-brand-slate-50">
                                    <item.icon className="h-8 w-8 text-brand-green mb-4" />
                                    <h4 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h4>
                                    <p className="text-sm text-brand-slate-500 leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-green text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 italic">Join the Transparency Revolution.</h2>
                    <p className="text-green-50 text-lg mb-10">
                        We're looking for partners, governments, and visionary organizations to scale this impact.
                    </p>
                    <Link to="/contact">
                        <Button variant="white" size="lg">Partner with Us</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
