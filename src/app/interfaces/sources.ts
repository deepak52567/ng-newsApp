export interface SourcesRequest {
  category: string;
  language: string;
  country: string;
}

export interface SourcesResponse {
  status: string;
  sources: {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string
  }[];
}

export interface LoginLayout {
  category: string[];
  language: string[];
  country: string[];
}
