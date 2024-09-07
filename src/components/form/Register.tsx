import { FormControl, Input, Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FormDataType } from '../../context/FormContext';
import { UseFormContext } from '../../context/UseFormContext';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { registerUser } from '../../api/axios';

type propsType = {
  formData: FormDataType;
  selectChange: (e: any) => void;
};
type ErrorPropsType = {
  name: string[];
  email: string[];
  password: string[];
};

export const Register = ({ formData, selectChange }: propsType) => {
  const [errors, setErrors] = useState<ErrorPropsType>({
    name: [],
    email: [],
    password: [],
  });
  const toast = useToast();
  const { setFormData, setToken } = UseFormContext();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      console.log(data);
      setFormData({ name: '', email: '', password: '' });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      toast({
        duration: 1000,
        isClosable: true,
        position: 'top',
        render: () => (
          <Box borderRadius={'0.5rem'} padding={'1rem'} bg={'green.100'}>
            Registered successfully 🎉!
          </Box>
        ),
      });
      navigate('/login');
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };
  const register = (
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
              placeholder="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={selectChange}
            />
            {errors.name && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.name[0]}
              </Text>
            )}
          </Box>

          <Box marginBottom={'2rem'}>
            <Input
              placeholder="email"
              id="email"
              type="email"
              name="email"
              onChange={selectChange}
              value={formData.email}
            />

            {errors.email && (
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

            {errors.password && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.password[0]}
              </Text>
            )}
          </Box>

          <Button marginTop={'3rem'} width={'100%'} type="submit">
            Register
          </Button>
        </FormControl>
      </form>
    </Box>
  );
  return register;
};
