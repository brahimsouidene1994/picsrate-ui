import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PictureObject from "../../services/models/picture";
import CommentObject from "../../services/models/comment";
import PictureService from '../../services/api/picture';
import CommentService from '../../services/api/comment';
import { FaCircle, FaPause, FaPlay } from "react-icons/fa";
import { TbTrashOff, TbTrash } from "react-icons/tb";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../hooks/stateHooks";
import { deleteOneFromAlbum } from "../../services/state/reducers/album";

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
    const [visible, setVisible] = React.useState(false);
    const [showDialog, setShowDialog] = React.useState(false);
    const [deleteResponse, setDeleteResponse] = React.useState<boolean>(false);
    const [deleteResponseStatus, setDeleteResponseStatus] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    React.useEffect(() => {
        console.log('Details', id) // This will print the id of the selected picture
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
                setVisible(true);
                handleAlertVisibility();
                setLoading(false);
                setBtnState(false);
                setCurrentPicture(prevCurrentPictureState => {
                    let updatedPicture = Object.assign({}, prevCurrentPictureState);
                    updatedPicture.status = !currentPicture?.status;
                    return updatedPicture;
                });
            })
            .catch((error) => console.error(error));
    }

    const deletePicture = () => {
        if (currentPicture && currentPicture._id)
            PictureService.deletePicture(currentPicture._id)
                .then(() => {
                    setLoading(false);
                    setDeleteResponse(true);
                    setDeleteResponseStatus(true);
                })
                .catch((error) => {
                    setDeleteResponse(true);
                    setDeleteResponseStatus(false);
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
        if(deleteResponse)
            navigate('/')
    };

    const handleConfirm = () => {
        // Add confirm logic here
        console.log("Confirmed!");
        deletePicture()
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
    const handleAlertVisibility = () =>{
        wait(5000).then(() => setVisible(false));
    }
    const wait = (timeout:number) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    return (
        <Box sx={{ height: 'auto', width: '100vw', marginTop: 10, marginBottom: 10, display: 'flex', justifyContent: 'center',alignItems:'center', flexDirection:'column' }}>

            {visible &&
                <Alert severity="success" onClose={() => { setVisible(false) }} sx={{position:'absolute', top:-80, width:'70%', height:'80px'}}>
                    Picture was successfully updated.
                </Alert>
            }
            {currentPicture &&
                <Box sx={{ backgroundColor: 'aliceblue', width: '70%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', paddingLeft: 8, paddingRight: 8, paddingTop: 5 }}>
                        <Box sx={{
                            width: '100%', height: '90px', display: 'flex', padding: '10px', justifyContent: 'center',
                            border: '2px solid transparent',  // Border for hover effect
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
                                    <Typography sx={{ fontSize: '1.7rem', color:'#fff', textAlign:'center'}}>{currentPicture.category}</Typography>
                                </Box>
                                <img src={currentPicture.path} alt={'current-picture'} style={{ width: '100%', marginTop: '16px' }} />
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '90%', padding: 5 }}>

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
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleConfirm} color="primary" autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <DialogTitle id="alert-dialog-title">{"Request Response"}</DialogTitle>
                        <DialogContent>
                            <Typography>
                                {deleteResponseStatus ? "Deleted Successfuly!" : "Deleted Failurefuly!!"}
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