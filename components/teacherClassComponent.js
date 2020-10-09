import React from 'react';
import { Layout, Button, Typography, Space, Input, Switch, Avatar, Upload, Alert } from 'antd';
const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;


import stylesheet from 'antd/dist/antd.min.css';
import { FolderAddTwoTone } from '@ant-design/icons';

import TeacherClassShowStudentsComponent from '../components/teacherClassShowStudentsComponent.js';
import IndividualTeacherStudentComponent from '../components/individualTeacherStudentComponent.js';


// Setup classes with 3 different options
// 1) Manually enter grades
// 2) Make it a percentage based
// 3) Make it a cumulative based
// So have a way to set that up in gradebook settings
// And calculate those percentages based on that
export default class TeacherClass extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in TeacherClass class....");
    }

    titleComponent = () => {
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true){
            return(
                <Title level={2} style={{float: "left"}}>Pick a class for Assignments</Title>
            )
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false){
            return(
                <Title level={2} style={{float: "left"}}>Pick a student for classes</Title>
            )
        }
    }

    adjustStudentsGradeBookButton = () => {
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true){
            return(
                <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                    Add Classes
                </Button>
            )
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false){
            return(
                <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                    Gradebook Settings
                </Button>
            )
        }
    }

    showStudentsComponent = () => {
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true) {
            return <IndividualTeacherStudentComponent
                    teacherClassComponent={this.props.teacherClassComponent}
                    />
        } else  if(this.props.teacherClassComponent.individualStudentClassesClicked === false) {
            return <TeacherClassShowStudentsComponent
                    teacherClassComponent={this.props.teacherClassComponent}
                    teacherClassComponentHandleTeacherStudentClick={this.props.teacherClassComponentHandleTeacherStudentClick}
                    teacherStudentRef={this.props.teacherStudentRef}
                    />
        }
    }

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
                    {this.adjustStudentsGradeBookButton()}
                    <br/>
                    <br/>
                    {this.showStudentsComponent(this)}
                </Content>
            </React.Fragment>
        );
    }
}
