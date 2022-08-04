import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [SelectedChat, setSelectedChat] = useState();
    const [Chats, setChats] = useState([]);
    const [FetchChatAgain, setFetchChatAgain] = useState(true);
    const [NewMessage, setNewMessage] = useState();

    const Navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        if (!userInfo) {
            Navigate('/');
        } else {
            Navigate('/chats');
        }
    }, []);

    return (
        <ChatContext.Provider
            value={{
                user,
                setUser,
                SelectedChat,
                setSelectedChat,
                Chats,
                setChats,
                FetchChatAgain,
                setFetchChatAgain,
                NewMessage,
                setNewMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
