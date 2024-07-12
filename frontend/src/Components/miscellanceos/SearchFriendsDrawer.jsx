import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import { Socket } from "../../Config/SocketConfig";
import { ChatState } from "../../Context/ChatProvider";
import { axiosWithBase as axios } from "../../Config/Axios";
import { UserListItem } from "./UserListItem";

const SearchFriendsDrawer = ({ DrawerDisplay, ToggleDrawer }) => {
  const { user, setSelectedChat, Chats, setChats } = ChatState();
  const formRef = useRef();
  const [SearchQuery, setSearchQuery] = useState("");
  const [SearchLoading, setSearchLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const [ChatLoading, setChatLoading] = useState(false);

  const HandleSearch = async (event) => {
    // To Work The Required Field
    formRef.current.reportValidity();
    event.preventDefault();
    try {
      setSearchLoading(true);
      const Config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user?search=${SearchQuery}`,
        Config
      );
      setSearchLoading(false);
      setSearchResult(data);
      setSearchQuery("");
    } catch (error) {
      // TODO We have to add a toast here
      console.error(error.message);
    }
  };

  const AccessChat = async (receiverUserId) => {
    setChatLoading(true);
    try {
      const Config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat",
        { receiverUserId },
        Config
      );
      if (!Chats.find((Chat) => Chat._id === data._id)) {
        setChats([data, ...Chats]);
        Socket.emit("add friend", { data, receiverUserId });
        setSelectedChat(data);
      } else {
        setSelectedChat(data);
      }

      setChatLoading(false);
      setSearchResult([]);
      ToggleDrawer();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Drawer
        anchor='left'
        open={DrawerDisplay}
        onClose={() => {
          setSearchResult([]);
          ToggleDrawer();
        }}
      >
        <Box
          sx={{
            width: "350px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            backgroundColor: grey[50],
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontSize: "25px",
              mt: {
                xs: 2,
                sm: 8,
              },
              mb: {
                xs: 2,
                sm: 2,
              },
              color: blue[600],
              fontWeight: 400,
            }}
          >
            Search Your Friends
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Box
            component='form'
            ref={formRef}
            onSubmit={HandleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              my: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <TextField
              required
              id='SearchQuery'
              label='Name or Email'
              name='SearchQuery'
              autoFocus
              autoComplete='off'
              size='small'
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              sx={{
                width: "250px",
                mr: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: 30,
                  },
                },
              }}
            />
            <IconButton size='large' type='submit'>
              <SearchRoundedIcon fontSize='small' />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: grey[100],
              width: "100%",
              boxShadow:
                "0px 4px 15px -5px rgb(0 0 0 / 41%) inset, 0px -4px 15px -5px rgb(0 0 0 / 41%) inset",
              // mt: 4,
              overflowY: "scroll",
              borderTop: `2px solid ${blue[600]}`,
            }}
          >
            {SearchLoading || ChatLoading ? (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 1,
                  pb: 8,
                }}
              >
                {SearchResult.map((user, index) => {
                  return (
                    <UserListItem
                      key={index}
                      user={user}
                      handleClick={() => {
                        AccessChat(user._id);
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <IconButton
            onClick={ToggleDrawer}
            aria-label='Close'
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <ClearRoundedIcon />
          </IconButton>
        </Box>
      </Drawer>
    </div>
  );
};

export default SearchFriendsDrawer;
