import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './routers/AuthProvider';
import Routes from './routers/Routes';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
