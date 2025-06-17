import { newsService } from '../services/newsService';

export const testNYTimesConnection = async (): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> => {
  try {
    console.log('Testing NY Times API connection...');

    // Test with current month
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const response = await newsService.getArchiveNews(year, month);

    if (response && response.response && response.response.docs) {
      const articleCount = response.response.docs.length;
      const realArticles = response.response.docs.filter(
        article => article.web_url && article.web_url.includes('nytimes.com')
      );

      if (realArticles.length > 0) {
        return {
          success: true,
          message: `✅ Successfully connected to NY Times API! Found ${articleCount} articles (${realArticles.length} with valid URLs)`,
          data: {
            totalArticles: articleCount,
            validArticles: realArticles.length,
            sampleArticle: realArticles[0]
          }
        };
      } else {
        return {
          success: false,
          message: '⚠️ Connected to API but no articles with valid NY Times URLs found. This might be normal for recent dates.',
          data: response
        };
      }
    } else {
      return {
        success: false,
        message: '❌ Invalid response structure from NY Times API',
        data: response
      };
    }
  } catch (error) {
    console.error('NY Times API test failed:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return {
          success: false,
          message: '🔑 API Key Error: Please check your NY Times API key configuration',
        };
      } else if (error.message.includes('HTTP error! status: 401')) {
        return {
          success: false,
          message: '🔑 Authentication Error: Invalid API key or unauthorized access',
        };
      } else if (error.message.includes('HTTP error! status: 429')) {
        return {
          success: false,
          message: '⏱️ Rate Limit Error: Too many requests. Please wait and try again.',
        };
      } else {
        return {
          success: false,
          message: `❌ API Error: ${error.message}`,
        };
      }
    } else {
      return {
        success: false,
        message: '❌ Unknown error occurred while testing API connection',
      };
    }
  }
};

export const validateApiKey = (apiKey: string): boolean => {
  return apiKey && apiKey.length > 0 && apiKey !== 'your_api_key_here';
};

export const getApiSetupInstructions = (): string => {
  return `
🔧 NY Times API Setup Instructions:

1. Go to https://developer.nytimes.com/
2. Sign up for a free account or log in
3. Create a new app and enable the "Archive API"
4. Copy your API key
5. Add it to your .env file:
   REACT_APP_NY_TIMES_API_KEY=your_actual_api_key_here
6. Restart your development server

⚠️ Important Notes:
- The free tier allows 1,000 requests per day
- The Archive API provides articles from 1851 to present
- Articles link to actual NY Times articles (paywall may apply)
- API responses may be cached to improve performance

🧪 Test your setup by calling testNYTimesConnection() in the browser console
`;
};
