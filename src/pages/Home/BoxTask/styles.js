import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
  background-color: #e5e5e5;
  align-self: center;
  border-radius: 10px;
  padding: 20px;
  margin-top: 12px;
  elevation: 1;

  ${(props) =>
    props.first &&
    css`
      margin-top: 0;
    `};
`;

export const Text = styled.Text``;
