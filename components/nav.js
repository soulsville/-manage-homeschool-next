import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    UsergroupAddOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';
import stylesheet from 'antd/dist/antd.min.css';
import AttendanceComponent from '../components/attendanceComponent';
import TeacherStudentComponent from '../components/teacherStudentComponent';


// const Nav = () => (
//     <Layout>
//     <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
//     <Header className="header">
//       <div className="logo" />
//       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//         <Menu.Item key="1">nav 1</Menu.Item>
//         <Menu.Item key="2">nav 2</Menu.Item>
//         <Menu.Item key="3">nav 3</Menu.Item>
//       </Menu>
//     </Header>
//     <Layout>
//       <Sider width={200} className="site-layout-background">
//         <Menu
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           defaultOpenKeys={['sub1']}
//           style={{ height: '100%', borderRight: 0 }}
//         >
//           <SubMenu
//             key="sub1"
//             title={
//               <span>
//                 <UserOutlined />
//                 subnav 1
//               </span>
//             }
//           >
//             <Menu.Item key="1">option1</Menu.Item>
//             <Menu.Item key="2">option2</Menu.Item>
//             <Menu.Item key="3">option3</Menu.Item>
//             <Menu.Item key="4">option4</Menu.Item>
//           </SubMenu>
//           <SubMenu
//             key="sub2"
//             title={
//               <span>
//                 <LaptopOutlined />
//                 subnav 2
//               </span>
//             }
//           >
//             <Menu.Item key="5">option5</Menu.Item>
//             <Menu.Item key="6">option6</Menu.Item>
//             <Menu.Item key="7">option7</Menu.Item>
//             <Menu.Item key="8">option8</Menu.Item>
//           </SubMenu>
//           <SubMenu
//             key="sub3"
//             title={
//               <span>
//                 <NotificationOutlined />
//                 subnav 3
//               </span>
//             }
//           >
//             <Menu.Item key="9">option9</Menu.Item>
//             <Menu.Item key="10">option10</Menu.Item>
//             <Menu.Item key="11">option11</Menu.Item>
//             <Menu.Item key="12">option12</Menu.Item>
//           </SubMenu>
//         </Menu>
//       </Sider>
//       <Layout style={{ padding: '0 24px 24px' }}>
//         <Breadcrumb style={{ margin: '16px 0' }}>
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <Content
//           className="site-layout-background"
//           style={{
//             padding: 24,
//             margin: 0,
//             minHeight: 280,
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   </Layout>
// )

// export default Nav

// import React from 'react';
// import withAuth from '../src/helpers/withAuth';
// import ErrorPage from 'next/error'
// import { db, storage, functions } from "../src/firebase";
// import Router from 'next/router';
// import Nav from '../components/nav';
// import stylesheet from 'antd/dist/antd.min.css'


export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in nav class....");
        console.log(this.props.currentUserClicked);
    }

    showTeacherInOptions = () => {
        if(this.props.currentUserDoc.displayName) {
            return (
                <Menu.Item key="-1">{this.props.currentUserDoc.displayName}</Menu.Item>
            )
        } else {
            return (
                <Menu.Item key="-1">{this.props.currentUserDoc.email}</Menu.Item>
            )
        }
    }

    renderContent = () => {
        if(this.props.attendanceOptionClicked){
            return <AttendanceComponent
                    studentAttendanceSubmitClicked={this.props.studentAttendanceSubmitClicked}
                    studentAttendanceClicked={this.props.studentAttendanceClicked}
                    studentAttendanceSickClicked={this.props.studentAttendanceSickClicked}
                    studentAttendanceOtherReasonClicked={this.props.studentAttendanceOtherReasonClicked}
                    handleStudentAttendanceOtherReasonInput={this.props.handleStudentAttendanceOtherReasonInput}
                    markAllStudentAtendanceTheSame={this.props.markAllStudentAtendanceTheSame}
                    handleStudentAttendanceDateRange={this.props.handleStudentAttendanceDateRange}
                    attendanceComponent={this.props.attendanceComponent}
                   />
        } else if(this.props.studentsOptionClicked) {
            console.log("In nav.js studentsOptionClicked");
            console.log(this.props.teacherStudentComponent);
            console.log(this.props.teacherStudentComponent.currentUserDoc);
            return <TeacherStudentComponent
                    teacherStudentComponent={this.props.teacherStudentComponent}
                    teacherStudentComponentHandleTeacherStudentClick={this.props.teacherStudentComponentHandleTeacherStudentClick}
                   />
        }
    }

    render() {
        return (
            <React.Fragment>
                <Layout>
                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={(e) => this.props.handleMenuClick(e.key)}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                    <span>
                                        <UserOutlined />
                                        {this.props.currentUserClicked.displayName ?
                                        this.props.currentUserClicked.displayName
                                        :
                                        this.props.currentUserClicked.email
                                        }
                                    </span>
                                    }
                                >
                                    {
                                        this.props.currentUserDoc.teacherStudents ?
                                        this.props.currentUserDoc.teacherStudents.map(function(d, idx){
                                        return (
                                            <Menu.Item key={idx}>
                                                {
                                                    d.fullName ?
                                                    d.fullName :
                                                    d.email
                                                }
                                            </Menu.Item>
                                        )
                                        })
                                        :
                                        null
                                    }
                                    {
                                        this.props.currentUserClicked.email !== this.props.currentUserDoc.email ?
                                        this.showTeacherInOptions() :
                                        null
                                    }
                                </SubMenu>
                                <Menu.Item key="-2">
                                    <PieChartOutlined />
                                    <span>Student Attendance</span>
                                </Menu.Item>
                                <Menu.Item key="-3">
                                    <UsergroupAddOutlined />
                                    <span>Students</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px', minHeight: '100vh' }}>
                            <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: "100vh",
                            }}
                            >
                                {
                                    this.renderContent()
                                }
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </React.Fragment>
        );
    }
}
