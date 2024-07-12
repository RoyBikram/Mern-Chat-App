import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  MobileStepper,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { axiosWithBase as axios } from "../../Config/Axios";
import { UserListItem } from "./UserListItem";
const UpdateGroupDrawer = ({ DisplayDrawer, ToggleDrawer }) => {
  const {
    user,
    setSelectedChat,
    SelectedChat,
    setFetchChatAgain,
    Chats,
    setChats,
  } = ChatState();
  const formRef = useRef();
  const [SelectedUsers, setSelectedUsers] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");
  const [SearchLoading, setSearchLoading] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const [GroupLoading, setGroupLoading] = useState(false);
  const [TabState, setTabState] = useState(1);
  const [GroupName, setGroupName] = useState("");
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
  const handleUserRemove = async (RemoveUser) => {
    if (RemoveUser._id === user._id) {
      // Todo : add a toust to display you can not remove you form here
      console.log("you can not remove you form here");
      return;
    }
    if (SelectedChat.users.length < 4) {
      // Todo : Atleast 3 user needed
      console.log("Atleast 3 user needed");
      return;
    }
    try {
      setGroupLoading(true);
      const Config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "api/chat/groupremove",
        {
          userId: RemoveUser._id,
          chatId: SelectedChat._id,
        },
        Config
      );
      setSelectedChat(data);
      setFetchChatAgain((state) => !state);
      setGroupLoading(false);
      // TODO Display a toust that group has updated
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUserAdd = async (AddUser) => {
    if (SelectedChat.users.find((each) => each._id === AddUser._id)) {
      // TODO: add a toust
      console.log("User Already exist");
      return;
    }
    try {
      setGroupLoading(true);
      const Config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "api/chat/groupadd",
        {
          userId: AddUser._id,
          chatId: SelectedChat._id,
        },
        Config
      );
      setSelectedChat(data);
      setFetchChatAgain((state) => !state);
      setGroupLoading(false);
      // TODO Display a toust that group has updated
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRenameGroupChat = async (event) => {
    // To Work The Required Field
    formRef.current.reportValidity();
    event.preventDefault();
    try {
      setGroupLoading(true);
      const Config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "api/chat/rename",
        {
          updatedChatName: GroupName,
          chatId: SelectedChat._id,
        },
        Config
      );
      setSelectedChat(data);
      setFetchChatAgain((state) => !state);
      setGroupLoading(false);
      // TODO Display a toust that group has updated
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleNextButtonClick = () => {
    if (SelectedUsers.length < 3) {
      // TODO: Add toust to display this message
      console.log("At-least need three user");
      return;
    }
    setSearchResult([]);
    setTabState(2);
  };
  const handleBackButtonClick = () => {
    setTabState(1);
  };
  // const addUserToGroup = (user) => {
  //     if (SelectedUsers.find((each) => each._id === user._id)) {
  //         // TODO : Have to add a toust
  //         console.log('User already added');
  //         return;
  //     }
  //     setSelectedUsers([...SelectedUsers, user]);
  // };
  const handleDrawerClose = () => {
    setSearchResult([]);
    setSelectedUsers([]);
    ToggleDrawer();
  };

  useEffect(() => {
    if (SelectedChat) {
      setSelectedUsers(SelectedChat.users);
    }
  }, [SelectedChat, DisplayDrawer]);

  return (
    <div>
      <Drawer anchor='right' open={DisplayDrawer} onClose={handleDrawerClose}>
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
            Update The Group
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Box sx={{ width: "100%" }}>
            <MobileStepper
              variant='dots'
              steps={2}
              position='static'
              activeStep={TabState - 1}
              sx={{
                maxWidth: 400,
                flexGrow: 1,
                justifyContent: "center",
                background: "none",
              }}
            />
            <TabContext value={String(TabState)}>
              <TabPanel value='1'>
                <Box
                  component='form'
                  ref={formRef}
                  onSubmit={HandleSearch}
                  sx={{
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    my: {
                      xs: 3,
                      sm: 4,
                    },
                    gap: 1,
                  }}
                >
                  <TextField
                    required
                    id='SearchQuery'
                    label='Add User'
                    name='SearchQuery'
                    autoFocus
                    autoComplete='off'
                    size='small'
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    sx={{
                      // flexGrow:1,
                      width: "200px",
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
                  <Button
                    sx={{
                      borderRadius: "30px",
                      textTransform: "capitalize",
                      mt: "2px",
                      borderWidth: "2px",
                      borderColor: blue[600],
                      ":hover": {
                        borderWidth: "2px",
                      },
                    }}
                    size='small'
                    variant='outlined'
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexWrap: "wrap",
                    gap: 1,
                    p: 1,
                    pt: 0,
                  }}
                >
                  {SelectedUsers.map((user, index) => {
                    return (
                      <Chip
                        key={index}
                        variant='outlined'
                        color='primary'
                        onDelete={() => {
                          handleUserRemove(user);
                        }}
                        label={user.name.split(" ")[0]}
                        avatar={<Avatar src={user.pic} />}
                      />
                    );
                  })}
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton aria-label='back' onClick={handleBackButtonClick}>
                    <ArrowBackIosRoundedIcon sx={{ fontSize: "20px" }} />
                  </IconButton>
                  <AvatarGroup max={5}>
                    {SelectedUsers.map((user, index) => (
                      <Avatar
                        key={index}
                        alt={user.name}
                        src={user.pic}
                        // sx={{
                        //     border: '1px solid',
                        //     borderColor: blue[600],
                        // }}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
                <Box>
                  <Box
                    component='form'
                    ref={formRef}
                    onSubmit={handleRenameGroupChat}
                    sx={{
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      my: {
                        xs: 3,
                        sm: 4,
                      },
                      gap: 1,
                    }}
                  >
                    <TextField
                      required
                      id='SearchQuery'
                      label='Update The Name'
                      name='SearchQuery'
                      autoFocus
                      autoComplete='off'
                      size='small'
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      sx={{
                        width: "250px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: 30,
                          },
                        },
                      }}
                    />
                    <Button
                      type='submit'
                      sx={{
                        borderRadius: "30px",
                        textTransform: "capitalize",
                        mt: "2px",
                        borderWidth: "2px",
                        borderColor: blue[600],
                        ":hover": {
                          borderWidth: "2px",
                        },
                      }}
                      size='small'
                      variant='outlined'
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </TabContext>
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
            {SearchLoading || GroupLoading ? (
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
                        handleUserAdd(user);
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <IconButton
            onClick={handleDrawerClose}
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

export default UpdateGroupDrawer;
