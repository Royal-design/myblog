import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { UsePostContext } from '../../context/UsePostContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export type ErrorsType = {
  title: string[];
  body: string[];
};

export const PostField = () => {
  const { postData, handleChange, storePost, setPostData } = UsePostContext();
  const navigate = useNavigate();
  const toast = useToast();
  const [errors, setErrors] = useState<ErrorsType>({
    title: [],
    body: [],
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data = await storePost({
        title: postData.title,
        body: postData.body,
      });
      console.log(data);
      toast({
        duration: 1000,
        isClosable: true,
        position: 'top',
        render: () => (
          <Box borderRadius={'0.5rem'} padding={'1rem'} bg={'green.100'}>
            New Post successfully added! 🎉
          </Box>
        ),
      });
      setPostData({
        title: '',
        body: '',
      });
      navigate('/');
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };
  return (
    <Box marginTop={'2rem'} padding={'2rem'}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box mb={'2rem'}>
            <Input
              name="title"
              type="input"
              placeholder="title"
              value={postData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.title[0]}
              </Text>
            )}
          </Box>
          <Box mb={'2rem'}>
            <Textarea
              name="body"
              height={'15rem'}
              placeholder="body"
              value={postData.body}
              onChange={handleChange}
            />
            {errors.body && (
              <Text fontSize={'0.8rem'} color={'red'}>
                {errors.body[0]}
              </Text>
            )}
          </Box>
          <Button type="submit">Post</Button>
        </FormControl>
      </form>
    </Box>
  );
};
