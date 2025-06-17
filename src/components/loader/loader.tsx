import styled, { keyframes } from "styled-components";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

const Loader = ({ size = "medium", message }: LoaderProps) => {
  return (
    <LoaderContainer>
      <LoaderSpinner size={size} />
      {message && <LoaderMessage>{message}</LoaderMessage>}
    </LoaderContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
`;

const LoaderSpinner = styled.div<{ size: "small" | "medium" | "large" }>`
  border-radius: 50%;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  animation: ${spin} 1s linear infinite;

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 20px;
          height: 20px;
          border-width: 2px;
        `;
      case "large":
        return `
          width: 48px;
          height: 48px;
          border-width: 4px;
        `;
      default:
        return `
          width: 32px;
          height: 32px;
          border-width: 3px;
        `;
    }
  }}
`;

const LoaderMessage = styled.p`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0;
  font-weight: 400;
`;

export default Loader;
