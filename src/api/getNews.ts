import env from 'react-native-config';
import {NewsData} from '@src/types/news-api-types';
export const getNews = async (): Promise<NewsData> => {
  console.log('env', env.NEWS_API_KEY);
  const formattedTodayDate = () => new Date().toISOString().split('T')[0];
  const formattedThreeMonthsAgoDate = () =>
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 3,
      new Date().getDate(),
    )
      .toISOString()
      .split('T')[0];
  const api = `https://newsapi.org/v2/everything?q=homelessness&from=${formattedThreeMonthsAgoDate}&to=${formattedTodayDate}&apiKey=${env.NEWS_API_KEY}`;

  const response = await fetch(api);
  const data = await response.json();
  return data;
};
