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
                // TODO: change this back to false testing really fast
                // thnk about changing the email and password if they don't match
                // the currently using one when editing student profiles
                individualStudentEditClicked: false,
                individualEditStudentInformation: null,
                individualStudentEditLoading: false,
                individualStudentTeacherEditName: null,
                individualStudentTeacherEditNameError: null,
                individualStudentTeacherEditEmail: null,
                individualStudentTeacherEditEmailError: null,
                individualStudentTeacherEditEmailPristine: true,
                individualStudentTeacherEditGrade: null,
                individualStudentTeacherEditGradeError: null,
            },
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.studentAttendanceSubmitClicked = this.studentAttendanceSubmitClicked.bind(this);
        this.studentAttendanceOtherReasonClicked = this.studentAttendanceOtherReasonClicked.bind(this);
        this.studentAttendanceSickClicked = this.studentAttendanceSickClicked.bind(this);
        this.handleStudentAttendanceOtherReasonInput = this.handleStudentAttendanceOtherReasonInput.bind(this);
        this.markAllStudentAtendanceTheSame = this.markAllStudentAtendanceTheSame.bind(this);
        this.handleStudentAttendanceDateRange = this.handleStudentAttendanceDateRange.bind(this);
        this.teacherStudentComponentHandleTeacherStudentClick = this.teacherStudentComponentHandleTeacherStudentClick.bind(this);
        this.handleIndividualStudentTeacherEditNameChange = this.handleIndividualStudentTeacherEditNameChange.bind(this);
        this.onBlurhandleIndividualStudentTeacherEditNameChange = this.onBlurhandleIndividualStudentTeacherEditNameChange.bind(this);
        this.handleIndividualStudentTeacherEditEmailChange = this.handleIndividualStudentTeacherEditEmailChange.bind(this);
        this.onBlurhandleIndividualStudentTeacherEditEmailChange = this.onBlurhandleIndividualStudentTeacherEditEmailChange.bind(this);
        this.handleIndividualStudentTeacherEditGradeChange = this.handleIndividualStudentTeacherEditGradeChange.bind(this);
        this.onBlurhandleIndividualStudentTeacherEditGradeChange = this.onBlurhandleIndividualStudentTeacherEditGradeChange.bind(this);
    }

    componentDidMount() {
        console.log("in teacher dashboard class....");
        console.log(this.state.currentUserDoc);
        console.log(this.state.teacherStudentComponent.currentUserDoc);
    }

    /* individualStudentTeacherEdit component functions */
    /* Email */
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    handleIndividualStudentTeacherEditEmailChange = (e) => {
        console.log("in handleIndividualStudentTeacherEditEmailChange");
        const target = e.target;
        const value = target.value;
        console.log("value being set for handleIndividualStudentTeacherEditEmailChange" + value);
        
        if(this.state.individualStudentTeacherEditEmailPristine) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditEmail: value,
                }
            }));
        } else {
            if(this.validateEmail(value)) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        individualStudentTeacherEditEmail: value,
                        individualStudentTeacherEditEmailError: null,
                    }
                }));
            } else {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        individualStudentTeacherEditEmail: value,
                        individualStudentTeacherEditEmailError: true,
                    }
                }));
            }
        }
    }

    onBlurhandleIndividualStudentTeacherEditEmailChange = (e) => {
        if(!this.validateEmail(this.state.teacherStudentComponent.individualStudentTeacherEditEmail)) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditEmailError: true,
                    individualStudentTeacherEditEmailPristine: false,
                }
            }));
        }
    }
    /* End Email */

    /* Grade Level */
    handleIndividualStudentTeacherEditGradeChange = (e) => {
        console.log("in handleIndividualStudentTeacherEditGradeChange");
        const target = e.target;
        const value = target.value;
        console.log("value being set for handleIndividualStudentTeacherEditGradeChange" + value);
        if(value) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditGrade: value,
                    individualStudentTeacherEditGradeError: null,
                }
            }));
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditGrade: value,
                    individualStudentTeacherEditGradeError: true,
                }
            }));
        }
    }

    onBlurhandleIndividualStudentTeacherEditGradeChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        if(value === "") {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditGrade: value,
                    individualStudentTeacherEditGradeError: true,
                }
            }));
        }
    }
    /* End Grade Level */
    
    /* Name */
    handleIndividualStudentTeacherEditNameChange = (e) => {
        console.log("in handleIndividualStudentTeacherEditNameChange");
        const target = e.target;
        const value = target.value;
        console.log("value being set for handleIndividualStudentTeacherEditNameChange" + value);
        if(value) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditName: value,
                    individualStudentTeacherEditNameError: null,
                }
            }));
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditName: value,
                    individualStudentTeacherEditNameError: "Name can't be blank",
                }
            }));
        }
    }

    onBlurhandleIndividualStudentTeacherEditNameChange = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        if(value === "") {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditName: value,
                    individualStudentTeacherEditNameError: "Name can't be blank",
                }
            }));
        }
    }
    /* End Name */

    /* individualStudentTeacherEdit component functions  end */

    /* teacherStudentComponent functions */
    teacherStudentComponentHandleTeacherStudentClick = (e) => {
        console.log("im in teacherStudentComponentHandleTeacherStudentClick..")
        console.log("studentUid: " + e.uid);
        console.log("uid: " + this.state.currentUserDoc.uid);
        this.setState(prevState => ({
            teacherStudentComponent: {
                ...prevState.teacherStudentComponent,
                individualStudentEditLoading: true
            }
        }));
        const getStudentDocumentAsTeacher = functions.httpsCallable('getStudentDocumentAsTeacher');
        getStudentDocumentAsTeacher({
            uid: this.state.currentUserDoc.uid,
            studentUid: e.uid,
        }).then(result => {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentEditClicked: true,
                    individualEditStudentInformation: result,
                    individualStudentEditLoading: false,
                }
            }));
        }).catch(err => {
            console.log(err)
        })
    }

    /* teacherStudentComponent functions end */

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
                        teacherStudentComponentHandleTeacherStudentClick={this.teacherStudentComponentHandleTeacherStudentClick}
                        handleMenuClick={this.handleMenuClick}
                        studentAttendanceSubmitClicked={this.studentAttendanceSubmitClicked}
                        studentAttendanceSickClicked={this.studentAttendanceSickClicked}
                        studentAttendanceOtherReasonClicked={this.studentAttendanceOtherReasonClicked}
                        handleStudentAttendanceOtherReasonInput={this.handleStudentAttendanceOtherReasonInput}
                        markAllStudentAtendanceTheSame={this.markAllStudentAtendanceTheSame}
                        handleStudentAttendanceDateRange={this.handleStudentAttendanceDateRange}
                        handleIndividualStudentTeacherEditNameChange={this.handleIndividualStudentTeacherEditNameChange}
                        onBlurhandleIndividualStudentTeacherEditNameChange={this.onBlurhandleIndividualStudentTeacherEditNameChange}
                        handleIndividualStudentTeacherEditEmailChange={this.handleIndividualStudentTeacherEditEmailChange}
                        onBlurhandleIndividualStudentTeacherEditEmailChange={this.handleIndividualStudentTeacherEditEmailChange}
                        handleIndividualStudentTeacherEditGradeChange={this.handleIndividualStudentTeacherEditGradeChange}
                        onBlurhandleIndividualStudentTeacherEditGradeChange={this.onBlurhandleIndividualStudentTeacherEditGradeChange}
                    />
                </div>
            </React.Fragment>
        );
    }
}

// export default withAuth(TeacherDashboard);
