import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Grid,
    Snackbar,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import React, { useState, useRef } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 30,
        },
    },
});
export const SignUp = () => {
    const formRef = React.useRef();
    const [FirstName, setFirstName] = useState();
    const [LastName, setLastName] = useState();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [ConfirmPassword, setConfirmPassword] = useState();
    const [PicUrl, setPicUrl] = useState();
    const [IsPicLoading, setIsPicLoading] = useState(false);
    const [DataPosting, setDataPosting] = useState(false);
    const [DisplayToast, setDisplayToast] = useState(false);
    const [ToastStatus, setToastStatus] = useState('info');
    const [ToastTitle, setToastTitle] = useState('');
    const Navigate = useNavigate()
    const toast = (title, status) => {
        setToastTitle(title);
        setToastStatus(status);
        setDisplayToast(true);
    };

    const handleSubmit = async (event) => {
        // To Work The Required Field
        formRef.current.reportValidity();
        event.preventDefault();

        // Check The Password = Conform Password
        if (Password !== ConfirmPassword) {
            toast('Password & Confirm Password Not Match', 'error')
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-type':'application/json',
                }
            }
            const {data} = await axios.post('/api/user', { name: `${FirstName} ${LastName}`, email: Email, password: Password, pic: PicUrl })
            console.log(data)
            toast('Registration Successful', 'success')
            localStorage.setItem('userInfo', JSON.stringify(data))
            Navigate('/chats')
        } catch (error) {
            console.log(error)
            toast(`${error.response.data}`,'error')
        }

    };
    const handleImage = (event) => {
        setIsPicLoading(true);
        const pic = event.target.files[0];
        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const picData = new FormData();
            picData.append('file', pic);
            picData.append('upload_preset', 'Mern-Chat-App');
            picData.append('cloud_name', 'duynewrnb');
            fetch('https://api.cloudinary.com/v1_1/duynewrnb/image/upload', {
                method: 'post',
                body: picData,
            })
                .then((res) => res.json())
                .then((res) => {
                    setPicUrl(res.url.toString());
                    console.log(res.url.toString());
                    setIsPicLoading(false);
                });
        }
    };
    return (
        <Box
            component='form'
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
        >
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Avatar
                        alt='Profile'
                        src={PicUrl}
                        sx={{ height: 130, width: 130, my: 0, ml: 1 }}
                    />
                    <Box>
                        <Box sx={{ mb: 5, mr: 1, color: grey[600] }}>
                            Upload Profile Picture
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                            <Button component='label' disabled={IsPicLoading}>
                                Upload
                                <input
                                    hidden
                                    accept='image/*'
                                    type='file'
                                    onChange={handleImage}
                                />
                            </Button>
                            {IsPicLoading && (
                                <CircularProgress
                                    size={18}
                                    sx={{
                                        color: 'primary',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        autoComplete='given-name'
                        name='firstName'
                        required
                        fullWidth
                        id='firstName'
                        label='First Name'
                        autoFocus
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledTextField
                        required
                        fullWidth
                        id='lastName'
                        label='Last Name'
                        name='lastName'
                        autoComplete='family-name'
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField
                        inputProps={{ minLength: '6' }}
                        required={true}
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField
                        inputProps={{ minLength: '6' }}
                        required
                        fullWidth
                        name='confirm_password'
                        label='Confirm Password'
                        type='password'
                        id='confirm_password'
                        autoComplete='new-password'
                        sx={{ borderRadius: 12 }}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                    mt: 5,
                    mb: 0,
                    fontSize: 16,
                    fontWeight: 400,
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: 15,
                }}
            >
                Sign Up
            </Button>

            {/* Alert */}
            <Snackbar
                open={DisplayToast}
                autoHideDuration={6000}
                onClose={() => {
                    setDisplayToast(false);
                }}
                key={'top center'}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => {
                        setDisplayToast(false);
                    }}
                    severity={ToastStatus}
                    sx={{ width: '100%' }}
                    variant='filled'
                >
                    {ToastTitle}
                </Alert>
            </Snackbar>
        </Box>
    );
};
