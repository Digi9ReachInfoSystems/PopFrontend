import React, { useEffect, useState, useRef } from "react";
import { getAdminFromToken } from "../../api/loginApi";
import { 
    HeaderContainer, 
    HeaderWrapper, 
    HeaderTitle, 
    ProfileContainer, 
    ProfileIcon, 
    DropdownMenu 
} from "../Header/Header.style";
import { FaUserCircle } from "react-icons/fa"; // Importing profile icon

const Header = ({ title }) => {
    const [adminUsername, setAdminUsername] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const adminData = await getAdminFromToken({ token: localStorage.getItem("token") });
                console.log("Admin data:", adminData);

                if (adminData.data && adminData.data.adminUsername) {
                    setAdminUsername(adminData.data.adminUsername);
                } else {
                    console.log("No username found in response.");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.log("Error fetching admin details:", error);
            }
        };

        fetchAdminData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderTitle>{title}</HeaderTitle> {/* Use title prop directly */}
                
                <ProfileContainer ref={dropdownRef}>
                    <span>Welcome, {adminUsername}!</span>
                    
                    <ProfileIcon onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <FaUserCircle size={24} />
                    </ProfileIcon>

                    {dropdownOpen && (
                        <DropdownMenu>
                            <button onClick={handleLogout}>Logout</button>
                        </DropdownMenu>
                    )}
                </ProfileContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default Header;
