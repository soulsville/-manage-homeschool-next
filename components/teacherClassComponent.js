import React from 'react';
import {Layout, Button, Typography, Space, Input, Switch, Avatar, Upload, Alert, Modal, Form, Select} from 'antd';
const { Option } = Select;
const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;


import stylesheet from 'antd/dist/antd.min.css';
import { FolderAddTwoTone } from '@ant-design/icons';

import TeacherClassShowStudentsComponent from '../components/teacherClassShowStudentsComponent.js';
import IndividualTeacherStudentComponent from '../components/individualTeacherStudentComponent.js';
import IndividualTeacherStudentAssignments from "./individualTeacherStudentAssignments";


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
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false){
            return(
                <Title level={2} style={{float: "left"}}>Pick a class for Assignments</Title>
            )
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false){
            return(
                <Title level={2} style={{float: "left"}}>Pick a student for classes</Title>
            )
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === true){
            return(
                <Title level={2} style={{float: "left"}}>Pick an assignment</Title>
            )
        }
    }

    adjustStudentsGradeBookButton = () => {
        let context = this;
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false){
            return(
                <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                    Add Classes
                </Button>
            )
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false){
            if(this.props.teacherClassComponent.handleGradebookSettingModalShow){
                return(
                    <div>
                        <Modal
                            title="Adjust Gradebook"
                            visible="true"
                            onCancel={this.props.handleGradeBookSettingsBack}
                            onOk={this.props.handleGradeBookSettingsSubmit}
                            footer={[
                                <Button key="back" onClick={(e) => this.props.handleGradeBookSettingsBack(e)}>
                                    Return
                                </Button>,
                                <Button key="submit" type="primary" loading={this.props.loadingModal} onClick={(e) => this.props.handleGradeBookSettingsSubmit(e)}>
                                    Submit
                                </Button>,
                            ]}
                        >
                            <Form name="gradebook_information">
                                <p>Enter Grading Settings</p>
                                <Select defaultValue="manual" style={{ width: 120 }} onChange={this.props.handleGradeBookSettingsChange}>
                                    <Option value="percentages">Percentages</Option>
                                    <Option value="points_based">Points</Option>
                                    <Option value="manual">Manual</Option>
                                </Select>
                            </Form>
                        </Modal>
                    </div>
                )
            } else {
                return(
                    <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}} onClick={this.props.handleGradebookSettingClick}>
                        Gradebook Settings
                    </Button>
                )
            }
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === true){
            return(
                <div>
                    <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                        Add Assignment
                    </Button>
                    <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                        Grades for {this.props.teacherClassComponent.individualStudentSpecificClassSelected}
                    </Button>
                </div>
            )
        }
    }

    showStudentsComponent = () => {
        if(this.props.teacherClassComponent.individualStudentClassesClicked === true && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false) {
            return <IndividualTeacherStudentComponent
                    teacherClassComponent={this.props.teacherClassComponent}
                    teacherClassComponentHandleIndividualTeacherAssignmentsClick={this.props.teacherClassComponentHandleIndividualTeacherAssignmentsClick}
                    />
        } else  if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === false) {
            return <TeacherClassShowStudentsComponent
                    teacherClassComponent={this.props.teacherClassComponent}
                    teacherClassComponentHandleTeacherStudentClick={this.props.teacherClassComponentHandleTeacherStudentClick}
                    teacherStudentRef={this.props.teacherStudentRef}
                    />
        } else if(this.props.teacherClassComponent.individualStudentClassesClicked === false && this.props.teacherClassComponent.individualStudentAssignmentsClicked === true){
            return <IndividualTeacherStudentAssignments
                    teacherClassComponent={this.props.teacherClassComponent}
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
