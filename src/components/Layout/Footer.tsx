import React from 'react';
import { Box, Typography, Grid, Divider, Container, Link } from '@mui/material';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="div" gutterBottom className="footer-heading">
                            QR Kod
                        </Typography>
                        <img src="/qr-code.png" alt="QR Kod" className="footer-image" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="div" gutterBottom className="footer-heading">
                            Dosya Dönüştürme
                        </Typography>
                        <Typography variant="body2" className="footer-text">
                            Dosyalarınızı sayfaya sürükleyip bırakın ve bir çıktı biçimi seçin. "Dönüştür" butonuna tıklayarak işlemi başlatın.
                        </Typography>
                        <Typography variant="body2" className="footer-text">
                            Tüm dönüşümler tarayıcınızda gerçekleşir, bu nedenle dosyalarınız güvende kalır.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="div" gutterBottom className="footer-heading">
                            Kategoriler
                        </Typography>
                        <Typography variant="body2" className="footer-text">Görsel Dönüştürme</Typography>
                        <Typography variant="body2" className="footer-text">Belge Dönüştürme</Typography>
                        <Typography variant="body2" className="footer-text">Ses Dönüştürme</Typography>
                        <Typography variant="body2" className="footer-text">Video Dönüştürme</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="div" gutterBottom className="footer-heading">
                            Kullanıcı Yorumları
                        </Typography>
                        <Typography variant="body2" className="footer-text">"Hızlı ve güvenilir bir servis, teşekkürler!" - Ahmet K.</Typography>
                        <Typography variant="body2" className="footer-text">"Dosyalarımı kolayca dönüştürebildim." - Ayşe T.</Typography>
                        <Typography variant="body2" className="footer-text">"Harika bir uygulama, çok memnunum." - Mehmet Y.</Typography>
                    </Grid>
                </Grid>
                <Divider className="footer-divider" />

                <Box className="footer-tags">
                    
                    <Typography component="span" variant="body2" className="footer-tag">
                        JPG to PDF
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        JPG to PNG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        JPG to WEBP
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PDF to JPG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PDF to PNG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PDF to TXT
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PNG to JPG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PNG to PDF
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PNG to SVG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        PNG to WEBP
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        SVG to PNG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        Excel to CSV
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        Excel to PDF
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        Text to PDF
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        WEBP to JPG
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        WEBP to PDF
                    </Typography>
                    <Typography component="span" variant="body2" className="footer-tag">
                        WEBP to PNG
                    </Typography>
                </Box>

                <Box className="footer-copyright" textAlign="center">
                    <Typography variant="body2" className="footer-text">
                        © 2024 Developed and Designed by&nbsp;
                        <Link href="https://www.fatihsevencan.com/" target="_blank" className="footer-link">
                            Fatih Sevencan
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;