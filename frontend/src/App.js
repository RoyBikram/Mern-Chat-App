import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Container from '@mui/material/Container';
import ChatPage from './Pages/ChatPage/ChatPage';

function App() {
    return (
        <Container
            maxWidth='lg'
            sx={{
                bgcolor: '#cfe8fc',
                height: '100vh',
            }}
        >
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/chat' element={<ChatPage />} />
            </Routes>
        </Container>
    );
}

export default App;
