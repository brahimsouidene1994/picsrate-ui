import React from 'react';
import '../../assets/styles/Header.css';
import Button from 'react-bootstrap/Button';
import { SignUpButton } from '../ui/Button';
import { NavButton } from '../ui/NavButton';
export default function Header() {
    return (
        <div className='header'>
            <div className='header-content'>
                <p className='header-title'>PRate</p>
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
