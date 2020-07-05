import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../../assets/colors';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${colors.taskContainerLight};
  align-self: center;
  align-items: center;
  border-radius: 6px;
  padding: 10px 15px;
  margin-bottom: 12px;
  elevation: 1;
`;

export const CheckBox = styled(RectButton)`
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

export const CkeckButton = styled(RectButton)`
  background-color: ${colors.green};
  margin-bottom: 12px;
  flex: 1;
  flex-direction: row;
  padding-left: 16px;
  align-items: center;
  border-radius: 6px;

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
`;

export const EditButton = styled(RectButton)`
  background-color: ${colors.blue};
  margin-bottom: 12px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const DeleteButton = styled(RectButton)`
  background-color: ${colors.danger};
  margin-bottom: 12px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;
