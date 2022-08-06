import { Avatar, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { ChatState } from '../../Context/ChatProvider';

export const ChatListItem = ({
    chatUser,
    handleClick,
    isSelected,
    latestMessage,
    isGroupChat
}) => {
    const { user } = ChatState();
    var message = '';
    if (isGroupChat) {
        if (user._id === latestMessage?.sender._id) {
            message = 'You : '
        } else {
            message = `${latestMessage?.sender.name.split(' ')[0]} : `
        }
        if (latestMessage) {
            message = message+latestMessage?.content
        }
    } else {
        if (user._id === latestMessage?.sender._id) {
            message = 'You : '
        }
        if (latestMessage) {
            message = message+latestMessage?.content
        }
    }




    return (
        <Box
            onClick={handleClick}
            sx={{
                // boxSizing:'border-box',
                p: 2,
                backgroundColor: 'white',
                transition: '0.2s all',
                // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                // boxShadow: '0 0 4px 0 #00000052',
                '@media screen and (min-width: 700px)': {
                    border: `${
                        isSelected
                            ? `2px solid ${blue[600]}`
                            : '2px solid white'
                    }`,
                },
                my: 1,
                borderRadius: 2,
                alignItems: 'center',
                '&:hover': {
                    cursor: 'pointer',
                },
            }}
        >
            <Box sx={{overflow:'hidden',display: 'flex',}}>
                <Avatar
                    alt={chatUser.name}
                    src={chatUser.pic}
                    sx={{ mr: 2, width: 50, height: 50 }}
                />
                <Box>
                    <Typography sx={{ color: grey[900] }}>
                        {chatUser.name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: grey[600],
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflowX: 'hidden',
                        }}
                    >{message}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
