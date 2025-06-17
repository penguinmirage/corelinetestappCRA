import styled from "styled-components";
import type { NewsArticle } from "../../types/news";

interface NewsItemProps {
  article: NewsArticle;
}

const NewsItem = ({ article }: NewsItemProps) => {
  const getImageUrl = () => {
    if (article.multimedia && article.multimedia.length > 0) {
      const image =
        article.multimedia.find(
          (media) =>
            media.type === "image" &&
            (media.subtype === "xlarge" ||
              media.subtype === "mediumThreeByTwo210" ||
              media.subtype === "popup"),
        ) || article.multimedia[0];

      if (image.url.startsWith("http")) {
        return image.url;
      }
      return `https://www.nytimes.com/${image.url}`;
    }
    return null;
  };

  const handleClick = () => {
    window.open(article.web_url, "_blank", "noopener,noreferrer");
  };

  const imageUrl = getImageUrl();

  return (
    <NewsItemContainer onClick={handleClick}>
      <NewsContent>
        {imageUrl && (
          <ImageContainer>
            <NewsImage
              src={imageUrl}
              alt={article.abstract}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </ImageContainer>
        )}
        <TextContent hasImage={!!imageUrl}>
          <Source>{article.source}</Source>
          <Title>{article.headline?.main || article.abstract}</Title>
          <PublishTime>
            {new Date(article.pub_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </PublishTime>
        </TextContent>
      </NewsContent>
    </NewsItemContainer>
  );
};

const NewsItemContainer = styled.div`
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #e0e0e0;
  }

  &:active {
    transform: translateY(0px);
  }
`;

const NewsContent = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 6px;
  background-color: #f5f5f5;

  @media (max-width: 480px) {
    flex: 0 0 70px;
    height: 70px;
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TextContent = styled.div<{ hasImage: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: ${(props) => (props.hasImage ? "80px" : "auto")};
  justify-content: space-between;
`;

const Source = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  color: #1a1a1a;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
  }
`;

const PublishTime = styled.div`
  font-size: 12px;
  color: #999;
  font-weight: 400;
  margin-top: auto;
`;

export default NewsItem;
