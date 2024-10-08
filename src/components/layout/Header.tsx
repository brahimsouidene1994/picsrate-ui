import React from 'react';
import '../../assets/styles/Header.css';
import Button from 'react-bootstrap/Button';
import { SignUpButton } from '../ui/Button';
import { NavButton } from '../ui/NavButton';
import Logo from '../../assets/images/logo-64.png';
import { useAppSelector } from '../../hooks/stateHooks';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
export default function Header() {
    const { keycloak } = useKeycloak();
    const auth = useAppSelector(state => state.auth.value)

    const handleLogin = () => {
        keycloak.login();
    }
    const handleLogout = () => {
        keycloak.logout();
    }
    const handleRegister = () => {
        keycloak.register();
    }
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <img src={Logo} className='log-image' alt='logo-image' />
                    <h1>PRate</h1>
                </div>
                <div className='header-navigation'>
                    <div className='header-navigation-item'>
                        <NavButton>
                            Application
                        </NavButton>
                    </div>
                    {
                        auth ?
                            <>
                                <div className='header-navigation-item'>
                                    <NavButton>
                                        <Link to='/' >
                                            Home
                                        </Link>
                                    </NavButton>
                                </div>
                                <div className='header-navigation-item'>
                                    <NavButton>
                                        <Link to='/new' >
                                            New Test
                                        </Link>
                                    </NavButton>
                                </div>
                                <div className='header-navigation-item'>
                                    <NavButton onClick={handleLogout}>
                                        Logout
                                    </NavButton>
                                </div>
                            </>
                            :
                            <>
                                <div className='header-navigation-item'>
                                    {/* <Button variant="outline-primary">Sign Up</Button>{' '} */}
                                    <NavButton onClick={handleLogin}>
                                        Login
                                    </NavButton>
                                </div>
                                <div className='header-navigation-item'>
                                    {/* <Button variant="outline-primary">Sign Up</Button>{' '} */}
                                    <SignUpButton onClick={handleRegister}>
                                        SignUp
                                    </SignUpButton>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
