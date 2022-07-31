import { Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

export const UserListItem = ({ user, handleClick }) => {
    return (
        <Box
            onClick={handleClick}
            sx={{
                display: 'flex',
                p: 2,
                backgroundColor: grey[300],
                my: 1,
                minWidth: '260px',
                borderRadius: 2,
                alignItems: 'center',
                "&:hover": {
                    cursor: "pointer"
                  }
            }}
            
        >
            <Avatar alt={user.name} src={user.pic} sx={{mr:2,}} />
            <Box>
                <Typography sx={{color:'black'}}>{user.name}</Typography>
                <Typography sx={{fontSize:'14px',color:grey[600]}}>{user.email}</Typography>
            </Box>
        </Box>
    );
};
