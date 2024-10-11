import { useTitle } from "@/App";
import clsx from "clsx";
import { DashboardCard } from "@/components";
import { DashboardCardMenu } from "@/constants";
import styles from "./Dashboard.module.css";
import { Card, Col, List, Row } from "antd";

export const Dashboard = () => {
  const { setHeaderText } = useTitle();
  setHeaderText("Dashboard");
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      dueDate: "2023-06-30",
      status: "active",
    },
    {
      id: 2,
      name: "Mobile App Development",
      dueDate: "2023-08-15",
      status: "active",
    },
    {
      id: 3,
      name: "SEO Optimization",
      dueDate: "2023-05-31",
      status: "completed",
    },
  ];
  return (
    <>
      <div className="d-flex flex-column gap-xl">
        <div className={clsx(styles.TopGrid, "d-grid gap-xl")}>
          {DashboardCardMenu.map((content, index) => {
            return (
              <div key={index}>
                <DashboardCard Title={content.title} date={content.date}>
                  {content.content}
                </DashboardCard>
              </div>
            );
          })}
        </div>
        <Row style={{ marginTop: "20px" }}>
          <h2 className="mb-3">Active Project</h2>
          <Col span={24}>
            <Card>
              <List
                itemLayout="horizontal"
                dataSource={projects}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={`Due: ${item.dueDate} | Status: ${item.status}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
