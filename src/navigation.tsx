import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import keycloak from 'keycloak-js';
import Acceuil from './pages/Acceuil';
import Home from './pages/Home';
import Signup from './pages/Signup';
import EmptyPage from './pages/EmptyPage';
import Footer from './component/Footer';

type PropsAuth={
    auth: boolean,
}
export default function Navigation({auth}:PropsAuth){
    return (
        // <React.Fragment>
        <Router>
            <Routes>
                <Route path="/" element={<Acceuil auth={auth}/>} />
                {
                    // Keycloak callback
                    // window.onBeforeunload = () => {
                    //     keycloak.logout();
                    // };

                    // Keycloak login and render app
                    // window.onload = () => {
                    // keycloak.({ onLoad: 'login-required' })
                    //    .then(authenticated => {
                    //         if (authenticated) {
                    //             ReactDOM.render(
                    //                 <React.StrictMode>
                    //                 <App />
                    //                 </React.StrictMode>,
                    //                 document.getElementById('root')
                    //             );
                    //         } else {
                    //             keycloak.login();
                    //         }
                    //     })
                    //    .catch(() => {
                    //         console.error('Keycloak initialization failed');
                    //     });
                    // };
                }
                {auth&&<Route path="/home" element={<Home />} />}
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<EmptyPage />} />
            </Routes>
            <Footer/>

        </Router>
    )
}
