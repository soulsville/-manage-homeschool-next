import React from 'react';
import { List, Avatar, Spin, Skeleton } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { LoadingOutlined } from '@ant-design/icons';




export default class IndividualTeacherStudentAssignments extends React.Component {
    constructor(props) {
        super(props);
        this.showAssignmentsComponent = this.showAssignmentsComponent.bind(this);
    }

    componentDidMount() {
        console.log("in IndividualTeacherStudentAssignments class....");
    }



    showAssignmentsComponent = () => {
        const dude = {
            data:{
                assignments:[
                    {
                        assignmentType:"homework",
                        assignmentDescription:"Read Chapter 1 (pg. 30 - 500)",
                        assignmentTurnInRequired:true,
                        assignmentDueDate:{
                            _seconds:1606161600,
                            _nanoseconds:0
                        },
                        assignmentGrade:100,
                        assignmentGradeLetter:"A",
                        assignmentURL:"SOME_URL_HERE",
                        assignmentTurnInURL:"SOME_URL_STUDENT_TURNED_IN",
                        isGraded:true,
                        id: "w7BbqcxHgWKG4Y0NTP4B",
                    }]
            }
        }
        const context = this.props;
        console.log("this.props.teacherClassComponent.individualStudentAllAssignments");
        console.log(this.props.teacherClassComponent.individualStudentAllAssignments);
        const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
        // dude.data.assignments.map(assignment => {
        //
        // })
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.teacherClassComponent.individualStudentAllAssignments.data.assignments}
                style={{position: "absolute"}}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <a key={item.uid} onClick={() => context.teacherClassComponentHandleIndividualTeacherAssignmentsClick(item)}>
                                {context.teacherClassComponent.individualStudentAssignmentsLoading ?
                                    <Spin indicator={antIcon} style={{ float: 'right' }} />
                                    :
                                    <div>Edit Assignment</div>
                                }
                            </a>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://image.freepik.com/free-vector/modern-online-schedule-vector-illustration_159144-50.jpg" />}
                            title={item.assignmentDescription}
                            description={item.assignmentType}
                        />
                    </List.Item>
                )}
            />
        )
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    {this.showAssignmentsComponent()}
                </div>
            </React.Fragment>
        );
    }
}
