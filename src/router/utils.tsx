import { mainRoutes } from "./index";
import { IMenuType } from "./inter";
import { Route } from "react-router-dom";
import { Fragment } from "react";

// // 此方法只考虑两层菜单
// export default function renderRoutes() {

//     let arr:IMenuType[] = []
//     mainRoutes.forEach((item) => {
//         if(item.children){
//             arr = [...arr , ...item.children]
//         }else{
//             arr.push(item)
//         }
//     })

//     return arr.map((item) => {
//         return <Route key={item.key} path={item.key} element={item.element}></Route>
//     })
// }

// 递归的方法 完成Routes 的渲染

export const renderRoutes = (routes: IMenuType[]) => {
  return routes.map((item) => {
    if (item.children) {
      return <Fragment key={item.key}>{renderRoutes(item.children)}</Fragment>;
    } else {
      return <Route key={item.key} path={item.key} element={item.element} />;
    }
  });
};
