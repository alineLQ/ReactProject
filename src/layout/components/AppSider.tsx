import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { mainRoutes } from "@/router";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMenuType } from "@/router/inter";
import { useAppSelector } from "@/stores/hooks";
import { UserUpdateFormType } from "@/api/user";
import { cloneDeep } from "lodash-es";

export interface IAppSiderProps {}

export default function AppSider(props: IAppSiderProps) {
  const [selectedKey, setSelectKey] = useState<string>("/dashboard");

  const [openKey, setOpenKey] = useState<Array<string>>([]);

  const [menuData, setMenuData] = useState<IMenuType[]>();

  const navigate = useNavigate();

  const location = useLocation();

  let { user } = useAppSelector((state) => state);

  useEffect(() => {
    setSelectKey(location.pathname);
    let open = location.pathname.split("/")[1];
    setOpenKey([`/${open}`]);
    // 对mainRoutes 进行深克隆 解决 侧边栏导航问题
    let cloneRoutes = cloneDeep(mainRoutes);
    setMenuData(handleMenuData(cloneRoutes));
  }, []);

  const handleMenu = ({ key }: { key: string }) => {
    navigate(key);
    setSelectKey(key);
  };

  const handleOpen = (arr: Array<string>) => {
    console.log(arr);
    setOpenKey(arr);
  };

  // 处理mainRoutes 里面的数据
  const handleMenuData = (routes: IMenuType[]) => {
    let { checkedKeys } = user.userinfo as UserUpdateFormType;
    return routes.filter((item: IMenuType) => {
      if (item.children) {
        item.children = handleMenuData(item.children);
      }
      return !item.hidden && checkedKeys?.includes(item.key);
    });
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKey}
      selectedKeys={[selectedKey]}
      items={menuData}
      onClick={handleMenu}
      onOpenChange={handleOpen}
    />
  );
}
