import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AppBarWrap } from "../Bredcrumbs/Bredcrumbs.style";

function BreadCrumb() {
  const location = useLocation();

  // Function to generate breadcrumb items dynamically
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbItems = [];

    let currentPath = "";

    // Add the breadcrumbs dynamically based on the path segments
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;

      const displayText =
        segment.toLowerCase() === "faq"
          ? "FAQ"
          : segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbItems.push(
        <Breadcrumb.Item key={currentPath}>
          {/* Only link if it's NOT the last breadcrumb */}
          {index !== pathnames.length - 1 ? (
            <Link to={currentPath}>{displayText}</Link>
          ) : (
            <span>{displayText}</span>
          )}
        </Breadcrumb.Item>
      );
    });

    return breadcrumbItems;
  };

  return (
    <AppBarWrap>
      <Breadcrumb>

        {/* Dynamic breadcrumbs */}
        {generateBreadcrumbs()}
      </Breadcrumb>
    </AppBarWrap>
  );
}

export default BreadCrumb;
