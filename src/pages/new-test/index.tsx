import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../assets/styles/NewTest.css'
import Card from '@mui/material/Card';
import Gallery from '../../assets/images/gallery.png';
import { CATEGORY } from '../../services/models/contants/Category';
import { TRAIT } from '../../services/models/contants/Traits';
import Trait from '../../components/ui/TraitCategory';
import TraitCategory from '../../components/ui/TraitCategory';
import { Alert, CircularProgress, FormControlLabel, Switch, TextField } from '@mui/material';
import PictureService from '../../services/api/picture';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';

const steps = ['Select picture', 'Set the title', 'Submitting'];

export default function NewTest() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewPicture, setPreviewPicture] = React.useState<string | null>(null);
    const [category, setCategory] = React.useState<string>('');
    const [title, setTitle] = React.useState('');
    const [commentStatus, setCommentStatus] = React.useState(true);
    const [nextTab, setNextTab] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNextTab(true);
        if (activeStep === steps.length - 2) {
            setNextTab(false);
            submitNewPictureTest();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setNextTab(false);
    };

    const handleReset = () => {
        setActiveStep(0);
        setSelectedFile(null)
        setPreviewPicture(null);
        setCategory('');
        setTitle('');
        setCommentStatus(true)
        setNextTab(true);
        navigate('/details')
    };

    const submitNewPictureTest = () => {
        let formData = new FormData();

        if (selectedFile) {
            formData.append("photo", selectedFile, selectedFile.name);
        } else {
            console.error("No file selected");
            return;
        }

        formData.append('category', category);
        formData.append('context', title);
        formData.append('commentsStatus', commentStatus.toString());
        setLoading(true);

        PictureService.saveNewPicture(formData)
            .then((response) => {
                setResponse(true)
                setResponseMessage("New picture saved successfully")
                setLoading(false)
            })
            .catch((error) => {
                setResponse(false)
                setResponseMessage(error.message)
                setLoading(false)
            }
            )
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null; // Get the first file if exists
        console.log("handleFileChange", event.target.files?.[0])
        setSelectedFile(selectedFile);

        // Create a preview if a file is selected
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            console.log(objectUrl)
            setPreviewPicture(objectUrl);
            if (category) setNextTab(false)
        } else {
            setPreviewPicture(null);
            setNextTab(true);
        }
    };
    const handleContext = (cat: string) => {
        console.log('handleContext', cat)
        if (category === cat) {
            setCategory('');
            setNextTab(true);
        }
        else {
            setCategory(cat);
            if (previewPicture) setNextTab(false)
        }
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (e.target.value) setNextTab(false);
        else setNextTab(true);
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentStatus(event.target.checked)
    }

    return (
        <div className='body-new-test'>
            <Box sx={{ width: '70%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        {!loading ?
                            <Alert severity={response?'success':'error'} sx={{mt:2,mb:2}}>
                                <AlertTitle>{response?'Success':'Error'}</AlertTitle>
                                {responseMessage}
                            </Alert>
                            :
                            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                                <CircularProgress size="50px" />
                            </Box>
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Continue</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className='form-test'>
                            <div className='step-picture'>
                                {!previewPicture ?
                                    <div className='picture-uploader'>
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" component="span">
                                                Upload Image
                                                <input
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                        </label>

                                    </div>
                                    :
                                    <div className='picture-loaded'>
                                        <img
                                            width="100%"
                                            style={{ height: activeStep === 0 ? '100%' : '80%', width: '70%' }}
                                            src={previewPicture}
                                        />
                                        {activeStep === 0 &&
                                            <label htmlFor="contained-button-file" style={{ marginTop: 20 }}>

                                                <Button variant="contained" component="span">
                                                    Select Image
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                </Button>
                                            </label>}
                                    </div>
                                }
                            </div>
                            <div className='step-separator'></div>

                            {activeStep === 0 &&
                                <div className='step-content' >
                                    <div className='step-content-category'>
                                        <Button variant="contained" component="span" onClick={() => handleContext(CATEGORY.SOCIAL)} style={{ height: category === CATEGORY.SOCIAL ? 60 : 50, width: category === CATEGORY.SOCIAL ? 170 : 160, fontFamily: 'Roboto, Roboto,sans-serif', fontSize: 24, borderRadius: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} color={category === CATEGORY.SOCIAL ? 'primary' : 'inherit'}>Social</Button>
                                        <Button variant="contained" component="span" onClick={() => handleContext(CATEGORY.BUSINESS)} style={{ height: category === CATEGORY.BUSINESS ? 60 : 50, width: category === CATEGORY.BUSINESS ? 170 : 160, fontFamily: 'Roboto, Roboto,sans-serif', fontSize: 24, marginRight: 10, marginLeft: 10, borderRadius: 0 }} color={category === CATEGORY.BUSINESS ? 'primary' : 'inherit'}>Business</Button>
                                        <Button variant="contained" component="span" onClick={() => handleContext(CATEGORY.DATING)} style={{ height: category === CATEGORY.DATING ? 60 : 50, width: category === CATEGORY.DATING ? 170 : 160, fontFamily: 'Roboto, Roboto,sans-serif', fontSize: 24, borderRadius: 50, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} color={category === CATEGORY.DATING ? 'primary' : 'inherit'}>Dating</Button>
                                    </div>
                                    {category &&
                                        <div className='step-content-traits'>
                                            <Typography style={{ fontSize: 28, textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>Traits:</Typography>
                                            <TraitCategory category={category} />
                                        </div>
                                    }
                                </div>
                            }
                            {(activeStep === 1 || activeStep === 2) &&
                                <div className='step-content' >
                                    <Box sx={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                                        <Typography style={{ fontSize: 24, textAlign: 'center', fontFamily: 'Roboto, sans-serif', paddingTop: 6 }}>Context: </Typography>
                                        <Typography style={{ fontSize: 32, textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#0B192C', marginLeft: 20 }}>{category}</Typography>
                                    </Box>
                                    {activeStep === 1 &&
                                        <TextField id="outlined-basic" label="Title" value={title} variant="standard" size={'medium'} onChange={handleTitleChange} style={{ width: '60%', marginTop: 40, marginBottom: 40 }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '60px', // Custom height
                                                    fontSize: '24px', // Font size for input content
                                                    padding: '24px', // Padding for better alignment
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '20px', // Custom font size for the label
                                                },
                                                '& .MuiInputLabel-shrink': {
                                                    fontSize: '18px', // Smaller font size for the label when focused
                                                    transform: 'translateY(-10px) scale(1)', // Shrink label above the input field
                                                },
                                            }}
                                        />
                                    }
                                    {activeStep === 2 && title &&
                                        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                                            <Typography style={{ fontSize: 24, textAlign: 'center', fontFamily: 'Roboto, sans-serif', paddingTop: 6 }}>Title: </Typography>
                                            <Typography style={{ fontSize: 32, textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#0B192C', marginLeft: 20 }}>{title}</Typography>
                                        </Box>
                                    }
                                    {activeStep === 1 &&
                                        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                                            <Typography style={{ fontSize: 24, textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>Activate comments</Typography>
                                            <Switch size='medium' {...label} defaultChecked onChange={handleStatusChange} />
                                        </Box>
                                    }
                                    {activeStep === 2 &&
                                        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                                            <Typography style={{ fontSize: 24, textAlign: 'center', fontFamily: 'Roboto, sans-serif', paddingTop: 6 }}>Comment status: </Typography>
                                            <Typography style={{ fontSize: 32, textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: '#0B192C', marginLeft: 20 }}>{commentStatus ? 'Enabled' : 'Disabled'}</Typography>
                                        </Box>
                                    }
                                </div>
                            }
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} disabled={nextTab}>
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}