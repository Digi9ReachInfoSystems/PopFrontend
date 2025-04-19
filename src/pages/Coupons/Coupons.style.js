import styled from 'styled-components';

export const CouponWrapper = styled.div`
    padding: 20px;
    // max-width: 1200px;
    margin-left: 40px;
`;

export const CouponHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

export const GenerateButton = styled.button`
    background-color:#2a84fa;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;

    &:hover {
        background-color:#2a84fa;
    }
`;

export const CouponTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
`;

export const SelectInput = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;