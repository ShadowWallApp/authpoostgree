// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    nama: Yup.string()
      .required('Nama harus diisi'),
    email: Yup.string()
      .email('Email tidak valid')
      .required('Email harus diisi'),
    password: Yup.string()
      .min(8, 'Password minimal 8 karakter')
      .required('Password harus diisi'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password harus sama')
      .required('Konfirmasi password harus diisi')
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      nama: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Register user
        await register({
          nama: values.nama,
          email: values.email,
          password: values.password
        });
        
        toast({
          title: 'Registrasi berhasil',
          description: 'Akun Anda telah berhasil dibuat',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        
        // Auto login setelah registrasi berhasil
        await login({
          email: values.email,
          password: values.password
        });
        
        navigate('/dashboard');
      } catch (error) {
        toast({
          title: 'Registrasi gagal',
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

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);

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
        maxWidth="500px"
        width="100%"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Daftar Akun
          </Heading>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl 
                isInvalid={formik.touched.nama && formik.errors.nama}
              >
                <FormLabel htmlFor="nama">Nama</FormLabel>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  value={formik.values.nama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
              </FormControl>

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

              <FormControl 
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      h="1.75rem" 
                      size="sm" 
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl 
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
              >
                <FormLabel htmlFor="confirmPassword">Konfirmasi Password</FormLabel>
                <InputGroup>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      h="1.75rem" 
                      size="sm" 
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Mendaftar..."
                mt={4}
              >
                Daftar
              </Button>
            </VStack>
          </form>

          <Text textAlign="center">
            Sudah punya akun?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;