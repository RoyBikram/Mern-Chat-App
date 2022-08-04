import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../Components/Header';
import { MyChats } from '../../Components/MyChats';
import { SelectedChatComponent } from '../../Components/SelectedChatComponent';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Socket } from '../../Config/SocketConfig';
import { ChatState } from '../../Context/ChatProvider';

const ChatPage = () => {
    const { user, SelectedChat, setNewMessage } = ChatState();
    const Navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            Navigate('/');
        } else {
            // ConnectSocket()
            Socket.emit('setup', user);
            // Socket.on('connected', () => {
            // })
        }
    });

    useEffect(() => {
        if (user) {
            Socket.on('message received', (message) => {
                console.log(SelectedChat)
                if (message.chat._id === SelectedChat._id) {
                    setNewMessage(message);
                } else {
                    console.log(message.sender.name + ' : ' + message.content);
                }
            });
        }
    }, [SelectedChat]);

    return (
        <>
            {user ? (
                <Box
                    sx={{
                        maxWidth: '1300px',
                        width: '100%',
                        mr: 'auto',
                        ml: 'auto',
                        p: {
                            xs: 0,
                            sm: 4,
                            md: 6,
                        },
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    <Header />
                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            width: '100%',
                            flexGrow: 1,
                            position: 'relative',
                        }}
                    >
                        <MyChats />
                        <SelectedChatComponent />
                    </Stack>
                </Box>
            ) : (
                ''
            )}
        </>
    );
};

export default ChatPage;
