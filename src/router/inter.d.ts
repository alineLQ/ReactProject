// src/router/inter.d.ts
import { ReactNode } from "react";

// key属性可以使用 左侧菜单的路由地址，因为它具有唯一性
export interface IMenuType {
  key: string;
  label: string;
  title: string;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IMenuType[];
  hidden? : boolean
}