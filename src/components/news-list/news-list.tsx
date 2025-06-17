import { useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNews } from "../../hooks/useNews";
import NewsItem from "../news-item";
import Loader from "../loader";

const NewsList = () => {
  const {
    news,
    loading,
    error,
    loadMoreNews,
    hasMore,
    sortedDates,
    initialLoading,
  } = useNews();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const sortedNews = useMemo(() => {
    return sortedDates.map((date) => ({
      date,
      articles: news[date]
        .filter((article) => article.abstract && article.web_url)
        .sort(
          (a, b) => dayjs(b.pub_date).valueOf() - dayjs(a.pub_date).valueOf(),
        ),
    }));
  }, [news, sortedDates]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !initialLoading
        ) {
          loadMoreNews();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadMoreNews, initialLoading]);

  if (initialLoading) {
    return (
      <InitialLoadingContainer>
        <Loader size="large" />
      </InitialLoadingContainer>
    );
  }

  if (error && sortedNews.length === 0) {
    return (
      <ErrorContainer>
        <ErrorMessage>Unable to load news</ErrorMessage>
        <ErrorSubtext>Please check your connection and try again</ErrorSubtext>
        <RetryButton onClick={() => window.location.reload()}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  if (sortedNews.length === 0 && !loading) {
    return (
      <EmptyContainer>
        <EmptyText>📰 No news available</EmptyText>
        <EmptySubText>Please check back later for updates</EmptySubText>
        <RetryButton onClick={() => window.location.reload()}>
          Refresh
        </RetryButton>
      </EmptyContainer>
    );
  }

  return (
    <NewsListContainer>
      {error && (
        <ErrorBanner>
          <ErrorText>⚠️ {error}</ErrorText>
        </ErrorBanner>
      )}

      {sortedNews.map(({ date, articles }) => (
        <DateSection key={date}>
          <DateHeader>
            {dayjs(date).format("MMMM D, YYYY")}
            <ArticleCount>({articles.length})</ArticleCount>
          </DateHeader>
          <NewsSection>
            {articles.map((article) => (
              <NewsItem key={article._id} article={article} />
            ))}
          </NewsSection>
        </DateSection>
      ))}

      {loading && sortedNews.length > 0 && (
        <LoadingContainer>
          <Loader size="medium" />
        </LoadingContainer>
      )}

      {hasMore && <LoadMoreTrigger ref={loadMoreRef} />}

      {!hasMore && sortedNews.length > 0 && (
        <EndMessage>
          <EndText>📰 You've reached the end</EndText>
          <EndSubText>Check back later for more updates</EndSubText>
        </EndMessage>
      )}
    </NewsListContainer>
  );
};

const NewsListContainer = styled.div`
  padding: 20px 16px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 400px;
`;

const DateSection = styled.div`
  margin-bottom: 32px;
`;

const DateHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding: 12px 16px;
  border-left: 4px solid #1890ff;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArticleCount = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const InitialLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  width: 100%;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 20px;
  gap: 20px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 20px;
  gap: 16px;
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

const ErrorSubtext = styled.p`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0;
  max-width: 300px;
`;

const EmptyText = styled.p`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

const EmptySubText = styled.p`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #40a9ff;
  }

  &:active {
    background-color: #1876d1;
  }
`;

const ErrorBanner = styled.div`
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  margin: 20px 0;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const EndText = styled.p`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const EndSubText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

export default NewsList;
