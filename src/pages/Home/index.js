import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Container, Title} from './styles';

import colors from '../../assets/colors';

const Home = () => {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />
      <Container>
        <Title>Tarefas</Title>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
