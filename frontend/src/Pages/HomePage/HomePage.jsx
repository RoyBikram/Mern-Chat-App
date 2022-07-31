import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Login } from '../../Components/Auth/Login';
import { SignUp } from '../../Components/Auth/SignUp';
import MainIcon from '../../Res/Img/MainIcon.png';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import { useEffect } from 'react';

export default function HomePage() {
    const { user } = ChatState();
    const Navigate = useNavigate()


    const [alignment, setAlignment] = React.useState('login');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    useEffect(() => {
        if (user) {
            Navigate('/chats')
        }

    }, [])
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
                    src={MainIcon}
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
