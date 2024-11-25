import {styled} from 'styled-components/native';

export const QRCodeScannerContainer = styled.View`
  flex: 1;
`;
export const CenterText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.subheading};
  padding-top: 16px;
  padding-bottom: 16px;
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
`;
