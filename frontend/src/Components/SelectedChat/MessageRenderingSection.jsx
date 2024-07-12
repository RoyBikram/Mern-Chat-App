import { CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import { ChatState } from "../../Context/ChatProvider";
import MessageCard from "../miscellanceos/MessageCard";

export const MessageRenderingSection = ({
  Messages,
  FetchMessages,
  IsMessageLoading,
  IsTyping,
}) => {
  // const [Messages, setMessages] = useState(null);
  const { user, SelectedChat } = ChatState();
  const ScrollDown = useRef();
  const TypingAni = useRef();
  useEffect(() => {
    FetchMessages();
  }, [SelectedChat?._id]);

  // To Scroll down on keyboard open
  useEffect(() => {
    window.visualViewport.addEventListener("resize", () => {
      ScrollDown.current?.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  useEffect(() => {
    ScrollDown.current?.scrollIntoView({
      behavior: "smooth",
    });
    const instance = Lottie.loadAnimation({
      container: TypingAni.current,
      loop: true,
      autoplay: true,
      renderer: "svg",
      animationData: require("../../Res/Json/TypingAnimation.json"),
    });
    return () => instance.destroy();
  });

  return (
    <Box
      sx={{
        // flexGrow: 1,
        height: "100%",
        overflowY: "auto",
        widows: "100%",
        position: "relative",

        backgroundColor: grey[100],
        display: `${!Messages || IsMessageLoading ? "flex" : "block"}`,
        justifyContent: "center",
        alignItems: "center",
        /* width */
        "&::-webkit-scrollbar": {
          width: "5px",
        },

        /* Handle */
        "&::-webkit-scrollbar-thumb": {
          background: "#0084ff",
          borderRadius: "8px",
        },

        /* Handle on hover */
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#006fd6",
          borderRadius: "8px",
        },
      }}
    >
      {!Messages || IsMessageLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: "-webkit-fill-available",
              height: "fit-content",
              boxSizing: "border-box",
              width: "100%",
              zIndex: "1",
              display: "flex",
              flexDirection: "column",
              px: {
                sm: 5,
                xs: 2,
              },
              pt: 2,
              pb: 1,
              // my: 2,
            }}
          >
            {Messages &&
              Messages.map((Message, index) => {
                var IsLast;
                var IsOwnMessage = false;
                if (index < Messages.length - 1) {
                  if (Message.sender._id !== Messages[index + 1].sender._id) {
                    IsLast = true;
                  } else {
                    IsLast = false;
                  }
                } else {
                  var IsLast = true;
                }
                if (Message.sender._id === user._id) {
                  IsOwnMessage = true;
                }
                return (
                  <MessageCard
                    key={index}
                    IsLast={IsLast}
                    Data={Message}
                    IsOwnMessage={IsOwnMessage}
                  />
                );
              })}
            {/* Typing animation */}
            {IsTyping ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "end",
                  my: "-2px",
                  ml: "38px",
                  flexDirection: "row",
                  alignSelf: "start",
                  position: "relative",
                  height: "40px",
                  width: "100px",
                  overflow: "hidden",
                }}
              >
                <Box
                  ref={TypingAni}
                  sx={{
                    ml: "38px",
                    height: "100px",
                    width: "100px",
                    transform: "scaleX(-1) translate(0%,-50%)",
                    position: "absolute",
                    top: "50%",
                    left: "-60%",
                  }}
                ></Box>
              </Box>
            ) : (
              <></>
            )}

            <Box ref={ScrollDown}></Box>
          </Box>
        </>
      )}
    </Box>
  );
};
