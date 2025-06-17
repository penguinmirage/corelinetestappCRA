import styled from "styled-components";

type SidebarMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarMenu = ({ isOpen, onClose }: SidebarMenuProps) => {
  const menuItems = [
    "SCIENCE",
    "GENERAL",
    "ENTERTAINMENT",
    "TECHNOLOGY",
    "BUSINESS",
    "HEALTH",
    "SPORTS",
  ];

  return (
    <SidebarContainer>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContent $isOpen={isOpen}>
        <CloseButton onClick={onClose} aria-label="Close menu">
          ×
        </CloseButton>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </MenuList>
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: relative;
`;

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

const SidebarContent = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  max-width: 300px;
  height: 100%;
  background-color: #f8f9fa;
  z-index: 300;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const MenuList = styled.div`
  margin-top: 60px;
  padding: 0;
`;

const MenuItem = styled.div`
  padding: 15px 25px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default SidebarMenu;
