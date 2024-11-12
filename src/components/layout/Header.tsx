import React from 'react';
import '../../assets/styles/Header.css';
import { SignUpButton } from '../ui/Button';
import { NavButton } from '../ui/NavButton';
import Logo from '../../assets/images/logo-64-gradiant-scaled.png';
import { useAppSelector } from '../../hooks/stateHooks';
import { NavLink } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
export default function Header() {
    const oidc = useAuth();
    const auth = useAppSelector(state => state.auth.value)
    const [isOpenResponsive, setIsOpenResponsive] = React.useState(false);

    const handleLogin = () => {
        handleResponsiveMenuToggle()
        oidc.signinRedirect();
    }
    const handleLogout = () => {
        handleResponsiveMenuToggle()
        oidc.signoutRedirect();
    }
    const handleRegister = () => {
        handleResponsiveMenuToggle()
        oidc.signinRedirect();
    };
    const handleResponsiveMenuToggle = () => {
        setIsOpenResponsive(!isOpenResponsive);
    }
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <img src={Logo} className='log-image' alt='logo-image' />
                    <h1>PicRate</h1>
                </div>
                <div className="hamburger" onClick={handleResponsiveMenuToggle}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className={`header-navigation ${isOpenResponsive ? 'open' : ''}`}>
                    {
                        auth ?
                            <>
                                <NavButton onClick={handleResponsiveMenuToggle}>
                                    <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                                        Home
                                    </NavLink>
                                </NavButton>
                                <NavButton onClick={handleResponsiveMenuToggle}>
                                    <NavLink to='/new' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                                        New Test
                                    </NavLink>
                                </NavButton >
                                <NavButton onClick={handleResponsiveMenuToggle}>
                                    <NavLink to='/vote' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
                                        Vote
                                    </NavLink>
                                </NavButton>
                                <NavButton onClick={handleLogout}>
                                    Logout
                                </NavButton>
                            </>
                            :
                            <>
                                <NavButton onClick={handleResponsiveMenuToggle}>
                                    <a href='#application' className={'inactive-link'}>
                                        Application
                                    </a>
                                </NavButton>
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
