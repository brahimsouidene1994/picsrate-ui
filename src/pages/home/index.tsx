import React from 'react';
import PictureService from '../../services/api/picture';
import '../../assets/styles/Home.css'
import AddIcon from '../../assets/images/add-image-m.png';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { setAlbum } from '../../services/state/reducers/album';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { FaCircle } from "react-icons/fa6";
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const album = useAppSelector(state => state.album.value)
    React.useEffect(()=>{
        getAlbum()
    },[])
    const handleRedirect = () => {
      navigate(`/new`); // Replace with the route you want to redirect to
    };
    const handleRedirectDetails = (id:string|undefined|null) => {
      navigate(`/details/${id}`); // Replace with the route you want to redirect to
    }
    const getAlbum = ():void => {
      PictureService.getPicturesByCurrentUser()
        .then((data) => {
            if (data === null) return ;
            if (data.length > 0) {
              dispatch(setAlbum(data))
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className='body-home'>
          <div className='body-home-container'>
            <ImageList sx={{ width: '90%', overflowY: 'hidden', paddingBottom:10, paddingTop:10}} variant="woven" cols={3} gap={16}>
              <Box sx={{width:'100%', display:'flex',justifyContent:'center', alignItems:'center'}}>
                <Box sx={{width:'50%',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
                          border: '2px solid transparent',  // Border for hover effect
                          transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          borderRadius:'10px',
                          '&:hover': {
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            cursor: 'pointer',
                            borderColor: '#1976d2',
                          },
                  }}
                  onClick={handleRedirect}
                  >
                  <img src={`${AddIcon}`} style={{width:'80%',height:'auto'}}alt='add' />
                  <Typography style={{fontSize:18, textAlign:'center', fontFamily:'Roboto, sans-serif',color: '#0B192C', textTransform:'capitalize'}}>Add new test</Typography>
                </Box>
              </Box>
              
            {album.map((item) => (
              <ImageListItem 
                  sx={{
                    borderRadius:'10px',
                    position: 'relative',
                    overflow: 'hidden',  // Ensure no overflow issues
                    border: '2px solid transparent',  // Border for hover effect
                    transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      borderColor: '#1976d2',
                    },
                    height: 'auto',  // Allow auto height to accommodate woven layout
                  }}
                  key={item.path}
                  onClick={() => handleRedirectDetails(item._id)}
                >
                  <img
                    style={{borderTopRightRadius: '10px',borderTopLeftRadius: '10px',height: '85%'}}
                    srcSet={`${item.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.path}?w=248&fit=crop&auto=format`}
                    alt={item.contextPic}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px", textAlign:'center', fontSize:'2rem', 
                        '& .MuiImageListItemBar-title': {
                          fontSize: '2rem', // Control the title font size
                          textTransform: 'capitalize',
                          fontFamily:'Roboto, sans-serif',
                        },
                    }}
                    title={item.contextPic}
                    position="top"
                  />
                  <ImageListItemBar
                    sx={{
                      height:'15%',
                      width: '100%',  // Full width to match the image
                      textAlign: 'left',
                      backgroundColor:'#d5d5d57d',
                      '& .css-mjbero-MuiImageListItemBar-actionIcon':{
                        display:'flex',
                      },
                      '& .MuiImageListItemBar-title': {
                        height:'100%',
                      },
                      '& .MuiImageListItemBar-titleWrap': {
                        padding: '0px',
                        height:'100%',
                      },
                      }
                    }
                    title={
                      <div style={{ paddingLeft:10,display: 'flex', alignItems: 'center', justifyContent:'space-evenly', height:'100%' }}>
                        <Typography
                          sx={{
                            fontSize: '22px',
                            lineHeight: 2.5,
                            width:'40%'
                          }}
                        >
                          {item.category}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '20px',
                            lineHeight: 2.5,
                            width:'60%'
                          }}
                        >
                          {item.voters?.length?`${item.voters?.length}v`:'no voters yet'}
                        </Typography>
                      </div>
                    }
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${item.contextPic}`}
                      >
                        <FaCircle color={item.status?'green':'red'}/>
                      </IconButton>
                    }
                    position="below"
                  />
              </ImageListItem>
            ))}
          </ImageList>
          </div>
          
        </div>
    )
}
