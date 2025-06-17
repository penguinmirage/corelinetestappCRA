import { useState } from "react";
import styled from "styled-components";
import Header from "./components/header-component";
import SidebarMenu from "./components/sidebar-menu";
import NewsList from "./components/news-list";
import Footer from "./components/footer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContainer>
      <Header onMenuToggle={handleMenuToggle} />
      <SidebarMenu isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <MainContent>
        <ContentWrapper>
          <NewsList />
        </ContentWrapper>
        <Footer />
      </MainContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
`;

export default App;
