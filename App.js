import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './app/components/app_navigator';
import DataProvider from './app/context/data_provider';
import { Provider } from 'react-redux';
import { store ,persistor} from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/translation/i18n.js';
import Toast from 'toastify-react-native';
import AuthProvider, { AuthContext } from './app/context/auth_provider';



export default function App() {


 



  return (

    <NavigationContainer>
      <StatusBar hidden />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
          <DataProvider>
            <I18nextProvider i18n={i18n}>
              <AppNavigator /> 
            </I18nextProvider>
          
          </DataProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </NavigationContainer>
   
  );
}

