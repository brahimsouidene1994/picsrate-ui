import { Box, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import PictureObject from "services/models/picture";
import React from "react";
import PictureService from 'services/api/picture';
import Slider from "../../components/ui/Slider";
import { TRAIT } from "services/models/contants/Traits";
import { TraitColors } from "services/models/contants/TraitColors";
import { HiRefresh } from "react-icons/hi";
import { LoadingButton } from "@mui/lab";
import CommentObject from "services/models/comment";
import CommentService from "services/api/comment";
import { useAuth } from "react-oidc-context";
import '../../assets/styles/Vote.css';

export default function Vote() {
    const oidc = useAuth();
    const [randomPicture, setRandomPicture] = React.useState<PictureObject | null>(null);
    const [note, setNote] = React.useState<string | null>('');
    const [voteOne, setVoteOne] = React.useState<number>(0);
    const [voteTow, setVoteTwo] = React.useState<number>(0);
    const [voteThree, setVoteThree] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        pickPictureRandomly();
    }, []);
    const pickPictureRandomly = () => {
        const token = oidc.user?.access_token;
        setRandomPicture(null)
        setLoading(true);
        PictureService.getRandomPictureOfOthers(token!.toString())
            .then((response) => {
                if (response === null) return;
                if (response) {
                    setRandomPicture(response);
                    setLoading(false);
                }
            })
            .catch((error) => console.log(error));
    }

    const handleSubmit = () => {
        setLoading(true);
        const token = oidc.user?.access_token;
        if (note === '') { setNote(null) }
        let comment: CommentObject = {
            pictureId: randomPicture?._id,
            message: note,
            voteOne: voteOne,
            voteTwo: voteTow,
            voteThree: voteThree
        };
        CommentService.saveNewComment(comment, token!.toString())
            .then(() => {
                setLoading(false);
                setNote('')
                pickPictureRandomly()
            })
    }

    return (
        <Box sx={{width: '100vw',minHeight:'70vh',display: 'flex',justifyContent: 'center',padding: 3}}>
            <div className='vote-content'>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
                    <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingRight: 5 }}>
                        {randomPicture ?
                            <React.Fragment>
                                <Box sx={{ height: '2.5rem', width: '100%', backgroundColor: '#0B192C' }}>
                                    <Typography sx={{ fontSize: '1.7rem', color: '#fff', textAlign: 'center' }}>{randomPicture.category}</Typography>
                                </Box>
                                <img src={randomPicture.path} alt={'current-picture'} style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }} />
                                <Box sx={{ width: '100%', backgroundColor: 'transparent' }}>
                                    <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Title</Typography>
                                    <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{randomPicture.contextPic}</Typography>
                                </Box>
                            </React.Fragment>
                            :
                            <CircularProgress />
                        }
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className='slider-section'>
                        <Slider label={TRAIT.ATTRACTIVE} handleChange={setVoteOne} color_bar={TraitColors.COMPETENT} />
                        <Slider label={TRAIT.AUTHENTIC} handleChange={setVoteTwo} color_bar={TraitColors.INFLUENTIAL} />
                        <Slider label={TRAIT.LIKEBLE} handleChange={setVoteThree} color_bar={TraitColors.LIKEBLE} />
                        {randomPicture && randomPicture.commentsStatus &&
                            <TextField id="outlined-basic" label="Note (optional)" value={note} variant="standard" size={'medium'} onChange={(e) => setNote(e.target.value)} style={{ width: '70%', marginTop: 40, marginBottom: 40 }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: '60px',
                                        fontSize: '24px',
                                        padding: '24px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '20px',
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        fontSize: '18px',
                                        transform: 'translateY(-10px) scale(1)'
                                    },
                                }}
                            />
                        }
                        <Box sx={{ width: '70%', display: 'flex', justifyContent: 'end' }}>
                            <LoadingButton
                                size="large"
                                variant="outlined"
                                loadingPosition="center"
                                loading={loading}
                                disabled={loading}
                                onClick={pickPictureRandomly}
                                color="primary"
                                sx={{ marginRight: '16px' }}
                            >
                                {!loading && <HiRefresh />}
                            </LoadingButton>
                            <LoadingButton
                                size="large"
                                variant="contained"
                                loadingPosition="start"
                                loading={loading}
                                disabled={loading}
                                onClick={handleSubmit}
                                color="primary"
                            >
                                Submit
                            </LoadingButton>
                        </Box>
                    </div>
                </Box>
            </div>
        </Box>
    )
}