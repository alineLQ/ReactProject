import { courseGet, ICourseType } from "@/api/course";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Image, Space, Switch, Tag } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<ICourseType>[] = [
  {
    dataIndex: "objectId",
    title: "课程ID",
  },
  {
    dataIndex: "name",
    title: "课程名称",
    copyable: true,
    ellipsis: true,
  },
  {
    dataIndex: "info",
    title: "课程简介",
    copyable: true,
    ellipsis: true,
  },
  {
    title: "是否VIP",
    dataIndex: "isVip",
    valueType: "select",
    valueEnum: {
      2: {
        text: "所有课程",
      },
      1: {
        text: "VIP课程",
      },
      0: {
        text: "免费课程",
      },
    },
    render: (bool, record) => {
      // console.log("vip格子", record);
      let color = record.isVip ? "blue" : "grey";
      return <Tag color={color}>{record.isVip ? "VIP课程" : "免费课程"}</Tag>;
    },
  },
  {
    dataIndex: "poster",
    title: "课程封面",
    hideInSearch: true,
    render: (poster) => {
      return <Image src={poster as string} />;
    },
  },

  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a key="editable"> 编辑 </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  return (
    <ProTable<ICourseType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params);
        // await waitTime(2000);
        // 发送异步请求，拿到数据包
        let res = await courseGet(params);
        return {
          data: res.data.results,
        };
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage",
        onChange(value) {
          console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate("/course/articlePublic");
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "1",
              },
              {
                label: "3rd item",
                key: "1",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
