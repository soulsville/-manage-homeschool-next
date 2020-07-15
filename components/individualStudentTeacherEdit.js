import React from 'react';
import { Form, Input, Card, Button, Avatar, Space } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
const { Meta } = Card;


export default class TeacherEditStudentComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in TeacherEditStudentComponent class....");
        console.log(this.props.individualEditStudentInformation);
        console.log(this.props.individualEditStudentInformation.data.data.displayName);

    }

    backButtonComponent = () => {
        return(
            <Button style={{ float: 'left' }}>
                Back
            </Button>
        )
    }

    updateButtonComponent = () => {
        return(
            <Button type="primary" size="large"
            style={{ float: 'right' }}
            >
                Update
            </Button>
        )
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
                         defaultValue={this.props.individualEditStudentInformation.data.data.displayName}
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
                        defaultValue={this.props.individualEditStudentInformation.data.data.displayName}
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
                    help="Please insert a valid insert">
                        <Input size="medium"
                        defaultValue={this.props.individualEditStudentInformation.data.data.email}
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
                        defaultValue={this.props.individualEditStudentInformation.data.data.email}
                        onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
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
                         defaultValue={this.props.individualEditStudentInformation.data.data.currentGradeLevel}
                         onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
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
                         defaultValue={this.props.individualEditStudentInformation.data.data.currentGradeLevel}
                         onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
                         onBlur={(event)=>this.props.onBlurhandleIndividualStudentTeacherEditGradeChange(event)}
                        />
                    </Form.Item>
                </div>
            )
        }
    }

    passwordFormItemComponent = () => {
        return(
            <div>
                New Password
                <Form.Item>
                    <Input size="medium" type="password"
                     onChange={(event)=>this.props.handleIndividualStudentTeacherEditNameChange(event)}
                    />
                </Form.Item>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Card style={{ width: "auto", display: "block" }}>
                <Meta title="Card title" avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}/>
                    <Space/>
                    <Space/>
                    <br/>
                    <Form name="student_information">
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
