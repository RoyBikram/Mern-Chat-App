import { Avatar, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';

function MessageCard({ Data, IsLast }) {
    const [IsOwnMessage, setIsOwnMessage] = useState(false);
    const { user } = ChatState();
    useEffect(() => {
        if (Data.sender._id === user._id) {
            setIsOwnMessage(true);
        }
    }, []);
    
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'end',
                flexDirection:`${IsOwnMessage ? 'row-reverse' : 'row'}`,
                alignSelf: `${IsOwnMessage ? 'end' : 'start'}`,
            }}
        >
            {IsLast ? (
                <Avatar sx={{ width: 30, height: 30 }} src={Data.sender.pic} />
            ) : (
                <Box sx={{ width: 30, height: 30 }}></Box>
            )}
            <Box
                sx={{
                    backgroundColor: `${IsOwnMessage ? '#d5d5d5' : '#0084FF'}`,
                    px: '15px',
                    py: '10px',
                    width: 'fit-content',
                    borderRadius: '20px',
                    color: `${IsOwnMessage ? '#0c0c0c' : 'white'}`,
                    minWidth: '8px',
                    // textAlign: 'center',
                    maxWidth: {
                        xs: '70%',
                        md: '300px',
                    },
                    // width:'70%',
                    fontSize: '15px',
                }}
            >
                {Data.content}
            </Box>
        </Box>
    );
}

export default MessageCard;
