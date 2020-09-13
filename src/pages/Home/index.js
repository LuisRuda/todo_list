import React, { useState, useCallback, useRef } from 'react';
import { StatusBar, Platform, Dimensions, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Form } from '@unform/mobile';
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
  EmptyContainer,
  Text,
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

  const formRef = useRef();
  const taskInputRef = useRef();

  const [initialValue, setInitialValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [idTaskEditable, setIdTaskEditable] = useState(null);

  const handleFocusNewTask = useCallback(() => {
    setModalVisible(true);
    setTimeout(() => {
      taskInputRef.current.focus();
    }, 400);
  }, []);

  const onHandleNewTask = useCallback(
    (body) => {
      const task = { id: uuidv4(), body, done: false };
      dispatch(handleNewTask(task));

      setModalVisible(false);
    },
    [dispatch]
  );

  const onHandleCheckTask = useCallback(
    (taskId) => {
      dispatch(handleCheckTask(taskId));
    },
    [dispatch]
  );

  const handleModalEditTask = useCallback(
    (id, taskValue) => {
      setIdTaskEditable(id);
      setInitialValue({ taskInput: taskValue });
      handleFocusNewTask();
    },
    [handleFocusNewTask]
  );

  const onHandleEditTask = useCallback(
    (body) => {
      dispatch(handleUpdateTask(idTaskEditable, body));

      setModalVisible(false);
      setInitialValue(null);
      setIdTaskEditable(null);
    },
    [dispatch, idTaskEditable]
  );

  const onHandleDeleteTask = useCallback(
    (id) => {
      dispatch(handleRemoveTask(id));
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);

    setInitialValue(null);
    setIdTaskEditable(null);
  }, []);

  const handleSubmit = useCallback(
    ({ taskInput }) => {
      if (taskInput === '') return;

      if (idTaskEditable) {
        onHandleEditTask(taskInput);
      } else {
        onHandleNewTask(taskInput);
      }
    },
    [idTaskEditable, onHandleEditTask, onHandleNewTask]
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Title>Tarefas</Title>
      <List
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BoxTask
            data={item}
            handleEditTask={handleModalEditTask}
            onHandleCheckTask={onHandleCheckTask}
            onHandleDeleteTask={onHandleDeleteTask}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyContainer>
            <Title emptyTitle>Nenhuma anotação no momento</Title>
            <Text>
              Clique no botão "+" para cadastrar sua primeira anotação.
            </Text>
          </EmptyContainer>
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
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={initialValue}
          >
            <CustomInput
              name="taskInput"
              ref={taskInputRef}
              placeholder="Descrição da tarefa"
            />
            <CustomButtom onPress={() => formRef.current.submitForm()}>
              <TextButton>
                {idTaskEditable ? 'ATUALIZAR' : 'ADICIONAR'}
              </TextButton>
            </CustomButtom>
          </Form>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

export default Home;
