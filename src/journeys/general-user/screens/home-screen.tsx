import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import Icon from 'react-native-vector-icons/FontAwesome';
export const HomeScreen = () => {
  return (
    <SafeAreaViewStatus>
      <Text>HomeScreen</Text>
      <View>
        <Icon name="home" size={30} color="blue" />
      </View>
    </SafeAreaViewStatus>
  );
};
