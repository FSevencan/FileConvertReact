import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageConverter from './ImageConverter';
import DocumentConverter from './DocumentConverter';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MAX_FILE_SIZE_MB = 25;

const Convert: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [fileType, setFileType] = useState<string | null>(null);

    useEffect(() => {
        if (files.length > 3) {
            toast.error("En fazla 3 dosya yükleyebilirsiniz.", { autoClose: 10000 });
            setFiles([]);
            setFileType(null);
            return;
        }

        if (files.length > 0) {
            const fileType = files[0].file.type;
            const isSameFormat = files.every((fileItem: any) => fileItem.file.type === fileType);

            if (!isSameFormat) {
                toast.error("Lütfen tüm dosyaların aynı formatta olduğundan emin olun. Farklı formatlardaki dosyaları yüklemek, dönüştürme hatalarına neden olabilir.", { autoClose: 12000 });
                setFiles([]);
                setFileType(null);
                return;
            }

            const oversizedFiles = files.filter((fileItem: any) => fileItem.file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
            if (oversizedFiles.length > 0) {
                toast.error(`Her dosya en fazla ${MAX_FILE_SIZE_MB} MB olabilir. Lütfen boyutu 25 MB'den küçük dosyalar yükleyin.`, { autoClose: 10000 });
                setFiles([]);
                setFileType(null);
                return;
            }

            setFileType(fileType);
        } else {
            setFileType(null);
        }
    }, [files]);

    const handleUpdateFiles = (fileItems: any) => {
        setFiles(fileItems);
    };

    const renderConverter = () => {
        if (fileType?.startsWith('image/')) {
            return <ImageConverter files={files} />;
        } else if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType?.startsWith('text/')) {
            return <DocumentConverter files={files} />;
        }
    };

    return (
        <div className="main-content">
            <div className="convert-box">
                <h1 className="convert-title">Dosya Dönüştürme Aracı</h1>
                <p className="convert-subtitle">Dosyalarınızı hızlı ve güvenli bir şekilde istediğiniz formata dönüştürün.</p>
                <div className="filepond-wrapper">
                    <FilePond
                        acceptedFileTypes={["image/png", "image/jpeg", "image/webp", "application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/plain"]}
                        allowReorder={true}
                        files={files}
                        onupdatefiles={handleUpdateFiles}
                        allowMultiple={true}
                        maxFiles={3}
                        name="filepond"
                        labelIdle='Dosyalarınızı sürükleyip bırakın veya <span className="filepond--label-action">gözatın</span>'
                    />
                </div>
                <p className="info-text">* Maksimum 3 dosya yükleyebilirsiniz ve her dosya en fazla 25 MB olabilir.</p>
                {renderConverter()}
            </div>
            <div className="features-section">
                <div className="feature">
                    <h3>Hızlı ve kolay</h3>
                    <p>Dosyalarınızı sayfaya sürükleyin ve bırakın, bir çıktı biçimi seçin ve "Dönüştür" butonuna tıklayın. İşlemin tamamlanması için biraz bekleyin.</p>
                </div>
                <div className="feature">
                    <h3>Tarayıcı Tabanlı İşlem</h3>
                    <p>Tüm işlemler tarayıcınızda gerçekleşir, bu sayede dosyalarınız hiçbir zaman sunucuya yüklenmez ve tamamen güvende kalır.</p>
                </div>
                <div className="feature">
                    <h3>Ücretsiz Dönüşümler</h3>
                    <p>Tüm dönüşüm işlemleri tamamen ücretsizdir. Hiçbir gizli ücret veya sınırlama yoktur.</p>
                </div>
            </div>
        </div>
    );
};

export default Convert;