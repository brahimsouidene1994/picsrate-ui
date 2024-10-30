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

    const handleLogin = () => {
        oidc.signinRedirect();
    }
    const handleLogout = () => {
        oidc.signoutRedirect();
    }
    const handleRegister = () => {
        oidc.signinRedirect();
      };
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <img src={Logo} className='log-image' alt='logo-image' />
                    <h1>PicRate</h1>
                </div>
                <div className='header-navigation'>
                    <NavButton>
                        <a href='#application' className={'inactive-link'}>
                            Application
                        </a>
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
                                <NavButton>
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
