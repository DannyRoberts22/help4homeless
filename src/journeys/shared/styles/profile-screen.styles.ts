import styled from 'styled-components/native';

export const ProfileContainer = styled.View`
  flex: 1;
`;

export const ProfileTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ProfileTitle};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;
export const ProfileContent = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.ProfileContent};
  font-weight: bold;
  text-align: center;
`;
