import React, { useState, useEffect } from 'react';
import { 
  createPageTimer, 
  getPageTimers, 
  getTimerByPageName, 
  updateTimer, 
  deleteTimer 
} from '../../api/pageTimerApi';
import { 
  Button, 
  Table, 
  Input, 
  Modal, 
  Form, 
  Space, 
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Column } = Table;
const { Title } = Typography;

const PageTimer = () => {
  const [timers, setTimers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTimers();
  }, []);

  const fetchTimers = async () => {
    setLoading(true);
    try {
      const data = await getPageTimers();
      setTimers(data);
    } catch (error) {
      message.error('Error fetching timers');
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentTimer(null);
    setEditMode(false);
  };

  const onFinish = async (values) => {
    try {
      if (editMode && currentTimer) {
        await updateTimer(currentTimer._id, values);
        message.success('Timer updated successfully');
      } else {
        await createPageTimer(values);
        message.success('Timer created successfully');
      }
      fetchTimers();
      handleCancel();
    } catch (error) {
      message.error(error.response?.data?.error || 'Error saving timer');
    }
  };

  const handleEdit = (timer) => {
    setCurrentTimer(timer);
    setEditMode(true);
    form.setFieldsValue({
      pageName: timer.pageName,
      timerSeconds: timer.timerSeconds
    });
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTimer(id);
      message.success('Timer deleted successfully');
      fetchTimers();
    } catch (error) {
      message.error('Error deleting timer');
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchTerm.trim() === '') {
        fetchTimers();
        return;
      }
      const timer = await getTimerByPageName(searchTerm);
      setTimers(timer ? [timer] : []);
    } catch (error) {
      message.error('Error searching timer');
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchTimers();
  };

  return (
    <div style={{ padding: '24px' }}>
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
          Page Timer
        </Title>
        <Button 
          type="primary" 
        //   icon={<PlusOutlined />}
          onClick={showModal}
        >
          Create Timer
        </Button>
      </div>

      <Card>
        {/* <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={18}>
            <Input
              placeholder="Search by page name"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col span={6}>
            <Space>
              <Button 
                type="primary" 
                icon={<SearchOutlined />} 
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button 
                icon={<SyncOutlined />} 
                onClick={resetSearch}
              >
                Reset
              </Button>
            </Space>
          </Col>
        </Row> */}

        <Table 
          dataSource={timers} 
          loading={loading}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 10 }}
        >
          <Column 
            title="Page Name" 
            dataIndex="pageName" 
            key="pageName" 
          />
          <Column 
            title="Timer (seconds)" 
            dataIndex="timerSeconds" 
            key="timerSeconds" 
          />
          <Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Space size="middle">
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEdit(record)}
                />
                <Popconfirm
                  title="Are you sure to delete this timer?"
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
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal
        title={editMode ? 'Edit Timer' : 'Create Timer'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="timerForm"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            pageName: '',
            timerSeconds: 0
          }}
        >
          <Form.Item
            label="Page Name"
            name="pageName"
            rules={[
              { 
                required: true, 
                message: 'Please input page name' 
              },
              {
                validator: (_, value) =>
                  value.trim() === '' 
                    ? Promise.reject(new Error('Page name cannot be empty')) 
                    : Promise.resolve()
              }
            ]}
          >
            <Input placeholder="Enter page name" />
          </Form.Item>

          <Form.Item
            label="Timer Seconds"
            name="timerSeconds"
            rules={[
              { 
                required: true, 
                message: 'Please input timer seconds' 
              },
              {
                validator: (_, value) =>
                  value < 0 
                    ? Promise.reject(new Error('Timer must be non-negative')) 
                    : Promise.resolve()
              }
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editMode ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PageTimer;