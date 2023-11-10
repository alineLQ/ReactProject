import {
  IUserLoginType,
  roleGet,
  userLogin,
  UserUpdateFormType,
} from "@/api/user";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import store2 from "store2";

// export interface IUserInfoType {
//   username: string;
//   objectId: string;
//   sessionToken: string;
//   avatar: string;
// }

export interface IUserStateType {
  isLogin: boolean;
  isLoading: boolean;
  userinfo: UserUpdateFormType | null;
}
let initialState: IUserStateType = {
  isLogin: false,
  isLoading: false,
  userinfo: null,
};

// 通过store2 获取到本地存储数据，对initialState 数据进行修改

let info =
  store2.get("fx-admin-userinfo") || store2.session.get("fx-admin-userinfo");

// 判断本地存储中是否有数据，如果登录成功，更改初始化数据，使得可以保持持久化登录
if (info) {
  initialState.isLogin = true;
  initialState.userinfo = info;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 开始登录
    loginStart(state) {
      state.isLoading = true;
    },
    // 登陆成功
    loginSuccessed(state, action) {
      state.isLogin = true;
      state.isLoading = false;
      let { userinfo, autoLogin } = action.payload;
      state.userinfo = userinfo;
      //   调用store2 本地存储功能 对用户名密码进行持久化
      let auto = autoLogin ? true : false;
      store2("autoLogin", auto);
      if (autoLogin) {
        store2("fx-admin-userinfo", userinfo);
      } else {
        store2.session("fx-admin-userinfo", userinfo);
      }
    },
    // 登录失败 清楚本地存储数据完成退出登录
    loginFill(state) {
      state.isLogin = false;
      state.isLoading = false;
      state.userinfo = null;
      store2.remove("fx-admin-userinfo");
      store2.session.remove("fx-admin-userinfo");
    },

    // 更新用户信息功能
    loginUpload(state, action) {
      let auto = store2.get("autoLogin");
      state.userinfo = action.payload;
      if (auto) {
        store2("fx-admin-userinfo", action.payload);
      } else {
        store2.session("fx-admin-userinfo", action.payload);
      }
    },
  },
});

export default userSlice.reducer;

export const userLoginAsync = (
  params: IUserLoginType,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  dispatch(loginStart()); // 开启登录
  setTimeout(() => {
    userLogin(params)
      .then(async (res) => {
        let role = await roleGet(res.data.roleId);
        console.log("角色信息", role);
        dispatch(
          loginSuccessed({
            userinfo: { ...res.data, ...role.data },
            autoLogin: params.autoLogin,
          })
        ); //登录成功
        navigate("/");
      })
      .catch((err) => {
        dispatch(loginFill()); //登录失败
      });
  }, 1000);
};

export const { loginStart, loginSuccessed, loginFill, loginUpload } =
  userSlice.actions;
