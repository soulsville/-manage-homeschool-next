import React from 'react';
import { Modal, Button, Form, Space, Input, Switch, Avatar, Upload, Alert } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';



export default class TeacherStudentAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in teacherStudentAdd class....");
    }

    nameComponent = () => {
        if(this.props.teacherStudentComponent.teacherStudentAddNameError) {
            return(
                <div>
                    <p>Name</p>
                    <Form.Item
                    validateStatus="error"
                    help="Student Name can't be empty">
                        <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                         onChange={(e) => this.props.handleTeacherStudentAddName(e)}
                         value={this.props.teacherStudentComponent.teacherStudentAddName}
                         onBlur={(e) => this.props.onBlurhandleTeacherStudentAddName(e)}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    <p>Name</p>
                    <Form.Item>
                        <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                         onChange={(e) => this.props.handleTeacherStudentAddName(e)}
                         value={this.props.teacherStudentComponent.teacherStudentAddName}
                         onBlur={(e) => this.props.onBlurhandleTeacherStudentAddName(e)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    emailComponent = () => {
        console.log("this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired");
        console.log(this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired);
        if(this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired === true) {
            if(this.props.teacherStudentComponent.teacherStudentAddEmailError) {
                return(
                    <div>
                        <p>Email</p>
                        <Form.Item
                        validateStatus="error"
                        help="Email is invalid">
                            <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                             onChange={(e) => this.props.handleTeacherStudentAddEmail(e)}
                             value={this.props.teacherStudentComponent.teacherStudentAddEmail}
                             onBlur={(e) => this.props.onBlurhandleTeacherStudentAddEmail(e)}
                            />
                        </Form.Item>
                    </div>
                )
            } else {
                return(
                    <div>
                        <p>Email</p>
                        <Form.Item>
                            <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                             onChange={(e) => this.props.handleTeacherStudentAddEmail(e)}
                             value={this.props.teacherStudentComponent.teacherStudentAddEmail}
                             onBlur={(e) => this.props.onBlurhandleTeacherStudentAddEmail(e)}
                            />
                        </Form.Item>
                    </div>
                )
            }
        } else {
            return(
                null
            )
        }
    }

    passwordComponent = () => {
        console.log("this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired");
        console.log(this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired);
        if(this.props.teacherStudentComponent.teacherStudentAddStudentLoginRequired === true) {
            if(this.props.teacherStudentComponent.teacherStudentAddPasswordError) {
                return(
                    <div>
                        <p>Password</p>
                        <Form.Item
                        validateStatus="error"
                        help="Password is invalid please have it longer than 6 characters">
                            <Input.Password size="medium" style={{ borderWidth: "0 0 2px" }} 
                                onChange={(e) => this.props.handleTeacherStudentAddPassword(e)}
                                value={this.props.teacherStudentComponent.teacherStudentAddPassword}
                                onBlur={(e) => this.props.onBlurhandleTeacherStudentAddPassword(e)}
                            />
                        </Form.Item>
                    </div>
                )
            } else {
                return(
                    <div>
                        <p>Password</p>
                        <Form.Item>
                            <Input.Password size="medium" style={{ borderWidth: "0 0 2px" }} 
                                onChange={(e) => this.props.handleTeacherStudentAddPassword(e)}
                                value={this.props.teacherStudentComponent.teacherStudentAddPassword}
                                onBlur={(e) => this.props.onBlurhandleTeacherStudentAddPassword(e)}
                            />
                        </Form.Item>
                    </div>
                )
            }
        } else {
            return(
                null
            )
        }
    }
    
    currentGradeComponent = () => {
        if(this.props.teacherStudentComponent.teacherStudentAddCurrentGradeError) {
            return(
                <div>
                    <p>Current Grade</p>
                    <Form.Item
                    validateStatus="error"
                    help="Grade can't be empty">
                        <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                         onChange={(e) => this.props.handleTeacherStudentAddCurrentGrade(e)}
                         value={this.props.teacherStudentComponent.teacherStudentAddCurrentGrade}
                         onBlur={(e) => this.props.onBlurhandleTeacherStudentAddCurrentGrade(e)}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    <p>Current Grade</p>
                    <Form.Item>
                        <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
                         onChange={(e) => this.props.handleTeacherStudentAddCurrentGrade(e)}
                         value={this.props.teacherStudentComponent.teacherStudentAddCurrentGrade}
                         onBlur={(e) => this.props.onBlurhandleTeacherStudentAddCurrentGrade(e)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    showRequireLoginToggleComponent = () => {
        return(
            <Switch style={{ float: 'right' }} onChange={(e) => this.props.requireLoginPortalForStudent(e)} />
        )
    }

    uploadAvatarComponent = () => {
        return(
            <Upload><Button size="small" style={{border: "none"}}><Avatar icon={<UserOutlined />}/><UploadOutlined /></Button></Upload>
        )
    }

    addBackendError = () => {
        if(this.props.teacherStudentComponent.handleSubmitTeacherStudentAddBackendError == true){
            return(
                <div>
                    <Alert message="Something went wrong on our end" type="error" />
                </div>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Modal
                    title={<div style={{display: "inline"}}><Upload customRequest={this.props.handleStudentAddProfilePic}><Button size="small" style={{border: "none"}}><Avatar icon={<UserOutlined />}/><UploadOutlined /></Button><p style={{fontWeight: "bold", whiteSpace: "nowrap", display: "inline"}}>Add Students</p></Upload></div>}
                    visible={this.props.teacherStudentComponent.teacherStudentAddModalVisible}
                    onCancel={this.props.handleCancelTeacherStudentAdd}
                    onOk={this.props.handleSubmitTeacherStudentAdd}
                    footer={[
                        <Button key="back" onClick={(e) => this.props.handleCancelTeacherStudentAdd(e)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.props.teacherStudentComponent.teacherStudentAddSubmitLoading} onClick={(e) => this.props.handleSubmitTeacherStudentAdd(e)}>
                          Submit
                        </Button>,
                    ]}
                    >
                        <Form name="student_information">
                            {this.addBackendError()}
                            <Space/>
                            <Space/>
                            {this.nameComponent()}
                            {this.currentGradeComponent()}
                            {this.emailComponent()}
                            {this.passwordComponent()}
                            Enable Student Portal
                            {this.showRequireLoginToggleComponent()}
                        </Form>  
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}
