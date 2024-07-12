import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import { Socket } from "../../Config/SocketConfig";
import { ChatState } from "../../Context/ChatProvider";
import { axiosWithBase as axios } from "../../Config/Axios";

export const MessageEnteringSection = () => {
  const { user, SelectedChat } = ChatState();
  const formRef = useRef();
  const inputRef = useRef();

  const handleMessageSend = async (event) => {
    // To Work The Required Field
    formRef.current.reportValidity();
    event.preventDefault();
    const message = inputRef.current.value;
    inputRef.current.value = "";
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
      // TODO! Have to add message to the local messages but i want to feach this data from server real time
    } catch (error) {
      console.log(error.message);
    }
  };
  const typingMessage = (event) => {};
  return (
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
  );
};
