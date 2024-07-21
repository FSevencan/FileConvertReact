import React from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface SelectAndButtonProps {
    targetFormat: string;
    setTargetFormat: (value: string) => void;
    getConversionOptions: (fileType: string) => string[];
    selectedFileType: string;
    convertFile: () => void;
    buttonText: string;
    isButtonDisabled: boolean;
    mimeTypeToLabel: { [key: string]: string };
}

const mimeTypeToLabel: { [key: string]: string } = {
    'application/pdf': 'PDF',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
    'application/vnd.ms-excel': 'Excel',
    'text/plain': 'Text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'application/msword': 'Word',
 
};

const SelectAndButton: React.FC<SelectAndButtonProps> = ({
    targetFormat,
    setTargetFormat,
    getConversionOptions,
    selectedFileType,
    convertFile,
    buttonText,
    isButtonDisabled,
}) => {
    const fileTypeLabel = mimeTypeToLabel[selectedFileType] || selectedFileType.split('/')[1].toUpperCase();
    return (
        <div className="convert-controls">
            <select className="convert-select" onChange={(e) => setTargetFormat(e.target.value)} value={targetFormat}>
                {getConversionOptions(selectedFileType).map((option) => (
                    <option key={option} value={option}>{`${fileTypeLabel} to ${option.toUpperCase()}`}</option>
                ))}
            </select>
            <button onClick={convertFile} className="convert-button" disabled={isButtonDisabled}>
                <FaSyncAlt className="icon" /> {buttonText}
            </button>
        </div>
    );
};

export default SelectAndButton;