import { Alert, AlertTitle, Box } from '@mui/material'
import React from 'react'

export default function NotFount() {
    return (
        <Box sx={{ height: 'auto', width: '100vw', padding: 40, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ height: 'auto', width: '80%' }}>
                <Alert severity="error">
                    <AlertTitle>Oups</AlertTitle>
                    This page is unreachable or not found
                </Alert>
            </Box>
        </Box>
    )
}
