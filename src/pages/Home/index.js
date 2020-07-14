import React, { useState, useCallback, useRef } from 'react';
import { StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';
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

// Hooks
import useTasks from '../../hooks/useTasks';

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

  const [tasks, setTasks, toggleTask, updateTask] = useTasks();
  const [taskInput, setTaskInput] = useState('');
  const [idTaskEditable, setIdTaskEditable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewTask = useCallback(() => {
    setModalVisible(true);
    setTimeout(() => {
      taskInputRef.current.focus();
    }, 400);
  }, []);

  const addNewTask = useCallback(() => {
    if (taskInput === '') return;

    const task = { description: taskInput, completed: false };
    setTasks(task);

    setModalVisible(false);
    setTaskInput('');
  }, [taskInput, setTasks]);

  const handleCheckTask = useCallback(
    (task) => {
      toggleTask(task.id, !task.completed);
    },
    [toggleTask]
  );

  const handleModalEditTask = useCallback(
    (id, taskValue) => {
      setIdTaskEditable(id);
      setTaskInput(taskValue);
      handleNewTask();
    },
    [handleNewTask]
  );

  const handleEdit = useCallback(async () => {
    await updateTask(idTaskEditable, taskInput);

    setModalVisible(false);
    setTaskInput('');
    setIdTaskEditable(null);
  }, [idTaskEditable, taskInput, updateTask, tasks]);

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
          <BoxTask
            data={item}
            handleEditTask={handleModalEditTask}
            handleCheckTask={handleCheckTask}
          />
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
          <CustomButtom onPress={idTaskEditable ? handleEdit : addNewTask}>
            <TextButton enabled={taskInput !== ''}>ADICIONAR</TextButton>
          </CustomButtom>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

export default Home;
