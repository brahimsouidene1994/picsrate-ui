import BusinessImg from '../../assets/images/04.jpg';
import HeartImg from '../../assets/images/heart.png';
import BagImg from '../../assets/images/bag.png';
import SocialImg from '../../assets/images/social.png';
import imgAppStore from '../../assets/images/appbtnstore.png';
import imgPlayStore from '../../assets/images/playstore.png';
import '../../assets/styles/Acceuil.css';
import { CATEGORY } from 'services/models/contants/Category';
import { Box, Typography } from '@mui/material';
import TestDetails from '../../components/ui/TestDetails';
import TestCards from '../../components/ui/TestCards';
import { FakeVotes } from '../../utils/FakeData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Acceuil() {
    const theme = useTheme();

    // Check for specific breakpoints
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // for small screens (e.g., mobile)
    return (
        <div className='acceuil'>
            <div className='section-one'>
                <div className='first'>
                    <div className='dots'></div>
                    <div className='dots-two'></div>
                    <TestCards />
                </div>
                <div className='second'>
                    <h1 className='title'>Struggling to select the right picture ?</h1>
                    <span className='desc'>Just upload your picture and let the community decide for you</span>
                </div>
            </div>
            <div className='section-two'>
                <div className='first'>
                    <Typo text={'How it works'} size={64} bold={true} />
                    <Typo text={'Follow Up Tests'} size={32} bold={false} />
                    <Typo text={'Consult Statistiques'} size={32} bold={false} />
                    <Typo text={'Receive feedbacks'} size={32} bold={false} />
                </div>
                <div className='second'>
                    <TestDetails path={BusinessImg} category={CATEGORY.BUSINESS} context={'Work Interview'} createDate={'2024-05-23'} votes={FakeVotes} />
                </div>


            </div>
            <div className='section-four'>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: isSmallScreen?'atuo':'70vh'}}>
                    <Typography sx={{ textAlign: 'center', fontSize: 64, fontFamily: 'Roboto,sans-serif', padding: '32px 0', color: '#5f1479', fontWeight: 'bold' }}>What Category</Typography>
                    <Box sx={{ display: 'flex', flexDirection: isSmallScreen?'column':'row', height: '100%' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typo text={CATEGORY.BUSINESS} size={32} bold={true} />
                            <img src={BagImg} style={{ width: '20%', height: 'auto' }} alt='card-image' />
                            <Typo text={'Logo, CV...'} size={20} bold={false} />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typo text={CATEGORY.DATING} size={32} bold={true} />
                            <img src={HeartImg} style={{ width: '20%', height: 'auto' }} alt='card-image' />
                            <Typo text={'Tinder, Badoo...'} size={20} bold={false} />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typo text={CATEGORY.SOCIAL} size={32} bold={true} />
                            <img src={SocialImg} style={{ width: '20%', height: 'auto' }} alt='card-image' />
                            <Typo text={'Facebook, Instgram, WhatsUp...'} size={20} bold={false} />
                        </Box>
                    </Box>
                </Box>
            </div>
            <div className='section-five' id="application">
                <div className='app-links'>
                    <div className='btns-section'>
                        <p className='title-text'>Download the app now!</p>
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
            </div>
        </div>
    )
}
type typoProps = {
    text: string;
    size: number;
    bold: boolean;
}
const Typo = ({ text, size, bold }: typoProps) => {
    return <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: size, color: '#1E3E62', fontWeight: bold ? 'bold' : 'normal' }} gutterBottom={true}>{text}</Typography>
}