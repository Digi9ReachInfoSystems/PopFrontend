import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar/Sidebar";
import { PageWrapper, ContentWrapper } from "../layout/Layout.style";
import Header from "../component/Header/Header";
import Breadcrumbs from "../component/Bredcrumbs/Bredcrumbs";

const Layout = () => {
  const [title, setTitle] = useState("Home"); // Default title
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle));
    }
  }, [location.pathname]); // Update title when route changes

  return (
    <PageWrapper>
      {/* Sidebar */}
      <Sidebar setTitle={setTitle} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <ContentWrapper isCollapsed={isCollapsed}>
        {/* Pass updated title to Header */}
        <Header />

        <Breadcrumbs />

        <Outlet />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Layout;
