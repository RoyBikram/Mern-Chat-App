import {
    Avatar,
    Backdrop,
    Button,
    Chip,
    Grow,
    IconButton,
    Modal,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { blue, grey } from '@mui/material/colors';
import { ChatState } from '../../Context/ChatProvider';

export const GroupModal = ({
    DisplayState,
    ToggleGroup,
    Data,
    UpdateButtonClick,
}) => {

    const { user } = ChatState();

    return (
        <Box>
            <Modal
                open={DisplayState}
                onClose={ToggleGroup}
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

                            bgcolor: 'white',
                            zIndex: 1000,
                            borderRadius: 2,
                            px: 1,
                            py: 5,
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
                                mb: 4,
                                border: '4px solid',
                                borderColor: blue[600],
                                boxShadow: '0 0 20px 0px #1976d2d6',
                            }}
                            src={Data.pic}
                        />
                        <Typography variant='h5' component='h2'>
                            {Data.name}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 1,
                                p: 1,
                                pt: 3,
                            }}
                        >
                            {Data.users &&
                                Data.users.map((user, index) => {
                                    // console.log(user)
                                    return (
                                        <Chip
                                            key={index}
                                            variant='outlined'
                                            color={user._id === Data.admin._id ?'warning':'primary' }
                                            label={user.name.split(' ')[0]}
                                            avatar={<Avatar src={user.pic} />}
                                        />
                                    );
                                })}
                        </Box>
                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                width: '100%',
                            }}
                        >
                            {user._id === Data.admin._id ? (
                                <Button
                                    onClick={() => {
                                        ToggleGroup();
                                        UpdateButtonClick();
                                    }}
                                    variant='outlined'
                                    sx={{
                                        pt: '7px',
                                        borderRadius: 10,
                                        textTransform: 'capitalize',
                                        // color: grey[500],
                                        borderWidth: '2px',
                                        borderColor: blue[600],
                                        fontWeight: '500',
                                        ':hover': {
                                            borderWidth: '2px',
                                        },
                                    }}
                                >
                                    Update
                                </Button>
                            ) : (
                                <></>
                            )}
                            <Button
                                // size='small'
                                variant='outlined'
                                color='error'
                                sx={{
                                    pt: '7px',
                                    borderRadius: 10,
                                    textTransform: 'capitalize',
                                    // color: grey[500],
                                    borderWidth: '2px',
                                    // borderColor: blue[600],
                                    fontWeight: '500',
                                    ':hover': {
                                        borderWidth: '2px',
                                    },
                                }}
                            >
                                Leave Group
                            </Button>
                        </Box>
                        <IconButton
                            onClick={ToggleGroup}
                            aria-label='Close'
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
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
