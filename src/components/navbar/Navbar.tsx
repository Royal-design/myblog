import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { UseFormContext } from '../../context/UseFormContext';
import { LogoutPage } from '../../Pages/LogoutPage';
export const Navbar = () => {
  const { user } = UseFormContext();

  return (
    <List
      fontSize={'1.1rem'}
      background={'#16423C'}
      height={'3rem'}
      width={'100%'}
      padding={'1rem'}
      alignItems={'center'}
      display={'flex'}
      color={'white'}
      justifyContent={'space-between'}
    >
      <ListItem marginRight={'1rem'}>
        <NavLink to="/">Home</NavLink>
      </ListItem>
      {user ? (
        <Box display={'flex'} alignItems={'center'}>
          <ListItem marginRight={'1rem'}>
            <NavLink to="/post">Create Post</NavLink>
          </ListItem>
          <LogoutPage />
        </Box>
      ) : (
        <Box display={'flex'}>
          <ListItem marginRight={'1rem'}>
            <NavLink to="/login">Login</NavLink>
          </ListItem>
          <ListItem marginRight={'1rem'}>
            <NavLink to="/register">Register</NavLink>
          </ListItem>
        </Box>
      )}
    </List>
  );
};
