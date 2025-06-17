import type { NYTimesArchiveResponse, NewsArticle } from "../types/news";

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  useMock: boolean;
  corsProxy?: string;
}

class ApiService {
  private config: ApiConfig;

  constructor() {
    this.config = {
      baseUrl:
        process.env.REACT_APP_API_BASE_URL || "https://api.nytimes.com/svc",
      apiKey: process.env.REACT_APP_NY_TIMES_API_KEY || "",
      useMock:
        process.env.REACT_APP_MOCK_API === "true" ||
        !process.env.REACT_APP_NY_TIMES_API_KEY,
      corsProxy: process.env.REACT_APP_CORS_PROXY_URL || "",
    };
  }

  private async makeRequest(url: string): Promise<unknown> {
    const delay = Number(process.env.REACT_APP_API_DELAY_MS) || 1000;

    await new Promise((resolve) => setTimeout(resolve, delay));

    let requestUrl = url;

    if (this.config.corsProxy && !url.startsWith("/api")) {
      requestUrl = `${this.config.corsProxy}/${url}`;
    }

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NewsApp/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private generateMockArticle(
    id: number,
    date: string,
    category: string,
  ): NewsArticle {
    const headlines = {
      technology: [
        "Technology Revolution Transforms Healthcare Industry",
        "Quantum Computing Breakthrough Announced",
        "Tech Giants Face New Regulations",
        "Cryptocurrency Market Shows Volatility",
        "Space Technology Reaches New Milestones",
      ],
      business: [
        "Global Markets React to Economic News",
        "Startup Funding Reaches Record Highs",
        "Supply Chain Innovations Drive Growth",
        "Green Energy Investments Surge",
        "Retail Giants Embrace Digital Transformation",
      ],
      health: [
        "Medical Breakthrough Offers Hope",
        "Mental Health Awareness Grows",
        "Vaccine Development Shows Progress",
        "Nutrition Research Reveals Insights",
        "Healthcare Technology Advances",
      ],
      science: [
        "Climate Research Provides New Data",
        "Archaeological Discovery Stuns Experts",
        "Ocean Exploration Yields Surprises",
        "Genetic Research Makes Progress",
        "Environmental Studies Show Impact",
      ],
      sports: [
        "Championship Games Draw Millions",
        "Athletes Break Long-Standing Records",
        "New Training Methods Show Results",
        "Sports Technology Enhances Performance",
        "International Competitions Begin",
      ],
    };

    const abstracts = {
      technology: [
        "Advanced systems are revolutionizing patient care and medical diagnostics, offering unprecedented accuracy and efficiency in treatment protocols.",
        "Scientists have achieved a major milestone in quantum computing, bringing us closer to solving complex problems that are impossible for classical computers.",
        "Technology companies are facing increased scrutiny from regulators worldwide as governments seek to address privacy and competition concerns.",
        "Digital currencies continue to experience significant price fluctuations as investors weigh adoption against regulatory uncertainty.",
        "Private space companies are pushing the boundaries of what's possible, with new missions and technologies reaching unprecedented achievements.",
      ],
      business: [
        "International stock markets are responding to recent economic indicators, with investors closely monitoring inflation and growth projections.",
        "Venture capital firms are investing record amounts in emerging technologies, particularly in automation and clean energy sectors.",
        "Companies are reimagining their supply chains with innovative technologies that improve efficiency and reduce environmental impact.",
        "Investment in renewable energy projects has reached new heights as governments and corporations commit to sustainability goals.",
        "Major retailers are accelerating their digital transformation efforts to meet changing consumer expectations and shopping behaviors.",
      ],
      health: [
        "Researchers have made significant progress in developing new treatments that could improve outcomes for patients with chronic conditions.",
        "Public awareness of mental health issues is increasing, leading to better support systems and reduced stigma around seeking help.",
        "Scientists continue to develop innovative vaccine technologies that could provide broader protection against emerging health threats.",
        "New nutritional studies are revealing important connections between diet and long-term health outcomes across different populations.",
        "Medical technology advances are enabling more precise diagnoses and personalized treatment approaches for various conditions.",
      ],
      science: [
        "Climate scientists have gathered new evidence about environmental changes that could inform future policy decisions and conservation efforts.",
        "Recent archaeological findings are providing fresh insights into ancient civilizations and their impact on modern understanding of history.",
        "Marine biologists have discovered previously unknown species and ecosystems in the deep ocean, expanding our knowledge of marine life.",
        "Genetic researchers are making breakthroughs that could lead to new treatments for inherited diseases and improved understanding of human biology.",
        "Environmental studies are documenting the effects of human activity on ecosystems, providing crucial data for conservation planning.",
      ],
      sports: [
        "Major sporting events are attracting record viewership as fans return to stadiums and engage with new digital experiences.",
        "Professional athletes are achieving remarkable feats that showcase the limits of human performance and dedication to their sports.",
        "Innovative training techniques incorporating technology and data analysis are helping athletes optimize their performance and prevent injuries.",
        "Advances in sports equipment and analytics are providing athletes with new tools to enhance their competitive edge and safety.",
        "International sporting competitions are bringing together athletes from around the world to compete at the highest levels of their disciplines.",
      ],
    };

    const categoryHeadlines =
      headlines[category as keyof typeof headlines] || headlines.technology;
    const categoryAbstracts =
      abstracts[category as keyof typeof abstracts] || abstracts.technology;

    const headline = categoryHeadlines[id % categoryHeadlines.length];
    const abstract = categoryAbstracts[id % categoryAbstracts.length];

    return {
      _id: `mock-${category}-${id}-${date}`,
      abstract: abstract,
      web_url: "https://www.nytimes.com/",
      snippet: abstract.substring(0, 100) + "...",
      lead_paragraph: abstract,
      source: "The New York Times",
      multimedia: [
        {
          url: `https://picsum.photos/400/300?random=${id}`,
          format: "mediumThreeByTwo210",
          height: 300,
          width: 400,
          type: "image",
          subtype: "mediumThreeByTwo210",
          caption: `${category} related image`,
          copyright: "Stock Photo",
        },
      ],
      headline: {
        main: headline,
        kicker: category.charAt(0).toUpperCase() + category.slice(1),
        content_kicker: "",
        print_headline: headline,
        name: "",
        seo: headline,
        sub: "",
      },
      keywords: [],
      pub_date: `${date}T${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:00+0000`,
      document_type: "article",
      news_desk: category.charAt(0).toUpperCase() + category.slice(1),
      section_name: category.charAt(0).toUpperCase() + category.slice(1),
      byline: {
        original: "By NY Times Staff",
        person: [],
        organization: "The New York Times",
      },
      type_of_material: "News",
      word_count: Math.floor(Math.random() * 500) + 300,
      uri: `nyt://article/mock-${id}`,
    };
  }

  private generateMockNews(year: number, month: number): NewsArticle[] {
    const articles: NewsArticle[] = [];
    const categories = [
      "technology",
      "business",
      "health",
      "science",
      "sports",
    ];

    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = Math.max(1, daysInMonth - 9);

    for (let day = startDay; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const articlesPerDay = Math.floor(Math.random() * 3) + 3;

      for (let i = 0; i < articlesPerDay; i++) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        const articleId = day * 10 + i;
        articles.push(this.generateMockArticle(articleId, date, category));
      }
    }

    return articles.sort(
      (a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime(),
    );
  }

  private async fetchRealNews(
    year: number,
    month: number,
  ): Promise<NYTimesArchiveResponse> {
    if (!this.config.apiKey) {
      throw new Error("NY Times API key is required for real API calls");
    }

    const formattedMonth = String(month).padStart(2, "0");
    const apiUrl = `${this.config.baseUrl}/archive/v1/${year}/${formattedMonth}.json?api-key=${this.config.apiKey}`;

    const requestUrl =
      process.env.NODE_ENV === "development"
        ? `/api/archive/v1/${year}/${formattedMonth}.json?api-key=${this.config.apiKey}`
        : apiUrl;

    console.log(`📡 Fetching NY Times archive for ${year}/${formattedMonth}`);

    try {
      const data = await this.makeRequest(requestUrl);

      const apiResponse = data as Record<string, unknown>;
      if (
        !apiResponse ||
        typeof apiResponse !== "object" ||
        !("response" in apiResponse) ||
        !apiResponse.response ||
        typeof apiResponse.response !== "object" ||
        !apiResponse.response ||
        !("docs" in apiResponse.response)
      ) {
        console.error("Invalid API response structure:", apiResponse);
        throw new Error("Invalid API response structure");
      }

      const response = data as NYTimesArchiveResponse;
      const articleCount = response.response.docs.length;
      const validArticles = response.response.docs.filter(
        (article) => article.web_url && article.web_url.includes("nytimes.com"),
      ).length;

      console.log(
        `✅ Successfully fetched ${articleCount} articles (${validArticles} with valid NY Times URLs)`,
      );

      return response;
    } catch (error) {
      console.error("Real API call failed:", error);

      if (error instanceof Error) {
        if (error.message.includes("401")) {
          throw new Error(
            "Invalid API key or unauthorized access. Please check your NY Times API key.",
          );
        } else if (error.message.includes("429")) {
          throw new Error(
            "Rate limit exceeded. Please wait before making more requests.",
          );
        } else if (error.message.includes("403")) {
          throw new Error(
            "Access forbidden. Please ensure the Archive API is enabled in your NY Times developer account.",
          );
        }
      }

      throw new Error(
        `Failed to fetch news from NY Times API: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async getArchiveNews(
    year: number,
    month: number,
  ): Promise<NYTimesArchiveResponse> {
    try {
      if (this.config.useMock) {
        console.log("🎭 Using mock data for news");
        const articles = this.generateMockNews(year, month);

        return {
          status: "OK",
          copyright:
            "Copyright (c) 2024 The New York Times Company. All Rights Reserved.",
          response: {
            docs: articles,
            meta: {
              hits: articles.length,
              offset: 0,
              time: Date.now(),
            },
          },
        };
      } else {
        console.log("🌐 Fetching real news from NY Times API");
        return await this.fetchRealNews(year, month);
      }
    } catch (error) {
      console.error("❌ Error in getArchiveNews:", error);

      if (!this.config.useMock) {
        console.log("⚠️ Falling back to mock data due to API error");
        const articles = this.generateMockNews(year, month);

        return {
          status: "OK",
          copyright:
            "Copyright (c) 2024 The New York Times Company. All Rights Reserved. (Fallback Mode)",
          response: {
            docs: articles,
            meta: {
              hits: articles.length,
              offset: 0,
              time: Date.now(),
            },
          },
        };
      }

      throw error;
    }
  }

  setMockMode(useMock: boolean): void {
    this.config.useMock = useMock;
  }

  updateConfig(newConfig: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  async testConnection(): Promise<boolean> {
    if (this.config.useMock) {
      console.log("🎭 Mock mode enabled - connection test skipped");
      return true;
    }

    try {
      console.log("🔍 Testing NY Times API connection...");
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      await this.fetchRealNews(year, month);
      console.log("✅ API connection test successful");
      return true;
    } catch (error) {
      console.error("❌ API connection test failed:", error);
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;
