export interface TopNewsRequest {
  country: string;
  category: string;
  sources: string;
  q: string;
  pageSize: string;
  page: string;
}

  export interface TopNewsResponse {
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

export interface SingleTopNewsResponse {
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
