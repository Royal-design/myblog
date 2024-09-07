import { Button, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div>
      <Text>Page cannot be found!</Text>
      <Button>
        <Navigate to="/" />
      </Button>
    </div>
  );
};
