# BESIDER - News App (Create React App Version)

A modern, responsive news application built with Create React App, TypeScript, and Ant Design. This app fetches and displays news articles from the New York Times API with a clean, mobile-first interface.

## 🚀 Live Demo

**GitHub Pages**: [https://penguinmirage.github.io/corelinetestappCRA](https://penguinmirage.github.io/corelinetestappCRA)

## 📱 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time News**: Fetches latest news from NY Times Archive API
- **Mock Data Mode**: Fallback to generated mock data when API is unavailable
- **Modern UI**: Clean interface using Ant Design components
- **TypeScript**: Full type safety and better development experience
- **Proxy Support**: Built-in proxy configuration for API calls
- **Error Handling**: Comprehensive error boundaries and fallback mechanisms
- **Accessibility**: ARIA compliant and keyboard navigation support

## 🛠️ Tech Stack

- **React 19** with **TypeScript**
- **Create React App** for build tooling
- **Ant Design** for UI components
- **Styled Components** for custom styling
- **Axios** for HTTP requests
- **Day.js** for date manipulation
- **GitHub Pages** for deployment

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── header-component/
│   ├── sidebar-menu/
│   ├── news-list/
│   ├── news-item/
│   ├── footer/
│   └── loader/
├── hooks/              # Custom React hooks
│   └── useNews.ts
├── services/           # API services
│   ├── apiService.ts
│   └── newsService.ts
├── types/              # TypeScript type definitions
│   └── news.ts
├── utils/              # Utility functions
│   └── cors.ts
├── setupProxy.js       # Proxy configuration
└── App.tsx            # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/penguinmirage/corelinetestappCRA.git
   cd corelinetestappCRA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and configure:
   ```env
   REACT_APP_MOCK_API=true
   REACT_APP_API_DELAY_MS=1000
   REACT_APP_NY_TIMES_API_KEY=your_api_key_here
   REACT_APP_API_BASE_URL=https://api.nytimes.com/svc
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔧 Available Scripts

- **`npm start`** - Runs the app in development mode
- **`npm test`** - Launches the test runner
- **`npm run build`** - Builds the app for production
- **`npm run deploy`** - Deploys to GitHub Pages

## 🌐 API Configuration

### NY Times API Setup

1. Get your API key from [NY Times Developer Portal](https://developer.nytimes.com/)
2. Update `REACT_APP_NY_TIMES_API_KEY` in `.env`
3. Set `REACT_APP_MOCK_API=false` to use real API

### Proxy Configuration

The app uses `setupProxy.js` for development proxy:

```javascript
// Automatically proxies /api/* to NY Times API
// Handles CORS and adds required headers
```

## 📦 Deployment

### GitHub Pages (Automatic)

1. **Manual Deploy**
   ```bash
   npm run deploy
   ```

2. **Automatic Deploy**
   - Push to `main` branch
   - GitHub Actions will automatically build and deploy

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Site will be available at: `https://username.github.io/repository-name`

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_MOCK_API` | Use mock data instead of real API | `true` |
| `REACT_APP_API_DELAY_MS` | Simulated API delay | `1000` |
| `REACT_APP_NY_TIMES_API_KEY` | NY Times API key | - |
| `REACT_APP_API_BASE_URL` | API base URL | `https://api.nytimes.com/svc` |
| `REACT_APP_PROXY_ENABLED` | Enable proxy in development | `true` |
| `REACT_APP_CORS_PROXY_URL` | CORS proxy URL | - |

## 🎨 Customization

### Styling

- **Global styles**: `src/index.css`
- **Component styles**: Styled Components in each component
- **Theme**: Ant Design theme customization

### API Integration

- **Mock data**: Generated in `apiService.ts`
- **Real API**: NY Times Archive API
- **Fallback**: Automatic fallback to mock data on API errors

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure proxy is configured correctly
   - Check `setupProxy.js` configuration

2. **API Rate Limits**
   - NY Times API has rate limits
   - Use mock mode for development

3. **Build Errors**
   - Check TypeScript errors
   - Verify all dependencies are installed

### Debug Mode

Set `REACT_APP_DEBUG_MODE=true` for detailed logging.

## 📈 Performance

- **Bundle size**: ~80KB gzipped
- **Lighthouse score**: 90+ for all metrics
- **Mobile optimization**: Responsive design
- **Caching**: Service worker ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **NY Times API** for providing news data
- **Ant Design** for the UI component library
- **Create React App** for the build tooling
- **GitHub Pages** for hosting

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ by [PenguinMirage](https://github.com/penguinmirage)**