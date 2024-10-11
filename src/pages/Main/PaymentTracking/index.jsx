import { useState } from "react";
import { Tag, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useTitle } from "@/App";
import { Button, Table } from "@/components";

export const PaymentTracking = () => {
  const { setHeaderText } = useTitle();
  setHeaderText("Payment Tracking");

  const [payments, setPayments] = useState([
    { id: 1, amount: 1000, status: "unpaid", project: "Website Redesign" },
    { id: 2, amount: 1500, status: "paid", project: "Mobile App Development" },
    { id: 3, amount: 800, status: "unpaid", project: "SEO Optimization" },
  ]);

  const handleMarkAsPaid = (id) => {
    setPayments(
      payments.map((p) => (p.id === id ? { ...p, status: "paid" } : p))
    );
    message.success("Payment marked as paid");
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<CheckOutlined />}
          onClick={() => handleMarkAsPaid(record.id)}
          disabled={record.status === "paid"}
        >
          Mark as Paid
        </Button>
      ),
    },
  ];

  return <Table tableColumn={columns} tableDataSource={payments} rowKey="id" />;
};
