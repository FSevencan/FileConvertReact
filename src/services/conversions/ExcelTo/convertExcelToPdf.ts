import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import * as XLSX from 'xlsx';

export const convertExcelToPdf = async (file: File): Promise<Blob> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const pdfDoc = await PDFDocument.create();
            pdfDoc.registerFontkit(fontkit);
            const fontBytes = await fetch('/Roboto-Regular.ttf').then(res => res.arrayBuffer());
            const customFont = await pdfDoc.embedFont(fontBytes);
            let page = pdfDoc.addPage([600, 900]);
            const { width, height } = page.getSize();
            const fontSize = 12;
            const margin = 40;
            const maxWidth = width - margin * 2;
            const lines = XLSX.utils.sheet_to_csv(worksheet).split('\n');
            let y = height - margin;

            const measureTextWidth = (text: string) => customFont.widthOfTextAtSize(text, fontSize);

            const drawTextLine = (line: string) => {
                const textWidth = measureTextWidth(line);
                if (textWidth > maxWidth) {
                    const words = line.split(' ');
                    let lineText = '';
                    for (let i = 0; i < words.length; i++) {
                        const word = words[i];
                        const testLine = lineText + word + ' ';
                        const testLineWidth = measureTextWidth(testLine);
                        if (testLineWidth > maxWidth && i > 0) {
                            page.drawText(lineText.trim(), { x: margin, y, size: fontSize, font: customFont });
                            y -= fontSize * 1.2;
                            lineText = word + ' ';
                        } else {
                            lineText = testLine;
                        }
                    }
                    page.drawText(lineText.trim(), { x: margin, y, size: fontSize, font: customFont });
                    y -= fontSize * 1.2;
                } else {
                    page.drawText(line, { x: margin, y, size: fontSize, font: customFont });
                    y -= fontSize * 1.2;
                }
            };

            for (const line of lines) {
                if (y - fontSize * 1.2 < margin) {
                    page = pdfDoc.addPage([600, 900]);
                    y = height - margin;
                }
                drawTextLine(line);
            }

            const pdfBytes = await pdfDoc.save();
            resolve(new Blob([pdfBytes], { type: 'application/pdf' }));
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};