import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../../assets/colors';

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 40}px;
  background-color: ${colors.white};
  align-self: center;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 14px 15px;
  margin: 10px 0;
  elevation: 6;
`;

export const CheckBox = styled(RectButton)`
  height: 32px;
  width: 32px;
  border-radius: 6px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.whiteSmoke};
  elevation: 1;
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

export const CkeckButton = styled(RectButton)`
  background-color: ${colors.green};
  width: ${Dimensions.get('window').width - 40}px;
  margin: 10px auto;
  flex-direction: row;
  padding-left: 16px;
  align-items: center;
  border-radius: 8px;
  elevation: 6;

  ${(props) =>
    props.closed &&
    css`
      background-color: ${colors.danger};
    `}
`;

export const CkeckText = styled.Text`
  color: ${colors.white};
  padding-left: 10px;
  text-transform: uppercase;
  font-family: 'Roboto-Medium';
`;

export const ActionButtons = styled.View`
  left: 20px;
  flex-direction: row-reverse;
`;

export const EditButton = styled(RectButton)`
  background-color: ${colors.blue};
  margin: 10px 0;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  elevation: 2;
`;

export const DeleteButton = styled(RectButton)`
  background-color: ${colors.danger};
  margin: 10px 0;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  elevation: 2;
`;
