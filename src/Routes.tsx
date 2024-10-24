import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Acceuil from './pages/acceuil';
import Home from './pages/home';
import NotFound from './pages/not_found';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { useAppSelector, useAppDispatch } from './hooks/stateHooks';
import { disableAuth, enableAuth } from './services/state/reducers/auth';
import NewTest from './pages/new-test';
import Details from './pages/details';
import Vote from './pages/vote';
import { useAuth } from "react-oidc-context";
export default function Navigation() {
    const oidc = useAuth();
    const auth = useAppSelector((state) => state.auth.value);
    const dispatch = useAppDispatch()
    React.useEffect(() => { checkAuth() });

    const checkAuth = async (): Promise<void> => {
        console.log("Checking...", process.env.REACT_APP_KEYCLOAK_API)
        if (oidc.isAuthenticated)
            dispatch(enableAuth())
        else dispatch(disableAuth());
    };
    return (
        // <React.Fragment>
        <Router>
            <Header />
            <div className='body'>
                {
                    auth ?
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<NewTest />} />
                            <Route path="/vote" element={<Vote />} />
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        :
                        <Routes>
                            <Route path="/" element={<Acceuil />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                }
            </div>
            <Footer />

        </Router>
    )
}
