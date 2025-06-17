const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for NY Times API
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.nytimes.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/svc', // remove /api prefix and add /svc
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsApp/1.0)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      onError: (err, req, res) => {
        console.log('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Proxy error: ' + err.message);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response:', proxyRes.statusCode, req.url);
      },
      logLevel: 'debug',
      secure: true,
      followRedirects: true,
    })
  );

  // Proxy for alternative API endpoint (if needed)
  app.use(
    '/proxy-api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy-api': '/api',
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsApp/1.0)',
      },
      onError: (err, req, res) => {
        console.log('Local Proxy Error:', err);
        // Don't crash on local proxy errors
        res.writeHead(503, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          error: 'Local API server not available',
          message: 'Using mock data instead'
        }));
      },
      logLevel: 'warn',
    })
  );
};
