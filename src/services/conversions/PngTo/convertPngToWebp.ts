export const convertPngToWebp = async (file: File): Promise<Blob> => {
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

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Canvas'a blob dönüþtürme hatasý"));
                    }
                }, 'image/webp');
            };
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};