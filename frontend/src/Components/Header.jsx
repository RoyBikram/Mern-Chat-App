import {
    Avatar,
    Badge,
    Button,
    Divider,
    Drawer,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { blue, grey } from '@mui/material/colors';
import MainIcon from '../Res/Img/MainIcon.png';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import InputBase from '@mui/material/InputBase';
import { ChatState } from '../Context/ChatProvider';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { ProfileModal } from './miscellanceos/ProfileModal';
import { useNavigate } from 'react-router-dom';
import SearchFriendsDrawer from './miscellanceos/SearchFriendsDrawer';



export const Header = () => {
    // *All States

    const [SearchQuery, setSearchQuery] = useState('');
    const [SearchResult, setSearchResult] = useState([]);
    const [SearchLoading, setSearchLoading] = useState(false);
    const [ChatLoading, setChatLoading] = useState(false);
    const [notificationMenuDisplay, setNotificationMenuDisplay] =
        useState(null);
    const [avatarMenuDisplay, setAvatarMenuDisplay] = useState(null);
    const [DrawerDisplay, setDrawerDisplay] = useState(false);
    const [DisplayProfile, setDisplayProfile] = useState(false);
    const { user, setUser } = ChatState();
    const Navigate = useNavigate()

    // * Notification Button Handles

    const openNotificationMenu = Boolean(notificationMenuDisplay);
    const handleNotificationClick = (event) => {
        setNotificationMenuDisplay(event.currentTarget);
    };
    const handleNotificationMenuClick = () => {
        setNotificationMenuDisplay(null);
    };

    // * Avatar Button Handles

    const openAvatarMenu = Boolean(avatarMenuDisplay);
    const handleAvatarClick = (event) => {
        setAvatarMenuDisplay(event.currentTarget);
    };
    const handleAvatarMenuClick = () => {
        setAvatarMenuDisplay(null);
    };

    // * Toggle ProfileModal 
    const ToggleProfile = () => {
        setDisplayProfile(!DisplayProfile);
    };
    // * Toggle Side Drawer 
    const ToggleDrawer = () => {
        setDrawerDisplay(!DrawerDisplay);
    };

    // * Logout Button Click Handler
    const LogoutHandler = () => { 
        localStorage.removeItem('userInfo')
        setUser(null)
        Navigate('/')
     }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '55px',
                    mb: {
                        xs: 1,
                        sm:2
                    },
                    borderRadius: {
                        xs: 0,
                        sm: 2,
                    },
                    boxSizing: 'border-box',
                    padding: 1,
                    px: {
                        xs: 2,
                        md: 3,
                    },
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <Box>
                    <Button
                        aria-label='Search'
                        variant='outlined'
                        onClick={() => {
                            setDrawerDisplay(true);
                        }}
                        sx={{
                            borderRadius: 6,
                            borderWidth: '2px',
                            borderColor: blue[600],
                            ':hover': {
                                borderWidth: '2px',
                            },
                        }}
                    >
                        <SearchRoundedIcon fontSize='small' />
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                display: { xs: 'none', md: 'inline-block' },
                                fontSize: '14px',
                                color: grey[500],
                                ml: 1,
                                mr: '3px',
                            }}
                        >
                            Search Your Friends
                        </Typography>
                    </Button>
                </Box>
                <Box
                    component='img'
                    src={MainIcon}
                    sx={{
                        height: '45px',
                        width: '47px',
                        position: 'absolute',
                        transform: 'translate(-50%,0%)',
                        left: '50%',
                    }}
                ></Box>

                <Box sx={{ display: 'flex', alignItems: 'center',gap:1 }}>
                    {/* <IconButton onClick={handleNotificationClick}>
                        <Badge badgeContent={1} color='primary'>
                            <NotificationsNoneRoundedIcon color='action' />
                        </Badge>
                    </IconButton>
                    <Menu
                        id='basic-menu'
                        anchorEl={notificationMenuDisplay}
                        open={openNotificationMenu}
                        onClose={() => {
                            setNotificationMenuDisplay(null);
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem
                            sx={{ px: 4 }}
                            onClick={handleNotificationMenuClick}
                        >
                            No Notification
                        </MenuItem>
                    </Menu> */}
                    <IconButton onClick={handleAvatarClick} sx={{p:0}}>
                        <Avatar
                            alt={user.name}
                            src={user.pic}
                            sx={{ height: '40px', width: '40px' }}
                        />
                    </IconButton>
                    <Menu
                        id='basic-menu'
                        anchorEl={avatarMenuDisplay}
                        open={openAvatarMenu}
                        onClose={() => {
                            setAvatarMenuDisplay(null);
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{ px: 10 }}
                    >
                        <MenuItem
                            sx={{ px: 4 }}
                            onClick={() => {
                                handleAvatarMenuClick();
                                setDisplayProfile(true);
                            }}
                        >
                            <ListItemIcon>
                                <PersonRoundedIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            sx={{ px: 4 }}
                            onClick={LogoutHandler}
                        >
                            <ListItemIcon>
                                <LogoutRoundedIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <SearchFriendsDrawer DrawerDisplay={DrawerDisplay} ToggleDrawer = {ToggleDrawer}/>
            <ProfileModal
                DisplayState={DisplayProfile}
                ToggleProfile={ToggleProfile}
                Data= {user}
            />
        </>
    );
};
