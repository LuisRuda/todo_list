import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

import colors from '../../../assets/colors';

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
  flex-direction: row;
  background-color: ${colors.taskContainerLight};
  align-self: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 12px;
  elevation: 1;
`;

export const CheckBox = styled.TouchableOpacity`
  height: 28px;
  width: 28px;
  border-radius: 4px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

export const Text = styled.Text`
  color: ${colors.textLight};

  ${(props) =>
    props.marked &&
    css`
      text-decoration: line-through;
      color: ${colors.textMarkedLight};
    `};
`;
