import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Space,
  Switch,
  Table,
  Row,
  Col,
  Drawer,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import UserForm from "./components/UserForm";
import { userGet } from "@/api/user";

const UserList: React.FC = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const columns: ColumnsType<any> = [
    {
      title: "用户ID",
      dataIndex: "objectId",
      key: "objectId",
    },
    {
      title: "账号名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "rolename",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Popconfirm
            title="确定不是手抖了？"
            description="删除后数据无法找回"
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 渲染表格列表

  useEffect(() => {
    userGet().then((res) => {
      setData(res.data.results);
    });
  });

  // 关闭 Drawer 抽屉

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Row>
        <Col>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              新增账号
            </Button>
            <Button type="primary" danger>
              批量删除
            </Button>
          </Space>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey="objectId" />;
      <Drawer
        title="新增账号"
        placement="right"
        open={open}
        onClose={handleClose}
      >
        <UserForm />
      </Drawer>
    </div>
  );
};

export default UserList;
