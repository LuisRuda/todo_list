import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { Container, CheckBox, Text } from './styles';

import colors from '../../../assets/colors';

function BoxTask({ data, handleCheckTask }) {
  return (
    <Container>
      <CheckBox onPress={() => handleCheckTask(data.id)}>
        {data.checked && <Icon name="check" size={20} color={colors.green} />}
      </CheckBox>
      <Text>{data.text}</Text>
    </Container>
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
