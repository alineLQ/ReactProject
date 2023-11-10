import { Button, Table, Image } from "antd";
import * as React from "react";
import * as XLSX from "xlsx";

export interface IExImportProps {}
const columns: any = [
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
    render: (url: string) => {
      return <Image src={url} height={30} />;
    },
  },
  {
    title: "角色名称",
    dataIndex: "roleName",
    key: "roleName",
  },
];
export default function ExImport(props: IExImportProps) {
  const [data, setData] = React.useState([]);
  const handleImport = () => {
    console.log("导入excel表格");
    const file = (document.getElementById("fileRef") as HTMLInputElement)
      .files![0]; // 找到上传文件按钮
    const reader = new FileReader(); // 读取文件工具;
    reader.readAsBinaryString(file); // 读取文件内部内容
    reader.onload = function () {
      const workbook = XLSX.read(this.result, { type: "binary" });
      // 读取上传表格内容，名字sheet要统一
      const t = workbook.Sheets["user_list"];
      //将表格中的内容转换为js格式
      const r: any = XLSX.utils.sheet_to_json(t);
      console.log(r);
      setData(r);
    }; // 读取到内容，触发后续文件处理事件
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          (document.getElementById("fileRef") as HTMLInputElement).click();
        }}
      >
        导入Excel
      </Button>
      <Button type="dashed">上传至数据库</Button>
      <input type="file" hidden id="fileRef" onChange={handleImport} />
      <Table dataSource={data} columns={columns} rowKey="objectId" />
      <div id="cont"></div>
    </div>
  );
}
