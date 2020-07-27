import React from 'react';
import { Form, Input, Card, Button, Avatar, Space, Upload, Alert, Spin} from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
const { Meta } = Card;
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';



export default class TeacherEditStudentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in TeacherEditStudentComponent class....");
        console.log(this.props.individualEditStudentInformation);
        console.log(this.props.individualEditStudentInformation.displayName);
    }

    nameFormItemComponent = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditNameError) {
            return(
                <div>
                    Name
                    <Form.Item
                    validateStatus="error"
                    help="Student Name can't be empty">
                        <Input size="medium"
                         defaultValue={this.props.individualEditStudentInformation.displayName}
                         onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
                         onBlur={(event) => this.props.onBlurhandleIndividualStudentTeacherEditNameChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    Name
                    <Form.Item>
                        <Input size="medium"
                        defaultValue={this.props.individualEditStudentInformation.displayName}
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
                        onBlur={(event)=> this.props.onBlurhandleIndividualStudentTeacherEditNameChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    emailFormItemComponent = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditEmailError) {
            return(
                <div>
                    Email
                    <Form.Item
                    validateStatus="error"
                    help="Please insert a valid Email">
                        <Input size="medium"
                        defaultValue={this.props.individualEditStudentInformation.email}
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditEmailChange(event)}
                        onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditEmailChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    Email
                    <Form.Item>
                        <Input size="medium"
                        defaultValue={this.props.individualEditStudentInformation.email}
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditEmailChange(event)}
                        onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditEmailChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    gradeFormItemComponent = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditGradeError) {
            return(
                <div>
                    Current Grade
                    <Form.Item
                    validateStatus="error"
                    help="Current grade can't be empty">
                        <Input size="medium"
                         defaultValue={this.props.individualEditStudentInformation.currentGradeLevel}
                         onChange={(event)=>this.props.handleIndividualStudentTeacherEditGradeChange(event)}
                         onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditGradeChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    Current Grade
                    <Form.Item>
                        <Input size="medium"
                         defaultValue={this.props.individualEditStudentInformation.currentGradeLevel}
                         onChange={(event)=>this.props.handleIndividualStudentTeacherEditGradeChange(event)}
                         onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditGradeChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    passwordFormItemComponent = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditPasswordError) {
            return(
                <div>
                    New Password
                    <Form.Item
                    validateStatus="error"
                    help="Password needs to be at least 6 characters">
                        <Input size="medium" type="password"
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditPasswordChange(event)}
                        onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditPasswordChange(event)}
                        value={this.props.teacherStudentComponent.individualStudentTeacherEditPassword}
                        />
                    </Form.Item>
                </div>
            )
        } else {
            return(
                <div>
                    New Password
                    <Form.Item>
                        <Input size="medium" type="password"
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditPasswordChange(event)}
                        onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditPasswordChange(event)}
                        value={this.props.teacherStudentComponent.individualStudentTeacherEditPassword}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    backButtonComponent = () => {
        return(
            <Button style={{ float: 'left' }} onClick={(e) => this.props.handleIndividualStudentTeacherBackClicked(e)}>
                Back
            </Button>
        )
    }

    updateButtonComponent = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditUpdateButtonLoading){
            const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
            return(
                <Spin indicator={antIcon} style={{ float: 'right' }} />
            )
        } else {
            return(
                <Button type="primary" size="large"
                style={{ float: 'right' }}
                onClick={(e) => this.props.handleIndividualStudentTeacherUpload(e)}
                >
                    Update
                </Button>
            )
        }
    }

    updateButtonError = () => {
        if(this.props.teacherStudentComponent.individualStudentTeacherEditUpdateButtonError){
            return(
                <div>
                    <Space size="middle"/>
                    <Alert message="No changes detected" type="error" />
                </div>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Card style={{ width: "auto", display: "block" }}>
                <Meta 
                 title={this.props.individualEditStudentInformation.displayName ? 
                        this.props.individualEditStudentInformation.displayName :
                        this.props.individualEditStudentInformation.email
                        }
                 avatar={this.props.individualEditStudentInformation.photoURL ?
                        <Upload customRequest={this.props.handleIndividualStudentTeacherEditImageChange}><Button size="small" style={{border: "none"}}><Avatar src={this.props.individualEditStudentInformation.photoURL}/><UploadOutlined /></Button></Upload> :
                        <Upload customRequest={this.props.handleIndividualStudentTeacherEditImageChange}><Button size="small" style={{border: "none"}}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/><UploadOutlined /></Button></Upload>
                        }
                />
                    <Space/>
                    <Space/>
                    <br/>
                    <Form name="student_information">
                        <Space/>
                        {this.updateButtonError()}
                        {this.nameFormItemComponent()}
                        {this.emailFormItemComponent()}
                        {this.gradeFormItemComponent()}
                        {this.passwordFormItemComponent()}

                        {this.updateButtonComponent()}
                        {this.backButtonComponent()}
                    </Form>  
                </Card>
            </React.Fragment>
        );
    }
}
