import styled from "styled-components";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuToggle} aria-label="Open menu">
        ☰
      </MenuButton>
      <Logo>BESIDER</Logo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #e8e8e8;
  }
`;

const Logo = styled.h1`
  margin: 0;
  margin-left: 16px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  letter-spacing: -0.5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui,
    sans-serif;
`;

export default Header;
