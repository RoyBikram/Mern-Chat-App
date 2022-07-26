import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Login } from '../../Components/Auth/Login';
import { SignUp } from '../../Components/Auth/SignUp';
import HomeImgUrl from '../../Res/Img/HomeImg.png';
import { grey } from '@mui/material/colors';

export default function HomePage() {
    const [alignment, setAlignment] = React.useState('login');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    return (
        <Container
            component='main'
            maxWidth='false'
            sx={{
                maxWidth: '500px',
                p: '0',
            }}
        >
            <Box
                sx={{
                    my: {
                        sm: 8,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'white',
                    px: {
                        sm: 5,
                        xs:3
                    },
                    py: 5,
                    borderRadius: {
                        sm: 4,
                    },
                    boxSizing: 'border-box',
                    minHeight: {
                        xs: '100%',
                        sm: 'fit-content',
                    },
                }}
            >
                <Box
                    component='img'
                    sx={{
                        height: 160,
                        width: 170,
                        mb: 1,
                    }}
                    alt='The house from the offer.'
                    src={HomeImgUrl}
                />
                <Box
                    component='h2'
                    sx={{
                        mb: 7,
                        fontWeight: 500,
                        color: grey[800],
                    }}
                >
                    Welcome To WebChat
                </Box>
                <ToggleButtonGroup
                    color='primary'
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    size='large'
                    fullWidth={true}
                >
                    <ToggleButton
                        sx={{ border: 0, borderRadius: 15 }}
                        value='login'
                    >
                        Login
                    </ToggleButton>
                    <ToggleButton
                        sx={{ border: 0, borderRadius: 15 }}
                        value='signup'
                    >
                        Sign Up
                    </ToggleButton>
                </ToggleButtonGroup>

                {alignment === 'login' ? <Login /> : <SignUp />}
            </Box>
        </Container>
    );
}
