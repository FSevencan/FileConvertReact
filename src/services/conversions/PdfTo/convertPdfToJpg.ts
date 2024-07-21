import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

export const convertPdfToJpg = async (file: File): Promise<Blob> => {
    const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Failed to get 2D context');
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Canvas toBlob failed'));
            }
        }, 'image/jpeg');
    });
};