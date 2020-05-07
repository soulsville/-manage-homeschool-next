import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { Form, TimePicker, Button, Tooltip, Input, Row, Col, Card, Avatar, Space, Switch, Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;

import { CalendarOutlined } from '@ant-design/icons';

import stylesheet from 'antd/dist/antd.min.css';

export default class AttendanceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: null,
            setDates: null,
            formItemLayout: {
                labelCol: {
                  xs: {
                    span: 24,
                  },
                  sm: {
                    span: 8,
                  },
                },
                wrapperCol: {
                  xs: {
                    span: 24,
                  },
                  sm: {
                    span: 16,
                  },
                },
            },
        }
    }

    componentDidMount() {
        console.log("in attendance component class....");
    }

    disabledDate = current => {
        if (!this.state.dates || this.state.dates.length === 0) {
          return false;
        }
        const tooLate = this.state.dates[0] && current.diff(this.state.dates[0], 'days') > 7;
        const tooEarly = this.state.dates[1] && this.state.dates[1].diff(current, 'days') > 7;
        return tooEarly || tooLate;
    };

    reasonComponent = () => {
        if(this.props.attendanceComponent.clientSideValidationErrors.studentAttendanceReasonsValidationError != null){
            if(this.props.attendanceComponent.studentAttendanceOtherReasonShow){
                return(
                    <Form.Item 
                    validateStatus="error"
                    help="Please select a reason">
                        <Input size="medium"
                            onChange={(event)=>this.props.handleStudentAttendanceOtherReasonInput(event)}
                        />
                    </Form.Item>
                )
            } else {
                return(
                    <div>
                        <Form.Item
                        validateStatus="error"
                        help="Please select a reason">
                            <Space>
                                <Button type="primary" size="large"
                                onClick={(e) => this.props.studentAttendanceSickClicked(e)}
                                >
                                    Sick
                                </Button>
                                <Button size="large"
                                onClick={(e) => this.props.studentAttendanceOtherReasonClicked(e)}
                                >
                                    Other
                                </Button>
                            </Space>
                        </Form.Item>
                    </div>
                )
            }
        } else {
            if(this.props.attendanceComponent.studentAttendanceOtherReasonShow){
                return(
                    <Form.Item>
                        <Input size="medium"
                            onChange={(event)=>this.props.handleStudentAttendanceOtherReasonInput(event)}
                        />
                    </Form.Item>
                )
            } else {
                return(
                    <div>
                        <Space>
                            <Button type="primary" size="large"
                            onClick={(e) => this.props.studentAttendanceSickClicked(e)}
                            >
                                Sick
                            </Button>
                            <Button size="large"
                            onClick={(e) => this.props.studentAttendanceOtherReasonClicked(e)}
                            >
                                Other
                            </Button>
                        </Space>
                    </div>
                )
            }
        }
    }

    switchComponent = () => {
        return(
            <Switch style={{ float: 'right' }} onChange={(e) => this.props.markAllStudentAtendanceTheSame(e)} />
        )
    }
    
    showValidationErrorAlertForNotAttendingComponent = () => {
        if(this.props.attendanceComponent.clientSideValidationErrors.noStudentSelectedValidationError == true){
            return(
                <div>
                    <Alert message="No Students selected please pick all students or a student from the sidebar" type="error" />
                </div>
            )
        }
    }

    notAttendingFormSubmitButton = () => {
        if(this.props.attendanceComponent.notAttendingSubmitButtonLoading == true){
            const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
            return(
                <Spin indicator={antIcon} style={{ float: 'right' }} />
            )
        } else {
            return(
                <Button type="primary" size="large"
                onClick={(e) => this.props.studentAttendanceSubmitClicked(e)}
                style={{ float: 'right' }}
                >
                    Submit
                </Button>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <Card title="Not Attending" style={{ width: 350 }}>
                    <Form name="time_related_controls"  >
                        {this.showValidationErrorAlertForNotAttendingComponent()}
                        Day
                        {
                            this.props.attendanceComponent.clientSideValidationErrors.rangePickerAttendanceValidationError ?
                            <Form.Item name="range-picker"
                            validateStatus="error"
                            help="Please select a date"
                            >
                                <br/>
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    onCalendarChange={(dates, dateString) => {this.props.handleStudentAttendanceDateRange(dates, dateString)}}
                                    size="large"
                                />
                            </Form.Item>
                            :
                            <Form.Item name="range-picker">
                                <br/>
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    onCalendarChange={(dates, dateString) => {this.props.handleStudentAttendanceDateRange(dates, dateString)}}
                                    size="large"
                                />
                            </Form.Item>
                        }
                        Reason
                        {this.reasonComponent()}
                        <br/>
                        For All Students
                        {this.switchComponent()}
                        <br/>
                        <br/>
                        {this.notAttendingFormSubmitButton()}
                    </Form>  
                </Card>
            </React.Fragment>
        );
    }
}
