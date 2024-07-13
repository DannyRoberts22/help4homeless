/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Navigation} from './src/infrastructure/navigation/navigation';
import { Platform, StatusBar } from 'react-native';

function App(): JSX.Element {
  return (
    <>
    {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" /> : undefined}
    <Navigation />
    </>
  )
}

export default App;