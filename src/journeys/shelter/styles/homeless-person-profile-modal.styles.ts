import { Image } from 'react-native';
import { styled } from 'styled-components/native';

export const ProfileContainer = styled.View`
  flex: 1;
  border-width: 20px;
  border-color: red;
  background-color: white;
`;

// TODO maybe put border radius into a theme
export const HomelessPersonProfileImage = styled.Image`
  width: 60%;
  height: 150px;
  border-radius: 10px;
  align-self: center;
`;
