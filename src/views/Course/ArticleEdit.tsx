import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Button, Cascader, Form, Input, Select, Switch } from "antd";
import {
  categoryGet,
  categoryPost,
  coursePost,
  ICategoryParams,
  ICourseType,
} from "@/api/course";
import ImgUpload from "@/components/imgUpload";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ArticleEdit: React.FC = (props) => {
  const [form] = Form.useForm();

  const [cateList, setCateList] = useState<ICategoryParams[]>([]);

  //   在初始化的时候，调用查询功能，获取到分类列表

  useEffect(() => {
    // 调用查询功能，获取列表
    categoryGet({}).then((res) => {
      let { results } = res.data;

      let arr = results.filter(
        (item: ICategoryParams) => item.fatherId === "0-0"
      );

      arr.forEach((item: ICategoryParams) => {
        item.children = results.filter(
          (child: ICategoryParams) => item.objectId === child.fatherId
        );
      });

      setCateList(arr);
    });
  }, []);

  const onFinish = async (values: ICourseType) => {
    // console.log(values);
    values.catelv1 = values.category[0];
    values.catelv2 = values.category[1];

    coursePost(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  // 操作富文本编辑器

  const handleEditorChange = (editorState: any) => {
    // console.log(editorState.toHTML());
    form.setFieldsValue({
      desc: editorState.toHTML(),
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="info" label="课程简介" rules={[{ required: true }]}>
        <TextArea />
      </Form.Item>
      <Form.Item name="category" label="归属分类" rules={[{ required: true }]}>
        <Cascader
          options={cateList}
          fieldNames={{ label: "cateName", value: "objectId" }}
          placeholder="请选择归属分类"
        />
      </Form.Item>
      <Form.Item
        name="isVip"
        label="是否收费"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item name="poster" label="课程封面" rules={[{ required: true }]}>
        <ImgUpload />
      </Form.Item>
      <Form.Item name="desc" label="课程详情" rules={[{ required: true }]}>
        <BraftEditor
          onChange={handleEditorChange}
          style={{ border: "1px solid #d8d8d8" }}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
        <Button htmlType="button" onClick={onReset}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleEdit;
