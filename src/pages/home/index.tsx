import React from 'react';
import PictureService from '../../services/api/picture';
import '../../assets/styles/Home.css'
import { Card } from '../../components/ui/Card';
import { BsPlusLg } from "react-icons/bs";
import Avatar from '../../assets/images/avatar.png';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
    React.useEffect(()=>{
        PictureService.test()
    },[])
    const handleRedirect = () => {
      navigate('/new'); // Replace with the route you want to redirect to
    };
    return (
        <div className='body-home'>
          <div className='body-home-container'>
            <Card className='card' onClick={handleRedirect}>
                <div className='card-body'>
                  <div className='card-body-image'>
                    <img src={Avatar} className='image' alt='card-image' />
                  </div>
                  <div className='circle'>
                    <div className='sub-circle'></div>
                    <BsPlusLg color='#fff' size={48} />
                  </div>
                </div>
                <div className='card-footer'>
                    <p>add new test</p>
                </div>
            </Card>
          </div>
          
        </div>
    )
}

// const Home = () => {
//   const [cardLayout, setCardLayout] = React.useState<number[][]>([]); // Holds the layout per row

//   // Dummy card data
//   const cards = Array.from({ length: 20 }, (_, i) => `Card ${i + 1}`);

//   // Function to randomize row layout
//   const generateRandomLayout = () => {
//     let layout = [];
//     let remainingCards = cards.length;
    
//     while (remainingCards > 0) {
//       const cardsInRow = Math.floor(Math.random() * 4) + 2; // Random between 1 and 4
//       const actualCardsInRow = Math.min(cardsInRow, remainingCards);
//       layout.push(Array.from({ length: actualCardsInRow }, (_, i) => i)); // Just indexes for now
//       remainingCards -= actualCardsInRow;
//     }

//     setCardLayout(layout);
//   };

//   React.useEffect(() => {
//     generateRandomLayout();
//   }, []); // Generate layout once on component mount

//   return (
//     <div>
//       {cardLayout.map((row, rowIndex) => (
//         <div 
//           key={rowIndex} 
//           style={{
//             display: 'grid',
//             gridTemplateColumns: `repeat(${row.length}, 1fr)`,
//             gap: '10px',
//             marginBottom: '10px'
//           }}
//         >
//           {row.map((_, colIndex) => (
//             <div 
//               key={colIndex} 
//               style={{
//                 backgroundColor: 'lightblue', 
//                 padding: '20px', 
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 textAlign: 'center'
//               }}
//             >
//               {cards.shift()} {/* Take one card from the array */}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;
