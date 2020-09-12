import React, { useState, useCallback, useRef } from 'react';
import { StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
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

// Actions
import {
  handleNewTask,
  handleRemoveTask,
  handleCheckTask,
  handleUpdateTask,
} from '../../store/modules/task/actions';

// Components
import BoxTask from './BoxTask';

function Home() {
  const styles = StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT'
        );

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task.tasks);

  const taskInputRef = useRef();

  const [taskInput, setTaskInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idTaskEditable, setIdTaskEditable] = useState(null);

  const handleFocusNewTask = useCallback(() => {
    setModalVisible(true);
    setTimeout(() => {
      taskInputRef.current.focus();
    }, 400);
  }, []);

  const onHandleNewTask = useCallback(() => {
    if (taskInput === '') return;

    const task = { id: uuidv4(), body: taskInput, done: false };
    dispatch(handleNewTask(task));

    setModalVisible(false);
    setTaskInput('');
  }, [taskInput, dispatch]);

  const onHandleCheckTask = useCallback(
    (taskId) => {
      dispatch(handleCheckTask(taskId));
    },
    [dispatch]
  );

  const handleModalEditTask = useCallback(
    (id, taskValue) => {
      setIdTaskEditable(id);
      setTaskInput(taskValue);
      handleFocusNewTask();
    },
    [handleFocusNewTask]
  );

  const onHandleEditTask = useCallback(() => {
    dispatch(handleUpdateTask(idTaskEditable, taskInput));

    setModalVisible(false);
    setTaskInput('');
    setIdTaskEditable(null);
  }, [dispatch, idTaskEditable, taskInput]);

  const onHandleDeleteTask = useCallback(
    (id) => {
      console.log(id);
      dispatch(handleRemoveTask(id));
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);

    setTaskInput('');
    setIdTaskEditable(null);
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Title>Tarefas</Title>
      <List
        data={tasks}
        renderItem={({ item }) => (
          <BoxTask
            data={item}
            handleEditTask={handleModalEditTask}
            onHandleCheckTask={onHandleCheckTask}
            onHandleDeleteTask={onHandleDeleteTask}
          />
        )}
      />

      <FloatButton onPress={handleFocusNewTask}>
        <Icon name="plus" size={30} color={colors.white} />
      </FloatButton>

      <Modal
        backdropOpacity={0}
        style={styles.modal}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        isVisible={modalVisible}
        onBackdropPress={handleCloseModal}
      >
        <ModalContainer>
          <CustomInput
            value={taskInput}
            ref={taskInputRef}
            onChangeText={setTaskInput}
            placeholder="Descrição da tarefa"
          />
          <CustomButtom
            onPress={idTaskEditable ? onHandleEditTask : onHandleNewTask}
          >
            <TextButton enabled={taskInput !== ''}>
              {idTaskEditable ? 'ATUALIZAR' : 'ADICIONAR'}
            </TextButton>
          </CustomButtom>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

export default Home;
