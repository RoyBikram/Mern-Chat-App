import { CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import MessageBodyBg from '../../Res/Img/MessageBodyBg.png';
import MessageCard from '../miscellanceos/MessageCard';

export const MessageRenderingSection = () => {
    const [Messages, setMessages] = useState(null);
    // const [IsMessageLoading, setIsMessageLoading] = useState(false);
    const { user, SelectedChat } = ChatState();

    const fetchMessages = async () => {
        if (!SelectedChat) return;
        // setIsMessageLoading(true);
        try {
            const Config = {
                headers: {
                    Aothorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(
                `/api/message/${SelectedChat._id}`,
                Config
            );
            setMessages(data);
            // setIsMessageLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [SelectedChat]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                py: 2,
            }}
        >
            {!Messages ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            zIndex: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                                px: {
                                    sm: 5,
                                    xs:2
                            },
                            my: 2,
                        }}
                    >
                        {Messages &&
                            Messages.map((Message, index) => {
                                var IsLast = false;
                                if (index<Messages.length-1) {
                                    if (
                                        Message.sender._id !==
                                        Messages[index + 1].sender._id
                                    ) {
                                        IsLast = true;
                                    } 
                                } else {
                                var IsLast = true;
                                }
                                return (
                                    <MessageCard
                                        key={index}
                                        IsLast={IsLast}
                                        Data={Message}
                                    />
                                );
                            })}
                    </Box>
                    <Box
                        sx={{
                            backgroundImage: `url(${MessageBodyBg})`,
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            filter: 'opacity(0.15)',
                            backgroundColor: '#d4e9fb',
                        }}
                    ></Box>
                </>
            )}
        </Box>
    );
};
