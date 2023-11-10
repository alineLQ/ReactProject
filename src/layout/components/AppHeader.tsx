import * as React from "react";
import { Col, Layout, Row, theme } from "antd";
import { LogoutOutlined, SettingFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores";
import { loginFill } from "@/stores/modules/user";

const { Header } = Layout;
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

export interface IAppHeaderProps {}

export default function AppHeader(props: IAppHeaderProps) {
  const { user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    dispatch(loginFill());
  };

  const items: MenuProps["items"] = [
    {
      label: "退出登录",
      key: "1",
      icon: <LogoutOutlined />,
    },
    {
      label: "个人设置",
      key: "2",
      icon: <SettingFilled />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Header style={{ padding: "0 20", background: colorBgContainer }}>
        <Row justify="end" align="middle" style={{ height: "100%" }}>
          <Col>
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
              {user.userinfo ? user.userinfo.username : "尚未登录"}
            </Dropdown.Button>
          </Col>
        </Row>
      </Header>
    </div>
  );
}
