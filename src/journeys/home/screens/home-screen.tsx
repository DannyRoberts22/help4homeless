import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import screenNames from 'constants/screen-names';
import { RootStackParamList } from 'types/navigation';

type HomeScreenNavigation = StackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigation>();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="got to account" onPress={() => navigation.navigate(screenNames.ACCOUNT_SCREEN, { name: 'phil'})} />
    </View>
  );
};
