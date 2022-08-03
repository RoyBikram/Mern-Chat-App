import { Avatar, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

export const ChatListItem = ({ user, handleClick,isSelected }) => {
    return (
        <Box
            onClick={handleClick}
            sx={{
                display: 'flex',
                p: 2,
                backgroundColor: 'white',
                transition: '0.2s all',
                // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                // boxShadow: '0 0 4px 0 #00000052',
                '@media screen and (min-width: 700px)': {
                    
                    border: `${isSelected ? `2px solid ${blue[600]}` : '2px solid white'}`,
                },
                my: 1,
                borderRadius: 2,
                alignItems: 'center',
                "&:hover": {
                    cursor: "pointer"
                  }
            }}
            
        >
            <Avatar alt={user.name} src={user.pic} sx={{mr:2,width:50,height:50}} />
            <Box>
                <Typography sx={{color:grey[900]}}>{user.name}</Typography>
                <Typography sx={{fontSize:'14px',color:grey[600]}}>Latest Mesage</Typography>
            </Box>
        </Box>
    );
};
