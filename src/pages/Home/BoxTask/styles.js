import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../../assets/colors';

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 40}px;
  background-color: ${colors.white};
  flex-direction: row;
  align-self: center;
  align-items: center;
  border-radius: 8px;
  padding: 14px 15px;
  margin: 10px auto;
  elevation: 6;
`;

export const CheckBox = styled(RectButton)`
  height: 32px;
  width: 32px;
  border-radius: 6px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
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

export const EditButton = styled(RectButton)`
  background-color: ${colors.blue};
  margin: 10px 0;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const DeleteButton = styled(RectButton)`
  background-color: ${colors.danger};
  margin: 10px 0;
  margin-right: 20px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
