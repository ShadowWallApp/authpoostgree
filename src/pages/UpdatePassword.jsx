import { Button, Center, Flex, Input, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

    // Warna yang responsif terhadap dark mode
      const bgColor = useColorModeValue("white", "gray.800");
      const textColor = useColorModeValue("gray.600", "white");
      const inputBg = useColorModeValue("gray.50", "gray.700");
      const borderColor = useColorModeValue("gray.200", "gray.600");
      const bgOuter = useColorModeValue('gray.50', 'gray.900');
    

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast({
        title: "Gagal update password",
        description: error.message,
        status: "error",
        position: "top",
      });
    } else {
      toast({
        title: "Password berhasil diperbarui",
        status: "success",
        position: "top",
      });
      navigate("/login");
    }
  };

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="300px" gap={4}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>Masukkan Password Baru</Text>
        <Input
          bg={inputBg}
          placeholder="Password Baru"
          type="password"
          value={newPassword}
          color={textColor}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleUpdatePassword}>
          Update Password
        </Button>
      </Flex>
    </Center>
  );
};

export default UpdatePassword;
