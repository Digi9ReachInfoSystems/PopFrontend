import React, { useEffect, useState } from "react";
import { PaymentWrapper, PaymentContent, PaymnentHeader } from "./Payment.style";
import { getPayments } from "../../api/paymentApi";
import { Table, Tag, Spin, message, Alert } from "antd";
import moment from "moment";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPayments();
      
      // Check if response is successful and has payments array
      if (response && response.success && Array.isArray(response.payments)) {
        const formattedData = response.payments.map(item => ({
          ...item,
          key: item._id || Math.random().toString(36).substr(2, 9)
        }));
        
        setPayments(formattedData);
      } else {
        setError("No payments data found in response");
        message.error("No payments data found");
      }
    } catch (error) {
      console.error("Payment fetch error:", error);
      setError(error.message || "Failed to fetch payments");
      message.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (id) => id || "N/A"
    },
    {
      title: "User",
      dataIndex: "user_Id",
      key: "user_Id",
      render: (userId) => userId?.user_Name || "N/A", // Displaying userName instead of the whole user_Id object
    },
    {
      title: "Customer ID",
      dataIndex: "customer_Id",
      key: "customer_Id",
      render: (customerId) => customerId || "N/A",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method) => method || "N/A"
    },
    {
      title: "Status",
      dataIndex: "payment_Completed",
      key: "payment_Completed",
      render: (completed) => (
        <Tag color={completed ? "green" : "red"}>
          {completed ? "Completed" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "payment_Details",
      key: "payment_Details",
  
      render: (details) => {
        try {
          if (!details) return "N/A";
          const parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
          return parsedDetails.amount
            ? `₹${parsedDetails.amount / 100}`
            : "N/A";
        } catch (e) {
          console.error("Error parsing payment details:", e);
          return "N/A";
        }
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => date ? moment(date).format("LLL") : "N/A",
    },
  ];
  

  return (
    <PaymentWrapper>
      <PaymentContent>
        <PaymnentHeader>Payment History</PaymnentHeader>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={payments}
            rowKey={(record) => record.key}
            scroll={{ x: true }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            locale={{
              emptyText: error ? "Error loading data" : "No payments found",
            }}
          />
        )}
      </PaymentContent>
    </PaymentWrapper>
  );
};

export default Payment;