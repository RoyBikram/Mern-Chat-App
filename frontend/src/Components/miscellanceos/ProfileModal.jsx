import {
    Avatar,
    Backdrop,
    Grow,
    IconButton,
    Modal,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { blue } from '@mui/material/colors';

export const ProfileModal = ({ DisplayState, ToggleProfile, Data }) => {
    return (
        <Box>
            <Modal
                open={DisplayState}
                onClose={ToggleProfile}
                closeAfterTransition
                BackdropComponent={Backdrop}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Grow in={DisplayState}>
                    <Box
                        sx={{
                            width: {
                                xs: '270px',
                                md: '370px',
                            },
                            height: {
                                xs: '380px',
                                md: '470px',
                            },
                            bgcolor: 'white',
                            zIndex: 1000,
                            borderRadius: 2,
                            boxShadow: '0 0 20px 0px #00000033',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        <Avatar
                            sx={{
                                height: {
                                    xs: 150,
                                    md: 180,
                                },
                                width: {
                                    xs: 150,
                                    md: 180,
                                },
                                mb: 6,
                                border: '4px solid',
                                borderColor: blue[600],
                                boxShadow:'0 0 20px 0px #1976d2d6'
                            }}
                            src={Data.pic}
                        />
                        <Typography variant='h5' component='h2'>
                            {Data.name}
                        </Typography>
                        <Typography
                            id='transition-modal-description'
                            sx={{ mt: 2, fontSize: '16px' }}
                        >
                            {Data.email}
                        </Typography>
                        <IconButton
                            onClick={ToggleProfile}
                            aria-label='Close'
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right:5,
                                // zIndex: 1001,
                            }}
                        >
                            <ClearRoundedIcon />
                        </IconButton>
                    </Box>
                </Grow>
            </Modal>
        </Box>
    );
};
