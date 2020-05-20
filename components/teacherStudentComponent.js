import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Content } = Layout;
import { Form, List, Button, Tooltip, Input, Row, Col, Card, Avatar, Space, Switch, Alert, Spin, Typography, Icon } from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;


import { CalendarOutlined } from '@ant-design/icons';

import stylesheet from 'antd/dist/antd.min.css';

export default class TeacherStudentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.teacherStudentComponentHandleTeacherStudentClick = this.props.teacherStudentComponentHandleTeacherStudentClick.bind(this);
    }

    componentDidMount() {
        console.log("in teacherStudent component....");
        console.log(this.props.teacherStudentComponent.currentUserDoc);
    }

    titleComponent = () => {
        return(
            <Title level={2} style={{float: "left"}}>All Students</Title>
        )
    }

    addStudentsButtonComponent = () => {
        return(
            <Button type="primary" icon={<FolderAddTwoTone />} size="default" style={{marginLeft: 40}}>
                Add Students
            </Button>
        )
    }

    showStudentsComponent = (context) => {
        console.log("in teacherStudentComponent");
        console.log(this.props.teacherStudentComponent.currentUserDoc);
        if(this.props.teacherStudentComponent.currentUserDoc && this.props.teacherStudentComponent.currentUserDoc.teacherStudents){
            return(
                <List style={{position: "absolute"}}>
                {
                    this.props.teacherStudentComponent.currentUserDoc.teacherStudents.map(function(d, idx){
                        return(
                            <List.Item key={d.uid} style={{float: "left", position: "absolute"}}
                            actions={[
                                <a key="list-loadmore-more" onClick={() => context.props.teacherStudentComponentHandleTeacherStudentClick(d)}>Edit</a>
                            ]}
                            >
                                <List.Item.Meta
                                    avatar={d.photoUrl ? <Avatar src={d.photoUrl} /> : <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={d.displayName ? d.displayName : "No name for student"}
                                    description={d.email ? d.email : "No email set for student"}
                                />
                            </List.Item>
                        )
                    })
                }
                </List>
            )
        } else {
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
