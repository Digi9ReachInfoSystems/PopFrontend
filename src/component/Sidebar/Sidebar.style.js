import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  background: #f9fafb; /* Light gray background */
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  align-items: center;
  padding-top: 20px;

  .logo {
    display: flex;
    // height: 20px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #1f2937;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
    transition: font-size 0.3s ease-in-out;
    font-weight: bold;
  }

  .menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    font-family: "Montserrat", sans-serif;
    width: 100%;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-family: "Montserrat", sans-serif;
  }

  .menu-item {
    width: 100%;
  }

  .menu-link {
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
    padding: 12px;
    color: #1f2937; /* Default text color */
    text-decoration: none;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    font-family: "Montserrat", sans-serif;

    &:hover {
      background: #e5e7eb; /* Light hover effect */
      color: #1f2937;
    }

    &.active {
      background: #4f46e5; /* Active state */
      color: white;
      font-weight: bold;

      /* Ensure icon turns white when active */
      .menu-link-icon {
        color: white;
      }
    }
  }

  .menu-link-icon {
    font-size: 20px;
    min-width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1f2937; /* Default icon color (Black) */
    transition: color 0.3s ease-in-out;
  }

  .menu-link.active .menu-link-icon {
    color: white !important; /* Ensure icon turns white when selected */
  }

  .menu-link-text {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
  }

  /* Channels Section */
  .menu-section {
    font-size: 14px;
    text-transform: uppercase;
    color: #9ca3af;
    margin: 10px 0 5px 20px;
    font-weight: bold;
  }

  /* Dropdown Menu */
  .submenu {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    padding-left: ${({ isCollapsed }) => (isCollapsed ? "0px" : "20px")};
  }
`;

export const ContentWrapper = styled.div`
  margin-left: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  width: calc(100% - ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")});
  padding: 20px;
  transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
  overflow-y: auto;
  font-family: "Montserrat", sans-serif;
`;


export const Logo = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #1f2937;
  width: ${({ isCollapsed }) => (isCollapsed ? "20px" : "100px")};
  height: ${({ isCollapsed }) => (isCollapsed ? "20px" : "100px")};
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "20px" : "100px")};
    height: ${({ isCollapsed }) => (isCollapsed ? "20px" : "100px")};
    object-fit: contain;
  }
`;
