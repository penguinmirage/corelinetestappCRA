# NY Times API Setup Guide

This application fetches real news articles from The New York Times Archive API. Follow these steps to set up your API access and start displaying real NY Times articles with proper links.

## 🚀 Quick Setup

### 1. Get Your NY Times API Key

1. Go to [NY Times Developer Portal](https://developer.nytimes.com/)
2. Sign up for a free account or log in if you already have one
3. Click **"Create App"** or **"New App"**
4. Fill in the app details:
   - **App Name**: Choose any name (e.g., "My News App")
   - **Description**: Brief description of your app
   - **Website**: You can use `http://localhost:3000` for development
5. **Enable the Archive API** - This is crucial! Make sure to check the Archive API option
6. Submit your application
7. Once approved, copy your **API Key**

### 2. Configure Your Environment

1. Open the `.env` file in your project root
2. Replace the placeholder with your actual API key:

```env
# Change this line:
REACT_APP_NY_TIMES_API_KEY=your_api_key_here

# To your actual key:
REACT_APP_NY_TIMES_API_KEY=your_actual_api_key_from_nytimes

# Make sure this is set to false to use real API:
REACT_APP_MOCK_API=false
```

3. Save the file and restart your development server:

```bash
npm start
```

## 🔧 Verification

After setup, the app will automatically test your API connection. Look for the **API Status** indicator at the top of the page when running in development mode.

### Status Indicators:
- ✅ **Success**: API is working, real articles are loading
- ❌ **Error**: Check your API key or network connection
- 🔄 **Testing**: Connection test in progress
- ⚪ **Idle**: Not tested yet

### Manual Testing

You can also test the API connection manually in the browser console:

```javascript
// Open browser dev tools (F12) and run:
import { testNYTimesConnection } from './src/utils/testApi';
testNYTimesConnection().then(console.log);
```

## 📖 How It Works

### Real vs Mock Data

- **Mock Mode** (`REACT_APP_MOCK_API=true`): Uses generated articles that link to NY Times homepage
- **Real API Mode** (`REACT_APP_MOCK_API=false`): Fetches actual NY Times articles with direct links

### Article Links

When using the real API, each news item will link to the actual NY Times article. Users can click on any article to read the full story on nytimes.com (some articles may require a subscription).

### API Usage

- **Free Tier**: 1,000 requests per day
- **Rate Limits**: Built-in delays to respect API limits
- **Caching**: Responses are cached to improve performance
- **Archive Range**: Articles from 1851 to present day

## 🛠️ Troubleshooting

### Common Issues

#### "API Key Error"
- Verify your API key is correct in the `.env` file
- Make sure you've enabled the Archive API in your NY Times developer account
- Check that there are no extra spaces or quotes around your API key

#### "Authentication Error (401)"
- Your API key might be invalid or expired
- Ensure you've enabled the Archive API specifically
- Try creating a new API key

#### "Rate Limit Error (429)"
- You've exceeded the daily limit of 1,000 requests
- Wait until the next day or consider upgrading your NY Times API plan
- The app includes built-in delays to prevent hitting rate limits

#### "CORS Errors"
- The app includes a proxy configuration for development
- In production, consider using a CORS proxy service
- Check that `REACT_APP_PROXY_ENABLED=true` in your `.env` file

#### "No Articles Found"
- This can happen with very recent dates (current day/week)
- The Archive API updates with a delay
- Try loading more content by scrolling down

### Environment Variables Reference

```env
# API Configuration
REACT_APP_MOCK_API=false                           # Set to false for real API
REACT_APP_NY_TIMES_API_KEY=your_key_here          # Your actual API key
REACT_APP_API_BASE_URL=https://api.nytimes.com/svc # NY Times API base URL
REACT_APP_API_DELAY_MS=1000                       # Delay between requests (ms)

# Proxy Configuration (for CORS handling)
REACT_APP_PROXY_ENABLED=true                      # Enable proxy in development
REACT_APP_USE_LOCAL_PROXY=true                    # Use local development proxy
REACT_APP_CORS_PROXY_URL=https://cors-anywhere.herokuapp.com # Fallback CORS proxy

# Development Settings
REACT_APP_DEBUG_MODE=true                         # Enable debug logging
REACT_APP_LOG_LEVEL=info                          # Log level (error, warn, info, debug)
```

## 📱 Features Enabled by Real API

- **Authentic Content**: Real NY Times articles with original headlines and abstracts
- **Direct Links**: Click any article to read the full story on nytimes.com
- **Rich Media**: Original NY Times images and multimedia content
- **Proper Attribution**: Actual bylines and publication dates
- **Comprehensive Coverage**: Access to decades of archived content
- **Real-time Updates**: Automatic checking for new articles (every 30 seconds)

## 🔒 Security Notes

- Never commit your actual API key to version control
- The `.env` file is gitignored to prevent accidental exposure
- API keys are only available in the browser environment (prefixed with `REACT_APP_`)
- Consider using environment-specific API keys for different deployments

## 📚 Additional Resources

- [NY Times Developer Documentation](https://developer.nytimes.com/docs/archive-api/1/overview)
- [Archive API Specification](https://developer.nytimes.com/docs/archive-api/1/routes/archive/{year}/{month}.json/get)
- [API Terms of Service](https://developer.nytimes.com/terms)

## 🆘 Need Help?

If you're still having issues:

1. Check the browser console for detailed error messages
2. Verify your API key works by testing it directly with curl:

```bash
curl "https://api.nytimes.com/svc/archive/v1/2024/01.json?api-key=YOUR_API_KEY"
```

3. Ensure your NY Times developer account has the Archive API enabled
4. Try switching back to mock mode temporarily to verify the app works: `REACT_APP_MOCK_API=true`

---

Once properly configured, your news app will display real NY Times articles with working links to the full stories. Enjoy exploring decades of quality journalism! 📰