import { Box, Divider, Typography } from "@mui/material";
import DataTabs from "../ui/DataTabs";
import CommentObject from "services/models/comment";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type imageProps = {
    path: string;
    category: string;
    createDate: string;
    context: string;
    votes:Array<CommentObject>;
}
export default function TestDetails({ path, category, createDate, context, votes }: imageProps) {
    const theme = useTheme();

    // Check for specific breakpoints
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // for small screens (e.g., mobile)
    return (
        <Box sx={{ width: '100%',height:'100%', paddingLeft: 4, paddingRight: 4, background: '#fff' }}>
            <Box sx={{ width: '100%', display: 'flex',flexDirection:isSmallScreen?'column':'row', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
                <Box sx={{ width: isSmallScreen?'100%':'45%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5, paddingBottom: 5, paddingRight: isSmallScreen?0:4 }}>
                    <Box sx={{ height: '2.5rem', width: '100%', backgroundColor: '#0B192C' }}>
                        <Typography sx={{ fontSize: '1.7rem', color: '#fff', textAlign: 'center' }}>{category}</Typography>
                    </Box>
                    <img src={path} alt={'current-picture'} style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }} />
                    <Box sx={{ width: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ width: '100%' }}>
                            <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Title</Typography>
                            <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{context}</Typography>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Typography sx={{ fontSize: '1.2rem', color: '#0b192cb8', textAlign: 'start' }}>Created At</Typography>
                            <Typography sx={{ fontSize: '1.5rem', color: '#0B192C', textAlign: 'start', textTransform: 'capitalize' }}>{createDate}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ width: isSmallScreen?'100%':'90%', padding: isSmallScreen?0:5 }}>
                    <DataTabs category={category} votes={votes} />
                </Box>
            </Box>
        </Box>

    )
}