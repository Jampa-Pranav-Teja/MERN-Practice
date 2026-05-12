import React, { useState, useEffect } from 'react';
import Service from '../../utils/http';
import { Avatar, Container, Text } from '@mantine/core';
import { Stack } from '@mantine/core';  

export const ProfilePage = () => {
  const service = new Service();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await service.get('user/me');
      setUser(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>User Not Found</p>
      </div>
    );
  }

  return (
     
      
    
    <Container>
      <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="xl"
    >
      <Avatar src={user.avatar} alt="It's me"/>
      <Text> {user.name} </Text>
      <Text> {user.email} </Text>
      <Text> {new Date(user.createdAt).toLocaleDateString} </Text>
      </Stack>
    </Container>
    
  );
};
