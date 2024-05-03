import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Profile from "./pages/Profile";
// import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

// const items = new Array(2).fill(null).map((_, index) => ({
//   label: index === 0 ? "Login" : "Register",
//   // onClick:
//   //   index === 0 ? <Link to='/login'></Link> : <Link to='/register'></Link>,
//   // <Link to='/login'></Link> : <Link to='/register'></Link>,
// }));

export default function App() {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
  const items = ["login", "register"].map((e) => <Link href={e}>{e}</Link>);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className='header' />
            <Menu
              theme='dark'
              mode='horital'
              defaultSelectedKeys={["2"]}
              items={items}
              style={{
                flex: 1,
                minWidth: 0,
              }}
            />
          </Header>
          <Content
          // style={{
          //   padding: "0 48px",
          // }}
          >
            {/* <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
            <div
              className='content'
              // style={{
              //   background: colorBgContainer,
              //   minHeight: 280,
              //   maxWidth: 1000,
              //   padding: 24,
              //   borderRadius: borderRadiusLG,
              // }}
            >
              {/* <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} /> */}
              Content
            </div>

            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              {/* {goLogin && <Navigate to='/login' />} */}
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
        {/* <Header /> */}
        {/* <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes> */}
      </BrowserRouter>
    </>
  );
}
