import React from 'react';
import '../../assets/styles/Splash.css'
import Logo from '../../assets/images/logo-128-gradiant.png';
import LinearProgress from '@mui/material/LinearProgress';
export default function Splash() {
    return (
        <div className='body-splash'>
            <div>
                <img src={Logo} alt='logo-image' />
            </div>
            <div style={{width:128}}>
                <LinearProgress/>
            </div>
        </div>
    )
}
