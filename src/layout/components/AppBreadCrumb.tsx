import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { IMenuType } from "@/router/inter";
import { mainRoutes } from "@/router";

//面包屑数据包
const breadcrumbNameMap: Record<string, string> = {
  //   "/course": "课程管理",
  //   "/course/category": "课程分类",
  //   "/course/articleList": "课程列表",
};

const getBreadCrumb = (menu: IMenuType[]) => {
  // 遍历menu 路由包里面的数据，判断是否有子集，通过递归的方式，获取所有的路径的 key 和 label
  menu.forEach((item) => {
    if (item.children) {
      breadcrumbNameMap[item.key] = item.label;
      getBreadCrumb(item.children);
    } else {
      breadcrumbNameMap[item.key] = item.label;
    }
  });
};
getBreadCrumb(mainRoutes);

const Home = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div style={{ padding: "20px 0" }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

const AppBreadcrumb: React.FC = () => <Home />;

export default AppBreadcrumb;
