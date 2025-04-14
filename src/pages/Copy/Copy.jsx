import React, { useState, useEffect } from "react";
import { CopyWrapper, CopyContent } from './Copy.style';
import { getCopies, deleteCopy } from "../../api/copiesApi";
import { createCopy } from "../../api/copiesApi";
import { Table, Spin, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Copy = () => {
    const [copies, setCopies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Form instance (Ant Design Form)
    const [form] = Form.useForm();

    const fetchCopies = async () => {
        setLoading(true);
        try {
            const response = await getCopies(); 
            console.log("Fetched Response:", response); 

            if (response && response.copies) {
                setCopies(response.copies);
            } else {
                console.error("Error: 'copies' key not found in response");
                setCopies([]);
            }
        } catch (error) {
            console.error("Error fetching copies:", error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCopies();
    }, []);

    // Handle opening modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Handle closing modal (either Cancel or after OK)
    const handleCancel = () => {
        setIsModalVisible(false);
        // Reset form fields
        form.resetFields();
    };

    // Handle form submission
    const onFinish = async (values) => {
        try {
            // Call your createCopy API
            await createCopy(values);
            // Close the modal
            setIsModalVisible(false);
            // Reset form fields
            form.resetFields();
            // Refresh the list
            fetchCopies();
            message.success('Copy created successfully!');
        } catch (error) {
            console.error("Error creating copy:", error);
            message.error('Failed to create copy');
        }
    };

    // Handle copy deletion
    const handleDelete = async (id) => {
        try {
            await deleteCopy(id);
            message.success('Copy deleted successfully!');
            fetchCopies(); // Refresh the list
        } catch (error) {
            console.error("Error deleting copy:", error);
            message.error('Failed to delete copy');
        }
    };

    const columns = [
        {
            title: "Number",
            dataIndex: "Number",
            key: "Number",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this copy?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                    />
                </Popconfirm>
            ),
        },
    ];

    return (
        <CopyWrapper>
            {/* Create Copy Button */}
            <div style={{ textAlign: "right", marginBottom: 16 }}>
                <Button type="primary" onClick={showModal}>
                    Create Copy
                </Button>
            </div>

            {/* Table Info */}
            {/* <CopyContent>
                Number of Copies: {copies.length}
            </CopyContent> */}

            {/* Table or Loader */}
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    dataSource={copies}
                    columns={columns}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            )}

            {/* Modal for creating a copy */}
            <Modal
                title="Create New Copy"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}  // We'll use form submit instead
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Number"
                        name="Number"
                        rules={[{ required: true, message: "Please enter a number!" }]}
                    >
                        <Input placeholder="Enter copy number" />
                    </Form.Item>

                    {/* Add more fields here if needed... */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button style={{ marginLeft: 10 }} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </CopyWrapper>
    );
};

export default Copy;