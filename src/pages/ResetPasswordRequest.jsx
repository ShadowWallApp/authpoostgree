// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const ResetPasswordRequest = () => {
  const { resetPassword } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email harus diisi'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await resetPassword(values.email);
        setIsSuccess(true);
        formik.resetForm();
        toast({
          title: 'Email terkirim',
          description: 'Link reset password telah dikirim ke email Anda',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Reset password gagal',
          description: error.message || 'Terjadi kesalahan. Silakan coba lagi.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="400px"
        width="100%"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Lupa Password
          </Heading>

          {isSuccess && (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              py={4}
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Email Terkirim!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Silakan periksa email Anda untuk tautan reset password.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl 
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Mengirim..."
                mt={4}
              >
                Kirim Link Reset Password
              </Button>
            </VStack>
          </form>

          <Text textAlign="center">
            <Link as={RouterLink} to="/login" color="blue.500">
              Kembali ke halaman login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default ResetPasswordRequest;