export interface DailyFeedRequest {
  country: string;
  category: string;
  sources: string;
  q: string;
  pageSize: string;
  page: string;
}

export interface DailyFeedResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string,
      name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  }[];
}

export interface SingleDailyFeedResponse {
  source: {
    id: string,
    name: string
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
