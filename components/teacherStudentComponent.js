import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Content } = Layout;
import { Form, List, Button, Tooltip, Input, Row, Col, Card, Avatar, Space, Switch, Alert, Spin, Typography } from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;


import { CalendarOutlined } from '@ant-design/icons';

import stylesheet from 'antd/dist/antd.min.css';

export default class TeacherStudentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log("in teacherStudent component....");
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
                    <List>
                    {
                        this.props.teacherStudentComponent.currentUserDoc ?
                        this.props.teacherStudentComponent.currentUserDoc.teacherStudents.map(function(d, idx){
                            return (
                                <List.Item key={idx}>
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">Yup</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                    {d.email}
                                </List.Item>
                            )
                        })
                        :
                        null
                    }
                    </List>
                </Content>
            </React.Fragment>
        );
    }
}
