import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Content } = Layout;
import { Form, List, Button, Tooltip, Input, Row, Col, Card, Avatar, Space, Switch, Alert, Spin, Typography, Icon } from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

import { LoadingOutlined } from '@ant-design/icons';


import stylesheet from 'antd/dist/antd.min.css';

import TeacherEditStudentComponent from '../components/individualStudentTeacherEdit';
import TeacherStudentAdd from '../components/teacherStudentAdd';



export default class TeacherStudentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.teacherStudentComponentHandleTeacherStudentClick = this.props.teacherStudentComponentHandleTeacherStudentClick.bind(this);
    }

    componentDidMount() {
        console.log("in teacherStudent component....");
        console.log(this.props.teacherStudentComponent.currentUserDoc);
        console.log(this.props.teacherStudentRef.data);
    }

    titleComponent = () => {
        if(this.props.teacherStudentComponent.currentUserDoc && this.props.teacherStudentRef.data && !this.props.teacherStudentComponent.individualStudentEditClicked){
            return(
                <Title level={2} style={{float: "left"}}>All Students</Title>
            )
        }
    }

    addStudentsButtonComponent = () => {
        if(this.props.teacherStudentComponent.currentUserDoc && this.props.teacherStudentRef.data && !this.props.teacherStudentComponent.individualStudentEditClicked && !this.props.teacherStudentComponent.teacherStudentComponentAddStudentsClicked){
            return(
                <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}} onClick={(e) => this.props.handleTeacherStudentComponentAddStudents(e)}>
                    Add Students
                </Button>
            )
        }
    }

    showStudentsComponent = (context) => {
        console.log("in teacherStudentComponent");
        console.log(this.props.teacherStudentRef.data);
        // check if the individualStudentEditClicked is clicked 
        if(this.props.teacherStudentComponent.currentUserDoc && this.props.teacherStudentRef.data && !this.props.teacherStudentComponent.individualStudentEditClicked && !this.props.teacherStudentComponent.teacherStudentComponentAddStudentsClicked){
            const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
            return(
                <List style={{position: "absolute"}}>
                {
                    this.props.teacherStudentRef.data.map(function(d, idx){
                        return(
                            <List.Item key={d.uid} style={{float: "left", position: "absolute"}}
                            actions={[
                                <a key="list-loadmore-more" onClick={() => context.props.teacherStudentComponentHandleTeacherStudentClick(d)}>
                                    {context.props.teacherStudentComponent.individualStudentEditLoading ?
                                        <Spin indicator={antIcon} style={{ float: 'right' }} />
                                    :
                                        <div>Edit</div>
                                    }
                                </a>
                            ]}
                            >
                                <List.Item.Meta
                                    avatar={d.photoURL ? <Avatar src={d.photoURL} /> : <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={d.displayName ? d.displayName : "No name for student"}
                                    description={d.email ? d.email : "No email set for student"}
                                />
                            </List.Item>
                        )
                    })
                }
                </List>
            )
        } else if (this.props.teacherStudentComponent.individualStudentEditClicked == true && !this.props.teacherStudentComponent.teacherStudentComponentAddStudentsClicked) {
            return <TeacherEditStudentComponent
                    teacherStudentRef={this.props.teacherStudentRef}
                    individualEditStudentInformation={this.props.teacherStudentComponent.individualEditStudentInformation}
                    teacherStudentComponent={this.props.teacherStudentComponent}
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
                   />
        } else if(this.props.teacherStudentComponent.teacherStudentComponentAddStudentsClicked === true && !this.props.teacherStudentComponent.individualStudentEditClicked) {
            return <TeacherStudentAdd 
                    handleCancelTeacherStudentAdd = {this.props.handleCancelTeacherStudentAdd}
                    handleSubmitTeacherStudentAdd = {this.props.handleSubmitTeacherStudentAdd}
                    handleTeacherStudentAddName={this.props.handleTeacherStudentAddName}
                    onBlurhandleTeacherStudentAddName={this.props.onBlurhandleTeacherStudentAddName}
                    handleTeacherStudentAddCurrentGrade={this.props.handleTeacherStudentAddCurrentGrade}
                    onBlurhandleTeacherStudentAddCurrentGrade={this.props.onBlurhandleTeacherStudentAddCurrentGrade}
                    teacherStudentComponent={this.props.teacherStudentComponent}
                    requireLoginPortalForStudent={this.props.requireLoginPortalForStudent}
                   />
        } else {
            console.log("I'm in the null...");
            return(
                null
            )
        }
    }    

    // TODO: move the list to it's own function, allow for editing students that already exists
    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {this.titleComponent()}
                    {this.addStudentsButtonComponent()}
                    <br/>
                    <br/>
                    {this.showStudentsComponent(this)}
                </Content>
            </React.Fragment>
        );
    }
}
