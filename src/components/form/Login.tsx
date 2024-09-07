import { FormControl, Input, Box, Text, Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormDataType } from '../../context/FormContext';
import { UseFormContext } from '../../context/UseFormContext';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { loginUser } from '../../api/axios';

type propsType = {
  formData: FormDataType;
  selectChange: (e: any) => void;
};
type ErrorPropsType = {
  email: string[];
  password: string[];
};

export const Login = ({ formData, selectChange }: propsType) => {
  const [errors, setErrors] = useState<ErrorPropsType>({
    email: [],
    password: [],
  });
  const toast = useToast();
  const { setFormData, setToken, setAuthenticate } = UseFormContext();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
      navigate('/');
      setFormData({ ...formData, email: '', password: '' });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setAuthenticate(true);
      toast({
        duration: 1000,
        isClosable: true,
        position: 'top',
        render: () => (
          <Box borderRadius={'0.5rem'} padding={'1rem'} bg={'green.200'}>
            Login successfully 🎉!
          </Box>
        ),
      });
    } catch (err: any) {
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    }
  };
  const login = (
    <Box
      borderRadius={'1rem'}
      bg={'white'}
      boxShadow={'base'}
      width={'25rem'}
      padding={'2rem'}
    >
      <Text fontSize={'1rem'} textAlign={'center'} marginBottom={'3rem'}>
        DeRoyal
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box marginBottom={'2rem'}>
            <Input
              placeholder="email"
              id="email"
              type="email"
              name="email"
              onChange={selectChange}
              value={formData.email}
            />

            {errors?.email && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.email[0]}
              </Text>
            )}
          </Box>

          <Box marginBottom={'2rem'}>
            <Input
              id="password"
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={selectChange}
            />

            {errors?.password && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.password[0]}
              </Text>
            )}
          </Box>

          <Button marginTop={'3rem'} width={'100%'} type="submit">
            Login
          </Button>
          <Box
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            marginTop={'2rem'}
          >
            <Text fontSize={'0.8rem'}>Forgot Password?</Text>
            <Text fontSize={'0.8rem'}>
              Not a member yet?{' '}
              <Text as={NavLink} to={'/register'}>
                Signup
              </Text>
            </Text>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
  return login;
};
