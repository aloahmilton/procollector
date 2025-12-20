import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export interface ReportData {
    title: string;
    headers: string[];
    rows: any[][];
    filename: string;
}

export const generatePDFReport = (data: ReportData) => {
    const doc = new jsPDF();

    // Add Logo Placeholder (Text for now or real image if available)
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // brand-dark
    doc.text('PROCOLLECTOR', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(46, 204, 113); // brand-green
    doc.text('OFFICIAL SETTLEMENT REPORT', 14, 28);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 38);

    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text(data.title.toUpperCase(), 14, 50);

    autoTable(doc, {
        startY: 60,
        head: [data.headers],
        body: data.rows,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 8, cellPadding: 4 },
        alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount} - Altonixa Group Ltd`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }

    doc.save(`${data.filename}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const generateExcelReport = (data: ReportData) => {
    const worksheet = XLSX.utils.aoa_to_sheet([
        [data.title],
        [`Generated: ${format(new Date(), 'PPpp')}`],
        [],
        data.headers,
        ...data.rows
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    XLSX.writeFile(workbook, `${data.filename}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};
