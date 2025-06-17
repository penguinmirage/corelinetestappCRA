export interface CorsOptions {
  proxyUrl?: string;
  apiBaseUrl: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

export class CorsHandler {
  private options: CorsOptions;

  constructor(options: CorsOptions) {
    this.options = options;
  }

  getApiUrl(endpoint: string): string {
    const { proxyUrl, apiBaseUrl } = this.options;

    if (process.env.NODE_ENV === "development" && endpoint.startsWith("/api")) {
      return endpoint;
    }

    if (proxyUrl && process.env.NODE_ENV === "production") {
      return `${proxyUrl}/${apiBaseUrl}${endpoint}`;
    }
    return `${apiBaseUrl}${endpoint}`;
  }

  getHeaders(): HeadersInit {
    const baseHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.options.headers) {
      Object.assign(baseHeaders, this.options.headers);
    }

    if (this.options.apiKey) {
      (baseHeaders as Record<string, string>)["X-API-Key"] =
        this.options.apiKey;
    }

    return baseHeaders;
  }

  async makeRequest(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = this.getApiUrl(endpoint);
    const headers = this.getHeaders();

    const requestOptions: RequestInit = {
      method: "GET",
      headers,
      mode: "cors",
      cache: "default",
      ...options,
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("CORS")) {
        throw new Error(
          "CORS error: Unable to access the API. Consider using a CORS proxy or configuring server-side proxy.",
        );
      }
      throw error;
    }
  }
}

export const CORS_PROXIES = {
  CORS_ANYWHERE: "https://cors-anywhere.herokuapp.com",
  ALLORIGINS: "https://api.allorigins.win/raw?url=",
  THINGPROXY: "https://thingproxy.freeboard.io/fetch/",
  CORSPROXY_IO: "https://corsproxy.io/?",
} as const;

export function willHaveCorsIssue(url: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const apiUrl = new URL(url);
    const currentUrl = new URL(window.location.href);

    if (apiUrl.origin === currentUrl.origin) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function getCorsConfig(): {
  needsProxy: boolean;
  proxyUrl?: string;
  isDevelopment: boolean;
} {
  const isDevelopment = process.env.NODE_ENV === "development";
  const hasViteProxy =
    isDevelopment && process.env.REACT_APP_PROXY_ENABLED !== "false";
  const corsProxyUrl = process.env.REACT_APP_CORS_PROXY_URL;

  return {
    needsProxy: !hasViteProxy && !!corsProxyUrl,
    proxyUrl: corsProxyUrl,
    isDevelopment,
  };
}

export function createCorsHandler(
  apiBaseUrl: string,
  apiKey?: string,
): CorsHandler {
  const config = getCorsConfig();

  return new CorsHandler({
    apiBaseUrl,
    apiKey,
    proxyUrl: config.proxyUrl,
    headers: {
      "User-Agent": "NewsApp/1.0",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
}

export async function testCorsConnectivity(url: string): Promise<{
  success: boolean;
  error?: string;
  method: "direct" | "proxy";
}> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      mode: "cors",
    });

    if (response.ok) {
      return { success: true, method: "direct" };
    }
  } catch (error) {
    console.log("Direct connection failed:", error);
  }
  const config = getCorsConfig();
  if (config.proxyUrl) {
    try {
      const proxyUrl = `${config.proxyUrl}/${url}`;
      const response = await fetch(proxyUrl, {
        method: "HEAD",
        mode: "cors",
      });

      if (response.ok) {
        return { success: true, method: "proxy" };
      }
    } catch (error) {
      return {
        success: false,
        error: `Both direct and proxy connections failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        method: "proxy",
      };
    }
  }

  return {
    success: false,
    error: "CORS blocked and no proxy configured",
    method: "direct",
  };
}
