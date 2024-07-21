import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import SelectAndButton from './SelectAndButton';
import DownloadLinks from './DownloadLinks';
import { convertPdfToJpg, convertPdfToPng, convertPdfToTxt, convertExcelToCsv, convertExcelToPdf, convertTextToPdf } from '../../services/fileConversionService';

interface DocumentConverterProps {
    files: { file: File }[];
}

const DocumentConverter: React.FC<DocumentConverterProps> = ({ files }) => {
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const [targetFormat, setTargetFormat] = useState<string>('jpg');
    const [downloadLinks, setDownloadLinks] = useState<{ link: string, size: number, name: string }[]>([]);
    const [buttonText, setButtonText] = useState<string>('Dönüştür');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const mimeTypeToLabel: { [key: string]: string } = {
        'jpg': 'JPG',
        'png': 'PNG',
        'txt': 'TXT',
        'docx': 'DOCX',
        'csv': 'CSV',
        'pdf': 'PDF',
       
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
                const safeFileName = `${selectedFile.name.split('.')[0]}_Converted.${targetFormat}`;
                links.push({ link, size: convertedBlob.size, name: safeFileName });
                saveAs(convertedBlob, safeFileName);
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
            case 'application/pdf':
                if (format === 'jpg') {
                    return await convertPdfToJpg(file);
                } else if (format === 'png') {
                    return await convertPdfToPng(file);
                } else if (format === 'txt') {
                    return await convertPdfToTxt(file);
                }
                break;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel':
                if (format === 'csv') {
                    return await convertExcelToCsv(file);
                } else if (format === 'pdf') {
                    return await convertExcelToPdf(file);
                }
                break;
            case 'text/plain':
                if (format === 'pdf') {
                    return await convertTextToPdf(file);
                }
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
           
            default:
                throw new Error(`Conversion from ${file.type} to ${format} is not supported.`);
        }
        throw new Error(`Conversion from ${file.type} to ${format} is not supported.`);
    };

    const getConversionOptions = (fileType: string) => {
        switch (fileType) {
            case 'application/pdf':
                return ['jpg', 'png', 'txt'];
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.ms-excel':
                return ['csv', 'pdf'];
            case 'text/plain':
                return ['pdf'];
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/msword':
                return ['pdf'];
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

export default DocumentConverter;