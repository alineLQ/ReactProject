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
  Image,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { roleBatchDel, roleDel, roleGet, RoleType, userGet } from "@/api/user";

interface ExcelOptionsType {
  fileName: string;
  datas: Array<any>;
}
const Outport: React.FC = () => {
  const [data, setData] = useState<RoleType[]>([]);
  const ExportJsonExcel = require("js-export-excel");
  const columns: ColumnsType<RoleType> = [
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
      title: "用户头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => {
        return <Image src={url} height={30} />;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
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
            // onCancel={cancel}
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
  useEffect(() => {
    userGet().then((res) => {
      setData(res.data.results);
    });
  }, []);

  const handleOutPort = () => {
    var option: ExcelOptionsType = {} as ExcelOptionsType;

    option.fileName = "用户信息统计表表";

    option.datas = [
      {
        sheetData: data,
        sheetName: "user_list",
        sheetFilter: ["objectId", "username", "roleName", "avatar"],
        sheetHeader: ["objectId", "username", "roleName", "avatar"],
        columnWidths: [20, 20],
      },
      {
        sheetData: [
          { one: "一行一列", two: "一行二列" },
          { one: "二行一列", two: "二行二列" },
        ],
      },
    ];

    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  };

  return (
    <div>
      <Row>
        <Col>
          <Space>
            <Button type="primary" onClick={handleOutPort}>
              导出Excel表格
            </Button>
          </Space>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey="objectId" />
    </div>
  );
};

export default Outport;
