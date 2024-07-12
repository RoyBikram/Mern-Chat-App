import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { getSender } from "../Config/ChatLogic";
import { ChatState } from "../Context/ChatProvider";
import { MessageRenderingSection } from "./SelectedChat/MessageRenderingSection";
import { GroupModal } from "./miscellanceos/GroupModal";
import { ProfileModal } from "./miscellanceos/ProfileModal";
import UpdateGroupDrawer from "./miscellanceos/UpdateGroupDrawer";
// import { MessageEnteringSection } from './SelectedChat/MessageEnteringSection';
import SendIcon from "@mui/icons-material/Send";
import Lottie from "lottie-web";
import { axiosWithBase as axios } from "../Config/Axios";
import { Socket } from "../Config/SocketConfig";
export const SelectedChatComponent = () => {
  const { user, SelectedChat, setSelectedChat, Chats, setChats, NewMessage } =
    ChatState();
  const [ReceiverUser, setReceiverUser] = useState(null);
  const [IsOpen, setIsOpen] = useState(false);
  const [DisplayProfile, setDisplayProfile] = useState(false);
  const [DisplayGroup, setDisplayGroup] = useState(false);
  const [DisplayUpdateDrawer, setDisplayUpdateDrawer] = useState(false);
  const [MessagesOfChat, setMessagesOfChat] = useState();
  const [IsMessageLoading, setIsMessageLoading] = useState(false);
  const [Typing, setTyping] = useState(false);
  const [IsTyping, setIsTyping] = useState(false);
  // const ENDPOINT = 'http://localhost:5001'
  // var Socket, SelectedChatCompare;

  const formRef = useRef();
  const inputRef = useRef();
  const ChattingAnimation = useRef();

  const handleInputFocusInMobile = () => {};

  const setLatestMessageToChats = (ChatId, Message) => {
    const LatestChats = Chats.map((Chat) => {
      if (ChatId === Chat._id) {
        Chat.latestMessage = Message;
      }
      return Chat;
    });
    alignChatsAfterLatestMessage(ChatId, LatestChats);
  };
  const alignChatsAfterLatestMessage = (ChatId, Chats) => {
    var LatestChat;
    const AlignedChats = Chats.filter((Chat) => {
      if (ChatId === Chat._id) {
        LatestChat = Chat;
      } else {
        return Chat;
      }
    });
    // console.log()
    setChats([LatestChat, ...AlignedChats]);
  };

  const handleMessageSend = async (event) => {
    // To Work The Required Field
    formRef.current.reportValidity();
    event.preventDefault();
    const message = inputRef.current.value;
    inputRef.current.value = "";
    inputRef.current.focus();
    try {
      const Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/message",
        {
          content: message,
          chatId: SelectedChat._id,
        },
        Config
      );
      // console.log(data)
      Socket.emit("new message", data);
      setLatestMessageToChats(data.chat._id, data);
      setMessagesOfChat([...MessagesOfChat, data]);
      Socket.emit("stop typing", SelectedChat._id);
    } catch (error) {
      console.log(error.message);
    }
  };
  var Timer;
  const typingHandler = () => {
    if (!Typing) {
      setTyping(true);
      Socket.emit("typing", SelectedChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    clearTimeout(Timer);
    Timer = setTimeout(() => {
      var timenow = new Date().getTime();
      var timeDiff = timenow - lastTypingTime;
      if (timeDiff >= timerLength && Typing) {
        Socket.emit("stop typing", SelectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleAvatarClick = () => {
    if (SelectedChat.isGroupChat) {
      setDisplayGroup((state) => !state);
    } else {
      setDisplayProfile((state) => !state);
    }
    console.log(SelectedChat);
  };

  // * Toggle ProfileModal
  const ToggleProfile = () => {
    setDisplayProfile(!DisplayProfile);
  };
  // * Toggle Group Modal
  const ToggleGroup = () => {
    setDisplayGroup((state) => !state);
  };
  // * Toggle Group Update Drawer
  const ToggleGroupUpdate = () => {
    setDisplayUpdateDrawer((state) => !state);
  };

  // * Fetch Chat

  const fetchMessages = async () => {
    if (!SelectedChat) return;
    setIsMessageLoading(true);
    try {
      const Config = {
        headers: {
          Aothorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${SelectedChat._id}`,
        Config
      );
      setMessagesOfChat(data);
      setIsMessageLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  var instance;
  useEffect(() => {
    instance = Lottie.loadAnimation({
      container: ChattingAnimation.current,
      loop: true,
      autoplay: true,
      renderer: "svg",
      animationData: require("../Res/Json/ChatPageAnimation.json"),
    });
    return () => instance.destroy();
  });

  useEffect(() => {
    if (NewMessage) {
      MessagesOfChat
        ? setMessagesOfChat([...MessagesOfChat, NewMessage])
        : setMessagesOfChat([NewMessage]);
    }
  }, [NewMessage]);

  useEffect(() => {
    if (SelectedChat) {
      setIsOpen(true);
      setReceiverUser(
        SelectedChat.isGroupChat
          ? {
              name: SelectedChat.chatName,
              pic: `https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/344/external-group-user-interface-febrian-hidayat-glyph-febrian-hidayat.png`,
              users: SelectedChat.users,
              admin: SelectedChat.groupAdmin,
            }
          : getSender(user, SelectedChat.users)
      );
      instance.destroy();
      Socket.emit("join room", SelectedChat._id);
      Socket.removeAllListeners("typing");
      Socket.removeAllListeners("stop typing");
      Socket.on("typing", (ChatId) => {
        if (ChatId === SelectedChat._id) {
          setIsTyping(true);
        }
      });
      Socket.on("stop typing", (ChatId) => {
        if (ChatId === SelectedChat._id) {
          setIsTyping(false);
        }
      });
    }
  }, [SelectedChat?._id]);
  // console.log(SelectedChat)
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100%",
        display: "block",
        transition: "all 0.5s",
        "@media screen and (min-width: 700px)": {
          flexGrow: 1,
        },
        "@media screen and (max-width: 700px)": {
          position: "absolute",
          overflow: `${IsOpen ? "visible" : "hidden"}`,
          width: `${IsOpen ? "100%" : "0px"}`,
          marginLeft: "0px !important",
          right: 0,
        },
        borderRadius: {
          xs: 0,
          sm: 2,
        },
      }}
    >
      {ReceiverUser ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // flexDirection:'column',
              padding: {
                xs: 1,
                sm: 2,
              },
              borderBottom: `2px solid ${grey[200]}`,
            }}
          >
            <IconButton
              size='large'
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setSelectedChat(null);
                }, 500);
              }}
              sx={{
                "@media screen and (min-width: 700px)": {
                  display: "none",
                },
              }}
            >
              <ArrowBackIosRoundedIcon sx={{ fontSize: 23 }} />
            </IconButton>
            <Box sx={{ display: "flex" }}>
              <IconButton
                sx={{ ml: 1, my: "4px", p: "0" }}
                onClick={handleAvatarClick}
              >
                <Avatar src={ReceiverUser.pic} sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Typography sx={{ ml: 2, mt: 2, color: grey[900] }}>
                {ReceiverUser.name}
              </Typography>
            </Box>
          </Box>
          <MessageRenderingSection
            IsTyping={IsTyping}
            IsMessageLoading={IsMessageLoading}
            Messages={MessagesOfChat}
            FetchMessages={fetchMessages}
          />
          <Box
            ref={formRef}
            component='form'
            onSubmit={handleMessageSend}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              p: "10px",
              boxSizing: "border-box",
            }}
          >
            <Box
              component='input'
              ref={inputRef}
              required
              onChange={typingHandler}
              sx={{
                fontSize: "16px",
                color: grey[900],
                flexGrow: 1,
                backgroundColor: grey[300],
                height: "40px",
                borderRadius: "10px",
                px: 2,
                outline: "none",
                borderWidth: "0px",
              }}
            />
            <IconButton type='submit' size='medium' sx={{ ml: "10px" }}>
              <SendIcon sx={{ color: blue[700], fontSize: "25px" }} />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "@media screen and (max-width: 700px)": {
              display: "none",
            },
          }}
        >
          <Box sx={{ height: "33%" }} ref={ChattingAnimation}></Box>
        </Box>
      )}
      {DisplayProfile && (
        <ProfileModal
          DisplayState={DisplayProfile}
          ToggleProfile={ToggleProfile}
          Data={ReceiverUser}
        />
      )}
      {DisplayGroup && (
        <GroupModal
          UpdateButtonClick={ToggleGroupUpdate}
          DisplayState={DisplayGroup}
          ToggleGroup={ToggleGroup}
          Data={ReceiverUser}
        />
      )}
      <UpdateGroupDrawer
        DisplayDrawer={DisplayUpdateDrawer}
        ToggleDrawer={ToggleGroupUpdate}
      />
    </Box>
  );
};
