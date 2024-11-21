import styled from 'styled-components/native';

export const DashboardContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const HomelessUserItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const HomelessUserDetails = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.homelessUserDetails};
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
`;
