import React, { useState, useEffect } from 'react';
import {
  CouponWrapper,
  CouponHeader,
  GenerateButton,
  FormGroup,
  CloseButton,
  SelectInput
} from '../../pages/Coupons/Coupons.style';
import { generateCoupon, getAllCoupons, deleteCoupon } from '../../api/couponApi';
import { getAllFrames } from '../../api/frameApi';
import { getCopies } from '../../api/copiesApi';
import Modal from 'react-modal';
import { Table, Button, Input, Select, Modal as AntdModal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

Modal.setAppElement('#root');

const Coupons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [frames, setFrames] = useState([]);
  const [copies, setCopies] = useState([]);
  const [loading, setLoading] = useState({
    coupons: false,
    frames: false,
    copies: false,
    generating: false,
    deleting: false
  });
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    frameSelectionId: '',
    noOfCopiesId: '',
    totalInstances: 1
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(prev => ({ ...prev, coupons: true, frames: true, copies: true }));
      setError(null);

      const [couponsRes, framesRes, copiesRes] = await Promise.all([
        getAllCoupons(),
        getAllFrames(),
        getCopies()
      ]);

      // Set coupons data
      setCoupons(couponsRes?.data?.coupons || couponsRes?.coupons || couponsRes || []);

      // Set frames data
      setFrames(framesRes?.data?.frames || framesRes?.frames || framesRes || []);

      // Set copies data
      setCopies(copiesRes?.data?.copies || copiesRes?.copies || copiesRes || []);

      console.log('Coupons data:', couponsRes);
      console.log('Frames data:', framesRes);
      console.log('Copies data:', copiesRes);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to load initial data. Please try again.');
    } finally {
      setLoading(prev => ({
        ...prev,
        coupons: false,
        frames: false,
        copies: false
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateCoupon = async () => {
    if (!formData.frameSelectionId || !formData.noOfCopiesId || !formData.totalInstances) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, generating: true }));
      setError(null);

      const { frameSelectionId, noOfCopiesId, totalInstances } = formData;

      const requestData = {
        frameSelectionId,
        noOfCopiesId,
        totalInstances: Number(totalInstances)
      };

      const response = await generateCoupon(requestData);

      if (!response?.couponCode) {
        throw new Error('Invalid response from server');
      }

      // Refresh the coupons list after generating a new one
      const couponsRes = await getAllCoupons();
      setCoupons(couponsRes?.data?.coupons || couponsRes?.coupons || couponsRes || []);

      setIsModalOpen(false);
      setFormData({
        frameSelectionId: '',
        noOfCopiesId: '',
        totalInstances: 1
      });
      message.success('Coupon generated successfully!');
    } catch (error) {
      console.error('Error generating coupon:', error);
      setError(error.message || 'Failed to generate coupon');
      message.error(error.message || 'Failed to generate coupon');
    } finally {
      setLoading(prev => ({ ...prev, generating: false }));
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      setLoading(prev => ({ ...prev, deleting: true }));
      await deleteCoupon(couponId);

      // After deletion, remove the coupon from the list
      setCoupons(prevCoupons => prevCoupons.filter(coupon => coupon._id !== couponId));
      message.success('Coupon deleted successfully!');
    } catch (error) {
      console.error('Error deleting coupon:', error);
      message.error('Failed to delete coupon');
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  };

  const getDisplayName = (item, type) => {
    if (!item) return 'N/A';

    // If item is an ID string
    if (typeof item === 'string') {
      const foundItem = type === 'frame'
        ? frames.find(f => f._id === item)
        : copies.find(c => c._id === item);

      if (type === 'frame') return foundItem?.frame_size || `ID: ${item}`;
      if (type === 'copy') return foundItem?.Number ? `${foundItem.Number} copies` : `ID: ${item}`;
    }

    // If item is an object
    if (typeof item === 'object') {
      if (type === 'frame') return item.frame_size || 'N/A';
      if (type === 'copy') return item.Number ? `${item.Number} copies` : 'N/A';
    }

    return 'N/A';
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => text || 'N/A'
    },
    {
      title: 'Frame Selection',
      dataIndex: 'frameSelection',
      key: 'frameSelection',
      render: (frameSelection) => getDisplayName(frameSelection, 'frame')
    },
    {
      title: 'No. of Copies',
      dataIndex: 'noOfCopies',
      key: 'noOfCopies',
      render: (noOfCopies) => getDisplayName(noOfCopies, 'copy')
    },
    {
      title: 'Total Instances',
      dataIndex: 'totalInstances',
      key: 'totalInstances',
      render: (text) => text || 0
    },
    {
      title: 'Instances Claimed',
      dataIndex: 'instancesClaimed',
      key: 'instancesClaimed',
      render: (text) => text || 0
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteCoupon(record._id)}
          loading={loading.deleting}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <CouponWrapper>
      <CouponHeader>
        Coupons
        <GenerateButton onClick={() => setIsModalOpen(true)}>
          Generate Coupon
        </GenerateButton>
      </CouponHeader>

      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setError(null);
        }}
        contentLabel="Generate Coupon Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '500px',
            width: '90%',
            padding: '20px'
          }
        }}
      >
        <h2>Generate New Coupon</h2>
        <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <FormGroup>
          <label>Frame Selection:</label>
          <Select
            style={{ width: '100%' }}
            name="frameSelectionId"
            value={formData.frameSelectionId}
            onChange={(value) => setFormData(prev => ({ ...prev, frameSelectionId: value }))}
            disabled={loading.frames}
            required
          >
            <Select.Option value="">Select a frame</Select.Option>
            {frames.map(frame => (
              <Select.Option key={frame._id} value={frame._id}>
                {frame.frame_size || `Frame ${frame._id}`}
              </Select.Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <label>Number of Copies:</label>
          <Select
            style={{ width: '100%' }}
            name="noOfCopiesId"
            value={formData.noOfCopiesId}
            onChange={(value) => setFormData(prev => ({ ...prev, noOfCopiesId: value }))}
            disabled={loading.copies}
            required
          >
            <Select.Option value="">Select number of copies</Select.Option>
            {copies.map(copy => (
              <Select.Option key={copy._id} value={copy._id}>
                {copy.Number ? `${copy.Number} copies` : `Copy ${copy._id}`}
              </Select.Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <label>Total Instances:</label>
          <Input
            type="number"
            name="totalInstances"
            value={formData.totalInstances}
            onChange={handleInputChange}
            min="1"
            required
          />
        </FormGroup>
        <Button
          type="primary"
          onClick={handleGenerateCoupon}
          disabled={
            loading.generating ||
            !formData.frameSelectionId ||
            !formData.noOfCopiesId ||
            !formData.totalInstances
          }
          loading={loading.generating}
        >
          Generate
        </Button>
      </Modal>

      <Table
        columns={columns}
        dataSource={coupons}
        rowKey="_id"
        loading={loading.coupons}
        locale={{
          emptyText: 'No coupons found'
        }}
      />
    </CouponWrapper>
  );
};

export default Coupons;