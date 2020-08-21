import React from 'react';
import { List, Avatar, Spin, Skeleton } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { LoadingOutlined } from '@ant-design/icons';




export default class TeacherStudentShowStudents extends React.Component {
    constructor(props) {
        super(props);
        this.showStudentsComponent = this.showStudentsComponent.bind(this);
    }

    componentDidMount() {
        console.log("in TeacherStudentShowStudents class....");
    }



    showStudentsComponent = () => {
        const context = this.props;
        console.log("this.props.teacherStudentRef");
        console.log(this.props.teacherStudentRef);
        const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

        return (
            <List
            itemLayout="horizontal"
            dataSource={this.props.teacherStudentRef.data}
            style={{position: "absolute"}}
            renderItem={item => (
                <List.Item
                    actions={[
                        <a key={item.uid} onClick={() => context.teacherStudentComponentHandleTeacherStudentClick(item)}>
                        {context.teacherStudentComponent.individualStudentEditLoading ?
                            <Spin indicator={antIcon} style={{ float: 'right' }} />
                        :
                            <div>Edit</div>
                        }
                    </a>
                    ]}
                >
                <List.Item.Meta
                    avatar={item.photoURL ? <Avatar src={item.photoURL} /> : <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.displayName ? item.displayName : "No name for student"}
                    description={item.email ? item.email : "No email set for student"}
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
                    {this.showStudentsComponent()}
                </div>
            </React.Fragment>
        );
    }
}
