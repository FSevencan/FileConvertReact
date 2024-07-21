import React from 'react';
import './App.css';
import './index.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Convert from './components/Convert/Convert';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Convert />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                />
                <Footer />
            </div>
        </Router>
    );
}

export default App;