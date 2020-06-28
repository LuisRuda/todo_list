import React, { useState, useCallback, useRef } from 'react';
import { StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Container,
  Title,
  List,
  FloatButton,
  ModalContainer,
  CustomInput,
  CustomButtom,
  TextButton,
} from './styles';

import colors from '../../assets/colors';

// Components
import BoxTask from './BoxTask';

function Home() {
  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const taskInputRef = useRef();

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT'
        );

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewTask = useCallback(() => {
    setModalVisible(true);
    setTimeout(() => {
      taskInputRef.current.focus();
    }, 250);
  }, []);

  const addNewTask = useCallback(() => {
    if (taskInput === '') return;

    setModalVisible(false);
    setTaskInput('');

    const task = { id: uuidv4(), text: taskInput, checked: false };
    setTasks((prevState) => [...prevState, task]);
  }, [taskInput]);

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

      <Modal
        backdropOpacity={0}
        style={styles.modal}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <ModalContainer>
          <CustomInput
            value={taskInput}
            ref={taskInputRef}
            onChangeText={setTaskInput}
            placeholder="Descrição da tarefa"
          />
          <CustomButtom onPress={addNewTask}>
            <TextButton enabled={taskInput !== ''}>ADICIONAR</TextButton>
          </CustomButtom>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

export default Home;
