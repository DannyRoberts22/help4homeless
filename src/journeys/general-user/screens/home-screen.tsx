import React, {useEffect, useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import mockNewsData from '../../../../mocks/newsData.json';
// @ts-ignore
import {ActivityIndicator, Button, Dimensions, View} from 'react-native';
import {HorizontalFlatListContainer} from '../styles/home-screen.styles';
import {FlatList} from 'react-native-gesture-handler';
import {getNews} from '@src/api/getNews';
import {theme} from '@src/theme';
import {getHomelessShelterList} from '@src/api/getHomelessShelterList';
import {MappedItem, NewsData} from '@src/types/news-api-types';
import TextInput from '@src/components/utility/text-input/TextInput';
import {Spacer} from '@src/components/layout/Spacer';
import {ShelterItem} from '@src/types/shelter-api-types';
import {DetailsCardItem} from '@src/components/organisms/details-card-item/DetailsCardItem';
import {ImageBackgroundCard} from '@src/components/organisms/image-background-card/ImageBackgroundCard';
export const HomeScreen = () => {
  const [newsData, setNewsData] = useState<MappedItem[]>([]);
  const [postcode, setPostcode] = useState<string>('');
  console.log('🚀 ~ getHomelessShelters ~ postcode:', postcode);

  const [shelters, setShelters] = useState<any>([]);
  const [shelterError, setShelterError] = useState<boolean>(false);
  console.log('🚀 ~ HomeScreen ~ shelterError:', shelterError);
  const [loading, setLoading] = useState<boolean>(false);

  const CARD_WIDTH = Dimensions.get('window').width * 0.7;

  const handleSetNewsData = (data: NewsData) => {
    setNewsData(
      data.articles.map((article, index) => ({
        id: article.source.id ?? index.toString(), // Use index as id if no id is provided
        title: article.title,
        urlToImage: article.urlToImage,
      })),
    );
  };

  const getHomelessShelters = () => {
    setLoading(true);
    console.log('🚀 ~ getHomelessShelters ~ postcode:', postcode);
    getHomelessShelterList(postcode)
      .then((response: any) => {
        setShelterError(false);
        setShelters(response);
      })
      .catch((error: Error) => {
        console.error('There was no shelters found:', error);
        setShelterError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews()
      .then((response: NewsData) => {
        // handleSetNewsData(response);
        handleSetNewsData(mockNewsData);
      })
      .catch((error: Error) => {
        console.error('Error fetching news:', error);
        handleSetNewsData(mockNewsData);
      });
  }, []);

  const renderNewsItem = ({item}: {item: MappedItem}) => (
    <ImageBackgroundCard item={item} cardWidth={CARD_WIDTH} />
  );

  const renderShelterItem = ({item}: {item: ShelterItem}) => {
    const input = item.photos?.[0].html_attributions[0];
    console.log('🚀 ~ renderShelterItem ~ input:', input);
    const match = input?.match(/href="([^"]*)/);
    const url = match ? match[1] : null;

    return (
      <>
        <DetailsCardItem item={item} url={url} />
        <Spacer size={theme.space.sm} />
      </>
    );
  };

  return (
    <SafeAreaViewStatus>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <InnerContainer>
        <HorizontalFlatListContainer>
          {newsData.length > 0 ? (
            <FlatList
              data={newsData}
              renderItem={renderNewsItem}
              keyExtractor={(item: MappedItem) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{paddingHorizontal: 10}}
            />
          ) : (
            <ActivityIndicator size="large" color={theme.colors.white} />
          )}
        </HorizontalFlatListContainer>
        <Spacer size={theme.space.lg} />
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.white} />
        ) : (
          <>
            <View>
              <TextInput
                placeholder="Enter your postcode"
                value={postcode}
                onChangeText={setPostcode}
                autoCapitalize="characters"
                autoCorrect={false}
                showError={shelterError}
                errorText="Please enter a valid postcode"
              />
              <Button
                onPress={getHomelessShelters}
                title="Find your nearest shelters"
                color={theme.colors.white}
              />
            </View>
            <FlatList
              data={shelters}
              renderItem={renderShelterItem}
              keyExtractor={(item: any) => item.id}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{paddingVertical: 20}}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </InnerContainer>
      {/* </ScrollView> */}
    </SafeAreaViewStatus>
  );
};
