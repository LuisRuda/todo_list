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
    const task = { id: uuidv4(), text: 'New Task', checked: false };

    setTasks((prevState) => [...prevState, task]);
  }, []);

  const handleCheckTask = useCallback(
    (id) => {
      const tempTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }

        return task;
      });

      setTasks(tempTasks);
    },
    [tasks]
  );

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <Title>Tarefas</Title>
      <List
        data={tasks}
        renderItem={({ item }) => (
          <BoxTask data={item} handleCheckTask={handleCheckTask} />
        )}
      />

      <FloatButton onPress={handleNewTask}>
        <Icon name="plus" size={30} color={colors.white} />
      </FloatButton>
    </Container>
  );
}

export default Home;
