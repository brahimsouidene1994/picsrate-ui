import DatingImg from '../../assets/images/tinder03.jpg';
import BusinessImg from '../../assets/images/pro.jpg';
import DataTabs from '../../components/layout/DataTabs';
import { Card } from '../../components/ui/Card';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import '../../assets/styles/Acceuil.css';
import { CATEGORY } from '../../services/models/contants/Category';
export default function Acceuil() {
    return (
        <div className='acceuil'>
            <div className='section-one'>
                <div className='first'>
                    <div className='dots'></div>
                    <Card className='card'>
                        <div className='card-header'>
                            <h2>Tinder</h2>
                        </div>
                        <div className='card-body'>
                            <img src={DatingImg} className='image' alt='card-image' />
                            <div className='card-content'>
                                <div className='context'>
                                    <h2>he</h2>
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
                    <h1>How it works</h1>
                    <ul>
                        <li>Follow Up Tests</li>
                        <li>Consult Statistiques</li>
                        <li>Receive feedbacks</li>
                    </ul>
                </div>
                <div className='second'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2>BUSINESS</h2>
                        </div>
                        <div className='card-body'>
                            <img src={BusinessImg} className='image' alt='card-image' />
                        </div>
                        <div className='card-footer'>
                            <div><h3>Title</h3><h2>Linked-In</h2></div>
                        </div>
                    </div>
                    <div className='separator'></div>
                    <div className='side-card'>
                        <DataTabs category={CATEGORY.BUSINESS} votes={[]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}