import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const Chatpage = () => {
  const history = useHistory();

  const [user, setUser_] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const {setUser} = ChatState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser_(userInfo);
    setUser(userInfo)
    if (!userInfo) {history.push("/")}
  }, [history]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        </Box>
    </div>
  );
};

export default Chatpage;
