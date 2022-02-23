import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme  from './src/global/styles/theme';
import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';

import { SighIn } from './src/screens/SighIn';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
});

const { userStoragedLoading } = useAuth();

if(!fontsLoaded || userStoragedLoading){
  return <AppLoading/>
}

  return (
    <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  )
}

