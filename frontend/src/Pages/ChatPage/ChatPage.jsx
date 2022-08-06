import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Header } from '../../Components/Header';
import { MyChats } from '../../Components/MyChats';
import { SelectedChatComponent } from '../../Components/SelectedChatComponent';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Socket } from '../../Config/SocketConfig';
import { ChatState } from '../../Context/ChatProvider';
import { fetchLatestMessage } from '../../Config/ChatLogic';

const ChatPage = () => {
    const { user, SelectedChat, setNewMessage, Chats, setChats } = ChatState();
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
        if (SelectedChat) {
            // console.log(SelectedChat._id)
        }
    }, [SelectedChat?._id]);

    const setLatestMessageToChats = (ChatId, Message) => {
        const LatestChats = Chats.map((Chat) => {
            if (ChatId === Chat._id) {
                Chat.latestMessage = Message;
            }
            return Chat;
        });
        alignChatsAfterLatestMessage(ChatId, LatestChats);
    };
    const alignChatsAfterLatestMessage = (ChatId, Chats) => {
        var LatestChat;
        const AlignedChats = Chats.filter((Chat) => {
            if (ChatId === Chat._id) {
                LatestChat = Chat;
            } else {
                return Chat;
            }
        });
        console.log();
        setChats([LatestChat, ...AlignedChats]);
    };

    useEffect(() => {
        var ChatId = SelectedChat?._id;
        if (user) {
            Socket.removeAllListeners('message received');
            if (ChatId) {
                Socket.on('message received', (message) => {
                    if (message.chat._id === ChatId) {
                        setNewMessage(message);
                        setLatestMessageToChats(message.chat._id, message);
                    } else {
                        setLatestMessageToChats(message.chat._id, message);
                    }
                });
            } else {
                Socket.on('message received', (message) => {
                    setLatestMessageToChats(message.chat._id, message);
                });
            }
        }
    });

    return (
        <>
            {user ? (
                <Box
                    sx={{
                        maxWidth: '1300px',
                        width: '100%',
                        height: '100vh',
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
                            // width: '100%',
                            // flexGrow: 1,
                            position: 'relative',
                            height: {
                                xs: 'calc(100vh - 63px)',
                                sm: '85vh',
                            },
                            '@media screen and (max-width: 700px)': {
                                overflow:'hidden',
                            }
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
