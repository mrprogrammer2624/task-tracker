import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";
import { useTitle } from "@/App";
import { Button, Table } from "@/components";

const { Option } = Select;

export const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProjectId, setEditingProjectId] = useState(null);

  const showModal = (project = null) => {
    setEditingProjectId(project ? project.id : null);
    if (project) {
      form.setFieldsValue({
        name: project.name,
        dueDate: moment(project.dueDate),
        status: project.status,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const dueDate = values.dueDate ? values.dueDate.toISOString() : null;
      if (editingProjectId) {
        setProjects((prevProjects) =>
          prevProjects.map((p) =>
            p.id === editingProjectId ? { ...p, ...values, dueDate } : p
          )
        );
        message.success("Project updated successfully");
      } else {
        const newProject = {
          id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
          ...values,
          dueDate,
        };
        setProjects((prevProjects) => [...prevProjects, newProject]);
        message.success("Project added successfully");
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
    message.success("Project deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </span>
      ),
    },
  ];

  const { setHeaderText } = useTitle();
  setHeaderText("Project Management");

  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Project
      </Button>
      <Table tableColumn={columns} tableDataSource={projects} rowKey="id" />
      <Modal
        title={editingProjectId ? "Edit Project" : "Add Project"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
