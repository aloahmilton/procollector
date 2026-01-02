import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Button } from '../../components/ui/Button';
import { MapPin, Camera, CheckCircle2, Loader2, Wifi, WifiOff, RefreshCcw, Users, DollarSign, ChevronRight, Search, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { offlineStorage, type PendingCollection } from '../../lib/offlineStorage';
import { v4 as uuidv4 } from 'uuid';


const API_URL = 'http://localhost:5000/api/v1';

export default function FieldCollection() {
    const [view, setView] = useState<'dashboard' | 'select-client' | 'enter-collection'>('dashboard');
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mobile_money'>('cash');
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingCount, setPendingCount] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    
    const { location, isLoading: geoLoading, error: geoError, captureLocation } = useGeolocation();

    const [clients] = useState([
        { id: '1', name: 'Boutique Alpha', quarter: 'Mokolo' },
        { id: '2', name: 'Pharmacie De La Paix', quarter: 'Akwa' },
        { id: '3', name: 'Gare Routière B', quarter: 'Ndokoti' },
        { id: '4', name: 'Marché Central A', quarter: 'New Bell' },
    ]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        refreshPendingCount();
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const refreshPendingCount = async () => {
        const count = await offlineStorage.getPendingCount();
        setPendingCount(count);
    };

    const handleSync = async () => {
        if (!isOnline) return;
        setIsSyncing(true);
        try {
            const pending = await offlineStorage.getPendingCollections();
            for (const item of pending) {
                await new Promise(resolve => setTimeout(resolve, 500));
                await offlineStorage.removeCollection(item.id);
            }
            await refreshPendingCount();
        } catch (error) {
            console.error("Sync failed:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleCollectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isOnline && !location) {
                await captureLocation();
            }

            const collectionData: PendingCollection = {
                id: uuidv4(),
                clientId: selectedClient?.id || 'unknown',
                description: `Collection from ${selectedClient?.name}`,
                amount: parseFloat(amount),
                paymentMethod,
                collectedAt: new Date().toISOString(),
                status: 'pending_sync',
                ...(location ? { latitude: location.latitude, longitude: location.longitude } : {})
            };

            if (isOnline) {
                try {
                    const response = await fetch(`${API_URL}/collections`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(collectionData)
                    });
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    console.log("Collection submitted successfully:", result);
                } catch (error) {
                    console.error("Failed to submit collection:", error);
                    // Fall back to offline storage if API fails
                    await offlineStorage.saveCollection(collectionData);
                    await refreshPendingCount();
                }
            } else {
                await offlineStorage.saveCollection(collectionData);
                await refreshPendingCount();
            }

            setSuccessMessage(`Collected FCFA ${amount} from ${selectedClient?.name}`);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setAmount('');
                setProofFile(null);
                setSelectedClient(null);
                setView('dashboard');
            }, 3000);

        } catch (error) {
            console.error("Collection failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {view !== 'dashboard' && (
                        <button onClick={() => setView('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                            <ArrowLeft className="h-6 w-6 text-gray-600" />
                        </button>
                    )}
                    <div>
                        <h1 className="font-bold text-lg text-gray-900 leading-tight">
                            {view === 'dashboard' ? 'Record Collection' :
                                view === 'select-client' ? 'Select Client' :
                                    'Enter Collection'}
                        </h1>
                        <p className="text-xs text-gray-500">Welcome, Collector</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        isOnline ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                        {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                        {isOnline ? 'Online' : 'Offline'}
                    </div>
                    <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        geoLoading ? "bg-amber-100 text-amber-700" : location ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    )}>
                        <MapPin className="h-3 w-3" />
                        {geoLoading ? 'Locating...' : location ? 'Location OK' : geoError ? 'GPS Error' : 'No GPS'}
                    </div>
                </div>
            </header>

            <main className="p-4 max-w-lg mx-auto space-y-6">
                {pendingCount > 0 && view === 'dashboard' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                <RefreshCcw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-amber-900">{pendingCount} Records Pending</p>
                                <p className="text-xs text-amber-700">Sync to update server</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleSync}
                            disabled={isSyncing || !isOnline}
                            className="bg-white border-amber-300 text-amber-800 hover:bg-amber-50 h-8 text-xs font-bold uppercase"
                        >
                            {isSyncing ? 'Syncing...' : 'Sync Now'}
                        </Button>
                    </div>
                )}

                {view === 'dashboard' && !success && (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Total Clients</p>
                                    <p className="text-sm text-gray-500">{clients.length} active clients</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setView('select-client')}
                            className="w-full bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center gap-3 hover:border-blue-300 transition-colors"
                        >
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">Record Collection</span>
                        </button>
                    </div>
                )}

                {view === 'select-client' && (
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search client name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            {filteredClients.map(client => (
                                <button
                                    key={client.id}
                                    onClick={() => { setSelectedClient(client); setView('enter-collection'); }}
                                    className="w-full bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:border-blue-300 transition-colors"
                                >
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">{client.name}</p>
                                        <p className="text-sm text-gray-500">{client.quarter}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'enter-collection' && selectedClient && (
                    <form onSubmit={handleCollectionSubmit} className="space-y-6">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center font-medium text-gray-600">
                                {selectedClient.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{selectedClient.name}</p>
                                <p className="text-sm text-gray-500">{selectedClient.quarter}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Daily Saving Amount</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    autoFocus
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-blue-500 outline-none py-2 placeholder:text-gray-300"
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-500">FCFA</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Payment Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cash')}
                                    className={cn(
                                        "py-3 rounded-lg text-sm font-medium border transition-all",
                                        paymentMethod === 'cash' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
                                    )}
                                >
                                    Cash
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('mobile_money')}
                                    className={cn(
                                        "py-3 rounded-lg text-sm font-medium border transition-all",
                                        paymentMethod === 'mobile_money' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
                                    )}
                                >
                                    Mobile Money
                                </button>
                            </div>
                        </div>

                        {paymentMethod === 'mobile_money' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Proof of Payment</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className={cn(
                                        "w-full p-4 rounded-lg border-2 border-dashed flex items-center justify-center gap-2",
                                        proofFile ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-gray-50 text-gray-500"
                                    )}>
                                        <Camera className="h-5 w-5" />
                                        <span className="text-sm font-medium">{proofFile ? proofFile.name : "Upload Screenshot"}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={submitting || !amount}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                            >
                                {submitting ? <Loader2 className="animate-spin" /> : 'Confirm Collection'}
                            </Button>
                        </div>
                    </form>
                )}

                {success && (
                    <div className="fixed inset-0 bg-blue-600 z-50 flex items-center justify-center p-6">
                        <div className="text-center text-white space-y-6">
                            <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-12 w-12 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Success!</h2>
                            <p className="text-white/80 font-medium text-lg leading-relaxed max-w-xs mx-auto">
                                {successMessage}
                            </p>
                            <p className="text-xs text-white/50 pt-8 uppercase tracking-widest">Redirecting...</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
