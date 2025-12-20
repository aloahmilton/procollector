import { useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { MapPin, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FieldCollection() {
    const { latitude, longitude, loading: geoLoading } = useGeolocation();
    const [amount, setAmount] = useState('');
    const [clientName, setClientName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setAmount('');
            setClientName('');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-brand-dustGold px-4 py-8 font-sans text-brand-dark">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <img src="/favicon.jpg" alt="Logo" className="h-10 w-10 rounded-xl shadow-lg" />
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 italic">Agent ID: 4421</p>
                        <p className="font-black text-sm uppercase">Jean Collector</p>
                    </div>
                </div>

                {success ? (
                    <Card className="border-brand-green/30 bg-white animate-in zoom-in duration-300">
                        <CardContent className="pt-10 pb-10 text-center space-y-4">
                            <div className="h-20 w-20 bg-brand-green rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand-green/20">
                                <CheckCircle2 className="h-10 w-10 text-brand-dark" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Receipt Generated</h2>
                            <p className="text-sm font-bold text-brand-dark/50 italic">Digital record synchronized successfully.</p>
                            <Button variant="secondary" className="w-full h-12 mt-6 uppercase font-black" onClick={() => setSuccess(false)}>New Collection</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Geolocation Status */}
                        <div className={cn(
                            "p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300",
                            latitude ? "bg-brand-green/10 border-brand-green/20" : "bg-rose-50 border-rose-100"
                        )}>
                            <div className={cn(
                                "p-2 rounded-xl",
                                latitude ? "bg-brand-green text-brand-dark" : "bg-rose-100 text-rose-600"
                            )}>
                                {geoLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MapPin className="h-5 w-5" />}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Field Location</p>
                                <p className="text-sm font-black uppercase">
                                    {geoLoading ? "Locating..." : latitude ? `${latitude.toFixed(4)}, ${longitude?.toFixed(4)}` : "Position Denied"}
                                </p>
                            </div>
                        </div>

                        {/* Collection Form */}
                        <Card className="border-brand-dark/5 bg-white shadow-premium overflow-hidden">
                            <CardHeader className="bg-brand-dark/5 border-b border-brand-dark/5">
                                <CardTitle className="text-lg font-black uppercase tracking-tight italic">Record Collection</CardTitle>
                                <CardDescription className="text-[10px] font-black uppercase text-brand-dark/40">Enter client details and amount (FCFA)</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Amount (FCFA)</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="e.g. 5000"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full text-2xl font-black tracking-tighter bg-brand-dark/5 border-none rounded-2xl p-6 focus:ring-4 focus:ring-brand-green/20 placeholder:opacity-20 text-brand-dark"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Client / Payer Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Marché Central Kiosk 12"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                            className="w-full font-black uppercase tracking-widest bg-brand-dark/5 border-none rounded-xl p-4 focus:ring-4 focus:ring-brand-green/20 placeholder:opacity-20 text-brand-dark text-xs"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-16 rounded-2xl text-base shadow-xl"
                                        disabled={submitting || !latitude}
                                    >
                                        {submitting ? <Loader2 className="animate-spin mr-2" /> : <Camera className="mr-2" />}
                                        {submitting ? "Processing..." : "Capture & Record"}
                                    </Button>

                                    {!latitude && !geoLoading && (
                                        <p className="text-[10px] font-black text-rose-600 text-center uppercase tracking-widest animate-pulse">
                                            Enable GPS to start recording
                                        </p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Footer Credits */}
                <div className="text-center pt-8">
                    <p className="text-[9px] font-black text-brand-dark/30 uppercase tracking-[0.2em]">Powered by Altonixa Group Ltd</p>
                </div>
            </div>
        </div>
    );
}
