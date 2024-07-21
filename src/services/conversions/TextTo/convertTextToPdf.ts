import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export const convertTextToPdf = async (file: File): Promise<Blob> => {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder('utf-8', { fatal: true }).decode(arrayBuffer);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fetch('/Roboto-Regular.ttf').then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    let page = pdfDoc.addPage([600, 900]);

    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 40;
    const maxWidth = width - margin * 2;

    const textLines = text.split('\n');
    const lineHeight = fontSize * 1.2;
    let y = height - margin;

    const measureTextWidth = (text: string) => {
        return customFont.widthOfTextAtSize(text, fontSize);
    };

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
                    y -= lineHeight;
                    lineText = word + ' ';
                } else {
                    lineText = testLine;
                }
            }
            page.drawText(lineText.trim(), { x: margin, y, size: fontSize, font: customFont });
            y -= lineHeight;
        } else {
            page.drawText(line, { x: margin, y, size: fontSize, font: customFont });
            y -= lineHeight;
        }
    };

    for (const line of textLines) {
        if (y - lineHeight < margin) {
            page = pdfDoc.addPage([600, 900]);
            y = height - margin;
        }
        drawTextLine(line);
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};