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

function BoxTask({
  data,
  handleEditTask,
  onHandleCheckTask,
  onHandleDeleteTask,
}) {
  const [swipeRef, setSwipeRef] = useState(null);

  const renderLeftActions = useCallback(() => {
    return (
      <CkeckButton closed={data.done}>
        <Icon
          name={data.done ? 'close' : 'check'}
          size={22}
          color={colors.white}
        />
        <CkeckText>{data.done ? 'Desmarcar' : 'Marcar'}</CkeckText>
      </CkeckButton>
    );
  }, [data.done]);

  const removeTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      onHandleDeleteTask(data.id);
    }, 120);
  }, [data.id, swipeRef, onHandleDeleteTask]);

  const editTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      handleEditTask(data.id, data.body);
    }, 120);
  }, [data.id, data.body, handleEditTask, swipeRef]);

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
    onHandleCheckTask(data.id);
    swipeRef.close();
  }, [data, onHandleCheckTask, swipeRef]);

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
        <CheckBox onPress={() => onHandleCheckTask(data.id)}>
          <View>
            {data.done && <Icon name="check" size={20} color={colors.green} />}
          </View>
        </CheckBox>
        <Text marked={data.done}>{data.body}</Text>
      </Container>
    </Swipeable>
  );
}

export default memo(BoxTask);

BoxTask.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
  handleEditTask: PropTypes.func.isRequired,
  onHandleCheckTask: PropTypes.func.isRequired,
  onHandleDeleteTask: PropTypes.func.isRequired,
};
