import React from 'react';
import '../../assets/styles/Acceuil.css';
import DatingImg from '../../assets/images/date.jpg';
import BusinessImg from '../../assets/images/cv.jpeg';
import { ButtonContainer } from '../../components/ui/Button'
import { Link } from 'react-router-dom';
import keycloak from '../../keycloak';
import { Card } from '../../components/ui/Card';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Stack from '@mui/material/Stack';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const activeTabStyle = {
    color: '#1A314C',  // Change the color of the active tab
    borderBottom: '2px solid red',  // Optional: add border to indicate active tab
  };
  
type PropsAuth = {
    auth: boolean,
}
export default function Acceuil({ auth }: PropsAuth) {
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
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
                            <div className='likes'>
                                <FaRegHeart color='#0B192C' size={32} />
                                <h2>12</h2>
                            </div>
                            <div className='comments'>
                                <FaRegCommentDots color='#0B192C' size={32} />
                                <h2>12</h2>                               
                            </div>
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
                <div className='first'>
                    <h1 className='title'>How it works</h1>
                    <div className='desc'>
                        <ul>
                            <li>Follow Up Tests</li>
                            <li>Consult Statistiques</li>
                            <li>Receive feedbacks</li>
                        </ul>
                    </div>
                </div>
                <div className='second'>
                    <Card className='card'>
                        <div className='card-header'>
                            <h2>Linked-In</h2>
                        </div>
                        <div className='card-body'>
                            <img src={BusinessImg} className='image' alt='card-image'/>
                            <div className='card-body-footer'>
                                <div className='context'>
                                    <h2></h2>
                                    <h2>Average</h2>
                                </div>
                                <div className='result'>
                                    <h2>Social</h2>
                                </div>
                            </div>
                        </div>
                        
                    </Card>
                    <div className='side-card'>
                    <Tabs 
                        direction={'rtl'}
                        selectedIndex={activeIndex} 
                        onSelect={(index) => setActiveIndex(index)}
                        >
                        <TabList>
                            <Tab style={{width:150,textAlign:'center',fontSize:32, color: activeIndex===0?'#1A314C':'#6D7C92',fontFamily: 'Alice'}}>Graph</Tab>
                            <Tab style={{width:150,textAlign:'center',fontSize:32, color: activeIndex===1?'#1A314C':'#6D7C92',fontFamily: 'Alice'}}>Data</Tab>
                            <Tab style={{width:150,textAlign:'center',fontSize:32, color: activeIndex===2?'#1A314C':'#6D7C92',fontFamily: 'Alice'}}>Notes</Tab>
                            </TabList>

                            <TabPanel>
                            <div className='graph-container'>
                                <Stack spacing={10} sx={{ flexGrow: 1 }} >
                                    <BorderLinearProgress variant="determinate" value={50} />
                                    <BorderLinearProgress variant="determinate" value={50} />
                                    <BorderLinearProgress variant="determinate" value={50} />
                                </Stack>
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <h2>Data</h2>
                            </TabPanel>
                            <TabPanel>
                            <h2>Notes</h2>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 50,
    borderRadius: 50,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 50,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));