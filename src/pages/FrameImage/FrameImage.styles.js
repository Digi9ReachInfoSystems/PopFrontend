import styled from "styled-components";

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    outline: 'none',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
};

export const Container = styled.div`
//   max-width: 1200px;
margin-left: 40px;
//   margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export const CreateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;

  &:disabled {
    background-color: #f3f4f6;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 0.5rem 0;
`;


export const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
`;

export const ProgressFill = styled.div`
  background-color: #3b82f6;
  border-radius: 9999px;
  height: 100%;
  width: ${props => props.width};
  transition: width 0.3s ease;
`;

export const ProgressText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #3b82f6;
  border-radius: 0.25rem;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LoadingMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #333;
`;

export const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

export const TableHeader = styled.th`
  padding: 0.75rem;
  font-weight: 600;
  color: #333;
`;

export const TableCell = styled.td`
  padding: 0.75rem;
`;

export const TableImage = styled.img`
  max-height: 4rem;
  max-width: 6rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f87171;
  color: white;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #dc2626;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


export const ImagePreview = styled.div`
  margin-top: 0.5rem;
`;

export const PreviewImage = styled.img`
  height: 8rem;  // You can adjust this size
  object-fit: contain;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    color: #ff7875;
    transform: scale(1.1);
  }

  &:disabled {
    color: #d9d9d9;
    cursor: not-allowed;
  }
`;