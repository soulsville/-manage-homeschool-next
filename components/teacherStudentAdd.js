import React from 'react';
import { Modal, Button, Form, Space, Input } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';



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

    // emailComponent = () => {
    //     if(this.props.teacherStudentComponent.teacherStudentAddEmailError) {
    //         return(
    //             <div>
    //                 <p>Email</p>
    //                 <Form.Item
    //                 validateStatus="error"
    //                 help="Student Email not valid">
    //                     <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
    //                      onChange={(e) => this.props.handleTeacherStudentAddEmail(e)}
    //                      value={this.props.teacherStudentComponent.teacherStudentAddEmail}
    //                      onBlur={(e) => this.props.onBlurhandleTeacherStudentAddEmail(e)}
    //                     />
    //                 </Form.Item>
    //             </div>
    //         )
    //     } else {
    //         return(
    //             <div>
    //                 <p>Name</p>
    //                 <Form.Item>
    //                     <Input size="medium" style={{ borderWidth: "0 0 2px" }} 
    //                      onChange={(e) => this.props.handleTeacherStudentAddName(e)}
    //                      value={this.props.teacherStudentComponent.teacherStudentAddName}
    //                      onBlur={(e) => this.props.onBlurhandleTeacherStudentAddName(e)}
    //                     />
    //                 </Form.Item>
    //             </div>
    //         )
    //     }
    // }

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

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Modal
                    title="Add Student"
                    visible={this.props.teacherStudentComponent.teacherStudentAddModalVisible}
                    onCancel={this.props.handleCancelTeacherStudentAdd}
                    onOk={this.props.handleSubmitTeacherStudentAdd}
                    footer={[
                        <Button key="back" onClick={(e) => this.props.handleCancelTeacherStudentAdd(e)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={(e) => this.props.handleSubmitTeacherStudentAdd(e)}>
                          Submit
                        </Button>,
                    ]}
                    >
                        <Form name="student_information">
                            <Space/>
                            {this.nameComponent()}
                            {this.currentGradeComponent()}
                        </Form>  
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}
