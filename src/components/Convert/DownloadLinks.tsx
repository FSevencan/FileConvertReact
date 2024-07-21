import React from 'react';
import { FaDownload } from 'react-icons/fa';

interface DownloadLinksProps {
    downloadLinks: { link: string, size: number, name: string }[];
}

const DownloadLinks: React.FC<DownloadLinksProps> = ({ downloadLinks }) => {
    return (
        <div className="file-info-container">
            {downloadLinks.map((file, index) => (
                <div key={index} className="file-info">
                    <div className="file-name" title={decodeURIComponent(file.name)}>
                        {decodeURIComponent(file.name)}
                    </div>
                    <div className="file-size">Boyut: {(file.size / 1024).toFixed(2)} KB</div>
                    <a href={file.link} download={decodeURIComponent(file.name)} className="download-link">
                        <FaDownload className="download-icon" /> İndir
                    </a>
                </div>
            ))}
            <p className="note">
                *Eğer dosya otomatik olarak inmediyse, yukarıdaki "İndir" linkini kullanabilirsiniz.
            </p>
        </div>
    );
};

export default DownloadLinks;