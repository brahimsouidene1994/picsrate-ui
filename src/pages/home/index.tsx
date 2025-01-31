import React from 'react';
import PictureService from 'services/api/picture';
import AddIcon from '../../assets/images/add-image-m.png';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { setAlbum } from 'services/state/reducers/album';
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { FaCircle } from "react-icons/fa6";
import { useAuth } from "react-oidc-context";
import Img from 'components/ui/Img';
import '../../assets/styles/Home.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Home() {
  const oidc = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const album = useAppSelector(state => state.album.value)
  const theme = useTheme();

  // Check for specific breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // for small screens (e.g., mobile)
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm')); // for small screens (e.g., mobile)

  React.useEffect(() => {
    if (album.length === 0) {
      getAlbum()
    }
  }, [album])

  const getCols = ():number =>{
    if(isMobileScreen) return 1;
    if(isSmallScreen) return 2;
    return 3;
  }

  const getAlbum = (): void => {

    const token = oidc.user?.access_token;
    PictureService.getPicturesByCurrentUser(token!.toString())
      .then((data) => {
        if (data === null) return;
        if (data.length > 0) {
          dispatch(setAlbum(data))
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  return (
    <Box sx={{width: '100vw',minHeight:'70vh',display: 'flex',justifyContent: 'center',padding: 3}}>
      <div className='home-content'>
        <ImageList sx={{ width: '90%', overflowY: 'hidden', paddingBottom: 10, paddingTop: 10 }} variant="woven" cols={getCols()} gap={16}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{
              width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              border: '2px solid transparent',  // Border for hover effect
              transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                borderColor: '#1976d2',
              },
            }}
              onClick={() => navigate('/new')}
            >
              <img src={`${AddIcon}`} style={{ width: '80%', height: 'auto' }} alt='add' />
              <Typography style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#0B192C', textTransform: 'capitalize' }}>Add new test</Typography>
            </Box>
          </Box>

          {album.map((item) => (
            <ImageListItem
              sx={{
                borderRadius: '10px',
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
              onClick={() => navigate(`/details/${item._id}`)}
            >
              <Img src={item.path} alt={item.contextPic} />
              <ImageListItemBar
                sx={{
                  borderTopLeftRadius: "10px", borderTopRightRadius: "10px", textAlign: 'center', height: "2.5rem",
                  '& .MuiImageListItemBar-titleWrap': {
                    padding: 0,
                    height: '100%',
                  },
                  '& .MuiImageListItemBar-title': {
                    height: '100%',
                    fontSize: '2rem', // Control the title font size
                    textTransform: 'capitalize',
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: '2.5rem',
                  },
                }}
                title={item.contextPic}
                position="top"
              />
              <ImageListItemBar
                sx={{
                  height: '15%',
                  width: '100%',  // Full width to match the image
                  textAlign: 'left',
                  backgroundColor: '#d5d5d57d',
                  '& .css-mjbero-MuiImageListItemBar-actionIcon': {
                    display: 'flex',
                  },
                  '& .MuiImageListItemBar-title': {
                    height: '100%',
                  },
                  '& .MuiImageListItemBar-titleWrap': {
                    padding: '0px',
                    height: '100%',
                  },
                }
                }
                title={
                  <div style={{ paddingLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
                    <Typography
                      sx={{
                        fontSize: '22px',
                        lineHeight: 2.5,
                        width: '50%'
                      }}
                    >
                      {item.category}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        lineHeight: 2.5,
                        width: '60%'
                      }}
                    >
                      {`${item.voters?.length}V`}
                    </Typography>
                    <Typography sx={{ marginRight: 2 }}>
                      <FaCircle color={item.status ? 'green' : 'red'} />
                    </Typography>
                  </div>
                }
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </Box>
  )
}
