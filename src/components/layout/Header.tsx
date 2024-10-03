import React from 'react';
import '../../assets/styles/Header.css';
import Button from 'react-bootstrap/Button';
import { SignUpButton } from '../ui/Button';
import { NavButton } from '../ui/NavButton';
import Logo from '../../assets/images/logo-64.png';
export default function Header() {
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <img src={Logo} className='log-image' alt='logo-image'/>
                    <h1>PRate</h1>
                </div>
                <div className='header-navigation'>
                    <div className='header-navigation-item'>
                        <NavButton>
                            Application
                        </NavButton>
                        </div>
                    <div className='header-navigation-item'>
                        <NavButton>
                            Login
                        </NavButton>
                    </div>
                    <div className='header-navigation-item'>
                        {/* <Button variant="outline-primary">Sign Up</Button>{' '} */}
                        <SignUpButton>SignUp</SignUpButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
