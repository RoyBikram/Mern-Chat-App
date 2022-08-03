import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { blue, grey } from '@mui/material/colors';
import { ChatListItem } from './miscellanceos/ChatListItem';
import { getSender } from '../Config/ChatLogic';
import CreateGroupDrawer from './miscellanceos/CreateGroupDrawer';
export const MyChats = () => {
    const { user, SelectedChat, setSelectedChat,FetchChatAgain, Chats, setChats } =
        ChatState();
    const [DisplayDrawer, setDisplayDrawer] = useState(false);
    const fetchChat = async () => {
        try {
            const Config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('api/chat', Config);
            setChats(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const ToggleDrawer = () => {
        setDisplayDrawer(!DisplayDrawer);
    };

    useEffect(() => {
        fetchChat();
    }, [FetchChatAgain]);

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '100%',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                transition: '2s all',
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
                    sm: 2,
                },
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                boxSizing='border-box'
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                    },
                    width: '100%',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '20px',
                        color: grey[900],
                    }}
                >
                    Your Chats
                </Typography>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={ToggleDrawer}
                    sx={{
                        borderRadius: 10,
                        textTransform: 'capitalize',
                        color: grey[500],
                        borderWidth: '2px',
                        borderColor: blue[600],
                        fontWeight: '400',
                        ':hover': {
                            borderWidth: '2px',
                        },
                    }}
                    endIcon={<AddRoundedIcon />}
                >
                    Create Group
                </Button>
            </Stack>
            <Stack
                sx={{
                    flexGrow: 1,
                    width: '100%',

                    overflowY: 'scroll',
                    borderTop: `2px solid ${grey[200]}`,
                    boxSizing: 'border-box',
                    px: 2,
                    pt: 1,
                    pb: 1,

                    backgroundColor: grey[50],
                }}
            >
                {Chats.map((Chat, index) => {
                    return (<ChatListItem
                        key={index}
                        //TODO: Change the group icon to pic
                        user={
                            Chat.isGroupChat
                                ? { name: Chat.chatName, pic: `https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/344/external-group-user-interface-febrian-hidayat-glyph-febrian-hidayat.png` }
                                : getSender(user, Chat.users)
                        }
                        isSelected={
                            SelectedChat && SelectedChat._id === Chat._id
                        }
                        handleClick={() => {
                            setSelectedChat(Chat);
                        }}
                    />)
                    })}
            </Stack>
            <CreateGroupDrawer
                DisplayDrawer={DisplayDrawer}
                ToggleDrawer={ToggleDrawer}
            />
        </Box>
    );
};
