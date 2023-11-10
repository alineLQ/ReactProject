import React, { useEffect, useState } from "react";
import { Button, Col, Row, Space, Table, Tag, Modal, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import CategoryForm from "./components/CategoryFrom";
import { categoryGet, categoryPut, ICategoryParams } from "@/api/course";
import { useAppSelector } from "@/stores/hooks";
import user from "@/stores/modules/user";

interface TableCateoryType extends ICategoryParams {
  children: ICategoryParams[];
}

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [cateList, setCateList] = useState<TableCateoryType[]>([]);

  const { user } = useAppSelector((state) => state);

  const handlerStatus = (
    bool: boolean,
    record: ICategoryParams,
    index: number
  ) => {
    // console.log(record , index)
    categoryPut(record.objectId as string, !bool).then((res) => {
      let { fatherId } = record;
      if (fatherId === "0-0") {
        cateList[index].status = !bool;
      } else {
        let fidx: number = cateList.findIndex(
          (item) => item.objectId === fatherId
        );
        cateList[fidx].children[index].status = !bool;
      }

      setCateList([...cateList]);
    });
  };

  const columns: ColumnsType<ICategoryParams> = [
    {
      title: "父级Id",
      dataIndex: "fatherId",
      key: "FatherId",
    },
    {
      title: "分类名称",
      dataIndex: "cateName",
      key: "cateName",
    },
    {
      title: "上架状态",
      dataIndex: "status",
      key: "status",
      render: (bool, record, index) => (
        <Switch
          checked={bool}
          onChange={() => {
            handlerStatus(bool, record, index);
          }}
        />
      ),
    },

    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          {/* <Button type="primary" danger>
            删除
          </Button> */}
          {user.userinfo?.roleName === "管理员" ? (
            <Button type="primary" danger>
              删除
            </Button>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    categoryGet({}).then((res) => {
      let { results } = res.data;

      let arr = results.filter(
        (item: ICategoryParams) => item.fatherId == "0-0"
      ); // 提取主分类

      // 遍历出子分类类目

      arr.forEach((item: TableCateoryType) => {
        item.children = results.filter((child: ICategoryParams) => {
          return item.objectId == child.fatherId;
        });
      });

      setCateList(arr);
    });
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  // 设置弹窗消失
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            新增分类
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={cateList} rowKey="objectId" />
      <Modal
        title="新增分类"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CategoryForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Category;
