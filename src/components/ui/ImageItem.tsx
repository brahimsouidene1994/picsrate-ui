import { ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import PictureObject from "services/models/picture";

type testProps = {
    test: PictureObject;
    index: number;
    isVisible: boolean;
}
export default function ImageItem({ test, index, isVisible }: testProps){
    return (
        <ImageListItem
            style={{height: '90%'}}
            sx={{
                width: '100%',
                borderRadius: '10px',
                position: 'absolute',
                top: `${index * 10}px`,  // Adjust vertical offset between cards
                left: `${index * 10}px`, // Adjust horizontal offset between cards
                zIndex: index,           // Controls stacking order
                border: '2px solid transparent',  // Border for hover effect
                transition: isVisible ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
                transform: isVisible ? `translate(${index * 10}px, ${index * 10}px)` : `translate(${index * 10}px-20px, ${index * 10}px-20px)`,
                opacity: isVisible ? 1 : 0,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    borderColor: '#1976d2',
                }
            }}
            key={test.path}
        >
            <img
                style={{ borderTopRightRadius: '10px', borderTopLeftRadius: '10px', height: '90%', width: '100%'}}
                srcSet={`${test.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${test.path}?w=248&fit=crop&auto=format`}
                alt={'Tinder'}
                loading="lazy"
            />
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
                title={test.contextPic}
                position="top"
            />
            <ImageListItemBar
                sx={{
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    height: '10%',
                    width: '100%',  // Full width to match the image
                    textAlign: 'left',
                    backgroundColor: '#d5d5d5',
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
                            {test.category}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                lineHeight: 2.5,
                                width: '60%'
                            }}
                        >
                            {`${test.voters?.length}V`}
                        </Typography>
                        <Typography sx={{ marginRight: 2 }}>
                            <FaCircle color={true ? 'green' : 'red'} />
                        </Typography>
                    </div>
                }
                position="below"
            />
        </ImageListItem>
    );
};