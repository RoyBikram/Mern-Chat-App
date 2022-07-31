import React, { useEffect } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import Box from '@mui/material/Box';
import { Header } from '../../Components/Header';
import { MyChats } from '../../Components/MyChats';
import { SelectedChat } from '../../Components/SelectedChat';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const { user } = ChatState();
    const Navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            Navigate('/');
        }
    }, []);

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
                        sx={{ width: '100%', flexGrow: 1 }}
                    >
                        <MyChats />
                        <SelectedChat />
                    </Stack>
                </Box>
            ) : (
                ''
            )}
        </>
    );
};

export default ChatPage;
