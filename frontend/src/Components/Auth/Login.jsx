import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { axiosWithBase as axios } from "../../Config/Axios";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 30,
    },
  },
});
export const Login = () => {
  const formRef = React.useRef();
  const [DisplayToast, setDisplayToast] = useState(false);
  const [ToastStatus, setToastStatus] = useState("info");
  const [ToastTitle, setToastTitle] = useState("");
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const Navigate = useNavigate();

  const { setUser } = ChatState();

  const toast = (title, status) => {
    setToastTitle(title);
    setToastStatus(status);
    setDisplayToast(true);
  };

  const handleSubmit = async (event) => {
    // To Work The Required Field
    formRef.current.reportValidity();
    event.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email: Email, password: Password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      Navigate("/chats");
    } catch (error) {}
  };
  return (
    <Box component='form' ref={formRef} onSubmit={handleSubmit} sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            inputProps={{ minLength: "6" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 5,
          mb: 0,
          fontSize: 16,
          fontWeight: 400,
          textTransform: "none",
          p: 1.5,
          borderRadius: 15,
        }}
      >
        Login
      </Button>
      {/* Alert */}
      <Snackbar
        open={DisplayToast}
        autoHideDuration={6000}
        onClose={() => {
          setDisplayToast(false);
        }}
        key={"top center"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setDisplayToast(false);
          }}
          severity={ToastStatus}
          sx={{ width: "100%" }}
          variant='filled'
        >
          {ToastTitle}
        </Alert>
      </Snackbar>
    </Box>
  );
};
