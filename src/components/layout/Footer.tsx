import React from 'react';
import { Box } from '@mui/material';
export default function Footer() {
    return (
        <Box sx={{background: 'linear-gradient(to bottom, #272428, #5C4F60 )', height:'40vh', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <p>copyright {'(C)'} bbs-studio.tn</p>
        </Box>
    )
}
