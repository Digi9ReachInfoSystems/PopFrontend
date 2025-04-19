import React from "react";
import { SideBarwrapper, Logo } from "../Sidebar/Sidebar.style";
import { NavLink } from "react-router-dom";
import { FaUsers, FaLaptop, FaCopy, FaImage } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";
import { IoIosImages } from "react-icons/io";
import { RiCoupon2Fill } from "react-icons/ri";
import Logo2 from "../../assets/logo.png";

const Sidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const SidebarItem = [
    { id: 1, name: "Home", path: "/admin", icon: <IoHomeSharp /> },
    { id: 2, name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
    { id: 3, name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { id: 4, name: "Devices", path: "/admin/devices", icon: <FaLaptop /> },
    { id: 5, name: "Copies", path: "/admin/copy", icon: <FaCopy /> },
    { id: 6, name: "Frames", path: "/admin/frame", icon: <FaImage /> },
    { id: 7, name: "Payment", path: "/admin/payment", icon: <RiMoneyRupeeCircleFill /> },
    { id: 8, name: "Coupons", path: "/admin/coupon", icon: <RiCoupon2Fill /> },
    {id: 9, name: "Frame images", path: "/admin/frame-image", icon: <IoIosImages /> },
    {id: 10, name: "Page timer", path: "/admin/pageTimer", icon: <SiStagetimer  /> },
  ];

  return (
    <SideBarwrapper
      isCollapsed={isCollapsed}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Logo isCollapsed={isCollapsed} >
        {/* Logo */}
<img src={Logo2} alt="Logo" className="logo" />
{/* Logo */}
      </Logo>
      <div className="menu">
        <ul className="menu-list">
          {SidebarItem.map((item) => (
            <li className="menu-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
                onClick={() => {
                  setTitle(item.name); // Update Header Title immediately
                  localStorage.setItem("title", JSON.stringify(item.name)); // Store in Local Storage
                }}
                end
              >
                <span className="menu-link-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-link-text">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </SideBarwrapper>
  );
};

export default Sidebar;
