import React from 'react';
import '../../assets/styles/Acceuil.css';
import DatingImg from '../../assets/images/date.jpg';
import { ButtonContainer } from '../../components/ui/Button'
import { Link } from 'react-router-dom';
import keycloak from '../../keycloak';
import ReactPlayer from 'react-player';
import { Card } from '../../components/ui/Card';

type PropsAuth = {
    auth: boolean,
}
export default function Acceuil({ auth }: PropsAuth) {
    React.useEffect(() => {
        // window.alert("Sorry!! I'm still working on deployment phase but you can watch the pre release of the app if you scroll down :) & if you want to contact me this is my email souidenebrahim@gmail.com");
    }, [])

    const handleLogin = () => {
        keycloak.login();
    }
    const handleLogout = () => {
        keycloak.logout();
    }
    return (
        <div className='acceuil'>
            <div className='section-one'>
                <div className='first'>
                    <Card className='card'>
                        <div className='card-header'>
                            <h2>Tinder</h2>
                        </div>
                        <div className='card-body'>
                            <img src={DatingImg} className='image' alt='card-image'/>
                            <div className='card-content'>
                                <div className='context'>
                                    <h2></h2>
                                    <h2>Attractive</h2>
                                </div>
                                <div className='result'>
                                    <h2>Social</h2>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            
                        </div>
                    </Card>
                </div>
                <div className='separator'></div>
                <div className='second'>
                    <h1 className='title'>Struggling to select the right picture ?</h1>
                    <span className='desc'>Just upload your picture and let the community decide for you</span>
                </div>
            </div>

            <div className='section-two'>

            </div>
        </div>
    )
}
