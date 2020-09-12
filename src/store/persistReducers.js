import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'RApps_Anotacoes',
      storage: AsyncStorage,
      whitelist: ['task'],
    },
    reducers
  );

  return persistedReducer;
};
