import React, { useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, Title, List, FloatButton } from './styles';

import colors from '../../assets/colors';

// Components
import BoxTask from './BoxTask';

function Home() {
  const [tasks, setTasks] = useState([]);

  const handleNewTask = useCallback(() => {
    const task = { id: uuidv4(), text: 'New Task' };

    setTasks((prevState) => [...prevState, task]);
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <Title>Tarefas</Title>
      <List
        data={tasks}
        renderItem={({ item, index }) => (
          <BoxTask first={index === 0} data={item} />
        )}
      />

      <FloatButton onPress={handleNewTask}>
        <Icon name="plus" size={30} color={colors.white} />
      </FloatButton>
    </Container>
  );
}

export default Home;
