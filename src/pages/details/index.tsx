import React from "react";
import PictureObject from "../../services/models/picture";
import CommentObject from "../../services/models/comment";
import PictureService from '../../services/api/picture';
import CommentService from '../../services/api/comment';
import DataTabs from "../../components/layout/DataTabs";
import { FaCircle, FaPause, FaPlay } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../hooks/stateHooks";
import { deleteOneFromAlbum } from "../../services/state/reducers/album";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { wait } from "../../utils/utilities";
import AlertUi from "../../components/ui/AlertUi";

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [currentPicture, setCurrentPicture] = React.useState<PictureObject | null>(null);
    const [btnState, setBtnState] = React.useState(false);
    const [comments, setComments] = React.useState<CommentObject[]>([]);
    const [commentsCount, setCommentsCount] = React.useState(0);
    const [votingResultText, setVotingResultText] = React.useState('');
    const [votingResultMoy, setVotingResultMoy] = React.useState(0);
    const [reactionsTot, setReactionsTot] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    
    // update picture status
    const [updateResponse, setUpdateResponse] = React.useState(false);
    const [alertVisibility, setAlertVisibility] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    
    // delete picture
    const [showDialog, setShowDialog] = React.useState(false);
    const [deleteResponse, setDeleteResponse] = React.useState<boolean>(false);
    const [deleteResponseMessage, setDeleteResponseMessage] = React.useState('');

    React.useEffect(() => {
        if (!currentPicture && id) getCurrentPicture(id);
    }, [currentPicture]);
    const getCurrentPicture = (id: string) => {
        PictureService.getOnePicture(id)
            .then(response => {
                if (response === null) return;
                if (response) {
                    setCurrentPicture(response);
                    CommentService.getAllCommentOfPicture(id)
                        .then((res) => {
                            if (res === null) return;
                            if (res) {
                                setComments(res);
                                setReactionsTot(res.length);
                                if (res.length === 0) {
                                    setVotingResultText('No voters yet')
                                } else {
                                    countComment(res);
                                    voteFormula(res);
                                }
                            }
                            else console.log('no comments');
                        })
                }
            })
            .catch((error) => console.error(error));
    }
    const countComment = (arrayComment: CommentObject[]) => {
        if (arrayComment === null) return;
        if (arrayComment.length === 0) setCommentsCount(0);
        if (arrayComment.length > 0) {
            let count = 0;
            arrayComment.forEach(element => {
                if (element.message !== null) {
                    count++
                }
            });
            setCommentsCount(count);
        }
    }

    const voteFormula = (arrayVotes: CommentObject[]) => {
        if (arrayVotes === null) return;
        if (arrayVotes.length === 0) {
            setVotingResultText('No voters yet');
            setVotingResultMoy(0);
        }
        if (arrayVotes.length > 0) {
            let traitOne = 0;
            let traitTwo = 0;
            let traitThree = 0;
            arrayVotes.forEach(element => {
                if (element.v1)
                    traitOne += element.v1;
                if (element.v2)
                    traitTwo += element.v2;
                if (element.v3)
                    traitThree += element.v3;
            }
            );

            let result = (traitOne + traitTwo + traitThree) / arrayVotes.length;
            setVotingResultMoy(result);
            if (result <= 10) setVotingResultText('Bad');
            if ((10 < result) && (result < 15)) setVotingResultText('Somewhat');
            if ((15 <= result) && (result < 20)) setVotingResultText('Medium');
            if ((20 <= result) && (result < 25)) setVotingResultText('Good');
            if ((25 <= result) && (result < 30)) setVotingResultText('Exellent');
        }
    }
    const handleStatus = () => {
        setBtnState(true);
        setLoading(true);
        PictureService.patchPictureStatus(currentPicture?._id!, !currentPicture?.status)
            .then(() => {
                setAlertVisibility(true);
                handleAlertVisibility();
                setUpdateResponse(true);
                setAlertMessage('Picture was successfully updated.');
                setLoading(false);
                setBtnState(false);
                setCurrentPicture(prevCurrentPictureState => {
                    let updatedPicture = Object.assign({}, prevCurrentPictureState);
                    updatedPicture.status = !currentPicture?.status;
                    return updatedPicture;
                });
            })
            .catch((error:Error) => {
                setAlertVisibility(true);
                handleAlertVisibility();
                setUpdateResponse(false);
                setAlertMessage(error.message);
                setLoading(false);
                setBtnState(false);
            });
    }

    const deletePicture = () => {
        if (currentPicture && currentPicture._id)
            PictureService.deletePicture(currentPicture._id)
                .then(() => {
                    setLoading(false);
                    setDeleteResponse(true);
                    setDeleteResponseMessage('Deleted successfully');
                    filterPictures(currentPicture?._id!.toString());
                })
                .catch((error:Error) => {
                    setDeleteResponse(true);
                    setDeleteResponseMessage(error.message);
                    setLoading(false);
                    console.log(error)
                })
    }
    const filterPictures = (id: string) => {
        if (id)
            dispatch(deleteOneFromAlbum(id))
    }
    const handleDeleteDialog = () => {
        setLoading(true);
        setShowDialog(true);
    };

    const handleClose = () => {
        setShowDialog(false);
        setLoading(false);
        if (deleteResponse)
            navigate('/')
    };

    const formatDate = (chDate: string) => {
        var d = new Date(chDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleAlertVisibility = () => {
        wait(5000).then(() => setAlertVisibility(false));
    }

    return (
        <Box sx={{ height: 'auto', width: '100vw', marginTop: 10, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            {alertVisibility &&
                <AlertUi updateResponse={updateResponse} message={alertMessage} handleVisibility={setAlertVisibility}/>
            }
            {currentPicture &&
                <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', paddingLeft: 8, paddingRight: 8, paddingTop: 5 }}>
                        <Box sx={{
                            width: '100%', height: '90px', display: 'flex', padding: '10px', justifyContent: 'center',
                            border: '2px solid transparent',
                            transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                        }}>
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', color: '#878787' }}>Status</Typography>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}><FaCircle style={{ paddingRight: '8px' }} color={currentPicture.status ? 'green' : 'red'} />{currentPicture.status ? 'Active' : 'Inactive'}</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', color: '#878787' }}>Votes</Typography>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}>{currentPicture.voters?.length}</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', color: '#878787' }}>Result</Typography>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}>{votingResultText}</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <LoadingButton
                                    size="large"
                                    variant="outlined"
                                    startIcon={<TbTrash />}
                                    loadingPosition="start"
                                    loading={loading}
                                    disabled={currentPicture.status}
                                    onClick={handleDeleteDialog}
                                    color="error"
                                >
                                    Delete
                                </LoadingButton>
                                <LoadingButton
                                    size="large"
                                    color={currentPicture.status ? 'error' : 'success'}
                                    variant="contained"
                                    endIcon={currentPicture.status ? <FaPause /> : <FaPlay />}
                                    loadingPosition="end"
                                    onClick={handleStatus}
                                    loading={loading}
                                    disabled={btnState}
                                >
                                    {currentPicture.status ? 'Pause' : 'Play'}
                                </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', paddingLeft: 8, paddingRight: 8 }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
                            <Box sx={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingRight: 5 }}>
                                <Box sx={{ height: '2.5rem', width: '100%', backgroundColor: '#0B192C' }}>
                                    <Typography sx={{ fontSize: '1.7rem', color: '#fff', textAlign: 'center' }}>{currentPicture.category}</Typography>
                                </Box>
                                <img src={currentPicture.path} alt={'current-picture'} style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }} />
                                <Box sx={{ width: '100%', backgroundColor: 'transparent' }}>
                                    <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Title</Typography>
                                    <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{currentPicture.contextPic}</Typography>
                                </Box>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '90%', padding: 5 }}>
                                {currentPicture.voters?.length ?
                                <DataTabs noteCount={commentsCount}/>
                                :
                                <Box sx={{ height: '80%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',flexDirection:'column' }}>
                                    <Typography sx={{fontFamily:'Roboto,sans-serif', fontSize:'2rem', textTransform:'capitalize'}}>No votes yet</Typography>
                                    <Typography sx={{fontFamily:'Roboto,sans-serif', fontSize:'1.2rem', textTransform:'capitalize', textAlign:'center'}}>As soon as you get new vote, this section will be automatically displayed</Typography>
                                    <Typography sx={{fontFamily:'Roboto,sans-serif', fontSize:'1rem', textTransform:'capitalize',textAlign:'center'}}><span style={{fontWeight:'bold'}}>Tip:</span> take and give tip, make sure to vote some users pictures, by doing that you will automatically increase the chances to make your pictures tests appear at the first swipes</Typography>
                                </Box>
                            }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            <Dialog
                open={showDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {!deleteResponse ?
                    <React.Fragment>
                        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete this picture?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus={true} >
                                Cancel
                            </Button>
                            <Button onClick={() => deletePicture()} color="primary" >
                                Confirm
                            </Button>
                        </DialogActions>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <DialogTitle id="alert-dialog-title">{"Request Response"}</DialogTitle>
                        <DialogContent>
                            <Typography>
                                {deleteResponseMessage}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </React.Fragment>
                }
            </Dialog>
        </Box>
    )
}

