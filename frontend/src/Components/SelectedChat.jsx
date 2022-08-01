import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { blue, grey } from '@mui/material/colors';
import { getSender } from '../Config/ChatLogic';
export const SelectedChat = () => {
    const { user, SelectedChat, setSelectedChat } = ChatState();
    const [ReceiverUser, setReceiverUser] = useState(null);
    const [IsOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (SelectedChat) {
            setIsOpen(true);
            setReceiverUser(getSender(user, SelectedChat.users));
        }
    }, [SelectedChat]);

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '100%',
                display: 'block',
                transition: '0.5s all',
                '@media screen and (min-width: 700px)': {
                    flexGrow: 1,
                },
                '@media screen and (max-width: 700px)': {
                    position: 'absolute',
                    overflow: `${IsOpen ? 'visible' : 'hidden'}`,
                    width: `${IsOpen ? '100%' : '0px'}`,
                    marginLeft: '0px !important',
                    right: 0,
                },
                borderRadius: {
                    xs: 0,
                    sm: 2,
                },
            }}
        >
            {ReceiverUser ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: {
                            xs: 1,
                            sm: 2,
                        },
                        borderBottom: `2px solid ${grey[200]}`,
                    }}
                >
                    <IconButton
                        size='large'
                        onClick={() => {
                            setIsOpen(false);
                            setTimeout(() => {
                                setSelectedChat(null);
                            }, 500);
                        }}
                        sx={{
                            '@media screen and (min-width: 700px)': {
                                display: 'none',
                            },
                        }}
                    >
                        <ArrowBackIosRoundedIcon sx={{ fontSize: 23 }} />
                    </IconButton>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar
                            src={ReceiverUser.pic}
                            sx={{ ml: 1, width: 40, height: 40, my: '4px' }}
                        />
                        <Typography sx={{ ml: 2, mt: 1, color: grey[900] }}>
                            {ReceiverUser.name}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box></Box>
            )}
        </Box>
    );
};
