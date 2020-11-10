import React from 'react';
import { List, Avatar, Spin, Skeleton } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { LoadingOutlined } from '@ant-design/icons';




export default class IndividualTeacherStudentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.showClassesComponent = this.showClassesComponent.bind(this);
    }

    componentDidMount() {
        console.log("in IndividualTeacherStudentComponent class....");
    }



    showClassesComponent = () => {
        const context = this.props;
        console.log("this.props.teacherClassComponent.individualStudentAllClasses.data.classes");
        console.log(this.props.teacherClassComponent.individualStudentAllClasses.data.classes);
        const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

        return (
            <List
            itemLayout="horizontal"
            dataSource={this.props.teacherClassComponent.individualStudentAllClasses.data.classes}
            style={{position: "absolute"}}
            renderItem={item => (
                <List.Item
                    actions={[
                        <a key={item} onClick={() => context.teacherClassComponentHandleIndividualTeacherAssignmentsClick(item)}>
                        {context.teacherClassComponent.individualStudentAssignmentsLoading ?
                            <Spin indicator={antIcon} style={{ float: 'right' }} />
                        :
                            <div>Assignments</div>
                        }
                    </a>
                    ]}
                >
                <List.Item.Meta
                    avatar={<Avatar src="https://image.freepik.com/free-vector/teacher-concept-illustration_114360-2166.jpg" />}
                    title={item}
                    description={item + " class"}
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
                    {this.showClassesComponent()}
                </div>
            </React.Fragment>
        );
    }
}
