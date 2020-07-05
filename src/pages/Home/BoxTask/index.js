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

function BoxTask({ data, handleCheckTask }) {
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

  const renderRightActions = useCallback(() => {
    return (
      <>
        <DeleteButton>
          <Icon name="delete" size={18} color={colors.white} />
        </DeleteButton>
        <EditButton>
          <IconMD name="edit" size={20} color={colors.white} />
        </EditButton>
      </>
    );
  }, []);

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
  handleCheckTask: PropTypes.func.isRequired,
};
