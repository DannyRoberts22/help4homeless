import React, {useState} from 'react';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {ShareableButton} from '@src/components/organisms/button/Button';
import TextInput from '@src/components/utility/text-input/TextInput';
import mockHomelessUsers from '../../../../mocks/homelessUsers.json';
import {Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  DashboardContainer,
  HomelessUserDetails,
  HomelessUserItem,
} from '../styles/dashboard-screen.styles';

export const DashboardScreen = () => {
  const fullList = mockHomelessUsers.homelessUsers;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState(fullList);

  const handleSearch = (input: string) => {
    setSearchQuery(input);

    if (input) {
      // Filter by both `name` and `id`
      const filtered = fullList.filter(
        item =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.id.includes(input),
      );
      setFilteredData(filtered);
    } else {
      // If the search is cleared, show the full list
      setFilteredData(fullList);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <HomelessUserItem style={{flexDirection: 'row'}}>
        <HomelessUserDetails>{item.name}</HomelessUserDetails>
        <HomelessUserDetails>{item.id}</HomelessUserDetails>
      </HomelessUserItem>
    );
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <DashboardContainer>
          <TextInput
            placeholder="Search For User"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {/* <ShareableButton
            handler={() => Alert.alert('hey')}
            text="Search For User"
          /> */}
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </DashboardContainer>
        <ShareableButton
          handler={() => Alert.alert('Generate QR codes for all')}
          text="Generate QR codes for all"
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
