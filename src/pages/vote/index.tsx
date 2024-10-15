import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import PictureObject from "../../services/models/picture";
import React from "react";
import PictureService from '../../services/api/picture';
import Slider from "../../components/ui/Slider";
import { CATEGORY } from "../../services/models/contants/Category";
import { TRAIT } from "../../services/models/contants/Traits";
import { TraitColors } from "../../utils/FakeData";
import { HiRefresh } from "react-icons/hi";
import { LoadingButton } from "@mui/lab";
import CommentObject from "../../services/models/comment";
import CommentService from "../../services/api/comment";

export default function Vote() {
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
        setRandomPicture(null)
        setLoading(true);
        PictureService.getRandomPictureOfOthers()
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
        if (note === '') { setNote(null) }
        let comment:CommentObject = {
            pictureId: randomPicture?._id,
            message: note,
            v1: voteOne,
            v2: voteTow,
            v3: voteThree
        };
        CommentService.saveNewComment(comment)
            .then(() => {
                setLoading(false);
                setNote('')
                pickPictureRandomly()
            })
    }

    return (
        <Box sx={{ width: '100%', marginTop: 10, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Box sx={{ width: '70%', paddingLeft: 8, paddingRight: 8 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
                    {randomPicture &&
                        <React.Fragment>
                            <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingRight: 5 }}>
                                <Box sx={{ height: '2.5rem', width: '100%', backgroundColor: '#0B192C' }}>
                                    <Typography sx={{ fontSize: '1.7rem', color: '#fff', textAlign: 'center' }}>{randomPicture.category}</Typography>
                                </Box>
                                <img src={randomPicture.path} alt={'current-picture'} style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }} />
                                <Box sx={{ width: '100%', backgroundColor: 'transparent' }}>
                                    <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Title</Typography>
                                    <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{randomPicture.contextPic}</Typography>
                                </Box>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '80%', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Slider label={TRAIT.ATTRACTIVE} handleChange={setVoteOne} color_bar={TraitColors.COMPETENT} />
                                <Slider label={TRAIT.AUTHENTIC} handleChange={setVoteTwo} color_bar={TraitColors.INFLUENTIAL} />
                                <Slider label={TRAIT.LIKEBLE} handleChange={setVoteThree} color_bar={TraitColors.LIKEBLE} />
                                {randomPicture.commentsStatus &&
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
                                        {!loading&&<HiRefresh />}
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
                            </Box>
                        </React.Fragment>
                    }
                </Box>
            </Box>
        </Box>
    )
}