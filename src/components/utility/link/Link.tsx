import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {LinkText} from './styles';

interface LinkProps {
  url: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({url, children}) => {
  const handlePress = async () => {
    // Check if the link can be opened
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the link
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinkText>{children}</LinkText>
    </TouchableOpacity>
  );
};

export default Link;
