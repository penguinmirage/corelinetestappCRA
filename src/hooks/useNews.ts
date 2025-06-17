import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { newsService } from "../services/newsService";
import type { NewsArticle, GroupedNews } from "../types/news";

export const useNews = () => {
  const [news, setNews] = useState<GroupedNews>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [hasMore, setHasMore] = useState(true);

  const groupNewsByDate = (articles: NewsArticle[]): GroupedNews => {
    return articles.reduce((acc: GroupedNews, article) => {
      const date = dayjs(article.pub_date).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(article);
      return acc;
    }, {});
  };

  const fetchNews = useCallback(
    async (year: number, month: number, isInitial = false) => {
      if (isInitial) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await newsService.getArchiveNews(year, month);

        if (!response || !response.response || !response.response.docs) {
          throw new Error("Invalid API response");
        }

        const articles = response.response.docs.filter(
          (article) =>
            article.abstract &&
            article.web_url &&
            article.pub_date &&
            article.headline?.main,
        );

        const groupedNews = groupNewsByDate(articles);

        setNews((prevNews) => {
          if (isInitial) {
            return groupedNews;
          }
          return { ...prevNews, ...groupedNews };
        });

        if (articles.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(
          `Failed to load news: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [],
  );

  const loadMoreNews = useCallback(() => {
    if (!loading && !initialLoading && hasMore) {
      const prevMonth = currentDate.subtract(1, "month");
      setCurrentDate(prevMonth);
      fetchNews(prevMonth.year(), prevMonth.month() + 1);
    }
  }, [currentDate, loading, initialLoading, hasMore, fetchNews]);

  const checkForNewNews = useCallback(async () => {
    if (initialLoading) return;

    try {
      const now = dayjs();
      const response = await newsService.getArchiveNews(
        now.year(),
        now.month() + 1,
      );

      if (!response || !response.response || !response.response.docs) {
        return;
      }

      const latestArticles = response.response.docs.filter(
        (article) =>
          article.abstract &&
          article.web_url &&
          article.pub_date &&
          article.headline?.main &&
          dayjs(article.pub_date).isAfter(dayjs().subtract(30, "seconds")),
      );

      if (latestArticles.length > 0) {
        const groupedNews = groupNewsByDate(latestArticles);

        setNews((prevNews) => {
          const updatedNews = { ...prevNews };
          Object.keys(groupedNews).forEach((date) => {
            if (updatedNews[date]) {
              const existingIds = new Set(
                updatedNews[date].map((article) => article._id),
              );
              const newArticles = groupedNews[date].filter(
                (article) => !existingIds.has(article._id),
              );
              if (newArticles.length > 0) {
                updatedNews[date] = [...newArticles, ...updatedNews[date]];
              }
            } else {
              updatedNews[date] = groupedNews[date];
            }
          });
          return updatedNews;
        });
      }
    } catch (err) {
      console.error("Error checking for new news:", err);
    }
  }, [initialLoading]);

  useEffect(() => {
    const now = dayjs();
    fetchNews(now.year(), now.month() + 1, true);
  }, [fetchNews]);

  useEffect(() => {
    if (!initialLoading) {
      const interval = setInterval(checkForNewNews, 30000);
      return () => clearInterval(interval);
    }
  }, [checkForNewNews, initialLoading]);

  const sortedDates = Object.keys(news).sort(
    (a, b) => dayjs(b).valueOf() - dayjs(a).valueOf(),
  );

  return {
    news,
    loading,
    error,
    loadMoreNews,
    hasMore,
    sortedDates,
    initialLoading,
  };
};
