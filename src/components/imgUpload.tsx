import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Cloud from "leancloud-storage";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
interface ImgUploadProps {
  onChange?: (url: string) => void;
  value?: string;
}
const ImgUpload: React.FC<ImgUploadProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // console.log("ImgUpload组件的" , props);

  const handleUpload = (info: any) => {
    getBase64(info.file, (base64) => {
      // console.log(base64);
      let cloudFile = new Cloud.File("fx.png", { base64 }); //构建learnCloud 图片资源对象
      cloudFile.save().then((res: any) => {
        // console.log(res);
        // 图片上传 从 attributes 中解构出url路径
        let { url } = res.attributes;
        setImageUrl(url);
        props.onChange!(url);
      });
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
      >
        {imageUrl || props.value ? (
          <img
            src={imageUrl || props.value}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImgUpload;
