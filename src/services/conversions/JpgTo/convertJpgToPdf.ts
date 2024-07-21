import { jsPDF } from 'jspdf';

export const convertJpgToPdf = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);

                const pdf = new jsPDF({
                    orientation: img.width > img.height ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [img.width, img.height]
                });
                const imgData = canvas.toDataURL('image/jpeg');
                pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
                const pdfBlob = pdf.output('blob');
                resolve(pdfBlob);
            };
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};