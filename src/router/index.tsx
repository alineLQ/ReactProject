import ArticleEdit from "@/views/Course/ArticleEdit";
import ArticleList from "@/views/Course/ArticleList";
import ArticlePublic from "@/views/Course/ArticlePublic";
import Category from "@/views/Course/Category";
import DashBoard from "@/views/DashBoard/DashBoard";
import ExImport from "@/views/Excel/Inport";
import Outport from "@/views/Excel/Outport";
import LargeFile from "@/views/LargeFile";
import RoleList from "@/views/Manager/Role";
import UserList from "@/views/Manager/User";
import Map from "@/views/Map";
import Setting from "@/views/Setting";
import {
  AreaChartOutlined,
  SettingFilled,
  VideoCameraOutlined,
  DeploymentUnitOutlined,
  HeatMapOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { IMenuType } from "./inter";
export const mainRoutes: IMenuType[] = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
    element: <DashBoard />,
  },
  {
    key: "/course",
    label: "课程管理",
    title: "课程管理",
    icon: <VideoCameraOutlined />,
    children: [
      {
        key: "/course/category",
        label: "课程分类",
        title: "课程分类",
        element: <Category />,
      },
      {
        key: "/course/articleList",
        label: "课程列表",
        title: "课程列表",
        element: <ArticleList />,
      },
      {
        key: "/course/articlePublic",
        label: "课程发布",
        title: "课程发布",
        element: <ArticlePublic />,
        hidden: true,
      },
      {
        key: "/course/articleEdit",
        label: "课程编辑",
        title: "课程编辑",
        element: <ArticleEdit />,
        // hidden : true
      },
    ],
  },
  {
    key: "/manager",
    label: "系统设置",
    title: "系统设置",
    icon: <DeploymentUnitOutlined />,
    children: [
      {
        key: "/manager/role",
        label: "角色管理",
        title: "用户管理",
        element: <RoleList />,
      },
      {
        key: "/manager/user",
        label: "账号管理",
        title: "账号管理",
        element: <UserList />,
      },
    ],
  },
  {
    key: "/setting",
    label: "个人设置",
    title: "个人设置",
    icon: <SettingFilled />,
    element: <Setting />,
  },
  {
    key: "/map",
    label: "高德地图",
    title: "高德地图",
    icon: <HeatMapOutlined />,
    element: <Map />,
  },
  {
    key: "/excel",
    label: "Excel表格",
    title: "Excel表格",
    icon: <FileExcelOutlined />,
    children: [
      {
        key: "/excel/Outport",
        label: "Excel导出",
        title: "Excel导出",
        element: <Outport />,
      },
      {
        key: "/excel/Inport",
        label: "Excel导入",
        title: "Excel导入",
        element: <ExImport />,
      },
    ],
  },
  {
    key: "/large",
    label: "大文件上传",
    title: "大文件上传",
    icon: <VideoCameraOutlined />,
    element: <LargeFile />,
  },
];
