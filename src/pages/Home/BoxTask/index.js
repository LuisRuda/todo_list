import React, { memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMD from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  CheckBox,
  Text,
  CkeckButton,
  CkeckText,
  EditButton,
  DeleteButton,
} from './styles';

import colors from '../../../assets/colors';

function BoxTask({ data, handleEditTask, handleCheckTask, handleDeleteTask }) {
  const [swipeRef, setSwipeRef] = useState(null);

  const renderLeftActions = useCallback(() => {
    return (
      <CkeckButton closed={data.completed}>
        <Icon
          name={data.completed ? 'close' : 'check'}
          size={22}
          color={colors.white}
        />
        <CkeckText>{data.completed ? 'Desmarcar' : 'Marcar'}</CkeckText>
      </CkeckButton>
    );
  }, [data.completed]);

  const removeTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      handleDeleteTask(data);
    }, 120);
  }, [data, swipeRef, handleDeleteTask]);

  const editTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      handleEditTask(data.id, data.description);
    }, 120);
  }, [data.id, data.description, handleEditTask, swipeRef]);

  const renderRightActions = useCallback(() => {
    return (
      <>
        <DeleteButton onPress={removeTask}>
          <Icon name="delete" size={22} color={colors.white} />
        </DeleteButton>
        <EditButton onPress={editTask}>
          <IconMD name="edit" size={22} color={colors.white} />
        </EditButton>
      </>
    );
  }, [removeTask, editTask]);

  const checkTask = useCallback(() => {
    handleCheckTask(data);
    swipeRef.close();
  }, [data, handleCheckTask, swipeRef]);

  return (
    <Swipeable
      friction={1.2}
      leftThreshold={50}
      overshootFriction={8}
      overshootRight={false}
      ref={(ref) => setSwipeRef(ref)}
      onSwipeableLeftOpen={checkTask}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <Container>
        <CheckBox onPress={() => handleCheckTask(data)}>
          <View>
            {data.completed && (
              <Icon name="check" size={20} color={colors.green} />
            )}
          </View>
        </CheckBox>
        <Text marked={data.completed}>{data.description}</Text>
      </Container>
    </Swipeable>
  );
}

export default memo(BoxTask);

BoxTask.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleCheckTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};
