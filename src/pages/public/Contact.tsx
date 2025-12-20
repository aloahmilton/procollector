import { Button } from "../../components/ui/Button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export function Contact() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left Side: Info */}
                    <div className="flex-1 space-y-12">
                        <div>
                            <h1 className="text-4xl font-extrabold text-brand-dark mb-6">
                                Let's Talk <span className="text-brand-green">Accountability</span>
                            </h1>
                            <p className="text-xl text-brand-slate-500 leading-relaxed">
                                Have questions about how ProCollector can work for your specifically? Our solutions team is ready to help.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                                    <Mail className="h-6 w-6 text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-brand-dark">Email Us</h4>
                                    <p className="text-brand-slate-500">solutions@procollector.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                                    <Phone className="h-6 w-6 text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-brand-dark">Call Us</h4>
                                    <p className="text-brand-slate-500">+237 672 09 2003</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center shrink-0">
                                    <MapPin className="h-6 w-6 text-brand-green" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-brand-dark">Visit Us</h4>
                                    <p className="text-brand-slate-500">Yaounde, Chapel Obili, Cameroon</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-brand-slate-50 rounded-2xl border border-brand-slate-100">
                            <h4 className="text-lg font-bold text-brand-dark mb-2">Need Support?</h4>
                            <p className="text-brand-slate-500 text-sm mb-6 leading-relaxed">
                                Already a customer? Please use our dedicated support portal for faster response times.
                            </p>
                            <Button variant="outline" size="sm">Go to Support Portal</Button>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl shadow-premium border border-brand-slate-100 p-8 md:p-12">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-brand-dark">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-brand-slate-50 border border-brand-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-brand-dark">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-brand-slate-50 border border-brand-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-dark">Organization Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-brand-slate-50 border border-brand-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="john@council.gov" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-dark">Organization Type</label>
                                    <select className="w-auto px-4 py-3 bg-brand-slate-50 border border-brand-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20">
                                        <option>Government Council</option>
                                        <option>Commercial Bank</option>
                                        <option>Microfinance</option>
                                        <option>Property Manager</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-brand-dark">How can we help?</label>
                                    <textarea rows={4} className="w-full px-4 py-3 bg-brand-slate-50 border border-brand-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="Tell us about your requirements..."></textarea>
                                </div>
                                <Button className="w-full" size="lg">Send Message <MessageSquare className="ml-2 h-5 w-5" /></Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
