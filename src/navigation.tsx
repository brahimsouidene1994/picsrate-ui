import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Acceuil from './pages/Acceuil';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmptyPage from './pages/EmptyPage';
import Footer from './component/Footer';

export default function Navigation(){
    return (
        // <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<Acceuil />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<EmptyPage />} />
                </Routes>
                <Footer/>

            </Router>
    )
}
