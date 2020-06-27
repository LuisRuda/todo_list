import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import colors from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 22px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 12px;
  font-family: 'Roboto-Medium';
  color: ${colors.textPrimaryLight};
`;

export const FloatButton = styled(RectButton)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.textPrimaryLight};
  position: absolute;
  bottom: 25px;
  right: 25px;
  align-items: center;
  justify-content: center;
  elevation: 6;
`;

export const List = styled.FlatList`
  margin-top: 20px;
`;
