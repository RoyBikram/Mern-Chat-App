import { Avatar, Box, Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import React from 'react';
import { borderRadius } from '@mui/system';
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: 30,
        },
    },
});
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};
export const SignUp = () => {
    return (
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // backgroundColor:'red'
                    }}
                >
                    <Avatar
                        alt='Profile'
                        src=''
                        sx={{ height: 130, width: 130, my: 2,ml:1 }}
                    />
                    <Box>
                    <Box sx={{ mb: 5,mr:1, color:grey[600] }}>Upload Profile Picture</Box>

                    <Button component='label'>
                        Upload
                        <input hidden accept='image/*' multiple type='file' />
                    </Button>
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
                        // autoFocus
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                    />
                </Grid>
                <Grid item xs={12}>
                    <StyledTextField
                        required
                        fullWidth
                        name='password'
                        label='Confirm Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                        sx={{ borderRadius: 12 }}
                    />
                </Grid>
            </Grid>
            <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                    mt: 5,
                    mb: 10,
                    fontSize: 16,
                    fontWeight: 400,
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: 15,
                }}
            >
                Sign Up
            </Button>
        </Box>
    );
};
