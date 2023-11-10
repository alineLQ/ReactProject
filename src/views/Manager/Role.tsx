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
import RoleForm from "./components/RoleForm";
import { roleBatchDel, roleDel, roleGet, RoleType } from "@/api/user";

const RoleList: React.FC = () => {
  const [data, setData] = useState<Array<RoleType>>([]);
  const [open, setOpen] = useState(false);
  const [roleData, setRoleData] = useState<RoleType | null>(null);
  const [delRoleIds, setDelRoleIds] = useState<React.Key[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: "角色ID",
      dataIndex: "objectId",
      key: "objectId",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
              setRoleData(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定不是手抖了？"
            description="删除后数据无法找回"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDel(record, index)}
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 调用初始化功能，通过接口获取到后台表单数据
  useEffect(() => {
    roleGet().then((res) => {
      setData(res.data.results);
    });
  }, []);
  // 设置新建表单的关闭
  const handleClose = () => {
    setOpen(false);
  };
  // 给子组件传递方法，获取到新增的数据，给Table表单数据重新赋值，渲染列表
  const updateRoleList = (roleObj: RoleType) => {
    /**
     * 设定一个 isNew 变量
     * 通过for 循环 判定 是编辑角色 还是 新增角色
     */
    let isNew = true;
    for (let i = 0; i < data.length; i++) {
      // 编辑
      if (data[i].objectId === roleObj.objectId) {
        data[i] = roleObj;
        isNew = false;
        break;
      }
    }

    if (isNew) {
      // 新增
      data.push(roleObj);
    }

    setData([...data]);
  };

  /**
   * 删除角色
   */

  const handleDel = (record: RoleType, index: number) => {
    // console.log("确认删除！");
    /**
     * 调取删除数据接口，完成数据库删除任务
     * 移除data里面的index 下标数据， 完成 本地存储数据更新
     */

    roleDel(record.objectId).then((res) => {
      data.splice(index, 1);
      setData([...data]);
    });
  };

  // 批量删除角色

  const handleSelection = (selectedRowKeys: React.Key[]) => {
    console.log(selectedRowKeys);
    setDelRoleIds(selectedRowKeys);
  };
  let rowSelection = {
    onChange: handleSelection,
  };

  const handleBatchDel = () => {
    roleBatchDel(delRoleIds).then((res) => {
      let arr = data.filter((item) => {
        return !delRoleIds.includes(item.objectId);
      });
      setData([...arr]);
    });
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
                setRoleData(null);
              }}
            >
              新增角色
            </Button>
            {delRoleIds.length ? (
              <Button type="primary" danger onClick={handleBatchDel}>
                批量删除
              </Button>
            ) : (
              ""
            )}
          </Space>
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey="objectId"
      />
      ;
      <Drawer
        title="新增角色"
        placement="right"
        open={open}
        onClose={handleClose}
      >
        <RoleForm
          updateRoleList={updateRoleList}
          initData={roleData}
          setOpen={setOpen}
        />
      </Drawer>
    </div>
  );
};

export default RoleList;
