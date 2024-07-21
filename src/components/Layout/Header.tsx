import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SimpleWeatherDisplay from '../SimpleWeatherDisplay/simpleWeatherDisplay';

import './Header.css';

const Header: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        setCurrentDate(date.toLocaleDateString('tr-TR', options));
    }, []);

    return (
        <AppBar position="static" className="header-appbar" style={{ backgroundColor: '#003366' }}>
            <Toolbar className="header-toolbar">
                <Box className="header-left">
                    <Typography variant="h6" component="div" className="header-title">
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <img style={{ width: "250px" }} src="/logo.png" alt="Logo" />
                        </a>
                    </Typography>
                </Box>
                <Box className="header-right">
                    <SimpleWeatherDisplay />
                    <Box className="header-divider" />
                    <Typography variant="body1" component="div" className="header-date">
                        {currentDate}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;