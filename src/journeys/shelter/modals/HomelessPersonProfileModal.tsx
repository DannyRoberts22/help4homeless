import React from 'react';
import {View, Text} from 'react-native';

export type HomelessPersonProfileModalProps = {
  route: {params: {id: string}};
};

export const HomelessPersonProfileModal = ({
  route,
}: HomelessPersonProfileModalProps) => {
  const {id: homelessPersonId} = route.params;
  return (
    <View>
      <Text>HomelessPersonProfileModal</Text>
      <Text>{homelessPersonId}</Text>
    </View>
  );
};
