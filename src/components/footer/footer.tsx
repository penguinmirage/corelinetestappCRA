import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            Log In
          </FooterLink>
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            About Us
          </FooterLink>
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            Publishers
          </FooterLink>
          <FooterLink href="#" onClick={(e) => e.preventDefault()}>
            Sitemap
          </FooterLink>
        </FooterLinks>

        <PoweredBy>
          <PoweredText>Powered by</PoweredText>
          <NewsAPIBadge>
            <NewsAPIText>News API</NewsAPIText>
          </NewsAPIBadge>
        </PoweredBy>

        <Copyright>© 2023 Besider. Inspired by Insider</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #e8e8e8;
  margin-top: auto;
  padding: 32px 20px 24px 20px;
`;

const FooterContent = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #333;
  }

  &:active {
    color: #1890ff;
  }
`;

const PoweredBy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const PoweredText = styled.span`
  color: #999;
  font-size: 12px;
  font-weight: 400;
`;

const NewsAPIBadge = styled.div`
  background-color: #4285f4;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NewsAPIText = styled.span`
  color: white;
`;

const Copyright = styled.div`
  color: #999;
  font-size: 12px;
  text-align: center;
  font-weight: 400;
`;

export default Footer;
