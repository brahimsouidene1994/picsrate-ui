import React from 'react';
import '../../assets/styles/Acceuil.css';
import logo from '../../assets/images/appstore.png';
import imgAppStore from '../../assets/images/appbtnstore.png';
import imgPlayStore from '../../assets/images/playstore.png';
import iconBusiness from '../../assets/images/growth-svgrepo-com.svg';
import iconSocial from '../../assets/images/link-svgrepo-com.svg';
import iconDating from '../../assets/images/gender-svgrepo-com.svg';
import { ButtonContainer } from '../../components/ui/Button'
import { Link } from 'react-router-dom';
import keycloak from '../../keycloak';
import ReactPlayer from 'react-player';

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
        <div className='page-acceuil'>
            <div className='context-section'>
                <div className="context-business">
                    <img src={iconBusiness} alt='business' className='icon' />
                    <h3 className='context-title'>business</h3>
                    <p className='description'>logo, CV picture, business card, etc...</p>
                </div>
                <div className="context-social">
                    <img src={iconSocial} alt='business' className='icon' />
                    <h3 className='context-title'>social</h3>
                    <p className='description'>facebook, instagram, linkedIn, etc...</p>
                </div>
                <div className="context-dating">
                    <img src={iconDating} alt='business' className='icon' />
                    <h3 className='context-title'>dating</h3>
                    <p className='description'>tinder, snapshat,...</p>
                </div>
            </div>
            <div className='app-links'>
                <div className='btns-section'>
                    <p className='first-text'>Sometimes choosing the right picture may give you a headache!</p>
                    <p className='second-text'>Let peoples help you with that {':)'}</p>
                    <p className='third-text'>Download the app now!</p>
                    <div className='btns-download'>
                        {/* <a href='#' target='_blank' rel="noreferrer"> */}
                        <img src={imgAppStore} alt='appStore' className='btn-appStore' />
                        {/* </a>
                        <a href='#' target='_blank' rel="noreferrer"> */}
                        <img src={imgPlayStore} alt='appStore' className='btn-appStore' />
                        {/* </a> */}
                    </div>
                </div>
            </div>
            <div className="auth-section">
                <div className="chape-one"></div>
                <div className="chape-two"></div>
                <div className="text-view">
                    <h2 className='auth-title'>100%, right choice with voting system</h2>
                    <p className='auth-text'>Democracy is the answer</p>
                </div>
                {!auth ?
                    <ButtonContainer onClick={handleLogin}>
                        {/* <Link to='/signup' className="signup_link"> */}
                        Create an account
                        {/* </Link> */}
                    </ButtonContainer>
                    :
                    <ButtonContainer onClick={handleLogout}>
                        {/* <Link to='/signup' className="signup_link"> */}
                        Logout
                        {/* </Link> */}
                    </ButtonContainer>
                }
            </div>
            
            <div className='tuto_video' id="presentation_app">
                <div className="info">
                    <h1 className='info-title'>Pics Rate Video;</h1>
                    <p className='paragraphe'>Watching this video will encourage you to use the app,</p>
                    <p className='paragraphe'>Having fun and getting confidence in yourself is garanted,</p>
                    <p className='paragraphe'>So what are you waiting for!!</p>
                    <p className='paragraphe'>Feel free try it {';)'}</p>
                </div>
                <div className="video-section">
                    {/* <video src="../assets/videos/record.mp4" className='video' controls/> */}
                    <ReactPlayer className='video' url='https://www.youtube.com/watch?v=zd4ALKv8Das&ab_channel=ExpertAcademy' />
                </div>
            </div>
        </div>
    )
}
