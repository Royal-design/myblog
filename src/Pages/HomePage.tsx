import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';

import { getPost } from '../api/PostApi';
import useSWR from 'swr';
import { Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { data: posts, error, isLoading } = useSWR('/api/posts', getPost);
  type PostType = {
    id: number;
    title: string;
    body: string;
    created_at: string;
    user: {
      name: string;
    };
  };
  console.log(posts);
  let content;
  if (isLoading)
    content = (
      <Box
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        mt={'1rem'}
      >
        {[...Array(3).keys()].map((_, i) => (
          <Stack key={i} mb={'1rem'}>
            <Skeleton width={'40rem'} height="20px" />
            <Skeleton width={'40rem'} height="8rem" />
            <Skeleton width={'40rem'} height="20px" />
          </Stack>
        ))}
      </Box>
    );
  if (error) content = <Text>{error.message}</Text>;
  if (posts)
    content = (
      <Box
        mt={'1rem'}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
      >
        {posts?.map((post: PostType) => (
          <Card height={'20rem'} width={'40rem'} mb={'2rem'} key={post.id}>
            <CardHeader
              padding={'1rem'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text>{post.title}</Text>
              <Button>
                <Link to={`/posts/${post.id}`}>Read More</Link>
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>{post.body}</CardBody>
            <Divider />
            <CardFooter display={'flex'} justifyContent={'space-between'}>
              <Flex>
                <Badge variant="solid" colorScheme="green" mr={'0.3rem'}>
                  Author
                </Badge>
                <Text>{post.user.name}</Text>
              </Flex>
              <Text>{new Date(post.created_at).toLocaleTimeString()}</Text>
            </CardFooter>
          </Card>
        ))}
      </Box>
    );

  return (
    <Box bg={'#6A9C89'} padding={'1rem'}>
      {content}
    </Box>
  );
};
