import styled from 'styled-components/native';

export const AddressContainer = styled.View`
  flex: 1;
`;

export const AddressTitle = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.addressTitle};
`;
export const AddressContent = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.addressTitle};
`;
