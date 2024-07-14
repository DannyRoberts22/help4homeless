import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from 'types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import screenNames from '../../../constants/screen-names';

type HomeScreenNavigation = StackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigation>();
  return (
    <SafeAreaView style={{borderColor: 'red', borderWidth: 5, flex: 1}}>
      <Text>HomeScreen</Text>
      <Button title="got to account" onPress={() => navigation.navigate(screenNames.ACCOUNT_NAVIGATOR)} />
      <Button title="got to test" onPress={() => navigation.navigate(screenNames.TEST_NAVIGATOR)} />
    </SafeAreaView>
  );
};
