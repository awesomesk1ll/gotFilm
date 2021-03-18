import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Route, Switch } from "react-router";
import Catalog from "./Catalog/Catalog";
import { NavLink } from "react-router-dom";
import Login from "./Login/Login";
import MainSearch from "./MainSearch/MainSearch";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  
  const state = [
    {id: 1, title: "first superfilm", descr: "Some description about current film"},
    {id: 2, title: "second superfilm", descr: "Some description about current film"},
    {id: 3, title: "third superfilm", descr: "Some description about current film"},
    {id: 4, title: "fourth superfilm", descr: "Some description about current film"},
    {id: 5, title: "fifth superfilm", descr: "Some description about current film"},
    {id: 6, title: "sixth superfilm", descr: "Some description about current film"},
    {id: 7, title: "seventh superfilm", descr: "Some description about current film"},
    {id: 8, title: "eighth superfilm", descr: "Some description about current film"},
    {id: 8, title: "ninth superfilm", descr: "Some description about current film"},
    {id: 8, title: "tenth superfilm", descr: "Some description about current film"},
];

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1"><NavLink to="/" >Catalog</NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to="/news" >News</NavLink></Menu.Item>
          <Menu.Item key="3"><NavLink to="/settings" >Settings</NavLink></Menu.Item>
          <NavLink to="/login" style={{ margin: "0 0 0 16px", float: "right" }}>Login</NavLink>
        </Menu>
      </Header>
      <MainSearch/>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Collection">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Viewed films">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="Unwanted films"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Switch>
              <Route exact path="/" render={() => <Catalog state={state} />} />
              <Route
                path="/login"
                render={() => <Login />}
              />
            </Switch>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
