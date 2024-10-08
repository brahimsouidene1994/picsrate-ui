import React from 'react';
import '../../assets/styles/Acceuil.css';
import DatingImg from '../../assets/images/tinder03.jpg';
import BusinessImg from '../../assets/images/pro.jpg';
import { ButtonContainer } from '../../components/ui/Button'
import { Link } from 'react-router-dom';
import keycloak from '../../keycloak';
import { Card } from '../../components/ui/Card';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses, LinearProgressProps } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarSeriesType, DefaultizedBarSeriesType, LineSeriesType } from '@mui/x-charts';
import { MakeOptional } from '@mui/x-charts/internals';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../../hooks/stateHooks';
interface voteData {
    trait: string,
    vdata: number[],
    start_gradiant: string,
    end_gradiant: string,
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface CustomLinearProgressProps extends LinearProgressProps {
    start_gradiant?: string;
    end_gradiant?: string;
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Acceuil() {
    const auth = useAppSelector(state => state.auth.value)
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        // window.alert("hello world");
    }, [])
    const data =
    {
        context: "BUSINESS",
        notes: ["good", "influancer", "perfect", "likeable", "bad", "not pro", "good", "influancer", "perfect", "likeable", "bad", "not pro"],
        votes: [
            {
                trait: "COMPETENT",
                vdata: [4, 6, 7, 9, 4, 6, 2],
                start_gradiant: "#63f776",
                end_gradiant: "#027a12"
            },
            {
                trait: "LIKEBLE",
                vdata: [3, 8, 4, 5, 1, 6, 9],
                start_gradiant: "#b874cf",
                end_gradiant: "#4a1d59"
            },
            {
                trait: "INFLUENTIAL",
                vdata: [7, 8, 5, 7, 9, 10, 4],
                start_gradiant: "#FF8F00",
                end_gradiant: "#995600"
            },
        ]
    }
    const graphBarData: MakeOptional<LineSeriesType, "type">[] = data.votes.map((vote: voteData) => { return { data: vote.vdata, label: vote.trait, color: vote.end_gradiant } })

    const graphs = data.votes.map((vote: voteData) => {
        const summ: number = vote.vdata.reduce((partialSum, a) => partialSum + a, 0);
        const moy: number = summ / vote.vdata.length

        return (
            <div>
                <h2 className='vote-trait'>{vote.trait}</h2>
                <LightTooltip
                    title="Average"
                    placement={"top-end"}
                    arrow={true}
                // slotProps={{
                //     popper: {
                //     modifiers: [
                //         {
                //         name: 'offset',
                //         options: {
                //             offset: [calc_offset(), 0],
                //             },
                //         },
                //     ],
                // },
                //}}
                >
                    <BorderLinearProgress variant="determinate" value={moy * 10} start_gradiant={vote.start_gradiant} end_gradiant={vote.end_gradiant} />
                </LightTooltip>
                <ProgressText className="progress-text">{(Math.round(moy)) * 10}%</ProgressText>
            </div>
        )
    });

    const notes = data.notes.map((note) => {
        return (
            <NoteText>{note}</NoteText>
        )
    })

    return (
        <div className='acceuil'>
            <div className='section-one'>
                <div className='first'>
                    <div className='dots'></div>
                    <Card className='card'>
                        <div className='card-header'>
                            <h2>Tinder</h2>
                        </div>
                        <div className='card-body'>
                            <img src={DatingImg} className='image' alt='card-image' />
                            <div className='card-content'>
                                <div className='context'>
                                    <h2></h2>
                                    <h2>Attractive</h2>
                                </div>
                                <div className='result'>
                                    <h2>Social</h2>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='likes'>
                                <FaRegHeart color='#0B192C' size={32} />
                                <h2>12</h2>
                            </div>
                            <div className='comments'>
                                <FaRegCommentDots color='#0B192C' size={32} />
                                <h2>12</h2>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='separator'></div>
                <div className='second'>
                    <h1 className='title'>Struggling to select the right picture ?</h1>
                    <span className='desc'>Just upload your picture and let the community decide for you</span>
                </div>
            </div>
            <div className='section-two'>
                <div className='first'>
                    <h1>How it works</h1>
                    <ul>
                        <li>Follow Up Tests</li>
                        <li>Consult Statistiques</li>
                        <li>Receive feedbacks</li>
                    </ul>
                </div>
                <div className='second'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2>BUSINESS</h2>
                        </div>
                        <div className='card-body'>
                            <img src={BusinessImg} className='image' alt='card-image' />
                        </div>
                        <div className='card-footer'>
                            <div><h3>Title</h3><h2>Linked-In</h2></div>
                        </div>
                    </div>
                    <div className='separator'></div>
                    <div className='side-card'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Bar" {...a11yProps(0)} />
                                <Tab label="Line" {...a11yProps(1)} />
                                <Tab label="Notes" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Stack spacing={5} sx={{ flexGrow: 1 }} style={{ padding: 20, backgroundColor: '#fff' }}>
                                {graphs}
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11] }]}
                                series={graphBarData}
                                width={500}
                                height={380}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            <Stack spacing={1} sx={{ flexGrow: 1 }}
                                style={{
                                    padding: 20,
                                    width: '100%', // Set a fixed width
                                    height: '380px', // Set a fixed height or max height
                                    overflowY: 'auto', // Enable vertical scrolling
                                    border: '1px solid #ccc', // Optional border for visibility
                                    borderRadius: '8px',
                                }}>
                                {notes}
                            </Stack>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BorderLinearProgress = styled(LinearProgress)<CustomLinearProgressProps>(({ theme, start_gradiant, end_gradiant }) => ({
    height: 50,
    borderRadius: 50,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#D9D9D9",
        transition: 'box-shadow 0.3s ease', // Smooth transition for box-shadow
        '&:hover ': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Box shadow effect on hover
        },
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 50,
        background: `linear-gradient(90deg, ${start_gradiant}, ${end_gradiant})`,
        ...theme.applyStyles('dark', {
            background: `linear-gradient(90deg, ${start_gradiant}, ${end_gradiant})`,

        }),
    },
}));

const ProgressText = styled('span')({
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    transform: 'translate(50%, -100%)',
    color: '#fff',
    // opacity: 0,
    // visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    fontFamily: 'Alice',
    fontSize: 32
});

const NoteText = styled('span')({
    color: '#1A314C',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    fontFamily: 'arial sans-serif',
    fontSize: 24,
    borderBottom: '1px solid #d9d9d9',
    textTransform: 'capitalize',
});

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.grey,
        color: '#fff',
        boxShadow: theme.shadows[1],
        fontSize: 16,
    },
}));