import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

function parseCSV(text: string) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return { headers: [], rows: [] };
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(l => l.split(',').map(c => c.trim()));
    return { headers, rows };
}

export function CSVImport() {
    const [preview, setPreview] = useState<{ headers: string[]; rows: string[][] } | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const handleFile = (file?: File) => {
        setMessage(null);
        setErrors([]);
        setPreview(null);
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = String(reader.result || '');
            const parsed = parseCSV(text);
            // Basic validation: detect template type
            const h = parsed.headers.map(h => h.toLowerCase());
            const errs: string[] = [];
            if (h.includes('full_name') && h.includes('phone')) {
                // clients_import expected headers
                const required = ['full_name', 'phone', 'balance', 'status'];
                required.forEach(r => { if (!h.includes(r)) errs.push(`Missing required column: ${r}`); });
            } else if (h.includes('client_phone') && h.includes('transaction_type')) {
                const required = ['client_phone', 'transaction_type', 'amount', 'date'];
                required.forEach(r => { if (!h.includes(r)) errs.push(`Missing required column: ${r}`); });
            } else {
                errs.push('Unknown CSV template. Use clients_import.csv or transactions_import.csv');
            }

            setErrors(errs);
            setPreview(parsed);
        };
        reader.readAsText(file);
    };

    const handleApply = () => {
        if (!preview) return;
        if (errors.length) { setMessage('Cannot apply: fix errors first'); return; }
        // Mock applying migration
        setMessage('Applying migration (mock) — check console for payload');
        console.log('MIGRATION PREVIEW', preview);
        setTimeout(() => setMessage('Migration applied (mock). Records: ' + preview.rows.length), 1000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase">CSV Migration</h2>
                    <p className="text-sm text-brand-dark/60">Upload `clients_import.csv` or `transactions_import.csv` and preview before applying (frontend-only mock).</p>
                </div>
                <div className="flex gap-2">
                    <a href="/clients_import.csv" download className="inline-block">
                        <Button variant="outline">Download clients_import.csv</Button>
                    </a>
                    <a href="/transactions_import.csv" download className="inline-block">
                        <Button variant="outline">Download transactions_import.csv</Button>
                    </a>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-black">Upload CSV</CardTitle>
                    <CardDescription className="text-xs">Preview & validate before applying. This is client-side only (no DB).</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <input type="file" accept=".csv,text/csv" onChange={(e) => handleFile(e.target.files?.[0])} />

                        {errors.length > 0 && (
                            <div className="bg-rose-50 p-3 rounded">
                                <strong className="font-black">Errors:</strong>
                                <ul className="list-disc pl-6">
                                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        {preview && (
                            <div>
                                <div className="overflow-x-auto border rounded">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-brand-dark text-white">
                                                {preview.headers.map((h, i) => <th key={i} className="px-3 py-2 text-xs font-black">{h}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preview.rows.slice(0, 10).map((r, i) => (
                                                <tr key={i} className="odd:bg-white even:bg-gray-50">
                                                    {r.map((c, j) => <td key={j} className="px-3 py-2 text-sm">{c}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <Button onClick={handleApply} variant="secondary">Apply Migration (Mock)</Button>
                                    <Button variant="outline" onClick={() => { setPreview(null); setErrors([]); setMessage(null); }}>Clear</Button>
                                </div>
                            </div>
                        )}

                        {message && <div className="text-sm font-bold">{message}</div>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CSVImport;
