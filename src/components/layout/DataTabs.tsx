import React from 'react';
import '../../assets/styles/Footer.css';
import { Badge, Box, Stack, Tab,Tabs, Typography, useTheme } from "@mui/material";
import { MakeOptional } from '@mui/x-charts/internals';
import { LineChart, LineSeriesType } from '@mui/x-charts';
import { ProgressText, LightTooltip, NoteText,BorderLinearProgress } from '../ui/MStyledUi';
import { FakeVotes } from '../../utils/FakeData';

interface voteData {
    trait: string,
    vdata: number[],
    start_gradiant: string,
    end_gradiant: string,
    gradiant_color: string
}
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
type DataTabsProps={
    noteCount: number
}

export default function DataTabs({noteCount}: DataTabsProps) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={<Typography>Bar</Typography>} {...a11yProps(0)} />
                    <Tab label={<Typography>Lines</Typography>} {...a11yProps(1)} />
                    <Tab label={
                        <Badge badgeContent={noteCount} color="primary">
                            <Typography>Notes</Typography>
                        </Badge>
                    } {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Stack spacing={8} sx={{ flexGrow: 1 }} style={{ marginTop: 20, backgroundColor: '#fff' }}>
                    {graphs}
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Box sx={{ height: '400px' }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11] }]}
                        series={graphBarData}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </Box>
            </TabPanel>
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

const graphBarData: MakeOptional<LineSeriesType, "type">[] = FakeVotes.votes.map((vote: voteData) => { return { data: vote.vdata, label: vote.trait, color: vote.end_gradiant } })

const graphs = FakeVotes.votes.map((vote: voteData) => {
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
                <BorderLinearProgress variant="determinate" value={moy * 10} start_gradiant={vote.start_gradiant} end_gradiant={vote.end_gradiant} gradiant_color={vote.gradiant_color} />
            </LightTooltip>
            <ProgressText className="progress-text">{(Math.round(moy)) * 10}%</ProgressText>
        </Box>
    )
});

const notes = FakeVotes.notes.map((note) => {
    return (
        <NoteText>{note}</NoteText>
    )
})