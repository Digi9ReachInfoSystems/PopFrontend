import React, { useState, useEffect } from "react";
import {
  getAllFrameImages,
  deletFrameImageById,
  createFrameImage,
} from "../../api/frameImageApi";
import { uploadFileToFirebase } from "../../utils/firebaseUtils";
import Modal from "react-modal";
// import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons
import * as S from "./FrameImage.styles";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";

Modal.setAppElement("#root");

const FrameImage = () => {
  const [frameImages, setFrameImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFrameImage, setNewFrameImage] = useState({
    name: "",
    image: null,
    imagePreview: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFrameImages();
  }, []);

  const fetchFrameImages = async () => {
    try {
      setIsLoading(true);
      const data = await getAllFrameImages();
      setFrameImages(data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch frame images:", error);
      setError("Failed to load frame images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFrameImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setNewFrameImage((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFrameImage.name || !newFrameImage.image) {
      setError("Please provide both name and image");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const firebaseUrl = await uploadFileToFirebase(
        newFrameImage.image, 
        "frame-images",
        (progress) => {
          setUploadProgress(progress);
        }
      );   
      const payload = {
        name: newFrameImage.name,
        image: firebaseUrl
      };
      await createFrameImage(payload);
      
      setIsModalOpen(false);
      setNewFrameImage({ name: "", image: null, imagePreview: null });
      setUploadProgress(0);
      fetchFrameImages();
    } catch (error) {
      console.error("Failed to create frame image:", error);
      setError(error.message || "Failed to create frame image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deletFrameImageById(id);
      fetchFrameImages();
    } catch (error) {
      console.error("Failed to delete frame image:", error);
      setError("Failed to delete frame image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id) => {
    if (confirm("Are you sure you want to delete this frame image?")) {
      handleDelete(id);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Frame Images</S.Title>
        <S.CreateButton 
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
        >
          {/* <FaPlus style={{ marginRight: '8px' }} /> */}
          Create Frame Image
        </S.CreateButton>
      </S.Header>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => !isLoading && setIsModalOpen(false)}
        contentLabel="Create Frame Image"
        style={S.modalStyles}
      >
        <S.ModalContent>
          <S.ModalTitle>Create New Frame Image</S.ModalTitle>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          <S.Form onSubmit={handleSubmit}>
            <S.FormGroup>
              <S.Label htmlFor="name">Name</S.Label>
              <S.Input
                type="text"
                id="name"
                name="name"
                value={newFrameImage.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="image">Image</S.Label>
              <S.FileInput
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
                disabled={isLoading}
              />
              {newFrameImage.imagePreview && (
                <S.ImagePreview>
                  <S.PreviewImage
                    src={newFrameImage.imagePreview}
                    alt="Preview"
                  />
                </S.ImagePreview>
              )}
            </S.FormGroup>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <S.ProgressContainer>
                <S.ProgressBar>
                  <S.ProgressFill width={`${uploadProgress}%`} />
                </S.ProgressBar>
                <S.ProgressText>
                  Uploading: {Math.round(uploadProgress)}%
                </S.ProgressText>
              </S.ProgressContainer>
            )}
            <S.ButtonGroup>
              <S.CancelButton
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </S.CancelButton>
              <S.SubmitButton
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </S.SubmitButton>
            </S.ButtonGroup>
          </S.Form>
        </S.ModalContent>
      </Modal>

      {isLoading && !frameImages.length ? (
        <S.LoadingMessage>Loading...</S.LoadingMessage>
      ) : (
        <S.TableContainer>
          <S.Table>
            <thead>
              <S.TableRow>
                <S.TableHeader>Name</S.TableHeader>
                <S.TableHeader>Image</S.TableHeader>
                <S.TableHeader>Actions</S.TableHeader>
              </S.TableRow>
            </thead>
            <tbody>
              {frameImages.map((frame) => (
                <S.TableRow key={frame._id}>
                  <S.TableCell>{frame.name}</S.TableCell>
                  <S.TableCell>
                    {frame.image && (
                      <S.TableImage
                        src={frame.image}
                        alt={frame.name}
                      />
                    )}
                  </S.TableCell>
                  <S.TableCell>
  <Popconfirm
      title="Are you sure you want to delete this frame image?"
      onConfirm={() => handleDelete(frame._id)}
      okText="Yes"
      cancelText="No"
      disabled={isLoading}
    >
     <Button
       type="text"
        icon={<DeleteOutlined />}
       disabled={isLoading}
      />
   </Popconfirm>  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </S.TableContainer>
      )}
    </S.Container>
  );
};

export default FrameImage;