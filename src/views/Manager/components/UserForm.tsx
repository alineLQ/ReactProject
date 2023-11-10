import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Tree } from "antd";
import { useForm } from "antd/es/form/Form";
import { roleGet, RoleType, userPost } from "@/api/user";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const UserForm: React.FC = (props) => {
  const [form] = useForm();

  const [cateList, setCateList] = useState<Array<RoleType>>([]);

  useEffect(() => {
    roleGet().then((res) => {
      let arr = res.data.results.map((item: RoleType, index: number) => {
        item.idx = index;
        return item;
      });

      setCateList(arr);
    });
  }, []);

  const onFinish = (values: any) => {
    console.log(values);
    // 将objectId 和 roleName 中解构出来
    // 给vlaues 添加上该字段 为后端补充好数据
    let { objectId, roleName } = cateList[values.idx];
    values.roleId = objectId;
    values.roleName = roleName;
    userPost(values);
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      form={form}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item name="username" label="用户账号" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="默认密码" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="idx" label="归属分类" rules={[{ required: true }]}>
        <Select
          options={cateList}
          fieldNames={{ label: "roleName", value: "idx" }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          新增账号
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
