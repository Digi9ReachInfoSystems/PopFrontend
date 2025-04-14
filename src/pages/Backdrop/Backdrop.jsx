import React, { useState, useEffect } from "react";
import {
  BackdropWrapper,
  BackdropContent
} from './Backdrop.style';
import { Table, message, Button, Popconfirm, Modal, Upload, Empty, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { getAllBackdrops, updateBackdropById, deleteBackdropById, createBackdrop } from "../../api/backdropApi";
import { getAllFrames } from "../../api/frameApi";

const Backdrop = () => {
  const [backdrops, setBackdrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBackdrop, setCurrentBackdrop] = useState(null);
  const [backdropFile, setBackdropFile] = useState(null);
  const [orientation, setOrientation] = useState('');
  const [frameId, setFrameId] = useState(null);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    fetchBackdrops();
    fetchFrames();
  }, []);

  const fetchBackdrops = async () => {
    setLoading(true);
    try {
      const response = await getAllBackdrops();
      setBackdrops(response || []);
    } catch (error) {
      message.error("Failed to load backdrops");
    }
    setLoading(false);
  };

  const fetchFrames = async () => {
    setLoading(true);
    try {
      const response = await getAllFrames();
      setFrames(response.frames || []);
    } catch (error) {
      message.error("Failed to load frames");
      setFrames([]);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setCurrentBackdrop(null);
    setBackdropFile(null);
    setOrientation('');
    setFrameId(null);
  };

  const handleModalOk = async () => {
    if (!backdropFile) {
      message.warning("Please select a backdrop image.");
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("backdropImage", backdropFile);
      
      if (!currentBackdrop) {
        // Creating a new backdrop
        formData.append("orientation", orientation.trim());
        if (frameId) formData.append("frameId", frameId);
console.log("Form data", formData);
        await createBackdrop(formData);
        message.success("Backdrop created successfully");
      } else {
        // Updating only the image
        console.log("Current  backdrop",currentBackdrop);
        await updateBackdropById(currentBackdrop._id, formData);
        message.success("Backdrop image updated successfully");
      }

      setIsModalVisible(false);
      resetForm();
      fetchBackdrops();
    } catch (error) {
      message.error("Error while saving backdrop");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBackdropById(id);
      message.success("Backdrop deleted successfully");
      fetchBackdrops();
    } catch (error) {
      message.error("Error while deleting backdrop");
    }
    setLoading(false);
  };

  const handleEdit = (backdrop) => {
    setCurrentBackdrop(backdrop);
    setBackdropFile(null); // Reset file selection
    setIsModalVisible(true);
  };

  return (
    <BackdropWrapper>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            resetForm();
            setIsModalVisible(true);
          }}
        >
          Create Backdrop
        </Button>
      </div>
      <BackdropContent>Backdrops</BackdropContent>
      <Table
        columns={[
          {
            title: 'Backdrop Image',
            dataIndex: 'backdropImage',
            key: 'backdropImage',
            render: (image) => image ? <img src={image} alt="Backdrop" style={{ width: 100 }} /> : 'N/A',
          },
          {
            title: 'Orientation',
            dataIndex: 'orientation',
            key: 'orientation',
          },
          {
            title: 'Frame Size',
            dataIndex: 'frameId',
            key: 'frameId',
            render: (frameId) => frameId ? frameId.frame_size : 'N/A',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <span>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  style={{ marginRight: 8 }}
                />
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>
              </span>
            ),
          },
        ]}
        dataSource={backdrops}
        rowKey="_id"
        loading={loading}
        pagination={false}
        locale={{ emptyText: <Empty description="No Backdrops" /> }}
      />

      <Modal
        title={currentBackdrop ? 'Update Backdrop Image' : 'Create Backdrop'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        confirmLoading={loading}
      >
        <Upload
          beforeUpload={(file) => {
            setBackdropFile(file);
            return false; // Prevent auto upload
          }}
          showUploadList={{ showPreviewIcon: false }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select Backdrop Image</Button>
        </Upload>
        {backdropFile && <p style={{ marginTop: 10 }}>Selected: {backdropFile.name}</p>}

        {!currentBackdrop && (
          <>
            <Select
              placeholder="Select Orientation"
              value={orientation}
              onChange={(value) => setOrientation(value)}
              style={{ width: '100%', marginTop: 10 }}
            >
              <Select.Option value="portrait">Portrait</Select.Option>
              <Select.Option value="landscape">Landscape</Select.Option>
            </Select>

            <Select
              placeholder="Select Frame"
              value={frameId}
              onChange={(value) => setFrameId(value)}
              style={{ width: '100%', marginTop: 10 }}
            >
              {frames.length > 0 ? (
                frames.map(frame => (
                  <Select.Option key={frame._id} value={frame._id}>
                    {frame.frame_size}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled>No frames available</Select.Option>
              )}
            </Select>
          </>
        )}
      </Modal>
    </BackdropWrapper>
  );
};

export default Backdrop;
