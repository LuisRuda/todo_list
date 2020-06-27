import React from 'react';
import {Container, Text} from './styles';

function BoxTask({data, first}) {
  return (
    <Container first={first}>
      <Text>{data.text}</Text>
    </Container>
  );
}

export default BoxTask;
