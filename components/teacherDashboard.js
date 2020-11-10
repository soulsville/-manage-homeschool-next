import React from 'react';
import withAuth from '../src/helpers/withAuth';
import ErrorPage from 'next/error'
import { db, storage, functions, firebase } from "../src/firebase";
import Router from 'next/router';
import Nav from '../components/nav';
import stylesheet from 'antd/dist/antd.min.css';


export class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: this.props.authUser,
            currentUserDoc: this.props.currentUserDoc,
            currentUserClicked: this.props.currentUserDoc,
            studentClicked: false,
            attendanceOptionClicked: false,
            studentsOptionClicked: false,
            classesOptionClicked: false,
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
                teacherStudentComponentAddStudentsClicked: false,
                individualStudentEditClicked: false,
                individualEditStudentInformation: null,
                individualStudentEditLoading: false,
                individualStudentTeacherEditName: null,
                individualStudentTeacherEditNameError: null,
                individualStudentTeacherEditEmail: "",
                individualStudentTeacherEditEmailError: null,
                individualStudentTeacherEditEmailPristine: true,
                individualStudentTeacherEditGrade: null,
                individualStudentTeacherEditGradeError: null,
                individualStudentTeacherEditPassword: "",
                individualStudentTeacherEditPasswordError: null,
                individualStudentTeacherEditPasswordPristine: true,
                individualStudentTeacherProfilePicFile: null,
                individualStudentTeacherEditUpdateButtonError: null,
                individualStudentTeacherEditUpdateButtonLoading: false,
                teacherStudentAddModalVisible: true,
                teacherStudentAddName: "",
                teacherStudentAddNameError: false,
                teacherStudentAddEmail: "",
                teacherStudentAddEmailError: null,
                handleTeacherStudentAddEmailIsPristine: true,
                teacherStudentAddPassword: "",
                handleTeacherStudentAddPasswordIsPristine: true,
                teacherStudentAddPasswordError: null,
                teacherStudentAddPhotoURL: "",
                teacherStudentAddCurrentGrade: "",
                teacherStudentAddCurrentGradeError: false,
                teacherStudentAddStudentLoginRequired: false,
                teacherStudentAddSubmitLoading: false,
                teacherStudentAddSubmitBackendError: false,
                handleSubmitTeacherStudentAddBackendError: false,
            },
            teacherClassComponent: {
                individualStudentEditLoading: false,
                individualStudentAllClasses: null,
                individualStudentClassesClicked: false,
                individualStudentAssignmentsLoading: false,
                individualStudentClickedInfo: null,
                individualStudentAllAssignments: null,
                individualStudentAssignmentsClicked: false,
                individualStudentSpecificClassSelected: null,
                handleGradebookSettingModalShow: false,
                setGradeBookSettings: false,
                gradeBookSettingsValue: null,
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
        this.handleIndividualStudentTeacherEditPasswordChange = this.handleIndividualStudentTeacherEditPasswordChange.bind(this);
        this.onBlurhandleIndividualStudentTeacherEditPasswordChange = this.onBlurhandleIndividualStudentTeacherEditPasswordChange.bind(this);
        this.handleIndividualStudentTeacherEditImageChange = this.handleIndividualStudentTeacherEditImageChange.bind(this);
        this.handleIndividualStudentTeacherUpload = this.handleIndividualStudentTeacherUpload.bind(this);
        this.handleIndividualStudentTeacherBackClicked = this.handleIndividualStudentTeacherBackClicked.bind(this);
        this.handleTeacherStudentComponentAddStudents = this.handleTeacherStudentComponentAddStudents.bind(this);
        this.handleCancelTeacherStudentAdd = this.handleCancelTeacherStudentAdd.bind(this);
        this.handleSubmitTeacherStudentAdd = this.handleSubmitTeacherStudentAdd.bind(this);
        this.handleTeacherStudentAddName = this.handleTeacherStudentAddName.bind(this);
        this.onBlurhandleTeacherStudentAddName = this.onBlurhandleTeacherStudentAddName.bind(this);
        this.handleTeacherStudentAddCurrentGrade = this.handleTeacherStudentAddCurrentGrade.bind(this);
        this.onBlurhandleTeacherStudentAddCurrentGrade = this.onBlurhandleTeacherStudentAddCurrentGrade.bind(this);
        this.requireLoginPortalForStudent = this.requireLoginPortalForStudent.bind(this);
        this.handleTeacherStudentAddEmail = this.handleTeacherStudentAddEmail.bind(this);
        this.onBlurhandleTeacherStudentAddEmail = this.onBlurhandleTeacherStudentAddEmail.bind(this);
        this.handleTeacherStudentAddPassword = this.handleTeacherStudentAddPassword.bind(this);
        this.onBlurhandleTeacherStudentAddPassword = this.onBlurhandleTeacherStudentAddPassword.bind(this);
        this.handleStudentAddProfilePic = this.handleStudentAddProfilePic.bind(this);
        this.teacherClassComponentHandleTeacherStudentClick = this.teacherClassComponentHandleTeacherStudentClick.bind(this);
        this.teacherClassComponentHandleIndividualTeacherAssignmentsClick = this.teacherClassComponentHandleIndividualTeacherAssignmentsClick.bind(this);
        this.handleGradebookSettingClick = this.handleGradebookSettingClick.bind(this);
        this.handleGradeBookSettingsChange = this.handleGradeBookSettingsChange.bind(this);
        this.handleGradeBookSettingsBack = this.handleGradeBookSettingsBack.bind(this);
        this.handleGradeBookSettingsSubmit = this.handleGradeBookSettingsSubmit.bind(this);
    }

    componentDidMount() {
        console.log("in teacher dashboard class....");
        console.log(this.state.currentUserDoc);
        console.log(this.state.teacherStudentComponent.currentUserDoc);
        console.log("in teacher dashboard class teacherStudentRef....");
        console.log(this.props.teacherStudentRef.data);

    }

    /* teacherClassComponent */
    // classes -> get all the classes for particular student (have a way to add more classes, etc here) -> get all assignments for this class 
    teacherClassComponentHandleTeacherStudentClick = (e) => {
        console.log("in teacherClassComponentHandleTeacherStudentClick..");
        console.log(e);
        console.log("studentUid: " + e.uid);
        console.log("studentUid: " + e.currentGradeLevel);
        this.setState(prevState => ({
            teacherClassComponent: {
                ...prevState.teacherClassComponent,
                individualStudentEditLoading: true,
            }
        }));
        // get classes of this particular user
        const getStudentClassesCollectionAsTeacher = functions.httpsCallable('getStudentClassesCollectionAsTeacher');
        getStudentClassesCollectionAsTeacher({
            uid: this.state.currentUserDoc.uid,
            currentGradeLevel: e.currentGradeLevel,
            studentUid: e.uid,
        }).then(result => {
            console.log('result: ' + JSON.stringify(result));
            this.setState(prevState => ({
                teacherClassComponent: {
                    ...prevState.teacherClassComponent,
                    individualStudentEditLoading: false,
                    individualStudentAllClasses: result,
                    individualStudentClassesClicked: true,
                    individualStudentClickedInfo: e,
                }
            }));
        });
    }
    teacherClassComponentHandleIndividualTeacherAssignmentsClick = (e) => {
        // TODO: Get all assignments under this particular class
        console.log("in teacherClassComponentHandleIndividualTeacherAssignmentsClick");
        console.log(e);
        this.setState(prevState => ({
            teacherClassComponent: {
                ...prevState.teacherClassComponent,
                individualStudentAssignmentsLoading: true,
            }
        }));
        // get classes of this particular user
        const getStudentAssignmentsInParticularClassAsTeacher = functions.httpsCallable('getStudentAssignmentsInParticularClassAsTeacher');
        getStudentAssignmentsInParticularClassAsTeacher({
            uid: this.state.currentUserDoc.uid,
            currentGradeLevel: this.state.teacherClassComponent.individualStudentClickedInfo.currentGradeLevel,
            studentUid: this.state.teacherClassComponent.individualStudentClickedInfo.uid,
            studentClass: e,
        }).then(result => {
            console.log('result: ' + JSON.stringify(result));
            this.setState(prevState => ({
                teacherClassComponent: {
                    ...prevState.teacherClassComponent,
                    individualStudentAssignmentsLoading: false,
                    individualStudentAllAssignments: result,
                    individualStudentClassesClicked: false,
                    individualStudentAssignmentsClicked: true,
                    individualStudentSpecificClassSelected: e,
                }
            }));
        });
        // const updateStudentEmailPasswordAsTeacher = functions.httpsCallable('updateStudentEmailPasswordAsTeacher');
        // updateStudentEmailPasswordAsTeacher({
        //     uid: this.state.currentUserDoc.uid,
        //     studentUid: ,
        //     requireStudentEmailUpdate: requireStudentEmailUpdate,
        //     requireStudentPasswordUpdate: requireStudentPasswordUpdate,
        //     email: email,
        //     password: this.state.teacherStudentComponent.individualStudentTeacherEditPassword,
        // }).then(result => {
        //     console.log('update sucessful for email or password as teacher' + result);
        // }).catch(err => {
        //     console.log(err)
        // })
    }
    handleGradebookSettingClick = (e) => {
        console.log("in handleGradebookSettingClick");
        this.setState(prevState => ({
            teacherClassComponent: {
                ...prevState.teacherClassComponent,
                handleGradebookSettingModalShow: true,
            }
        }));
    }

    handleGradeBookSettingsChange = (e) => {
        console.log('in handleGradeBookSettingsChange');
        console.log(e);
        this.setState(prevState => ({
            teacherClassComponent: {
                ...prevState.teacherClassComponent,
                setGradeBookSettings: true,
                gradeBookSettingsValue: e,
            }
        }));
    }

    handleGradeBookSettingsBack = (e) => {
        console.log('in handleGradeBookSettingsBack');
        this.setState(prevState => ({
            teacherClassComponent: {
                ...prevState.teacherClassComponent,
                handleGradebookSettingModalShow: false,
                setGradeBookSettings: false,
                gradeBookSettingsValue: null,
            }
        }));
    }

    handleGradeBookSettingsSubmit = (e) => {
        console.log("in handleGradeBookSettingsSubmit");
        console.log("handle submission of gradeBookSettings now");
    }
    /* End */
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
        console.log("this.state.teacherStudentComponent.individualStudentTeacherEditEmailPristine " + this.state.teacherStudentComponent.individualStudentTeacherEditEmailPristine);
        if(this.state.teacherStudentComponent.individualStudentTeacherEditEmailPristine) {
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
        console.log("in onBlurhandleIndividualStudentTeacherEditEmailChange ");
        console.log("this.state.teacherStudentComponent.individualStudentTeacherEditEmail " + this.state.teacherStudentComponent.individualStudentTeacherEditEmail);
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
    
    /* Password */
    handleIndividualStudentTeacherEditPasswordChange = (e) => {
        console.log("in handleIndividualStudentTeacherPasswordChange");
        const target = e.target;
        const value = target.value;
        console.log("value being set for handleIndividualStudentTeacherPasswordChange" + value);
        console.log("this.state.individualStudentTeacherEditPasswordPristine: " + this.state.individualStudentTeacherEditPasswordPristine);
        if(this.state.teacherStudentComponent.individualStudentTeacherEditPasswordPristine) {
            console.log("in conditional for individualStudentTeacherEditPasswordPristine");
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditPassword: value,
                }
            }));
        } else {
            if(value.length >= 6) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        individualStudentTeacherEditPassword: value,
                        individualStudentTeacherEditPasswordError: null,
                    }
                }));
            } else {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        individualStudentTeacherEditPassword: value,
                        individualStudentTeacherEditPasswordError: true,
                    }
                }));
            }
        }
    }

    onBlurhandleIndividualStudentTeacherEditPasswordChange = (e) => {
        console.log("I'm in this biatch..");
        if(this.state.teacherStudentComponent.individualStudentTeacherEditPassword.length < 6) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditPasswordError: true,
                    individualStudentTeacherEditPasswordPristine: false,
                }
            }));
        }
    }

    /* End Password */
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

    /* Image */
    handleIndividualStudentTeacherEditImageChange = ({ onError, onSuccess, file }) => {
        console.log("in handleIndividualStudentTeacherEditImageChange");
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = storage.ref();
        const imageName = `${this.state.teacherStudentComponent.individualEditStudentInformation.uid}/photoURL/${file.name}`
        const imgFile = storageRef.child(`images/${imageName}.png`);
        try {
            const uploadTask = imgFile.put(file, metadata);
            const context = this;
            uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, function(error) {
                // Handle unsuccessful uploads
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                  context.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            individualStudentTeacherProfilePicFile: downloadURL,
                        }
                    }));
                });
            });
            // onSuccess(null, image);
        } catch(e) {
            setTimeout(() => {
                onError("error");
            }, 0);
        }
        
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    /* End Image */

    /* Update Button */ 
    handleIndividualStudentTeacherUpload = (e) => {
        e.preventDefault();
        // TODO: add loading after the if condition as well if all of them are in the original state value and 
        // null than don't do anything and pop up an error that nothing changed
        // if not all of them are with the original value than that means that something changed and send it to backend to figure out
        // what changed and if it requires creating a new password for a user or changing an email for user, or a new pic, etc.
        // if(null(false)){}else =>
        console.log("this.state.teacherStudentComponent.individualStudentTeacherProfilePicFile: " + this.state.teacherStudentComponent.individualStudentTeacherProfilePicFile);
        if(this.state.teacherStudentComponent.individualStudentTeacherEditName || 
           this.state.teacherStudentComponent.individualStudentTeacherEditEmail ||
           this.state.teacherStudentComponent.individualStudentTeacherEditGrade ||
           this.state.teacherStudentComponent.individualStudentTeacherEditPassword ||
           this.state.teacherStudentComponent.individualStudentTeacherProfilePicFile){
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditUpdateButtonError: false,
                    individualStudentTeacherEditUpdateButtonLoading: true,
                }
            }));
            console.log("this.state.individualEditStudentInformation: " + this.state.teacherStudentComponent.individualEditStudentInformation);
            let displayName = this.state.teacherStudentComponent.individualEditStudentInformation.displayName;
            let requireStudentNameUpdate = false;
            let email = this.state.teacherStudentComponent.individualEditStudentInformation.email;
            let requireStudentEmailUpdate = false;
            let currentGradeLevel = this.state.teacherStudentComponent.individualEditStudentInformation.currentGradeLevel;
            let requireStudentGradeUpdate = false;
            let requireStudentPasswordUpdate = false;
            let studentProfilePicFile = this.state.teacherStudentComponent.individualEditStudentInformation.photoURL;
            let requireStudentProfilePicFileUpdate = false;
            let updateCalls = 0;
            if(this.state.teacherStudentComponent.individualStudentTeacherEditName){
                displayName = this.state.teacherStudentComponent.individualStudentTeacherEditName;
                requireStudentNameUpdate = true;
                updateCalls += 1;
            }

            if(this.state.teacherStudentComponent.individualStudentTeacherEditEmail){
                email = this.state.teacherStudentComponent.individualStudentTeacherEditEmail;
                requireStudentEmailUpdate = true;
                updateCalls += 1;
            }

            if(this.state.teacherStudentComponent.individualStudentTeacherEditGrade){
                currentGradeLevel = this.state.teacherStudentComponent.individualStudentTeacherEditGrade;
                requireStudentGradeUpdate = true;
                updateCalls += 1;
            }

            if(this.state.teacherStudentComponent.individualStudentTeacherEditPassword){
                requireStudentPasswordUpdate = true;
                updateCalls += 1;
            }
            
            if(this.state.teacherStudentComponent.individualStudentTeacherProfilePicFile){
                studentProfilePicFile = this.state.teacherStudentComponent.individualStudentTeacherProfilePicFile;
                requireStudentProfilePicFileUpdate = true;
                updateCalls += 1;
            }
            if(requireStudentEmailUpdate || requireStudentPasswordUpdate) {
                const updateStudentEmailPasswordAsTeacher = functions.httpsCallable('updateStudentEmailPasswordAsTeacher');
                updateStudentEmailPasswordAsTeacher({
                    uid: this.state.currentUserDoc.uid,
                    studentUid: this.state.teacherStudentComponent.individualEditStudentInformation.uid,
                    requireStudentEmailUpdate: requireStudentEmailUpdate,
                    requireStudentPasswordUpdate: requireStudentPasswordUpdate,
                    email: email,
                    password: this.state.teacherStudentComponent.individualStudentTeacherEditPassword,
                }).then(result => {
                    updateCalls -= 2;
                    if(updateCalls <= 0){
                        this.props.handleUpdateOnStudent();
                        this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                individualStudentTeacherEditUpdateButtonLoading: false,
                                individualStudentEditClicked: false,
                            }
                        }));
                    }
                    console.log('update sucessful for email or password as teacher' + result);
                }).catch(err => {
                    console.log(err)
                })
            }
            if(requireStudentProfilePicFileUpdate) {
                const updateStudentProfilePicAsTeacher = functions.httpsCallable('updateStudentProfilePicAsTeacher');
                updateStudentProfilePicAsTeacher({
                    uid: this.state.currentUserDoc.uid,
                    studentUid: this.state.teacherStudentComponent.individualEditStudentInformation.uid,
                    photoURL: studentProfilePicFile,
                }).then(result => {
                    console.log('update sucessfully updateStudentProfilePicAsTeacher: ' + JSON.stringify(result));
                    updateCalls -= 1;
                    if(updateCalls <= 0){
                        this.props.handleUpdateOnStudent();
                        this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                individualStudentTeacherEditUpdateButtonLoading: false,
                                individualStudentEditClicked: false,
                            }
                        }));
                    }
                }).catch(err => {
                    console.log(err)
                }); 
            }
            if(requireStudentNameUpdate || requireStudentGradeUpdate) {
                const updateStudentNameGradeAsTeacher = functions.httpsCallable('updateStudentNameGradeAsTeacher');
                updateStudentNameGradeAsTeacher({
                    uid: this.state.currentUserDoc.uid,
                    studentUid: this.state.teacherStudentComponent.individualEditStudentInformation.uid,
                    displayName: displayName,
                    currentGradeLevel: currentGradeLevel,
                    requireStudentNameUpdate: requireStudentNameUpdate,
                    requireStudentGradeUpdate: requireStudentGradeUpdate,
                }).then(result => {
                    console.log('update sucessfully updateStudentNameGradeAsTeacher: ' + JSON.stringify(result));
                    updateCalls -= 2;
                    if(updateCalls === 0){
                        this.props.handleUpdateOnStudent();
                        this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                individualStudentTeacherEditUpdateButtonLoading: false,
                                individualStudentEditClicked: false,
                            }
                        }));
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    individualStudentTeacherEditUpdateButtonError: true,
                }
            }));
        }
    }
    /* Update Button End */ 

    /* Back Button */
    handleIndividualStudentTeacherBackClicked = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            teacherStudentComponent: {
                ...prevState.teacherStudentComponent,
                individualStudentEditClicked: false,
            }
        }));
    }
    
    /* Back Button End */

    /* teacherStudentAdd */
    // TODO: caution: function has side effects to state
    handleSubmitTeacherStudentAddClientSideSubmitErrorsExist = () => {
        // check if all the state values required actually exist if not set the appropropriate errors
        if(this.state.teacherStudentComponent.teacherStudentAddStudentLoginRequired) {
            if(!this.state.teacherStudentComponent.teacherStudentAddEmail &&
                !this.state.teacherStudentComponent.teacherStudentAddName &&
                !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade &&
                !this.state.teacherStudentComponent.teacherStudentAddPassword) {
                 this.setState(prevState => ({
                     teacherStudentComponent: {
                         ...prevState.teacherStudentComponent,
                         teacherStudentAddEmailError: true,
                         teacherStudentAddPasswordError: true,
                         handleTeacherStudentAddPasswordIsPristine: false,
                         handleTeacherStudentAddEmailIsPristine: false,
                         teacherStudentAddNameError: true,
                         teacherStudentAddCurrentGradeError: true,

                     }
                 }));
                 return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddName &&
                    !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade &&
                    !this.state.teacherStudentComponent.teacherStudentAddPassword) {
                    this.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddPasswordError: true,
                            handleTeacherStudentAddPasswordIsPristine: false,
                            teacherStudentAddNameError: true,
                            teacherStudentAddCurrentGradeError: true,

                        }
                    }));
                    return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddName &&
                !this.state.teacherStudentComponent.teacherStudentAddPassword) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddPasswordError: true,
                        handleTeacherStudentAddPasswordIsPristine: false,
                        teacherStudentAddNameError: true,
                    }
                }));
                return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddCurrentGrade &&
                      !this.state.teacherStudentComponent.teacherStudentAddPassword) {
                        this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                teacherStudentAddPasswordError: true,
                                handleTeacherStudentAddPasswordIsPristine: false,
                                teacherStudentAddCurrentGradeError: true,

                            }
                        }));
                        return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddEmail &&
               !this.state.teacherStudentComponent.teacherStudentAddName &&
               !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddEmailError: true,
                        handleTeacherStudentAddEmailIsPristine: false,
                        teacherStudentAddNameError: true,
                        teacherStudentAddCurrentGradeError: true,
                    }
                }));
                return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddEmail &&
                      !this.state.teacherStudentComponent.teacherStudentAddName) {
                       this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                teacherStudentAddEmailError: true,
                                handleTeacherStudentAddEmailIsPristine: false,
                                teacherStudentAddNameError: true,
                            }
                        }));
                        return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddEmail &&
                      !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                      this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                teacherStudentAddEmailError: true,
                                handleTeacherStudentAddEmailIsPristine: false,
                                teacherStudentAddCurrentGradeError: true,
                            }
                        }));
                        return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddName &&
                      !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                        this.setState(prevState => ({
                            teacherStudentComponent: {
                                ...prevState.teacherStudentComponent,
                                teacherStudentAddNameError: true,
                                teacherStudentAddCurrentGradeError: true,
                            }
                        }));
                        return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddEmail) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddEmailError: true,
                        handleTeacherStudentAddEmailIsPristine: false,
                    }
                }));
                return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddName) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddNameError: true,
                    }
                }));
                return true;
            } else if(!this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddCurrentGradeError: true,
                    }
                }));
                return true;
            }
            return false;
        } else {
            if(!this.state.teacherStudentComponent.teacherStudentAddName &&
               !this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddNameError: true,
                        teacherStudentAddCurrentGradeError: true,
                    }
                 }));
                 return true;
             } else if(!this.state.teacherStudentComponent.teacherStudentAddName) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddNameError: true,
                    }
                 }));
                 return true;
             } else if(!this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddCurrentGradeError: true,
                    }
                 }));
                 return true;
             }
             return false;
        }
    }

    handleSubmitTeacherStudentAdd = (e) => {
        e.preventDefault();
        // check if all the state values required actually exist if they do set them
        if(!this.handleSubmitTeacherStudentAddClientSideSubmitErrorsExist()){
            // no errors on the submit of teacher adding new student
            // check if student portal is required for this student
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddSubmitLoading: true,
                }
            }));
            if(this.state.teacherStudentComponent.teacherStudentAddStudentLoginRequired) {
                console.log("Call backend API with requiring login portal for student");
                const addStudentAsTeacherWithLoginPortal = functions.httpsCallable('addStudentAsTeacherWithLoginPortal');
                addStudentAsTeacherWithLoginPortal({
                    uid: this.state.currentUserDoc.uid,
                    photoURL: this.state.teacherStudentComponent.teacherStudentAddPhotoURL,
                    currentGradeLevel: this.state.teacherStudentComponent.teacherStudentAddCurrentGrade,
                    displayName: this.state.teacherStudentComponent.teacherStudentAddName,
                    email: this.state.teacherStudentComponent.teacherStudentAddEmail,
                    password: this.state.teacherStudentComponent.teacherStudentAddPassword,
                }).then(result => {
                    console.log('add sucessfully addStudentAsTeacherWithLoginPortal: ' + JSON.stringify(result));
                    this.props.handleUpdateOnStudent();
                    this.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddSubmitLoading: false,
                        }
                    }));
                }).catch(err => {
                    console.log(err);
                    this.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddSubmitLoading: false,
                            handleSubmitTeacherStudentAddBackendError: true,
                        }
                    }));
                });
            } else {
                console.log("Call backend API not requiring login portal for student");
                const addStudentAsTeacherWithoutLoginPortal = functions.httpsCallable('addStudentAsTeacherWithoutLoginPortal');
                addStudentAsTeacherWithoutLoginPortal({
                    uid: this.state.currentUserDoc.uid,
                    photoURL: this.state.teacherStudentComponent.teacherStudentAddPhotoURL,
                    currentGradeLevel: this.state.teacherStudentComponent.teacherStudentAddCurrentGrade,
                    displayName: this.state.teacherStudentComponent.teacherStudentAddName,
                }).then(result => {
                    console.log('add sucessfully addStudentAsTeacherWithoutLoginPortal: ' + JSON.stringify(result));
                    this.props.handleUpdateOnStudent();
                    this.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddSubmitLoading: false,
                        }
                    }));
                }).catch(err => {
                    console.log(err)
                    this.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddSubmitLoading: false,
                            handleSubmitTeacherStudentAddBackendError: true,
                        }
                    }));
                });
            }
        }
    }

    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
            
    handleStudentAddProfilePic = ({ onError, onSuccess, file }) => {
        console.log("in handleStudentAddProfilePic");
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = storage.ref();
        let uniqueImageName = this.uuidv4();
        const imageName = `${this.state.currentUserDoc.uid}/studentImages/${file.name}${uniqueImageName}`
        const imgFile = storageRef.child(`images/${imageName}.png`);
        try {
            const uploadTask = imgFile.put(file, metadata);
            const context = this;
            uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              }, function(error) {
                // Handle unsuccessful uploads
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                  context.setState(prevState => ({
                        teacherStudentComponent: {
                            ...prevState.teacherStudentComponent,
                            teacherStudentAddPhotoURL: downloadURL,
                        }
                    }));
                });
            });
            // onSuccess(null, image);
        } catch(e) {
            setTimeout(() => {
                onError("error");
            }, 0);
        }
        
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    handleCancelTeacherStudentAdd = (e) => {
        this.setState(prevState => ({
            teacherStudentComponent: {
                ...prevState.teacherStudentComponent,
                teacherStudentComponentAddStudentsClicked: false,
                teacherStudentAddModalVisible: true,
                teacherStudentAddName: "",
                teacherStudentAddEmail: "",
                teacherStudentAddPhotoURL: "",
                teacherStudentAddCurrentGrade: "",
                teacherStudentAddNameError: false,
                teacherStudentAddCurrentGradeError: false,
                teacherStudentAddStudentLoginRequired: false,
                handleTeacherStudentAddEmailIsPristine: true,
                teacherStudentAddEmailError: null,
                teacherStudentAddSubmitLoading: false,
                teacherStudentAddSubmitBackendError: false,
            }
        }));
    }

    handleTeacherStudentAddName = (e) => {
        console.log("in handleTeacherStudentAddName");
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        console.log("value: " + value);
        if(value){
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddName: value,
                    teacherStudentAddNameError: false,
                }
            }));
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddName: value,
                }
            }));
        }
    }

    onBlurhandleTeacherStudentAddName = (e) => {
        e.preventDefault();
        if (!this.state.teacherStudentComponent.teacherStudentAddName) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddNameError: true,
                }
            }));
        }
    }

    handleTeacherStudentAddCurrentGrade = (e) => {
        console.log("in handleTeacherStudentAddCurrentGrade");
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        console.log("value: " + value);
        if(value){
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddCurrentGrade: value,
                    teacherStudentAddCurrentGradeError: false,
                }
            }));
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddCurrentGrade: value,
                }
            }));
        }
    }

    onBlurhandleTeacherStudentAddCurrentGrade = (e) => {
        e.preventDefault();
        if (!this.state.teacherStudentComponent.teacherStudentAddCurrentGrade) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddCurrentGradeError: true,
                }
            }));
        }
    }

    requireLoginPortalForStudent = (e) => {
        console.log("in requireLoginPortalForStudent");
        if(this.state.teacherStudentComponent.teacherStudentAddStudentLoginRequired) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddStudentLoginRequired: false,
                    teacherStudentAddEmail: "",
                }
            }));
        } else {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddStudentLoginRequired: true,
                }
            }));
        }
    }

    handleTeacherStudentAddEmail = (e) => {
        console.log("in handleTeacherStudentAddEmail");
        console.log("this.state.handleTeacherStudentAddEmailIsPristine ");
        console.log(this.state.handleTeacherStudentAddEmailIsPristine);
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        if(this.state.teacherStudentComponent.handleTeacherStudentAddEmailIsPristine){
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddEmail: value,
                }
            }));
        } else {
            if(this.validateEmail(value)) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddEmail: value,
                        teacherStudentAddEmailError: null,
                    }
                }));
            } else {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddEmail: value,
                        teacherStudentAddEmailError: true,
                    }
                }));
            }
        }
    }

    onBlurhandleTeacherStudentAddEmail = (e) => {
        console.log("in onBlurhandleTeacherStudentAddEmail ");
        console.log("this.state.teacherStudentComponent.teacherStudentAddEmail " + this.state.teacherStudentComponent.teacherStudentAddEmail);
        if(this.state)
        if(!this.validateEmail(this.state.teacherStudentComponent.teacherStudentAddEmail)) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddEmailError: true,
                    handleTeacherStudentAddEmailIsPristine: false,
                }
            }));
        }
    }

    validatePassword = (value) => {
        if(value.length >= 6){
            return true
        } else {
            return false
        }
    }

    handleTeacherStudentAddPassword = (e) => {
        console.log("in handleTeacherStudentAddPassword");
        console.log("this.state.handleTeacherStudentAddPassword ");
        console.log(this.state.handleTeacherStudentAddPasswordIsPristine);
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        if(this.state.teacherStudentComponent.handleTeacherStudentAddPasswordIsPristine){
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddPassword: value,
                }
            }));
        } else {
            if(this.validatePassword(value)) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddPassword: value,
                        teacherStudentAddPasswordError: null,
                    }
                }));
            } else {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        teacherStudentAddPassword: value,
                        teacherStudentAddPasswordError: true,
                    }
                }));
            }
        }
    }

    onBlurhandleTeacherStudentAddPassword = (e) => {
        console.log("in onBlurhandleTeacherStudentAddPassword ");
        console.log("this.state.teacherStudentComponent.teacherStudentAddPassword " + this.state.teacherStudentComponent.teacherStudentAddPassword);
        if(this.state)
        if(!this.validatePassword(this.state.teacherStudentComponent.teacherStudentAddPassword)) {
            this.setState(prevState => ({
                teacherStudentComponent: {
                    ...prevState.teacherStudentComponent,
                    teacherStudentAddPasswordError: true,
                    handleTeacherStudentAddPasswordIsPristine: false,
                }
            }));
        }
    }

    /* teacherStudentAdd End */

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
        this.props.teacherStudentRef.data.forEach((student) => {
            if(student.uid === e.uid) {
                this.setState(prevState => ({
                    teacherStudentComponent: {
                        ...prevState.teacherStudentComponent,
                        individualStudentEditClicked: true,
                        individualEditStudentInformation: student,
                        individualStudentEditLoading: false,
                    }
                }));
            }
        });
    }

    handleTeacherStudentComponentAddStudents = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            teacherStudentComponent: {
                ...prevState.teacherStudentComponent,
                teacherStudentComponentAddStudentsClicked: true

            }
        }));
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
                studentsOptionClicked: false,
                classesOptionClicked: false,
            });
        } else if (parseInt(index) === -3) {
            this.setState({
                attendanceOptionClicked: false,
                studentsOptionClicked: true,
                classesOptionClicked: false,
            });
        } else if (parseInt(index) === -4) {
            this.setState({
                attendanceOptionClicked: false,
                studentsOptionClicked: false,
                classesOptionClicked: true,
            });
        }
        else {
            let userClicked = this.props.teacherStudentRef.data[index];
            console.log("teacherStudents: " + JSON.stringify(this.props.teacherStudentRef.data[index]));
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
                        classesOptionClicked={this.state.classesOptionClicked}
                        teacherStudentComponent={this.state.teacherStudentComponent}
                        teacherStudentRef={this.props.teacherStudentRef}
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
                        onBlurhandleIndividualStudentTeacherEditEmailChange={this.onBlurhandleIndividualStudentTeacherEditEmailChange}
                        handleIndividualStudentTeacherEditGradeChange={this.handleIndividualStudentTeacherEditGradeChange}
                        onBlurhandleIndividualStudentTeacherEditGradeChange={this.onBlurhandleIndividualStudentTeacherEditGradeChange}
                        handleIndividualStudentTeacherEditPasswordChange={this.handleIndividualStudentTeacherEditPasswordChange}
                        onBlurhandleIndividualStudentTeacherEditPasswordChange={this.onBlurhandleIndividualStudentTeacherEditPasswordChange}
                        handleIndividualStudentTeacherEditImageChange={this.handleIndividualStudentTeacherEditImageChange}
                        handleIndividualStudentTeacherUpload={this.handleIndividualStudentTeacherUpload}
                        handleIndividualStudentTeacherBackClicked={this.handleIndividualStudentTeacherBackClicked}
                        handleTeacherStudentComponentAddStudents={this.handleTeacherStudentComponentAddStudents}
                        handleCancelTeacherStudentAdd={this.handleCancelTeacherStudentAdd}
                        handleSubmitTeacherStudentAdd={this.handleSubmitTeacherStudentAdd}
                        handleTeacherStudentAddName={this.handleTeacherStudentAddName}
                        onBlurhandleTeacherStudentAddName={this.onBlurhandleTeacherStudentAddName}
                        handleTeacherStudentAddName={this.handleTeacherStudentAddName}
                        onBlurhandleTeacherStudentAddName={this.onBlurhandleTeacherStudentAddName}
                        handleTeacherStudentAddCurrentGrade={this.handleTeacherStudentAddCurrentGrade}
                        onBlurhandleTeacherStudentAddCurrentGrade={this.onBlurhandleTeacherStudentAddCurrentGrade}
                        requireLoginPortalForStudent={this.requireLoginPortalForStudent}
                        handleTeacherStudentAddEmail={this.handleTeacherStudentAddEmail}
                        onBlurhandleTeacherStudentAddEmail={this.onBlurhandleTeacherStudentAddEmail}
                        handleStudentAddProfilePic={this.handleStudentAddProfilePic}
                        handleTeacherStudentAddPassword={this.handleTeacherStudentAddPassword}
                        onBlurhandleTeacherStudentAddPassword={this.onBlurhandleTeacherStudentAddPassword}
                        teacherClassComponent={this.state.teacherClassComponent}
                        teacherClassComponentHandleTeacherStudentClick={this.teacherClassComponentHandleTeacherStudentClick}
                        teacherClassComponentHandleIndividualTeacherAssignmentsClick={this.teacherClassComponentHandleIndividualTeacherAssignmentsClick}
                        handleGradebookSettingClick={this.handleGradebookSettingClick}
                        handleGradeBookSettingsChange={this.handleGradeBookSettingsChange}
                        handleGradeBookSettingsBack={this.handleGradeBookSettingsBack}
                        handleGradeBookSettingsSubmit={this.handleGradeBookSettingsSubmit}
                    />
                </div>
            </React.Fragment>
        );
    }
}

// export default withAuth(TeacherDashboard);
