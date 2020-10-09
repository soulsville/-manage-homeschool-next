import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, FormOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

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
import TeacherClass from '../components/teacherClassComponent';


export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.subMenuComponent = this.subMenuComponent.bind(this);
        this.showTeacherInOptions = this.showTeacherInOptions.bind(this);
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
                    teacherStudentRef={this.props.teacherStudentRef}
                    teacherStudentComponent={this.props.teacherStudentComponent}
                    teacherStudentComponentHandleTeacherStudentClick={this.props.teacherStudentComponentHandleTeacherStudentClick}
                    handleIndividualStudentTeacherEditNameChange={this.props.handleIndividualStudentTeacherEditNameChange}
                    onBlurhandleIndividualStudentTeacherEditNameChange={this.props.onBlurhandleIndividualStudentTeacherEditNameChange}
                    handleIndividualStudentTeacherEditEmailChange={this.props.handleIndividualStudentTeacherEditEmailChange}
                    onBlurhandleIndividualStudentTeacherEditEmailChange={this.props.onBlurhandleIndividualStudentTeacherEditEmailChange}
                    handleIndividualStudentTeacherEditGradeChange={this.props.handleIndividualStudentTeacherEditGradeChange}
                    onBlurhandleIndividualStudentTeacherEditGradeChange={this.props.onBlurhandleIndividualStudentTeacherEditGradeChange}
                    handleIndividualStudentTeacherEditPasswordChange={this.props.handleIndividualStudentTeacherEditPasswordChange}
                    onBlurhandleIndividualStudentTeacherEditPasswordChange={this.props.onBlurhandleIndividualStudentTeacherEditPasswordChange}
                    handleIndividualStudentTeacherEditImageChange={this.props.handleIndividualStudentTeacherEditImageChange}
                    handleIndividualStudentTeacherUpload={this.props.handleIndividualStudentTeacherUpload}
                    handleIndividualStudentTeacherBackClicked={this.props.handleIndividualStudentTeacherBackClicked}
                    handleTeacherStudentComponentAddStudents={this.props.handleTeacherStudentComponentAddStudents}
                    handleCancelTeacherStudentAdd = {this.props.handleCancelTeacherStudentAdd}
                    handleSubmitTeacherStudentAdd = {this.props.handleSubmitTeacherStudentAdd}
                    handleTeacherStudentAddName={this.props.handleTeacherStudentAddName}
                    onBlurhandleTeacherStudentAddName={this.props.onBlurhandleTeacherStudentAddName}
                    handleTeacherStudentAddCurrentGrade={this.props.handleTeacherStudentAddCurrentGrade}
                    onBlurhandleTeacherStudentAddCurrentGrade={this.props.onBlurhandleTeacherStudentAddCurrentGrade}
                    requireLoginPortalForStudent={this.props.requireLoginPortalForStudent}
                    handleTeacherStudentAddEmail={this.props.handleTeacherStudentAddEmail}
                    onBlurhandleTeacherStudentAddEmail={this.props.onBlurhandleTeacherStudentAddEmail}
                    handleStudentAddProfilePic={this.props.handleStudentAddProfilePic}
                    handleTeacherStudentAddPassword={this.props.handleTeacherStudentAddPassword}
                    onBlurhandleTeacherStudentAddPassword={this.props.onBlurhandleTeacherStudentAddPassword}
                   />
        } else if(this.props.classesOptionClicked) {
            return <TeacherClass
                    teacherStudentRef={this.props.teacherStudentRef}
                    teacherClassComponent={this.props.teacherClassComponent}
                    teacherClassComponentHandleTeacherStudentClick={this.props.teacherClassComponentHandleTeacherStudentClick}
                   />
        }
    }

    subMenuComponent = () => {

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
                                        this.props.teacherStudentRef.data ?
                                        this.props.teacherStudentRef.data.map(function(d, idx){
                                        return (
                                            <Menu.Item key={idx}>
                                                {
                                                    d.displayName ?
                                                    d.displayName :
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
                                <Menu.Item key="-4">
                                    <FormOutlined />
                                    <span>Classes</span>
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
