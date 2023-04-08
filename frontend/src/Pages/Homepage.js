import { useEffect } from "react";
import { useHistory } from "react-router";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        bgColor="white"
        w="96%"
        m="40px 0 2px 0"
        borderTopRightRadius="md"
        borderTopLeftRadius="md"
        borderWidth="1px"
        borderColor="whiteAlpha.400"
        shadow="blue-lg"
      >
        <Text fontSize="4xl" fontFamily="Work sans" fontWeight="bold" letterSpacing="4px">
          Sky-Msg
        </Text>
      </Box>
      <Box
        bgColor="white"
        w="96%" 
        p={4} 
        borderBottomRightRadius="md"
        borderBottomLeftRadius="md"
        borderWidth="1px" 
        borderColor="whiteAlpha.200"
        shadow="blue-lg"
        >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab 
              mr="4"
            >
            Login
            </Tab>
            <Tab 
              ml="4"
            >
            Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
