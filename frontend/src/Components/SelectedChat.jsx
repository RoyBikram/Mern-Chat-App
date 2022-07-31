import { Box } from '@mui/material';
import React from 'react';

export const SelectedChat = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '100%',
                '@media screen and (min-width: 700px)': {
                    display: 'block',
                },
                display: {
                    xs: 'none',
                },
                borderRadius: {
                    xs: 0,
                    sm:2
                },
                flexGrow: 1,
            }}
        >
            SelectedChat
        </Box>
    );
};
