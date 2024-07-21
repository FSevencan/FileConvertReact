export const convertPngToSvg = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const svgBlob = new Blob([e.target?.result as string], { type: 'image/svg+xml' });
            resolve(svgBlob);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};