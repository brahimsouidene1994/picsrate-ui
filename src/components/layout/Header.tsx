import React from 'react';
import '../../assets/styles/Header.css';
import Button from 'react-bootstrap/Button';
import { SignUpButton } from '../ui/Button';
import { NavButton } from '../ui/NavButton';
import Logo from '../../assets/images/logo-64-gradiant.png';
import { useAppSelector } from '../../hooks/stateHooks';
import { NavLink } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
export default function Header() {
    const { keycloak } = useKeycloak();
    const auth = useAppSelector(state => state.auth.value)

    const handleLogin = () => {
        keycloak.login();
    }
    const handleLogout = () => {
        const redirectUri = window.location.origin;
        keycloak.logout({
            redirectUri
        });
    }
    const handleRegister = () => {
        keycloak.register();
    }
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <img src={Logo} className='log-image' alt='logo-image' />
                    <h1>PicRate</h1>
                </div>
                <div className='header-navigation'>
                    <NavButton>
                        <NavLink to='/app' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                            Application
                        </NavLink>
                    </NavButton>
                    {
                        auth ?
                            <>
                                <NavButton>
                                    <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                                        Home
                                    </NavLink>
                                </NavButton>
                                <NavButton>
                                    <NavLink to='/new' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                                        New Test
                                    </NavLink>
                                </NavButton>
                                <NavButton onClick={handleLogout}>
                                    Logout
                                </NavButton>
                            </>
                            :
                            <>
                                <NavButton onClick={handleLogin}>
                                    Login
                                </NavButton>
                                <SignUpButton onClick={handleRegister}>
                                    SignUp
                                </SignUpButton>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
