type NewsItem = {
  title: string;
  urlToImage: string;
  source: {
    id: string | null;
    name: string;
  };
};

export type NewsData = {
  status: string;
  totalResults: number;
  articles: NewsItem[];
};

export type MappedItem = {
  id: string;
  title: string;
  urlToImage: string;
};
