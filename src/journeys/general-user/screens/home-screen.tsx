import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { getHomelessShelterList } from '@src/api/get-homeless-shelter-list';
import { getNews } from '@src/api/get-news';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { DetailsCardItem } from '@src/components/organisms/details-card-item/DetailsCardItem';
import { ImageBackgroundCard } from '@src/components/organisms/image-background-card/ImageBackgroundCard';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import TextInput from '@src/components/utility/text-input/TextInput';
import { theme } from '@src/theme';
import { MappedItem, NewsData } from '@src/types/news-api-types';
import { ShelterItem } from '@src/types/shelter-api-types';

import mockNewsData from '../../../../mocks/newsData.json';

import {
  HorizontalFlatListContainer,
  ShelterSearchContainer,
} from '../styles/home-screen.styles';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';

export const HomeScreen = () => {
  const [newsData, setNewsData] = useState<MappedItem[]>([]);
  const [postcode, setPostcode] = useState<string>('');

  const [shelters, setShelters] = useState<any>([]);
  const [shelterError, setShelterError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userHasSearched, setUserHasSearched] = useState<boolean>(false);
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
    getHomelessShelterList(postcode)
      .then((response: any) => {
        setShelterError(false);
        setShelters(response);
        setUserHasSearched(true);
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
      // TODO: FIND A BETTER WAY TO HANDLE THIS
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((response: NewsData) => {
        // handleSetNewsData(response);
        handleSetNewsData(mockNewsData);
      })
      .catch((error: Error) => {
        console.error('Error fetching news:', error);
        handleSetNewsData(mockNewsData);
      });
  }, []);

  const renderNewsItem = ({ item }: { item: MappedItem }) => (
    <ImageBackgroundCard item={item} cardWidth={CARD_WIDTH} height="md" />
  );

  const renderShelterItem = ({ item }: { item: ShelterItem }) => {
    const input = item.photos?.[0].html_attributions[0];
    const match = input?.match(/href="([^"]*)/);
    const url = match ? match[1] : null;

    return (
      <>
        <DetailsCardItem item={item} url={url} height="sm" />
      </>
    );
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <HorizontalFlatListContainer>
          {newsData.length > 0 ? (
            <FlatList
              data={newsData}
              renderItem={renderNewsItem}
              keyExtractor={(item: MappedItem) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          ) : (
            <ActivityIndicator size="large" color={theme.colors.white} />
          )}
        </HorizontalFlatListContainer>
        <Spacer size={theme.space.lg} />
        <ShelterSearchContainer>
          <TextInput
            placeholder="Enter your postcode"
            value={postcode}
            onChangeText={setPostcode}
            autoCapitalize="characters"
            autoCorrect={false}
            showError={shelterError}
            errorText="Please enter a valid postcode"
          />
          <Spacer size={theme.space.lg} />
          <ShareableButton
            handler={getHomelessShelters}
            text="Find your nearest shelters"
            color="white"
          />
          <Spacer size={theme.space.sm} />
        </ShelterSearchContainer>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.white} />
        ) : (
          <>
            {shelters.length > 0 || !userHasSearched ? (
              <FlatList
                data={shelters}
                renderItem={renderShelterItem}
                keyExtractor={(item: any) => item.place_id}
                contentContainerStyle={{ paddingVertical: 20 }}
                showsVerticalScrollIndicator={true}
              />
            ) : (
              <>
                <Spacer size={theme.space.lg} />
                <SectionDescription>
                  There are no shelters in your area
                </SectionDescription>
              </>
            )}
          </>
        )}
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
