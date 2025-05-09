import {
  Flex,
  IconButton,
  Text,
  Avatar,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { LuMoon, LuSun } from "react-icons/lu";
//import { UserAuth } from "../context/AuthContext";

const Topbar = ({ user, onOpenSidebar, onLogout }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
 // const { currentUser } = UserAuth();
  const { toggleColorMode, colorMode } = useColorMode();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const iconColor = useColorModeValue("gray.600", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      justify="space-between"
      align="center"
      mb={4}
      px={4}
      py={3}
      bg={bgColor}
      color={textColor}
      borderRadius="lg"
      boxShadow="sm"
      w="100%"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex align="center" gap={3}>
        {isMobile && (
          <IconButton
            icon={
              <Icon as={FiMenu} boxSize={5} stroke={iconColor} variant="ghost" />}
            onClick={onOpenSidebar}
            aria-label="Open Menu"
            variant="ghost"
            size="sm"
          />
        )}
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color={useColorModeValue("teal.600", "teal.200")}
        >
          My Dashboard
        </Text>
      </Flex>

      {/* <Flex align="center" gap={{ base: 2, md: 4 }}>
        {!isMobile && (<IconButton
          onClick={toggleColorMode}
          icon={
            <Icon
              as={colorMode === "light" ? LuMoon : LuSun}
              stroke={iconColor}
              boxSize={5}
            />
          }
          aria-label="Toggle color mode"
          variant="ghost"
          size="sm"
        />
      )}
        {!isMobile && (
          <Text color={textColor}>
            {user?.displayName ||
              currentUser?.user_metadata?.display_name ||
              currentUser?.user_metadata?.full_name ||
              "User"}
          </Text>
        )}
        <Avatar
          size="sm"
          name={user?.displayName || currentUser?.user_metadata?.full_name}
          src={user?.photoURL || currentUser?.user_metadata?.avatar_url}
        />
        <Button
          colorScheme="red"
          size="sm"
          onClick={onLogout}
          variant="outline"
        >
          Logout
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default Topbar;
