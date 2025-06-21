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
import Intro_slider from './app/components/intro_slider/intro_slider';
import { View,ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import AuthProvider, { AuthContext } from './app/context/auth_provider';



export default function App() {


  const [showIntro, setShowIntro] = useState(true);

  const handleIntroDone = () => {
    setShowIntro(false); 
  };

  return (
    <StripeProvider publishableKey='pk_test_51QYXhyQCzh9jGNXoJVPGX8puPrj58gqc5DK7I3bFiyeGlvpr03877CPR2fX0u6aK5BmTtLkrirDovkI7Ms3ihYvq00ZXcVGx6w'>
    <NavigationContainer>
      <StatusBar hidden />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
          <DataProvider>
            
            <I18nextProvider i18n={i18n}>
            

               {/* {showIntro ? (
                <Intro_slider onDone={handleIntroDone} /> 
              ) : (
                <AppNavigator /> 
              )} */}
              <AppNavigator /> 
            </I18nextProvider>
          
          </DataProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </NavigationContainer>
    </StripeProvider>
  );
}

