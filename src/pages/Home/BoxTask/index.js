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

function BoxTask({ data, handleEditTask, handleCheckTask, handleRemoveTask }) {
  const [swipeRef, setSwipeRef] = useState(null);

  const renderLeftActions = useCallback(() => {
    return (
      <CkeckButton closed={data.checked}>
        <Icon
          name={data.checked ? 'close' : 'check'}
          size={20}
          color={colors.white}
        />
        <CkeckText>{data.checked ? 'Desmarcar' : 'Marcar'}</CkeckText>
      </CkeckButton>
    );
  }, [data.checked]);

  const removeTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      handleRemoveTask(data.id);
    }, 120);
  }, [data.id, handleRemoveTask, swipeRef]);

  const editTask = useCallback(() => {
    swipeRef.close();

    setTimeout(() => {
      handleEditTask(data.id, data.text);
    }, 120);
  }, [data.id, data.text, handleEditTask, swipeRef]);

  const renderRightActions = useCallback(() => {
    return (
      <>
        <DeleteButton onPress={removeTask}>
          <Icon name="delete" size={18} color={colors.white} />
        </DeleteButton>
        <EditButton onPress={editTask}>
          <IconMD name="edit" size={20} color={colors.white} />
        </EditButton>
      </>
    );
  }, [removeTask, editTask]);

  const checkTask = useCallback(() => {
    handleCheckTask(data.id);
    swipeRef.close();
  }, [data.id, handleCheckTask, swipeRef]);

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
        <CheckBox onPress={() => handleCheckTask(data.id)}>
          <View>
            {data.checked && (
              <Icon name="check" size={20} color={colors.green} />
            )}
          </View>
        </CheckBox>
        <Text marked={data.checked}>{data.text}</Text>
      </Container>
    </Swipeable>
  );
}

export default memo(BoxTask);

BoxTask.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleCheckTask: PropTypes.func.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
};
