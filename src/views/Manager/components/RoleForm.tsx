import React, { useEffect, useState, Key } from "react";
import { Button, Form, Input, Tree } from "antd";
import { mainRoutes } from "@/router";
import { useForm } from "antd/es/form/Form";
import { rolePost, rolePut, RoleType } from "@/api/user";
import { useDispatch } from "react-redux";

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
type CheckedType = { checked: Key[]; halfChecked: Key[] } | Key[];

// 给Props传递的方法，定义接口规范
interface RoleFormProps {
  updateRoleList: (arg: RoleType) => void;
  initData: RoleType | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoleForm: React.FC<RoleFormProps> = (props) => {
  const [form] = useForm();
  const [checkedKeys, setCheckedKeys] = useState<CheckedType>();

  useEffect(() => {
    if (props.initData) {
      // 编辑
      form.setFieldsValue(props.initData);
      setCheckedKeys(props.initData.checkedKeys);
    } else {
      // 新增
      form.resetFields(); // 调用表单重置功能 清空表单数据
      setCheckedKeys([]); // 将表单数据，设置为空数组
    }
  }, [props.initData]);

  const onFinish = (values: any) => {
    values.checkedKeys = checkedKeys;
    // console.log(values);
    if (props.initData) {
      /**
       * 修改角色
       * 先调用更新接口，传递参数完成数据更新
       * 在调用列表渲染功能，完成列表渲染
       */
      let { objectId } = props.initData;
      rolePut(objectId, values).then((res) => {
        props.updateRoleList({ ...values, objectId });
      });
    } else {
      // 新增角色
      rolePost(values).then((res) => {
        // 将新建的表单数据，通过父组件传递的方法，传递给父组件，并携带ID 以便后期完成信息修改
        props.updateRoleList({ ...values, objectId: res.data.objectId });
      });
    }

    props.setOpen(false);
  };

  const handleChecked = (checkedKeysValue: CheckedType) => {
    console.log(checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
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
      <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="tree" label="菜单权限">
        <Tree
          checkable
          treeData={mainRoutes}
          checkedKeys={checkedKeys}
          onCheck={handleChecked}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          {props.initData ? "修改角色" : "新增角色"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleForm;
