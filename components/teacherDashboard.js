import React from 'react';
import withAuth from '../src/helpers/withAuth';
import ErrorPage from 'next/error'
import { db, storage, functions } from "../src/firebase";
import Router from 'next/router';
import Nav from '../components/nav';
import stylesheet from 'antd/dist/antd.min.css';


export class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.authUser,
            currentUserDoc: this.props.currentUserDoc,
            currentUserClicked: this.props.currentUserDoc,
            studentClicked: false,
            attendanceOptionClicked: false,
            studentsOptionClicked: false,
            attendanceComponent: {
                clientSideValidationErrors:{
                    rangePickerAttendanceValidationError: null,
                    studentAttendanceReasonsValidationError: null,
                    noStudentSelectedValidationError: null,
                },
                studentAttendanceOtherReasonShow: false,
                studentAttendanceSickReasonChosen: false,
                studentAttedanceNotAttendingReason: null,
                allStdentAttendanceTheSame: false,
                studentAttendanceDateRangeString: null,
                notAttendingSubmitButtonLoading: false,
            },
            teacherStudentComponent: {
                currentUserDoc: this.props.currentUserDoc,
            },
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.studentAttendanceSubmitClicked = this.studentAttendanceSubmitClicked.bind(this);
        this.studentAttendanceOtherReasonClicked = this.studentAttendanceOtherReasonClicked.bind(this);
        this.studentAttendanceSickClicked = this.studentAttendanceSickClicked.bind(this);
        this.handleStudentAttendanceOtherReasonInput = this.handleStudentAttendanceOtherReasonInput.bind(this);
        this.markAllStudentAtendanceTheSame = this.markAllStudentAtendanceTheSame.bind(this);
        this.handleStudentAttendanceDateRange = this.handleStudentAttendanceDateRange.bind(this);
    }

    componentDidMount() {
        console.log("in teacher dashboard class....");
        console.log(this.state.currentUserDoc);
    }

    /* Student attendance functions */
    handleStudentAttendanceDateRange = (dates, dateStrings) => {
        console.log("in date handleStudentAttendanceDateRange");
        console.log("dateStrings: " + dateStrings);
        if(dateStrings.toString().split(",")[0]){
            this.setState(prevState => ({
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        rangePickerAttendanceValidationError: null,
                    },
                    studentAttendanceDateRangeString: dateStrings,
                },
            }));
        }
    }

    markAllStudentAtendanceTheSame = () => {
        console.log("mark all student attendacne");
        console.log(this.state.attendanceComponent.allStdentAttendanceTheSame);
        if(this.state.attendanceComponent.allStdentAttendanceTheSame){
            this.setState(prevState => ({
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    allStdentAttendanceTheSame: false,   
                },
            }));
        } else {
            this.setState(prevState => ({
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        noStudentSelectedValidationError: null,
                    },
                    allStdentAttendanceTheSame: true,
                },
            }));
        }
    }

    handleStudentAttendanceOtherReasonInput = (e) => {
        console.log("In other reason input");
        const target = e.target;
        const value = target.value;
        this.setState(prevState => ({
            attendanceComponent:{
                ...prevState.attendanceComponent,
                clientSideValidationErrors:{
                    ...prevState.clientSideValidationErrors,
                    studentAttendanceReasonsValidationError: null,
                },
                studentAttedanceNotAttendingReason: value,
            },
        }));
    }

    handleStudentNotAttendingSubmission = () => {
        const notAttendingStudent = functions.httpsCallable('notAttendingStudent');
        let studentUids = []
        if(this.state.attendanceComponent.allStdentAttendanceTheSame){
            this.state.currentUserDoc.teacherStudents.forEach(student => {
                studentUids.push(student.uid);
            });
        } else {
            studentUids.push(this.state.currentUserClicked.uid);
        }
        
        console.log("studentUids: " +  studentUids);
        notAttendingStudent({
            uid: this.state.currentUser.uid,
            reason: this.state.attendanceComponent.studentAttedanceNotAttendingReason,
            datesString: this.state.attendanceComponent.studentAttendanceDateRangeString.toString(),
            studentUids: studentUids,
        }).then(results => {
            console.log(results);
            this.setState(prevState => ({
                attendanceComponent: {
                    ...prevState.attendanceComponent,
                    notAttendingSubmitButtonLoading: false,
                }
            }));
        }).catch(err => {
            console.log(err);
            this.setState(prevState => ({
                attendanceComponent: {
                    ...prevState.attendanceComponent,
                    notAttendingSubmitButtonLoading: false,
                }
            }));
        });
    }
    
    studentAttendanceSubmitClicked = (e) => {
        e.preventDefault();
        console.log("studentClicked" + this.state.studentClicked);
        console.log("studentAttendanceSickReasonChosen" + this.state.attendanceComponent.studentAttendanceSickReasonChosen);
        console.log("studentAttedanceNotAttendingReason" + this.state.attendanceComponent.studentAttedanceNotAttendingReason);
        console.log("allStdentAttendanceTheSame" + this.state.attendanceComponent.allStdentAttendanceTheSame);
        console.log("studentAttendanceDateRangeString" + this.state.attendanceComponent.studentAttendanceDateRangeString);
        console.log("attendanceComponent: " + JSON.stringify(this.state.attendanceComponent));
        if(this.state.attendanceComponent.studentAttendanceDateRangeString == null && this.state.attendanceComponent.studentAttedanceNotAttendingReason == null){
            this.setState(prevState => ({
                attendanceComponent: {
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        rangePickerAttendanceValidationError: true,
                        studentAttendanceReasonsValidationError: true,
                    },
                },
            }));
        } else if(this.state.attendanceComponent.studentAttendanceDateRangeString == null){
            this.setState(prevState => ({
                attendanceComponent: {
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        rangePickerAttendanceValidationError: true,
                    },
                },
            }));
        } else if(this.state.attendanceComponent.studentAttedanceNotAttendingReason == null || this.state.attendanceComponent.studentAttedanceNotAttendingReason == ''){
            this.setState(prevState => ({
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        studentAttendanceReasonsValidationError: true,
                    },
                },
            }));
        } else if(this.state.studentClicked == false && this.state.attendanceComponent.allStdentAttendanceTheSame == false){
            this.setState(prevState => ({
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        noStudentSelectedValidationError: true,
                    },
                },
            }));
        } else {
            this.setState(prevState => ({ 
                attendanceComponent: {
                    ...prevState.attendanceComponent,
                    notAttendingSubmitButtonLoading: true,
                }
            }));
            this.handleStudentNotAttendingSubmission()
        }
    }

    studentAttendanceOtherReasonClicked = (e) => {
        this.setState({
            attendanceComponent: {
                studentAttendanceOtherReasonShow: true,
            }
        });
    }

    studentAttendanceSickClicked = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            attendanceComponent:{
                ...prevState.attendanceComponent,
                clientSideValidationErrors:{
                    ...prevState.clientSideValidationErrors,
                    studentAttendanceReasonsValidationError: null,
                },
                studentAttendanceSickReasonChosen: true,
                studentAttedanceNotAttendingReason: "sick",
            },
        }));
    }

    /* Student attendance functions finished */

    /* Menu click on the sidebar */
    handleMenuClick = (index) => {
        console.log('index:' + parseInt(index));
        if(parseInt(index) === -1){
            this.setState({
                currentUserClicked: this.state.currentUserDoc,
                studentClicked: false,
            });
        } else if (parseInt(index) === -2){
            console.log("Pressed student attendance");
            this.setState({
                attendanceOptionClicked: true,
            });
        } else if (parseInt(index) === -3) {
            this.setState({
                attendanceOptionClicked: false,
                studentsOptionClicked: true,
            });
        }
        else {
            let userClicked = this.state.currentUserDoc.teacherStudents[index];
            console.log("teacherStudents: " + JSON.stringify(this.state.currentUserDoc.teacherStudents[index]))
            this.setState(prevState => ({
                currentUserClicked: userClicked,
                studentClicked: true,
                attendanceComponent:{
                    ...prevState.attendanceComponent,
                    clientSideValidationErrors:{
                        ...prevState.clientSideValidationErrors,
                        noStudentSelectedValidationError: null,
                    },
                },
            }));
        }
    }

    /* Menu click on the sidebar finished*/
    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Nav 
                        currentUserDoc={this.state.currentUserDoc}
                        currentUserClicked={this.state.currentUserClicked}
                        studentClicked={this.state.studentClicked}
                        attendanceOptionClicked={this.state.attendanceOptionClicked}
                        attendanceComponent={this.state.attendanceComponent}
                        studentsOptionClicked={this.state.studentsOptionClicked}
                        teacherStudentComponent={this.state.teacherStudentComponent}
                        handleMenuClick={this.handleMenuClick}
                        studentAttendanceSubmitClicked={this.studentAttendanceSubmitClicked}
                        studentAttendanceSickClicked={this.studentAttendanceSickClicked}
                        studentAttendanceOtherReasonClicked={this.studentAttendanceOtherReasonClicked}
                        handleStudentAttendanceOtherReasonInput={this.handleStudentAttendanceOtherReasonInput}
                        markAllStudentAtendanceTheSame={this.markAllStudentAtendanceTheSame}
                        handleStudentAttendanceDateRange={this.handleStudentAttendanceDateRange}
                    />
                </div>
            </React.Fragment>
        );
    }
}

// export default withAuth(TeacherDashboard);
