import React from 'react';
import { Badge, Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { MakeOptional } from '@mui/x-charts/internals';
import { LineChart, LineSeriesType } from '@mui/x-charts';
import { ProgressText, LightTooltip, NoteText, BorderLinearProgress } from '../ui/MStyledUi';
import CommentObject from '../../services/models/comment';
import { CATEGORY } from '../../services/models/contants/Category';
import { TRAIT } from '../../services/models/contants/Traits';
import { generateArray } from '../../utils/utilities';

interface voteData {
    trait: string,
    vdata: number[],
    base_color: string,
    gradiant_color: string
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
type DataTabsProps = {
    category: string | undefined | null;
    votes: CommentObject[];
}

export default function DataTabs({ category, votes }: DataTabsProps) {
    //notes
    const [noteMessages, setNoteMessages] = React.useState<string[]>([]);

    // bar data
    const [barData, setBarData] = React.useState<voteData[]>([]);


    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        // handleNotes(votes)
        handleBars(votes)
    }, [votes])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleBars = (_votes: CommentObject[]) => {
        if (!_votes) return;
        let result: voteData[] = [];
        let notes: string[] = [];

        let traitOne: string = '';
        let traitTwo: string = '';
        let traitThree: string = '';
        let traitOneData: number[] = [];
        let traitTwoData: number[] = [];
        let traitThreeData: number[] = [];
        let traitOneBaseBolor: string = '';
        let traitOneGradiantColor: string = '';
        let traitTwoBaseBolor: string = '';
        let traitTwoGradiantColor: string = '';
        let traitThreeBaseBolor: string = '';
        let traitThreeGradiantColor: string = '';

        // build data
        _votes.forEach(element => {
            traitOneData.push(element.voteOne);
            traitTwoData.push(element.voteTwo);
            traitThreeData.push(element.voteThree);
            if (element.message) {
                notes.push(element.message);
            }
        });
        if (category && category === CATEGORY.SOCIAL) {
            traitOne = TRAIT.CONFIDENT;
            traitTwo = TRAIT.AUTHENTIC;
            traitThree = TRAIT.FUN;
            traitOneBaseBolor = "rgb(39, 206, 127)"
            traitTwoBaseBolor = "rgb(8, 70, 218)"
            traitThreeBaseBolor = "rgb(249, 40, 40)"
            traitOneGradiantColor = "linear-gradient(109.6deg, rgb(94, 242, 150) 11.2%, rgb(39, 206, 127) 91.1%)"
            traitTwoGradiantColor = "radial-gradient(circle at 7.2% 13.6%, rgb(37, 249, 245) 0%, rgb(8, 70, 218) 90%)"
            traitThreeGradiantColor = "linear-gradient(90.8deg, rgb(255, 217, 2) 0.3%, rgb(249, 40, 40) 98.7%)"
        }
        if (category && category === CATEGORY.BUSINESS) {
            traitOne = TRAIT.COMPETENT;
            traitTwo = TRAIT.LIKEBLE;
            traitThree = TRAIT.INFLUENTIAL;
            traitOneBaseBolor = "rgb(249, 40, 40)"
            traitTwoBaseBolor = "rgb(39, 206, 127)"
            traitThreeBaseBolor = "rgb(8, 70, 218)"
            traitOneGradiantColor = "linear-gradient(90.8deg, rgb(255, 217, 2) 0.3%, rgb(249, 40, 40) 98.7%)"
            traitTwoGradiantColor = "linear-gradient(109.6deg, rgb(94, 242, 150) 11.2%, rgb(39, 206, 127) 91.1%)"
            traitThreeGradiantColor = "radial-gradient(circle at 7.2% 13.6%, rgb(37, 249, 245) 0%, rgb(8, 70, 218) 90%)"
        }
        if (category && category === CATEGORY.DATING) {
            traitOne = TRAIT.SMART;
            traitTwo = TRAIT.TRUSTWORTHY;
            traitThree = TRAIT.ATTRACTIVE;
            traitOneBaseBolor = "rgb(8, 70, 218)"
            traitTwoBaseBolor = "rgb(249, 40, 40)"
            traitThreeBaseBolor = "rgb(39, 206, 127)"
            traitOneGradiantColor = "radial-gradient(circle at 7.2% 13.6%, rgb(37, 249, 245) 0%, rgb(8, 70, 218) 90%)"
            traitTwoGradiantColor = "linear-gradient(90.8deg, rgb(255, 217, 2) 0.3%, rgb(249, 40, 40) 98.7%)"
            traitThreeGradiantColor = "linear-gradient(109.6deg, rgb(94, 242, 150) 11.2%, rgb(39, 206, 127) 91.1%)"
        }
        result.push({
            trait: traitOne,
            vdata: traitOneData,
            base_color: traitOneBaseBolor,
            gradiant_color: traitOneGradiantColor,
        });
        result.push({
            trait: traitTwo,
            vdata: traitTwoData,
            base_color: traitTwoBaseBolor,
            gradiant_color: traitTwoGradiantColor,
        });
        result.push({
            trait: traitThree,
            vdata: traitThreeData,
            base_color: traitThreeBaseBolor,
            gradiant_color: traitThreeGradiantColor,
        });
        setNoteMessages(notes);
        setBarData(result);
    }

    const notes = noteMessages.map((msg) => {
        return (
            <NoteText>{msg}</NoteText>
        )
    })

    const graphLineChartData: MakeOptional<LineSeriesType, "type">[] = barData.map((vote: voteData) => {
        return { data: vote.vdata, label: vote.trait, color: vote.base_color }
    })

    const graphs = barData.map((vote: voteData) => {
        const summ: number = vote.vdata.reduce((partialSum, a) => partialSum + a, 0);
        const moy: number = summ / vote.vdata.length

        return (
            <Box>
                <Typography sx={{ fontFamily: 'Roboto,sans-serif', fontSize: '1.5rem' }}>{vote.trait}</Typography>
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
                    <BorderLinearProgress variant="determinate" value={moy * 10} start_gradiant={vote.base_color} end_gradiant={vote.base_color} gradiant_color={vote.gradiant_color} />
                </LightTooltip>
                <ProgressText className="progress-text">{(Math.round(moy)) * 10}%</ProgressText>
            </Box>
        )
    });

    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={<Typography>Bar</Typography>} {...a11yProps(0)} />
                    <Tab label={<Typography>Lines</Typography>} {...a11yProps(1)} />
                    <Tab label={
                        <Badge badgeContent={noteMessages.length} color="primary">
                            <Typography>Notes</Typography>
                        </Badge>
                    } {...a11yProps(2)} />
                </Tabs>
            </Box>
            {barData.length > 0 ?
                <React.Fragment>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Stack spacing={8} sx={{ flexGrow: 1 }} style={{ marginTop: 20, backgroundColor: '#fff' }}>
                            {graphs}
                        </Stack>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ height: '400px' }}>
                            <LineChart
                                xAxis={[{ data: generateArray(barData[0].vdata.length) }]}
                                series={graphLineChartData}
                                grid={{ vertical: true, horizontal: true }}
                            />
                        </Box>
                    </TabPanel>
                </React.Fragment>
                :
                <Typography>loading</Typography>
            }
            {noteMessages.length > 0 ?
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}
                        style={{
                            padding: 20,
                            width: '100%',
                            height: '380px',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}>
                        {notes}
                    </Stack>
                </TabPanel>
            :
            <Typography>loading</Typography>
            }
        </React.Fragment>
    )
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