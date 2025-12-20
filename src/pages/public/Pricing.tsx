import { Button } from "../../components/ui/Button";
import { Check } from "lucide-react";

export function Pricing() {
    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6">
                        Simple, Transparent <span className="text-brand-green">Pricing</span>
                    </h1>
                    <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto font-medium">
                        Choose the plan that fits your organization's scale. All plans include our core security engine.
                    </p>
                </div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            className={`relative flex flex-col p-8 rounded-card border transition-all duration-300 ${tier.featured
                                ? "border-brand-green shadow-premium bg-brand-slate-50 scale-105 z-10"
                                : "border-brand-slate-200 hover:border-brand-green/30 hover:shadow-fintech bg-white"
                                }`}
                        >
                            {tier.featured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-green text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-brand-dark mb-2">{tier.name}</h3>
                                <p className="text-brand-dark font-bold text-sm leading-relaxed mb-4">{tier.description}</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-brand-dark uppercase">{tier.price}</span>
                                {tier.price !== "Custom" && <span className="text-brand-dark/40 font-black text-[10px] uppercase tracking-widest ml-2">/ month</span>}
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {tier.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                                        <span className="text-brand-dark/80 text-sm font-bold">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.featured ? "primary" : "outline"}
                                className="w-full"
                            >
                                {tier.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQ Preview / Trust */}
                <div className="mt-24 text-center p-12 bg-brand-dark rounded-3xl text-white shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4">Need a custom solution for your Local Government?</h2>
                    <p className="text-white font-bold opacity-80 mb-8 max-w-2xl mx-auto">
                        We offer special deployment models for city councils and regional governments with custom reconciliation rules.
                    </p>
                    <Button variant="white" size="lg" className="h-14 font-black">Contact our Government Desk</Button>
                </div>
            </div>
        </div>
    );
}

const tiers = [
    {
        name: "Growth",
        description: "Perfect for cooperatives and small property management firms.",
        price: "FCFA 25,000",
        features: [
            "Up to 10 Agents",
            "Real-time Dashboard",
            "Basic Reporting (Daily)",
            "Digital Receipts via E-mail",
            "Standard Security Engine",
            "Email Support"
        ],
        cta: "Start with Growth",
        featured: false
    },
    {
        name: "Enterprise",
        description: "The standard for Microfinance and Large Unions.",
        price: "FCFA 95,000",
        features: [
            "Up to 50 Agents",
            "Advanced Analytics & Charts",
            "Custom Collection Rules",
            "Digital Receipts via SMS",
            "Location/GPS Tracking",
            "Internal Reconciliation Tools",
            "Priority 24/7 Support"
        ],
        cta: "Start with Enterprise",
        featured: true
    },
    {
        name: "Government",
        description: "Bespoke solution for councils and national agencies.",
        price: "Custom",
        features: [
            "Unlimited Agents",
            "Multi-Tenant Child Portals",
            "Advanced Reconciliation",
            "On-Premise Deployment Option",
            "Dedicated Compliance Officer",
            "Custom Audit Logs",
            "Staff Training Included"
        ],
        cta: "Contact Sales",
        featured: false
    }
];
