import { RootState } from "@/stores";
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Space, Tabs, message, theme, Row, Col, Spin } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginStart, userLoginAsync } from "@/stores/modules/user";
import { useNavigate } from "react-router-dom";

type LoginType = "phone" | "account";

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("account");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { isLoading },
  } = useSelector((state: RootState) => state);

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const handleLogin = async (values: any) => {
    console.log(values);
    userLoginAsync(values, dispatch, navigate);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <Row align="middle" justify="center" style={{ height: "100vh" }}>
          <Col>
            {/* 使用Spin 组件 包裹 LoginForm 可以 加载loading效果 使用spining 字段 控制 加载状态 */}
            <Spin spinning={isLoading}>
              <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="Github"
                subTitle="全球最大的代码托管平台"
                onFinish={handleLogin}
                actions={
                  <Space>
                    其他登录方式
                    <AlipayCircleOutlined style={iconStyles} />
                    <TaobaoCircleOutlined style={iconStyles} />
                    <WeiboCircleOutlined style={iconStyles} />
                  </Space>
                }
              >
                <Tabs
                  centered
                  activeKey={loginType}
                  onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                  <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
                  <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
                </Tabs>
                {loginType === "account" && (
                  <>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className={"prefixIcon"} />,
                      }}
                      placeholder={"用户名: admin or user"}
                      rules={[
                        {
                          required: true,
                          message: "请输入用户名!",
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                      }}
                      placeholder={"密码: ant.design"}
                      rules={[
                        {
                          required: true,
                          message: "请输入密码！",
                        },
                      ]}
                    />
                  </>
                )}
                {loginType === "phone" && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: "large",
                        prefix: <MobileOutlined className={"prefixIcon"} />,
                      }}
                      name="mobile"
                      placeholder={"手机号"}
                      rules={[
                        {
                          required: true,
                          message: "请输入手机号！",
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: "手机号格式错误！",
                        },
                      ]}
                    />
                    <ProFormCaptcha
                      fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                      }}
                      captchaProps={{
                        size: "large",
                      }}
                      placeholder={"请输入验证码"}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${"获取验证码"}`;
                        }
                        return "获取验证码";
                      }}
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: "请输入验证码！",
                        },
                      ]}
                      onGetCaptcha={async () => {
                        message.success("获取验证码成功！验证码为：1234");
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    marginBlockEnd: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    自动登录
                  </ProFormCheckbox>
                  <a
                    style={{
                      float: "right",
                    }}
                  >
                    忘记密码
                  </a>
                </div>
              </LoginForm>
            </Spin>
          </Col>
        </Row>
      </div>
    </ProConfigProvider>
  );
};
