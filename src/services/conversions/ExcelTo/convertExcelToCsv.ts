import * as XLSX from 'xlsx';

export const convertExcelToCsv = async (file: File): Promise<Blob> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
            resolve(new Blob([csv], { type: 'text/csv' }));
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};