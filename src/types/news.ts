export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface NewsArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: Multimedia[];
  headline: {
    main: string;
    kicker: string;
    content_kicker: string;
    print_headline: string;
    name: string;
    seo: string;
    sub: string;
  };
  keywords: Array<{
    name: string;
    value: string;
    rank: number;
    major: string;
  }>;
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: {
    original: string;
    person: Array<{
      firstname: string;
      middlename: string;
      lastname: string;
      qualifier: string;
      title: string;
      role: string;
      organization: string;
      rank: number;
    }>;
    organization: string;
  };
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface NYTimesArchiveResponse {
  status: string;
  copyright: string;
  response: {
    docs: NewsArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface GroupedNews {
  [date: string]: NewsArticle[];
}
