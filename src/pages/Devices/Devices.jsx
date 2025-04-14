import React, { useEffect, useState } from "react";
import { Table, Spin, message, Button, Popconfirm, Modal, Input, Upload, Empty } from "antd";
import { getDevices, updateDevice, deleteDevice } from "../../api/backgroundApi";
import { DevicesWrapper, DevicesContent } from "./Devices.styles";
import { UploadOutlined } from '@ant-design/icons';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await getDevices();
      setDevices(response);
      setFilteredDevices(response);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleEdit = (device) => {
    setEditingDevice(device);
    setIsModalVisible(true);
  };

  const handleDelete = async (device_key) => {
    try {
      const response = await deleteDevice(device_key);
      message.success(response.message);
      fetchDevices();
    } catch (error) {
      message.error("Failed to delete device");
    }
  };

  const handleUpdate = async () => {
    if (!newImage) {
      message.error("Please upload an image to update");
      return;
    }

    const formData = new FormData();
    formData.append("device_key", editingDevice.device_key);
    formData.append("background_image", newImage);

    try {
      const response = await updateDevice(formData);
      message.success(response.message);
      fetchDevices();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update background image");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    
    if (!value.trim()) {
      setFilteredDevices(devices); 
      return;
    }
  
    const filtered = devices.filter(device => {
      const name = device?.device_name?.toLowerCase() || "";
      const area = device?.device_area?.toLowerCase() || "";
      return name.includes(value.toLowerCase()) || area.includes(value.toLowerCase());
    });
  
    setFilteredDevices(filtered);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalVisible(true);
  };
  

  const columns = [
    {
      title: "Device Name",
      dataIndex: "device_name",
      key: "device_name",
      render: (text) => <span>{text}</span>,
    },
    {
      title:"Base Url",
      dataIndex: "base_url",
      key: "base_url",
    },
    {
      title:"Printer name",
      dataIndex: "printer_name",
      key: "printer_name",
    },
    {
      title: "Device Key",
      dataIndex: "device_key",
      key: "device_key",
    },
    {
        title: "Device Location",
        dataIndex: "device_location",
        key: "device_location",
        render: (deviceLocation) => {
          const { Country, state, City } = deviceLocation || {};
          return `${Country || 'N/A'}, ${state || 'N/A'}, ${City || 'N/A'}`;
        },
      },
      
   
    {
        title: "Background Image",
        dataIndex: "background_image",
        key: "background_image",
        render: (url) => (
          <img
            src={url}
            alt="Background"
            style={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={() => handleImageClick(url)}
          />
        ),
      },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this device?"
            onConfirm={() => handleDelete(record.device_key)}
            okText="Yes"
            cancelText="No"
          >
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DevicesWrapper>
        {/* <DevicesContent>Registered Devices</DevicesContent> */}

        <div style={{ marginBottom: 16 }}>
          <Input 
            placeholder="Search by Device Name or Area"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)} 
            style={{ width: 250, marginRight: 16 }}
          />
        </div>

        {loading ? (
          <Spin size="large" />
        ) : filteredDevices.length === 0 ? (
          <Empty description="No results found" />  
        ) : (
          <Table
            columns={columns}
            dataSource={filteredDevices}
            rowKey="device_key"
          />
        )}
      </DevicesWrapper>
    
      <Modal
      title="View Background Image"
      visible={isImageModalVisible}
      footer={null}
      onCancel={() => setIsImageModalVisible(false)}
    >
      {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ width: "100%" }} />
      )}
    </Modal>

      <Modal
        title="Edit Background Image"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <div>
          <h3>Current Device: {editingDevice?.device_name}</h3>
          <Upload
            beforeUpload={(file) => {
              setNewImage(file); 
              return false; 
            }}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default Devices;
