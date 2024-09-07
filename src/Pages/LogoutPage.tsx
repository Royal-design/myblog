import { Button } from '@chakra-ui/react';
import { UseFormContext } from '../context/UseFormContext';
import { useNavigate } from 'react-router-dom';
import { Box, useToast } from '@chakra-ui/react';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { handleLogout, setAuthenticate } = UseFormContext();
  const toast = useToast();
  return (
    <form
      action=""
      onSubmit={e => {
        handleLogout(e), navigate('/');
        localStorage.removeItem('token');

        toast({
          duration: 1000,
          isClosable: true,
          position: 'top',
          render: () => (
            <Box borderRadius={'0.5rem'} padding={'1rem'} bg={'green.100'}>
              Logged out successfully 🎉!
            </Box>
          ),
        });
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
};
