import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

export const convertPdfToTxt = async (file: File): Promise<Blob> => {
    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');

    return new Blob([text], { type: 'text/plain' });
};