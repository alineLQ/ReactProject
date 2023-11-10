import React, { useEffect, useState , Dispatch , SetStateAction } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { categoryGet, categoryPost, ICategoryParams } from '@/api/course';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface ICategoryProps {
    setIsModalOpen : Dispatch<SetStateAction<boolean>>
}

const CategoryForm: React.FC<ICategoryProps> = (props) => {
  const [form] = Form.useForm();

  const [cateList , setCateList ] = useState<ICategoryParams[]>([])

//   在初始化的时候，调用查询功能，获取到分类列表

useEffect( () => {
    // 调用查询功能，获取列表
    categoryGet().then(res => {
        setCateList(res.data.results)
    })
} , [])

  const onFinish = async (values: any) => {
    // console.log(values);
    
    // 录入分类
    // 多传递一个默认是否展开状态
    let res = await categoryPost({...values , status : true}) 
    console.log(res);
    props.setIsModalOpen(false)
    
  };

  const onReset = () => {
    form.resetFields();
  };

 

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="cateName" label="分类名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="fatherId" label="父级分类" rules={[{ required: true }]}>
        <Select placeholder="请选择父级分类"  allowClear>
          <Option value="0-0">顶级分类</Option>
          {/* 
            渲染设置的顶级分类
          */}
          {
            cateList.map((item) => (
                <Option key={item.objectId} value={item.objectId}>{item.cateName}</Option>
            ))
          }
          
        </Select>
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          取消
        </Button>
        
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;