import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

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
  color: ${colors.primaryLight};
`;

export const FloatButton = styled(RectButton)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.primaryLight};
  position: absolute;
  bottom: 25px;
  right: 22px;
  align-items: center;
  justify-content: center;
  elevation: 6;
`;

export const List = styled.FlatList`
  margin-top: 20px;
  padding: 0 16px;
`;

export const ModalContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  padding: 20px 20px 0 20px;
  background-color: ${colors.modalContainerLight};
  position: relative;
  bottom: -18px;
  elevation: 2;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

export const CustomInput = styled.TextInput.attrs({
  multiline: true,
})`
  background-color: ${colors.backgroundLight};
  align-self: center;
  border-radius: 12px;
  padding-horizontal: 12px;
  width: ${Dimensions.get('window').width - 60}px;
  margin-bottom: 6px;
  color: ${colors.textLight};
`;

export const CustomButtom = styled.TouchableOpacity`
  padding: 15px;
  align-self: flex-end;
`;

export const TextButton = styled.Text`
  font-family: 'Roboto-Medium';
  color: ${colors.textMarkedLight};
  font-size: 16px;

  ${(props) =>
    props.enabled &&
    css`
      color: ${colors.primaryLight};
    `}
`;
