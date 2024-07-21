import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import SelectAndButton from './SelectAndButton';
import DownloadLinks from './DownloadLinks';
import {
    convertPngToJpg,
    convertPngToPdf,
    convertPngToSvg,
    convertPngToWebp,
    convertJpgToPng,
    convertJpgToPdf,
    convertJpgToWebp,
    convertWebpToJpg,
    convertWebpToPng,
    convertWebpToPdf,
    convertSvgToPng
} from '../../services/imageConversionService';

interface ImageConverterProps {
    files: { file: File }[];
}

const ImageConverter: React.FC<ImageConverterProps> = ({ files }) => {
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [targetFormat, setTargetFormat] = useState<string>('png');
    const [downloadLinks, setDownloadLinks] = useState<{ link: string, size: number, name: string }[]>([]);
    const [buttonText, setButtonText] = useState<string>('Dönüştür');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const mimeTypeToLabel: { [key: string]: string } = {
        'image/jpeg': 'JPEG',
        'image/jpg': 'JPG',
        'image/png': 'PNG',
        'image/webp': 'WEBP',
        'image/svg+xml': 'SVG',
    };

    useEffect(() => {
        if (files.length > 0) {
            const options = getConversionOptions(files[0].file.type);
            if (options.length > 0) {
                setTargetFormat(options[0]);
            }
            setButtonText('Dönüştür');
            setIsButtonDisabled(false);
        }
    }, [files]);

    const convertFile = async () => {
        if (files.length === 0) {
            toast.error("Lütfen en az bir dosya seçin.");
            return;
        }

        setIsConverting(true);

        const links: { link: string, size: number, name: string }[] = [];
        for (const fileWrapper of files) {
            const selectedFile = fileWrapper.file;

            try {
                const convertedBlob = await convertFileFormat(selectedFile, targetFormat);
                const link = URL.createObjectURL(convertedBlob);
                links.push({ link, size: convertedBlob.size, name: `${selectedFile.name.split('.')[0]}_Converted.${targetFormat}` });
                saveAs(convertedBlob, `${selectedFile.name.split('.')[0]}_Converted.${targetFormat}`);
            } catch (error) {
                toast.error(`Çeviri sırasında bir hata oluştu: ${selectedFile.name}`);
                console.error(error);
            }
        }

        setDownloadLinks(links);
        setIsConverting(false);
        if (links.length > 0) {
            toast.success("Çeviri tamamlandı.");
            setButtonText('Dönüştürüldü');
            setIsButtonDisabled(true);
        }
    };

    const convertFileFormat = async (file: File, format: string): Promise<Blob> => {
        switch (file.type) {
            case 'image/png':
                if (format === 'jpg') {
                    return await convertPngToJpg(file);
                } else if (format === 'pdf') {
                    return await convertPngToPdf(file);
                } else if (format === 'svg') {
                    return await convertPngToSvg(file);
                } else if (format === 'webp') {
                    return await convertPngToWebp(file);
                }
                break;
            case 'image/jpeg':
            case 'image/jpg':
                if (format === 'png') {
                    return await convertJpgToPng(file);
                } else if (format === 'pdf') {
                    return await convertJpgToPdf(file);
                } else if (format === 'webp') {
                    return await convertJpgToWebp(file);
                }
                break;
            case 'image/webp':
                if (format === 'jpg') {
                    return await convertWebpToJpg(file);
                } else if (format === 'png') {
                    return await convertWebpToPng(file);
                } else if (format === 'pdf') {
                    return await convertWebpToPdf(file);
                }
                break;
            case 'image/svg+xml':
                if (format === 'png') {
                    return await convertSvgToPng(file);
                }
                break;
            default:
                throw new Error(`Conversion from ${file.type} to ${format} is not supported.`);
        }
        throw new Error(`Conversion from ${file.type} to ${format} is not supported.`);
    };

    const getConversionOptions = (fileType: string) => {
        switch (fileType) {
            case 'image/jpeg':
            case 'image/jpg':
                return ['png', 'pdf', 'webp'];
            case 'image/png':
                return ['jpg', 'pdf', 'svg', 'webp'];
            case 'image/webp':
                return ['jpg', 'png', 'pdf'];
            case 'image/svg+xml':
                return ['png'];
            default:
                return [];
        }
    };

    const selectedFile = files[0]?.file;

    return (
        <div>
            {selectedFile && (
                <div className="converter-section">
                    <SelectAndButton
                        targetFormat={targetFormat}
                        setTargetFormat={setTargetFormat}
                        getConversionOptions={getConversionOptions}
                        selectedFileType={selectedFile.type}
                        convertFile={convertFile}
                        buttonText={buttonText}
                        isButtonDisabled={isButtonDisabled}
                        mimeTypeToLabel={mimeTypeToLabel}
                    />
                    {isConverting && (
                        <div className="loader-container">
                            <ThreeDots
                                color="#003366"
                                height={80}
                                width={80}
                            />
                        </div>
                    )}
                    {downloadLinks.length > 0 && <DownloadLinks downloadLinks={downloadLinks} />}
                </div>
            )}
        </div>
    );
};

export default ImageConverter;