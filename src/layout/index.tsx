import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, theme, Menu } from "antd";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";
import AppBreadcrumb from "./components/AppBreadCrumb";
import { useAppSelector } from "@/stores/hooks";
const { Content, Footer, Sider } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const whiteList = useAppSelector((state) => state.user.userinfo!.checkedKeys);
  const { pathname } = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            color: "#fff",
            lineHeight: "32px",
          }}
        >
          {" "}
          React专项练习{" "}
        </div>
        <AppSider></AppSider>
      </Sider>
      <Layout>
        <AppHeader />
        <Content style={{ margin: "0 16px" }}>
          <AppBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* <Outlet></Outlet> */}
            {whiteList?.includes(pathname) ? <Outlet /> : "没有权限"}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
