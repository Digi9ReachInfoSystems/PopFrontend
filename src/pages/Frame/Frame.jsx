import React, { useState, useEffect } from 'react';
import { FaqWrapper, FaqContent } from './Frame.style';
import { Table, Spin, Typography, Modal, Button, Form, Input, message, Image, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import { MdDelete } from "react-icons/md";
// Firebase imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
const { Title } = Typography;

import {
  getAllFrames,
  updateFrameById,
  deleteFrameById,
  createFrame
} from '../../api/frameApi';
const uploadFileToFirebase = async (file, folder = 'uploads') => {
  try {
    // Generate a unique filename
    const fileName = `${folder}/${uuidv4()}_${file.name}`;
    const fileRef = ref(storage, fileName);

    const snapshot = await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file to Firebase:', error);
    throw error;
  }
};

const Frame = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFrame, setEditingFrame] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);

  const fetchFrames = async () => {
    setLoading(true);
    try {
      const response = await getAllFrames();
      console.log('Frames:', response);
      setFrames(response.frames || []);
    } catch (error) {
      console.error('Error fetching frames:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFrames();
  }, []);
  const columns = [
    {
      title: 'Size',
      dataIndex: 'frame_size',
      key: 'frame_size',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rows',
      dataIndex: 'rows',
      key: 'rows',
    },
    {
      title: 'Columns',
      dataIndex: 'columns',
      key: 'columns',
    },
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: "Overlay",
      dataIndex: "overlay",
      key: "overlay",
      render: (bg) => {
        return bg ? "Yes" : "No";
      }
    },
    {
      title: 'Orientation',
      dataIndex: 'orientation',
      key: 'orientation',
    },
    {
      title: 'Padding',
      dataIndex: 'padding',
      key: 'padding',
    },
    {
      title: 'Bottom padding',
      dataIndex: 'bottomPadding',
      key: 'bottomPadding',
    },
    {
      title: 'Top padding',
      dataIndex: 'topPadding',
      key: 'topPadding',
    },
    {
      title: 'Horizontal Gap',
      dataIndex: 'horizontal_gap',
      key: 'horizontal_gap'
    },
    {
      title: 'Vertical Gap',
      dataIndex: 'vertical_gap',
      key: 'vertical_gap'
    },
    {
      title: 'No. of Photos',
      dataIndex: 'no_of_photos',
      key: 'no_of_photos'
    },

    // {
    //   title: "One",
    //   dataIndex: 'one',
    //   key: 'one',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {
    //   title: "Two",
    //   dataIndex: 'two',
    //   key: 'two',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {
    //   title: "Three",
    //   dataIndex: 'three',
    //   key: 'three',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {
    //   title: "Four",
    //   dataIndex: 'four',
    //   key: 'four',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {

    //   title: "Five",
    //   dataIndex: 'five',
    //   key: 'five',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {
    //   title: "Six",
    //   dataIndex: 'six',
    //   key: 'six',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },
    // {
    //   title: "Seven",
    //   dataIndex: 'seven',
    //   key: 'seven',
    //   render: (bg) => {
    //     return bg ? "Yes" : "No";
    //   }
    // },

    {
      title: "Selected Photos",
      key: "selectedPhotos",
      render: (_, record) => {
        // you could also store that number in record.photoSelectionId or so,
        // but if you're relying on those boolean fields:
        const flags = [
          record.one,
          record.two,
          record.three,
          record.four,
          record.five,
          record.six,
          record.seven,
        ];
        const idx = flags.findIndex((f) => f);
        // idx will be 0..6 or -1 if none
        return idx >= 0 ? String(idx + 1) : "N/A";
      }
    },    
    {
      title: 'Is 4 by 6',
      dataIndex: 'is4by6',
      key: 'is4by6',
      render: (bg) => {
        return bg ? "Yes" : "No";
      }
    },
    {
      title: 'Is 2 by 6',
      dataIndex: 'is2by6',
      key: 'is2by6',
      render: (bg) => {
        return bg ? "Yes" : "No";
      }
    },
    {
      title: 'Background',
      dataIndex: 'background',
      key: 'background',
      // Show array items joined by commas; also allow clicking to preview
      render: (bg) => {
        if (!Array.isArray(bg) || bg.length === 0) return null;
        return bg.map((item, idx) => (
          <img
            key={idx}
            src={item}
            alt="Background"
            style={{ width: '60px', height: '60px', cursor: 'pointer', marginRight: 5 }}
            onClick={() => handleImageClick(item)}
          />
        ));
      }
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="Frame"
          style={{ width: '60px', height: '60px', cursor: 'pointer' }}
          onClick={() => handleImageClick(image)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            type="danger"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // ========== IMAGE PREVIEW ==========
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalVisible(true);
  };

  const handleModalClose = () => {
    setIsImageModalVisible(false);
  };

  // ========== EDIT FRAME ==========
  const handleEdit = (frame) => {
    setEditingFrame(frame);
    setIsEditing(true);

    // Convert background array -> comma-separated string
    const backgroundStr = Array.isArray(frame.background)
      ? frame.background.join(', ')
      : '';

    editForm.setFieldsValue({
      frame_size: frame.frame_size,
      price: frame.price,
      rows: frame.rows,
      columns: frame.columns,
      orientation: frame.orientation,
      index: frame.index,
      image: frame.image,
      no_of_photos: frame.no_of_photos,
      horizontal_gap: frame.horizontal_gap,
      vertical_gap: frame.vertical_gap,
      padding: frame.padding,
      shapes: frame.shapes,
      overlay: frame.overlay,
      background: backgroundStr,
      topPadding: frame.topPadding,
      bottomPadding: frame.bottomPadding,
      is4by6: frame.is4by6,
      is2by6: frame.is2by6,
      one: frame.one,
      two: frame.two,
      three: frame.three,
      four: frame.four,
      five: frame.five,
      six: frame.six,
      seven: frame.seven,
    });
  };

  const handleUpdate = async (values) => {
    if (!editingFrame?._id) {
      message.error('Frame ID is missing');
      return;
    }

    // Convert comma-separated background string to array.
    const backgroundArray = values.background
      ? values.background.split(',').map(item => item.trim()).filter(url => url)
      : [];

    const updatePayload = {
      frame_size: values.frame_size,
      price: values.price,
      rows: values.rows,
      columns: values.columns,
      orientation: values.orientation,
      overlay: values.overlay,
      index: values.index,
      padding: values.padding,
      topPadding: values.topPadding,
      bottomPadding: values.bottomPadding,
      horizontal_gap: values.horizontal_gap,
      vertical_gap: values.vertical_gap,
      shapes: values.shapes,
      no_of_photos: values.no_of_photos,
      image: values.image,
      background: backgroundArray,
      is4by6: values.is4by6,
      is2by6: values.is2by6,
      one: values.one,
      two: values.two,
      three: values.three,
      four: values.four,
      five: values.five,
      six: values.six,
      seven: values.seven,
    };

    try {
      await updateFrameById(editingFrame._id, updatePayload);
      setFrames(prev =>
        prev.map(frame =>
          frame._id === editingFrame._id ? { ...frame, ...updatePayload } : frame
        )
      );
      setIsEditing(false);
      message.success('Frame updated successfully!');
    } catch (error) {
      console.error('Error updating frame:', error);
      message.error('Failed to update frame');
    }
  };



  // ========== DELETE FRAME ==========
  const handleDelete = async (id) => {
    if (!id) {
      message.error('Frame ID is missing');
      return;
    }

    try {
      await deleteFrameById(id);
      fetchFrames();
      message.success('Frame deleted successfully!');
    } catch (error) {
      console.error('Error deleting frame:', error);
      message.error('Failed to delete frame');
    }
  };

  // ========== CREATE FRAME ==========
  const handleCreate = async (values) => {
    // Convert comma-separated string to array
    const backgroundArray = values.background
      ? values.background.split(',').map((item) => item.trim())
      : [];

    const createPayload = {
      ...values,
      background: backgroundArray,
    };

    try {
      setLoading(true);
      const newFrame = await createFrame(createPayload);
      setFrames((prev) => [...prev, newFrame]);
      message.success('Frame created successfully!');
      setIsCreateModalVisible(false);
      createForm.resetFields();
      setLoading(false);
    } catch (error) {
      console.error('Error creating frame:', error);
      message.error('Failed to create frame');
    }
  };

  // ========== FILE UPLOAD HELPERS ==========

  // For creating main image
  const handleCreateFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      createForm.setFieldsValue({ image: null });
      setIsBackgroundLoading(true);
      try {
        const downloadURL = await uploadFileToFirebase(file);
        createForm.setFieldsValue({ image: downloadURL });
        message.success('Frame image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        message.error('Failed to upload frame image');
      } finally {
        setIsBackgroundLoading(false);
      }
    }
  };

  // For creating background images (append to comma-separated list)
  const handleCreateBackgroundFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      createForm.setFieldsValue({ background: null });
      setIsImageLoading(true);

      // Check if overlay is enabled
      const isOverlay = createForm.getFieldValue('overlay') === 'yes';

      try {
        // Get current background string from form
        const currentVal = createForm.getFieldValue('background') || '';
        const arr = currentVal ? currentVal.split(',').map((item) => item.trim()) : [];

        // Upload all files and collect their URLs
        const uploadPromises = Array.from(files).map(file => {
          // If it's overlay, ensure it is a PNG file
          if (isOverlay && file.type !== 'image/png') {
            throw new Error('Background image must be in PNG format for overlay!');
          }
          return uploadFileToFirebase(file);
        });

        const downloadURLs = await Promise.all(uploadPromises);
        arr.push(...downloadURLs);

        // Convert back to comma separated
        const newVal = arr.filter(url => url).join(', ');
        createForm.setFieldsValue({ background: newVal });

        message.success(`Uploaded ${files.length} background image(s) successfully!`);
      } catch (error) {
        console.error('Error uploading files:', error);
        message.error(error.message || 'Failed to upload background image(s)');
      } finally {
        setIsImageLoading(false);
        e.target.value = ''; // Reset file input
      }
    }
  };


  // For editing main image
  const handleEditFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {

      setIsBackgroundLoading(true);
      try {
        const downloadURL = await uploadFileToFirebase(file);
        // editForm.setFieldsValue({ image: null });
        editForm.setFieldsValue({ image: downloadURL });
        message.success('Frame image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        message.error('Failed to upload frame image');
      } finally {
        setIsBackgroundLoading(false);
      }
    }
  };

  // For editing background images (append to existing array)
  const handleEditBackgroundFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsImageLoading(true);

      // Check if overlay is enabled
      const isOverlay = editForm.getFieldValue('overlay') === 'yes';

      try {
        // Get current background URLs from form
        const currentVal = editForm.getFieldValue('background') || '';
        const currentUrls = currentVal ? currentVal.split(',').map(url => url.trim()) : [];

        // Upload all new files
        const uploadPromises = Array.from(files).map(file => {
          // If it's overlay, ensure it is a PNG file
          if (isOverlay && file.type !== 'image/png') {
            throw new Error('Background image must be in PNG format for overlay!');
          }
          return uploadFileToFirebase(file);
        });

        const newUrls = await Promise.all(uploadPromises);

        // Combine existing and new URLs
        const allUrls = [...currentUrls, ...newUrls].filter(url => url);
        editForm.setFieldsValue({ background: allUrls.join(', ') });

        message.success(`Added ${files.length} background image(s) successfully!`);
      } catch (error) {
        console.error('Error uploading files:', error);
        message.error(error.message || 'Failed to upload background image(s)');
      } finally {
        setIsImageLoading(false);
        e.target.value = ''; // Reset file input
      }
    }
  };


  const removeBackgroundImage = (index) => {
    try {


      setIsImageLoading(true);
      console.log('Removing background image at index:', isImageLoading);
      const currentVal = editForm.getFieldValue('background') || '';
      const urls = currentVal.split(',').map(url => url.trim());
      urls.splice(index, 1); // Remove the image at the specified index
      if (urls.length > 0) {
        editForm.setFieldsValue({ background: urls.join(', ') });
        message.success('Background image removed!');
      } else {
        editForm.setFieldsValue({ background: '' });
        message.warning('Last background image removed!');
      }
    } catch (error) {
      console.error('Error removing background image:', error);
    } finally {
      setIsImageLoading(true);
    }
    // setIsImageLoading(false);
  };

  return (
    <FaqWrapper>
       <FaqContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <Title level={2} style={{ 
          fontSize: '1.5rem', 
          margin: 20 
        }}>
          Frames
        </Title>   
     
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Create Frame
        </Button>
      </FaqContent>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={frames} columns={columns} rowKey="_id"
          scroll={{ x: 'max-content' }}  // This enables horizontal scrolling
        />
      )}

      {/* Image Preview Modal */}
      <Modal
        visible={isImageModalVisible}
        footer={null}
        onCancel={handleModalClose}
        title="Image Preview"
      >
        <img src={selectedImage} alt="Preview" style={{ width: '100%' }} />
      </Modal>

      <Modal
        visible={isEditing}
        title="Edit Frame"
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          form={editForm}
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            name="frame_size"
            label="Frame Size"
            rules={[{ required: true, message: 'Please enter frame size!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Frame Price"
            rules={[{ required: true, message: 'Please enter frame price!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rows"
            label="Rows"
            rules={[{ required: true, message: 'Please enter frame rows!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="columns"
            label="Columns"
            rules={[{ required: true, message: 'Please enter frame columns!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="orientation"
            label="Orientation"
            rules={[{ required: true, message: 'Please enter frame orientation!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="overlay"
            label="Is this frame overlay?"
            rules={[{ required: true, message: 'Please select overlay option!' }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="is4by6"
            label="Is this frame 4 by 6?"
            rules={[{ required: true, message: 'Please select 4 by 6 option!' }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>

          </Form.Item>

          <Form.Item
            name="is2by6"
            label="Is this frame 2 by 6?"
            rules={[{
              required: true, message: 'Please select 2 by 6 option!'
            }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="index"
            label="Index"
            rules={[{ required: true, message: 'Please enter frame index!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="padding"
            label="Padding"
            rules={[{ required: true, message: 'Please enter frame padding!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="topPadding"
            label="Top Padding"
            rules={[{ required: true, message: 'Please enter top padding!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bottomPadding"
            label="Bottom Padding"
            rules={[{ required: true, message: 'Please enter bottom padding!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="horizontal_gap"
            label="Horizontal Gap"
            rules={[{ required: true, message: 'Please enter frame horizontal gap!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="vertical_gap"
            label="Vertical Gap"
            rules={[{ required: true, message: 'Please enter frame vertical gap!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shapes"
            label="Shapes"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="no_of_photos"
            label="Number of Photos"
            rules={[{ required: true, message: 'Please enter number of photos!' }]}
          >
            <Input />
          </Form.Item>

           <Form.Item
   name="photoSelection"
   label="Select Photo Option"
   rules={[{ required: true, message: 'Please select an option!' }]}
>
   <Select onChange={(value) => {
    // Reset all…
     const newValues = { one: false, two: false, three: false, four: false, five: false, six: false, seven: false };
     newValues[value] = true;            // e.g. "five"→true
     // And write into the editForm (not the createForm)
     editForm.setFieldsValue(newValues);
   }}>
     <Select.Option value="one">One</Select.Option>
     <Select.Option value="two">Two</Select.Option>   
       <Select.Option value="three">Three</Select.Option>
    <Select.Option value="four">Four</Select.Option>
     <Select.Option value="five">Five</Select.Option>
     <Select.Option value="six">Six</Select.Option>
     <Select.Option value="seven">Seven</Select.Option>
   </Select>
 </Form.Item>
          {/* Keep these fields hidden as they'll be set programmatically */}
          <Form.Item name="one" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="two" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="three" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="four" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="five" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="six" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="seven" hidden>
            <Input />
          </Form.Item>


          {/* Background images display and upload */}
          <Form.Item
            name="background"
            label="Background Images"
            rules={[{ required: true, message: 'Please provide at least one background image!' }]}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {editForm.getFieldValue('background')?.split(',').map((url, index) => (
                url.trim() && (
                  <div key={index} style={{ position: 'relative' }}>
                    <Image
                      src={url.trim()}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                      preview={{ mask: 'View' }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<MdDelete />}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                      }}
                      onClick={() => removeBackgroundImage(index)}
                    />
                  </div>
                )
              ))}
            </div>
          </Form.Item>

          <Form.Item label="Upload Background Image">
            <input
              type="file"
              onChange={handleEditBackgroundFileChange}
              multiple
              accept="image/*"
            />
          </Form.Item>

          {/* Main frame image */}
          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please provide a frame image!' }]}
          >
            {editForm.getFieldValue('image') && (
              <Image
                src={editForm.getFieldValue('image')}
                style={{ width: 100 }}
                preview={{ mask: 'View' }}
              />
            )}
          </Form.Item>

          <Form.Item label="Upload Frame Image">
            <input type="file" onChange={handleEditFileChange} />
          </Form.Item>

          {/* <Form.Item
            name="frameImage"
            label="Frame Image"
            rules={[{ required: true, message: 'Please provide a frame image!' }]}
          >
            {editForm.getFieldValue('frameImage') && (
              <Image
                src={editForm.getFieldValue('frameImage')}
                style={{ width: 100 }}
                preview={{ mask: 'View' }}
              />
            )}
          </Form.Item>

          <Form.Item label="Upload Frame Image">
            <input type="file" onChange={handleEditFileChange} />
          </Form.Item> */}


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Frame
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ========== CREATE Frame Modal ========== */}
      <Modal
        visible={isCreateModalVisible}
        title="Create New Frame"
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form
          form={createForm}
          onFinish={handleCreate}
          layout="vertical"
        >
          <Form.Item
            name="frame_size"
            label="Frame Size"
            rules={[{ required: true, message: 'Please enter frame size!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Frame Price"
            rules={[{ required: true, message: 'Please enter frame price!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rows"
            label="Rows"
            rules={[{ required: true, message: 'Please enter frame rows!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="columns"
            label="Columns"
            rules={[{ required: true, message: 'Please enter frame columns!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="orientation"
            label="Orientation"
            rules={[{ required: true, message: 'Please enter frame orientation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="overlay"
            label="Is this frame overlay?"
            rules={[{ required: true, message: 'Please select overlay option!' }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item
            name="is4by6"
            label="Is this frame 4 by 6?"
            rules={[{ required: true, message: 'Please select 4 by 6 option!' }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>

          </Form.Item>

          <Form.Item
            name="is2by6"
            label="Is this frame 2 by 6?"
            rules={[{
              required: true, message: 'Please select 2 by 6 option!'
            }]}
          >
            <Select>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="index"
            label="Index"
            rules={[{ required: true, message: 'Please enter frame index!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="padding"
            label="Padding"
            rules={[{ required: true, message: 'Please enter frame padding!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="topPadding"
            label="Top Padding"
            rules={[{ required: true, message: 'Please enter top padding!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="bottomPadding"
            label="Bottom Padding"
            rules={[{ required: true, message: 'Please enter bottom padding!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="horizontal_gap"
            label="Horizontal Gap"
            rules={[{ required: true, message: 'Please enter frame horizontal gap!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="vertical_gap"
            label="Vertical Gap"
            rules={[{ required: true, message: 'Please enter frame vertical gap!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shapes"
            label="Shapes"
          // rules={[{ required: true, message: 'Please enter frame shapes!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="no_of_photos"
            label="Number of Photos"
            rules={[{ required: true, message: 'Please enter number of photos!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="photoSelection"
            label="Select Photo Option"
            rules={[{ required: true, message: 'Please select an option!' }]}
          >
            <Select onChange={(value) => {
              // Set all options to false first
              const newValues = {
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
                six: false,
                seven: false
              };
              // Set the selected option to true
              newValues[value] = true;
              editForm.setFieldsValue(newValues);
            }}>
              <Select.Option value="one">One</Select.Option>
              <Select.Option value="two">Two</Select.Option>
              <Select.Option value="three">Three</Select.Option>
              <Select.Option value="four">Four</Select.Option>
              <Select.Option value="five">Five</Select.Option>
              <Select.Option value="six">Six</Select.Option>
              <Select.Option value="seven">Seven</Select.Option>
            </Select>
          </Form.Item>

          {/* Keep these fields hidden as they'll be set programmatically */}
          <Form.Item name="one" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="two" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="three" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="four" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="five" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="six" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="seven" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="background"
            label="Background (comma separated URLs)"
            rules={[{ required: true, message: 'Please enter at least one background image URL!' }]}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {isImageLoading ? (
                <Spin size="small" />
              ) : (
                createForm.getFieldValue('background')?.split(',').map((url, index) => (
                  url.trim() && (
                    <Image
                      key={index}
                      src={url.trim()}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                      preview={{ mask: 'View' }}
                    />
                  )
                ))
              )}
            </div>
          </Form.Item>

          <Form.Item label="Upload Background Image">
            <input
              type="file"
              onChange={handleCreateBackgroundFileChange}
              multiple // Allow multiple file selection
              accept="image/*" // Only accept image files
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Frame Image URL"
            rules={[{ required: true, message: 'Please provide a frame image URL!' }]}
          >
            {/* <Input /> */}
            {isBackgroundLoading ? <Spin size="small" /> : <Image src={createForm.getFieldValue('image')} style={{ width: 100 }} />}
          </Form.Item>

          <Form.Item label="Upload Frame Image">
            <input type="file" onChange={handleCreateFileChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Frame
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </FaqWrapper>
  );
};

export default Frame;
