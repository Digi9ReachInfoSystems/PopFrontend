import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Input, Modal, Typography } from 'antd';
import { UsersWrapper, UsersContent } from './Users.style';
import { getAllUsers } from '../../api/userApi';
const { Title }= Typography;
const Users = () => {
    const [users, setUsers] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility state
    const [selectedImages, setSelectedImages] = useState([]); // Store the selected images URLs

    const fetchUsers = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await getAllUsers();
            setUsers(response.users);
            console.log('Users:', response.users);
            setFilteredUsers(response.users);
        } catch (error) {
            setError('Failed to load users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1);
        
        if (!value.trim()) {
            setFilteredUsers(users); 
            return;
        }

        const filtered = users.filter(user => {
            const name = user.user_Name?.toLowerCase() || "";
            return name.includes(value.toLowerCase());
        });

        setFilteredUsers(filtered);
    };

    const handleImageClick = (images) => {
        setSelectedImages(images);  // Store all the images in the selectedImages state
        setIsModalVisible(true);  // Open the modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false);  // Close the modal
        setSelectedImages([]);  // Clear the selected images
    };

    const columns = [
        {
            title: "Username",
            dataIndex: "user_Name",
            key: "user_Name"
        },
        {
            title: "Phone number",
            dataIndex: "phone_Number",
            key: "phone_Number"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Payment Method",
            dataIndex: "payment_Completed",
            key: "payment_Completed",
            render: (text) => (text ? "Yes" : "No")
        },
        {
            title: "User consent",
            dataIndex: "consent_Provided",
            key: "consent_Provided",
            render: (text) => (text ? "Yes" : "No")
        },
        {
            title: "Frame Selection",
            dataIndex: "frame_Selection",  
            key: "frame_Selection",
            render: (text, record) => {
                return record?.frame_Selection?.frame_size || "N/A";  
            }
        },
        {
            title:"Number of copies",
            dataIndex:"no_of_copies",
            key:"no_of_copies",
            render: (text, record) => {
                return record?.no_of_copies?.Number || "N/A";  
            }
        },
        {
            title: "Images",
            dataIndex: "image",
            key: "image",
            render: (text, record) => {
                const images = record.image_captured || [];
                return images.length > 0 ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                        {images.slice(0, 3).map((imageUrl, index) => (  // Display only first 3 images
                            <img 
                                key={index} 
                                src={imageUrl} 
                                alt={`user_image_${index}`} 
                                style={{ width: 50, height: 50, objectFit: 'cover', cursor: 'pointer' }}  
                                onClick={() => handleImageClick(images)} // Open modal with all images
                            />
                        ))}
                    </div>
                ) : (
                    <span>No Image</span>
                );
            },
        },
    ];

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <UsersWrapper>
            <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '16px' 
      }}>
        <Title level={2} style={{ 
          fontSize: '1.5rem', 
          margin: 20 
        }}>
          Users
        </Title>   
                <Input
                    placeholder="Search by username"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}  
                    style={{ width: 250, marginRight: 16 }}
                />
            </div>
            {loading ? (
                <Spin />
            ) : error ? (
                <Alert message={error} type="error" showIcon />  
            ) : (
                <Table 
                    dataSource={filteredUsers.slice((currentPage - 1) * 10, currentPage * 10)}  
                    columns={columns} 
                    rowKey="user_Name"  
                    pagination={{
                        current: currentPage,  
                        pageSize: 10,         
                        total: filteredUsers.length,  
                        onChange: handlePaginationChange,  
                    }}
                />
            )}

            {/* Modal for displaying images */}
            <Modal
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={600}
                centered
                destroyOnClose={true} // To clean up on close
            >
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {selectedImages.map((imageUrl, index) => (
                        <img 
                            key={index} 
                            src={imageUrl} 
                            alt={`full_image_${index}`} 
                            style={{ width: 200, height: 200, objectFit: 'cover' }} 
                        />
                    ))}
                </div>
            </Modal>
        </UsersWrapper>
    );
};

export default Users;
