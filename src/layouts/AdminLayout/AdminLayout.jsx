import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Avatar,
  Typography,
  Breadcrumb,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useProfile from "../../hook/useProfile";
import useAuth from "../../hook/useAuth";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { profile } = useProfile();
  const { onLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === "/admin") return ["dashboard"];
    if (path.startsWith("/admin/users")) return ["users"];
    if (path.startsWith("/admin/categories")) return ["categories"];
    if (path.startsWith("/admin/blogs")) return ["blogs"];
    return [];
  };

  const userMenuItems = [
    {
      key: "1",
      label: "Trang người dùng",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: onLogout,
    },
  ];

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [{ title: <Link to="/admin">Dashboard</Link> }];

    if (path === "/admin") return items;

    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      const section =
        segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
      items.push({ title: section });

      if (segments.length > 2) {
        items.push({ title: "Chi tiết" });
      }
    }

    return items;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="flex justify-center items-center h-16 m-4">
          <Title
            level={collapsed ? 5 : 4}
            style={{ color: "white", margin: 0 }}
          >
            {collapsed ? "TV" : "TravelVista"}
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: "users",
              icon: <TeamOutlined />,
              label: <Link to="/admin/users">Người dùng</Link>,
            },
            {
              key: "categories",
              icon: <FileTextOutlined />,
              label: <Link to="/admin/categories">Danh mục</Link>,
            },
            {
              key: "blogs",
              icon: <FileTextOutlined />,
              label: <Link to="/admin/blogs">Bài viết</Link>,
            },
          ]}
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <div className="flex items-center mr-6">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg">
                <Avatar
                  icon={<UserOutlined />}
                  src={profile?.avatar || "/avatar-default.jpg"}
                  style={{ marginRight: 8 }}
                />
                <div className="hidden md:block">
                  <Text strong>{profile?.name}</Text>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Breadcrumb
            items={getBreadcrumbItems()}
            style={{ marginBottom: 16 }}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
