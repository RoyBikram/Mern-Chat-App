import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { blue, grey } from '@mui/material/colors';
import { getSender } from '../Config/ChatLogic';
import { ProfileModal } from './miscellanceos/ProfileModal';
import { GroupModal } from './miscellanceos/GroupModal';
import UpdateGroupDrawer from './miscellanceos/UpdateGroupDrawer';
export const SelectedChat = () => {
    const { user, SelectedChat, setSelectedChat } = ChatState();
    const [ReceiverUser, setReceiverUser] = useState(null);
    const [IsOpen, setIsOpen] = useState(false);
    const [DisplayProfile, setDisplayProfile] = useState(false);
    const [DisplayGroup, setDisplayGroup] = useState(false);
    const [DisplayUpdateDrawer, setDisplayUpdateDrawer] = useState(false);

    const handleAvatarClick = () => {
        if (SelectedChat.isGroupChat) {
            setDisplayGroup((state) => !state);
        } else {
            setDisplayProfile((state) => !state);
        }
    };

    // * Toggle ProfileModal
    const ToggleProfile = () => {
        setDisplayProfile(!DisplayProfile);
    };
    // * Toggle Group Modal
    const ToggleGroup = () => {
        setDisplayGroup((state) => !state);
    };
    // * Toggle Group Update Drawer
    const ToggleGroupUpdate = () => {
        setDisplayUpdateDrawer((state) => !state);
    };

    useEffect(() => {
        if (SelectedChat) {
            setIsOpen(true);
            // console.log(SelectedChat);
            setReceiverUser(
                SelectedChat.isGroupChat
                    ? {
                          name: SelectedChat.chatName,
                          pic: `https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/344/external-group-user-interface-febrian-hidayat-glyph-febrian-hidayat.png`,
                          users: SelectedChat.users,
                          admin: SelectedChat.groupAdmin,
                      }
                    : getSender(user, SelectedChat.users)
            );
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
                        <IconButton
                            sx={{ ml: 1, my: '4px', p: '0' }}
                            onClick={handleAvatarClick}
                        >
                            <Avatar
                                src={ReceiverUser.pic}
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                        <Typography sx={{ ml: 2, mt: 2, color: grey[900] }}>
                            {ReceiverUser.name}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box></Box>
            )}
            {DisplayProfile && (
                <ProfileModal
                    DisplayState={DisplayProfile}
                    ToggleProfile={ToggleProfile}
                    Data={ReceiverUser}
                />
            )}
            {DisplayGroup && (
                <GroupModal
                    UpdateButtonClick={ToggleGroupUpdate}
                    DisplayState={DisplayGroup}
                    ToggleGroup={ToggleGroup}
                    Data={ReceiverUser}
                />
            )}
            <UpdateGroupDrawer
                DisplayDrawer={DisplayUpdateDrawer}
                ToggleDrawer={ToggleGroupUpdate}
            />
        </Box>
    );
};
