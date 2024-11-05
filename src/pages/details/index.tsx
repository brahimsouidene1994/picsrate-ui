import React from "react";
import PictureObject from "services/models/picture";
import CommentObject from "services/models/comment";
import PictureService from 'services/api/picture';
import CommentService from 'services/api/comment';
import DataTabs from "../../components/ui/DataTabs";
import { FaCircle, FaPause, FaPlay, FaArrowLeft } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../hooks/stateHooks";
import { deleteOneFromAlbum, updateOneFromAlbum } from "services/state/reducers/album";
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { roundNumber, wait } from "../../utils/utilities";
import AlertUi from "../../components/ui/AlertUi";
import { useAuth } from "react-oidc-context";
import DialogUi from "components/ui/DialogUi";
export default function Details() {
    const oidc = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [currentPicture, setCurrentPicture] = React.useState<PictureObject | null>(null);
    const [btnState, setBtnState] = React.useState(false);

    // votes
    const [votes, setVotes] = React.useState<CommentObject[]>([]);

    // result 
    const [votingResultText, setVotingResultText] = React.useState('');
    const [votingResultMoy, setVotingResultMoy] = React.useState(0);

    // loading
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
        const token = oidc.user?.access_token;
        PictureService.getOnePicture(id, token!.toString())
            .then(response => {
                if (response === null) return;
                if (response) {
                    setCurrentPicture(response);
                    CommentService.getAllCommentOfPicture(id, token!.toString())
                        .then((res) => {
                            if (res === null) return;
                            if (res) {
                                setVotes(res);
                                if (res.length === 0) {
                                    setVotingResultText('No voters yet')
                                } else {
                                    voteFormula(res);
                                }
                            }
                            else console.log('no comments');
                        })
                }
            })
            .catch((error) => console.error(error));
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
                if (element.voteOne)
                    traitOne += element.voteOne;
                if (element.voteTwo)
                    traitTwo += element.voteTwo;
                if (element.voteThree)
                    traitThree += element.voteThree;
            }
            );
            let result = (traitOne + traitTwo + traitThree) / arrayVotes.length;
            setVotingResultMoy(result);
            if (result < 9) setVotingResultText('No');
            if ((9 <= result) && (result < 15)) setVotingResultText('Bad');
            if ((15 <= result) && (result < 21)) setVotingResultText('Average');
            if ((21 <= result) && (result < 27)) setVotingResultText('Good');
            if (27 <= result) setVotingResultText('Exellent');
        }
    }

    const handleStatus = () => {

        const token = oidc.user?.access_token;
        setBtnState(true);
        setLoading(true);
        PictureService.patchPictureStatus(currentPicture?._id!, !currentPicture?.status, token!.toString())
            .then(() => {
                setAlertVisibility(true);
                handleAlertVisibility();
                setUpdateResponse(true);
                setAlertMessage('Picture was successfully updated.');
                setLoading(false);
                setBtnState(false);
                dispatch(updateOneFromAlbum(id!.toString()))
                setCurrentPicture(prevCurrentPictureState => {
                    let updatedPicture = Object.assign({}, prevCurrentPictureState);
                    updatedPicture.status = !currentPicture?.status;
                    return updatedPicture;
                });
            })
            .catch((error: Error) => {
                setAlertVisibility(true);
                handleAlertVisibility();
                setUpdateResponse(false);
                setAlertMessage(error.message);
                setLoading(false);
                setBtnState(false);
            });
    }

    const deletePicture = () => {

        const token = oidc.user?.access_token;
        if (currentPicture && currentPicture._id)
            PictureService.deletePicture(currentPicture._id, token!.toString())
                .then(() => {
                    setLoading(false);
                    setDeleteResponse(true);
                    setDeleteResponseMessage('Deleted successfully');
                    filterPictures(currentPicture?._id!.toString());
                })
                .catch((error: Error) => {
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
        <Box sx={{ height: 'auto', width: '100vw', marginTop: 6, marginBottom: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            {alertVisibility &&
                <AlertUi updateResponse={updateResponse} message={alertMessage} handleVisibility={setAlertVisibility} />
            }
            <Box sx={{ width: '70%', paddingLeft: 8 }}>
                <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                    <FaArrowLeft size={28} color="#0B192C" />
                </IconButton>
            </Box>
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
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}>{votes.length}</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', color: '#878787' }}>Moy</Typography>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}>{roundNumber(votingResultMoy)}/30</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', color: '#878787' }}>Result</Typography>
                                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.4rem' }}>{votingResultText}</Typography>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Tooltip title={currentPicture.status ? "Must stop the test first" : "Delete the test"}>
                                    <span>
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
                                    </span>
                                </Tooltip>
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
                                <Box sx={{ width: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Title</Typography>
                                        <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{currentPicture.contextPic}</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Created At</Typography>
                                        <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{formatDate(currentPicture.createdAt)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <Box sx={{ width: '90%', padding: 5 }}>
                                {currentPicture.voters?.length ?
                                    <DataTabs category={currentPicture.category} votes={votes} />
                                    :
                                    <Box sx={{ height: '80%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                                        <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '2rem', textTransform: 'capitalize' }}>No votes yet</Typography>
                                        <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.2rem', textTransform: 'capitalize', textAlign: 'center' }}>As soon as you get new vote, this section will be automatically displayed</Typography>
                                        <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1rem', textTransform: 'capitalize', textAlign: 'center' }}><span style={{ fontWeight: 'bold' }}>Tip:</span> take and give tip, make sure to vote some users pictures, by doing that you will automatically increase the chances to make your pictures tests appear at the first swipes</Typography>
                                    </Box>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            <DialogUi deletePicture={deletePicture} deleteResponse={deleteResponse} deleteResponseMessage={deleteResponseMessage} handleClose={handleClose} showDialog={showDialog} />
        </Box>
    )
}

