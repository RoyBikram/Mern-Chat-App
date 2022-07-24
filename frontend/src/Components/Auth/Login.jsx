import { Box, Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import React from 'react';
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
export const Login = () => {
    return (
        <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledTextField
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        // autoFocus
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
                Login
            </Button>
        </Box>
    );
};
