import useSWR from 'swr';
import { getPostID } from '../api/PostApi';
import { endpoint } from '../api/PostApi';
import { UsePostContext } from '../context/UsePostContext';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { UseFormContext } from '../context/UseFormContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const PostShowPage = () => {
  const { user } = UseFormContext();
  const { deletePost } = UsePostContext();
  const { id } = useParams();
  const toast = useToast();
  console.log(id);
  console.log(user);
  const {
    data: post,
    error,
    isLoading,
  } = useSWR([endpoint, id], ([endpoint, id]) => getPostID(endpoint, id));
  const navigate = useNavigate();
  const handleDelete = async (e: any) => {
    e.preventDefault();
    await deletePost(id);
    toast({
      duration: 1000,
      isClosable: true,
      position: 'top',
      render: () => (
        <Box borderRadius={'0.5rem'} padding={'1rem'} bg={'green.100'}>
          Post deleted successfully added! 🎉
        </Box>
      ),
    });
    navigate('/');
  };
  console.log(post);
  let content;
  if (isLoading)
    content = (
      <Box
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        mt={'1rem'}
      >
        <Stack>
          <Skeleton width={'40rem'} height="20px" />
          <Skeleton width={'40rem'} height="8rem" />
          <Skeleton width={'40rem'} height="20px" />
        </Stack>
      </Box>
    );
  if (error) content = <Text>{error.message}</Text>;
  if (post)
    content = (
      <Box
        mt={'1rem'}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
      >
        <Card height={'20rem'} width={'40rem'} mb={'2rem'}>
          <CardHeader
            padding={'1rem'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text>{post.title}</Text>
            <Box>
              <Button
                mr={'1rem'}
                bg={'green.400'}
                _hover={{
                  bg: 'green.200',
                }}
              >
                <Link to={`/posts`}>Back</Link>
              </Button>
              {user?.id === post.user_id && (
                <Button type="submit" colorScheme="red" onClick={handleDelete}>
                  X
                </Button>
              )}
            </Box>
          </CardHeader>
          <Divider />
          <CardBody>{post.body}</CardBody>
          <Divider />
          {user?.id === post.user_id && (
            <CardFooter>
              <Button>
                <Link to={`/post/edit/${post.id}`}>Update Post</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      </Box>
    );
  return <Box padding={'1rem'}>{content}</Box>;
};
