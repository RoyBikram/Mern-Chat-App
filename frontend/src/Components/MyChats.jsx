import { Box } from '@mui/system';
import React from 'react';

export const MyChats = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '100%',
                minWidth: '300px',
                '@media screen and (min-width: 700px)': {
                    width: '34%',
                    maxWidth: '400px',
                },
                maxWidth: {
                    xs: '800px',
                },
                width: {
                    xs: '100%',
                },
                borderRadius: {
                    xs: 0,
                    sm:2
                }
            }}
        >
            MyChats
        </Box>
    );
};
