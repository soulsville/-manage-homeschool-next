import React from 'react';
import withAuth from '../src/helpers/withAuth';
import ErrorPage from 'next/error'
import { db, storage, functions } from "../src/firebase";
import Router from 'next/router';

class TeacherInterview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionState: 1,
            // Profile pic
            questionOne: "Would you like to add a profile pic?",
            questionTwo: "Upload your profile pic",
            // Full Name
            questionThree: "Do you want to add your full name?",
            questionFour: "What is your full name?",
            // Add students
            questionFive: "Do you want to add students right now? You can always not add students or add them later if needed",
            questionSix: "Enter student emails and passwords, Note: This will be a temp password for students until they login",
            // School name
            questionSeven: "Do you want to add a name for you homeschool?",
            questionEight: "Enter your homeschool name",
            authUser: this.props.authUser,
            teacherType: false,
            firstTimeRender: true,
            teacherStudent: [{
                uid: null,
                email: "",
                password: "",
                fullName: "",
                validationPasswordError: {
                    message: "",
                },
                validationEmailError: {
                    message: "",
                },
                serverSideError: {
                    message: "",
                }
            }],
            teacherStudentTeacherDocObject: [{
                email: null,
                uid: null,
                fullName: null,
            }],
            homeSchoolName: "",
            teacherProfilePicFile: '',
            teacherProfilePicBlob: '',
            teacherName: null,
            teacherProfileFile: null,
            teacherDataCollection: {
                uid: "",
                displayName: "",
                photoUrl: "",
                email: "",
                emailVerified: "",
                isNewUser: "",
                userType: "teacher",
                teacherStudents: [{
                    email: null,
                    uid: null,
                    fullName: null,
                }],
                teacherName: "",
                homeschoolName: "",
            },
            validationTeacherName: {
                message: null,
            },
            validationHomeSchoolName: {
                message: null,
            },
            isLoadingSubmit: false,
        }
    }

    componentDidMount() {
        console.log("yoo dogg");
        // here check if the user is actually an teacher again
        // if not throw a 404
        if (this.state.authUser !== null) {
            let docRef = db.collection("users").doc(this.state.authUser.uid);
            let currentComponent = this;
            docRef.get().then((doc) => {
                if (doc.exists) {
                    // check if the users uid isNewUser
                    console.log("User Document data:", doc.data());
                    if (doc.data().userType !== "teacher") {
                        currentComponent.setState({
                            teacherType: false,
                            firstTimeRender: false,
                        });
                    } else {
                        currentComponent.setState({
                            firstTimeRender: false,
                            teacherType: true,
                        });
                    }
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }

    renderQuestion() {
        if (this.state.firstTimeRender === true) {
            return <p>Loading...</p>
        }
        if (this.state.teacherType === false && this.state.firstTimeRender === false) {
            return <ErrorPage statusCode={403}/>
        } else {
            switch (this.state.questionState) {
                case 1:
                    return (
                        <div>
                            <form>
                                <p>{this.state.questionOne}</p>
                                <button
                                    content='No'
                                    onClick={() => this.handleNoClick(event)}>
                                    No
                                </button>
                                <button
                                    content='Yes'
                                    onClick={() => this.handleYesClick(event)}>
                                    Yes
                                </button>
                            </form>
                        </div>
                    )
                case 2:
                    return (
                        <div>
                            <p>{this.state.questionTwo}</p>
                            <input type="file" onChange={this.onImageChange} />
                            <button
                                content='Back'
                                onClick={() => this.handleBackClick(event)}>
                                Back
                            </button>
                            <button
                                content='Next'
                                onClick={() => this.handleYesClick(event)}>
                                Next
                            </button>
                        </div>

                    )
                case 3:
                    return (
                        <div>
                            <p>{this.state.questionThree}</p>
                            <button
                                content='No'
                                onClick={() => this.handleNoClick(event)}>
                                No
                            </button>
                            <button
                                content='Yes'
                                onClick={() => this.handleYesClick(event)}>
                                Yes
                            </button>
                        </div>
                    )
                case 4:
                    return (
                        <div>
                            <form>
                                <p>{this.state.questionFour}</p>
                                Full Name:<br/>
                                <input
                                    type="text"
                                    name="name"
                                    label='name'
                                    placeholder="Full Name"
                                    value={this.state.teacherName}
                                    onChange={(event) => this.handleTeacherName(event)}
                                    onBlur={() => this.onBlurHandleTeacherName()}
                                />
                            </form>
                            <button
                                content='Back'
                                onClick={() => this.handleBackClick(event)}>
                                Back
                            </button>
                            <button
                                content='Next'
                                onClick={() => this.handleYesClick(event)}>
                                Next
                            </button>
                        </div>
                    )
                case 5:
                    return (
                        <div>
                            <p>{this.state.questionFive}</p>
                            <button
                                content='No'
                                onClick={() => this.handleNoClick(event)}>
                                No
                            </button>
                            <button
                                content='Yes'
                                onClick={() => this.handleYesClick(event)}>
                                Yes
                            </button>
                        </div>
                    )
                case 6:
                    return (
                        <div>
                            <form onChange={this.handleStudentChange}>
                                <p>{this.state.questionSix}</p>
                                Add Students:<br/>
                                {
                                    this.state.teacherStudent.map((val, idx) => {
                                        let studentId = `student-${idx}`, passwordId = `password-${idx}`, fullNameId = `fullName-${idx}`
                                        return (
                                            <div key={idx}>
                                                <label htmlFor={studentId}>{`Student #${idx + 1}`}</label>
                                                <input
                                                    type="email"
                                                    name={studentId}
                                                    label="email"
                                                    id={studentId}
                                                    data-id={idx}
                                                    value={this.state.teacherStudent[idx].email}
                                                    className="email"
                                                    onChange={this.state.handleStudentChange}
                                                />
                                                <label htmlFor={passwordId}>Password</label>
                                                <input
                                                    type="password"
                                                    name={passwordId}
                                                    label="password"
                                                    id={passwordId}
                                                    data-id={idx}
                                                    value={this.state.teacherStudent[idx].password}
                                                    className="password"
                                                    onChange={this.state.handleStudentChange}
                                                />
                                                <label htmlFor={fullNameId}>Student Full Name</label>
                                                <input
                                                    type="text"
                                                    name={fullNameId}
                                                    label="Student Full Name"
                                                    id={fullNameId}
                                                    data-id={idx}
                                                    value={this.state.teacherStudent[idx].fullNameId}
                                                    className="fullName"
                                                    onChange={this.state.handleStudentChange}
                                                />
                                            </div>
                                        )
                                    })
                                }

                                <button
                                    content='Add More students'
                                    onClick={this.handleAddMoreStudents}>
                                    Click Here to add more students
                                </button>
                                <button
                                    content='Back'
                                    onClick={() => this.handleBackClick(event)}>
                                    Back
                                </button>
                                <button
                                    content='Next'
                                    onClick={() => this.handleYesClick(event)}>
                                    Next
                                </button>
                            </form>
                        </div>
                    )
                case 7:
                    return (
                        <div>
                            <p>{this.state.questionSeven}</p>
                            <button
                                content='No'
                                onClick={() => this.handleNoClick(event)}>
                                No
                            </button>
                            <button
                                content='Yes'
                                onClick={() => this.handleYesClick(event)}>
                                Yes
                            </button>
                        </div>
                    )
                case 8:
                    return (
                        <div>
                            <form>
                                <p>{this.state.questionEight}</p>
                                Full Name:<br/>
                                <input
                                    type="text"
                                    name="name"
                                    label='name'
                                    placeholder="Homeschool Name"
                                    value={this.state.homeSchoolName}
                                    onChange={(event) => this.handleHomeSchoolName(event)}
                                    onBlur={() => this.onBlurHandleHomeSchoolName()}
                                />
                            </form>
                            <button
                                content='Back'
                                onClick={() => this.handleBackClick(event)}>
                                Back
                            </button>
                            <button
                                content='Next'
                                onClick={() => this.handleYesClick(event)}>
                                Next
                            </button>
                        </div>
                    )
            }
        }
    }

    uploadProfileFile = () => {
        const image = this.state.teacherProfilePicFile;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({
                        teacherProfileFile: url
                    });
                    // this.setState((prevState) => ({
                    //     teacherStudent: [...prevState.teacherDataCollection.photoUrl: url]
                    // }));
                });
            }
        );
    }

    handleFirstTimeSetup(){
        const addTeacherDocuments = functions.httpsCallable('addTeacherDocuments');
        // uid: data.uid,
        // displayName: data.displayName,
        // photoUrl: data.photoURL,
        // email: data.email,
        // emailVerified: data.emailVerified,
        // isNewUser: data.isNewUser,
        // teacherStudents: data.teacherStudents,
        // teacherName: data.teacherName,
        // homeschoolName: data.homeschoolName,
        
        // uid: data.uid,
        // displayName: data.displayName,
        // photoUrl: data.photoURL,
        // email: data.email,
        // emailVerified: data.emailVerified,
        // isNewUser: data.isNewUser,
        // userType: "teacher",
        // teacherStudents: data.teacherStudents,
        // teacherName: data.teacherName,
        // homeschoolName: data.homeschoolName,

        console.log("uid" + this.state.authUser.uid)
        console.log("displayName" + this.state.teacherName)
        console.log("photoUrl" + this.state.teacherProfileFile)
        console.log("email" + this.state.authUser.email)
        console.log("emailVerified" + this.state.authUser.emailVerified)
        console.log("teacherStudentTeacherDocObject" + this.state.teacherStudentTeacherDocObject[0].email)
        console.log("teacherName" + this.state.teacherName)
        console.log("homeSchoolName" + this.state.homeSchoolName)

        addTeacherDocuments({
            uid: this.state.authUser.uid,
            displayName: this.state.teacherName,
            photoUrl: this.state.teacherProfileFile,
            email: this.state.authUser.email, 
            emailVerified: this.state.authUser.emailVerified,
            isNewUser: false,
            teacherStudents: this.state.teacherStudentTeacherDocObject,
            teacherName: this.state.teacherName,
            homeSchoolName: this.state.homeSchoolName
        }).then(results => {
            console.log(results);
            Router.push('/dashboard');
        }).catch(err => {
            console.log(err);
        });
    }

    handleSubmit = () => {
        if(this.state.isLoadingSubmit == false){
            this.setState({
               isLoadingSubmit: true,
            });
            this.handleFirstTimeSetup();
        } else {

        }
    }

    handleStudentChange = (e) => {
        if (["email", "password", "fullName"].includes(e.target.className)) {
            let teacherStudent = [...this.state.teacherStudent]
            teacherStudent[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({teacherStudent}, () => console.log(this.state.teacherStudent))
        } else {
            this.setState({[e.target.email]: e.target.value})
        }
    }

    handleAddMoreStudents = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            teacherStudent: [...prevState.teacherStudent, {email: "", password: "", fullName: ""}]
        }));
    }

    handleTeacherName = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        this.setState({
            teacherName: value,
        });
        console.log(this.state.teacherName);
    }

    handleHomeSchoolName = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        this.setState({
            homeSchoolName: value,
        });
        console.log(this.state.homeSchoolName);
    }

    onBlurHandleHomeSchoolName = () => {
        if (!this.state.homeSchoolName) {
            this.setState({
                validationHomeSchoolName: {
                    message: 'Name invalid',
                },
            });
        } else {
            this.setState({
                validationHomeSchoolName: {
                    message: null,
                },
            });
        }
    }

    onBlurHandleTeacherName = () => {
        if (!this.state.handleTeacherName) {
            this.setState({
                validationTeacherName: {
                    message: 'Name invalid',
                },
            });
        } else {
            this.setState({
                validationTeacherName: {
                    message: null,
                },
            });
        }
    }

    onImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({
                teacherProfilePicFile: image,
            }));
        }
    }

    handleImageUpload = (e) => {
        console.log('in image handle upload');
        console.log(e.target.files[0]);
        this.setState({
            teacherProfilePicFile: e.target.files[0]
        });
    }

    handleStudentSignUp = (email, password, fullName, uid, index) => {
        const addUserAsAdmin = functions.httpsCallable('addUserAsAdmin');
        console.log("fullName check: " + fullName);
        console.log("email check: " + email);
        let teacherStudentTeacherDocObject = this.state.teacherStudentTeacherDocObject;
        addUserAsAdmin({ email: email, password: password, displayName: fullName, uid: uid }).then(results => {
            console.log("results from api:" + JSON.stringify(results.data.user.uid));
            // const teacherDataCollection = this.state.teacherDataCollection;
            // teacherDataCollection.teacherStudents[index].email = email;
            // teacherDataCollection.teacherStudents[index].uid = results.data.user.uid;
            //teacherDataCollection.teacherStudents[index].fullName = fullName;
            // const teacherStudentTeacherDocObject = this.state.teacherStudentTeacherDocObject;
            teacherStudentTeacherDocObject[index].uid = results.data.user.uid;
            teacherStudentTeacherDocObject[index].email = email;
            teacherStudentTeacherDocObject[index].fullName = fullName;

            this.setState({
                teacherStudentTeacherDocObject
            });
            // const teacherStudentObj = {
            //     email: email,
            //     uid: results.data.user.uid
            // }
            // teacherDataCollection.teacherStudents[index].uid = results.data.user.uid;
            // teacherDataCollection.teacherStudents[index].email = email;
            // this.setState(prevState => {
            //     ...prevState,
            //     teacherDataCollection.teacherStudents[index] = teacherDataCollection
            // });
            return true
        }).catch((error)=> {
            console.log(error);
            return false;
        });
    }

    handleUserStudentsSignUp = () => {
        let context = this;
        const uid = this.state.authUser.uid;
        this.state.teacherStudent.forEach(function (student, index) {
            console.log(student.email);
            console.log(student.password);
            if(context.handleStudentSignUp(student.email, student.password, student.fullName, uid, index) == false) {
                // let students = [this.]
                this.setState(prevState => ({
                    ...prevState.teacherStudent,
                    [prevState.teacherStudent[index].serverSideError.message]: "Invalid Password or Email",
                }));
            }
            // console.log('teacherStudent:' + this.state.teacherStudent);
        });
    }

    handleYesClick(event) {
        event.preventDefault();
        if(this.state.questionState == 2){
            this.uploadProfileFile();
        }
        if(this.state.questionState == 6){
            console.log("Made it to the questionState number #6");
            this.handleUserStudentsSignUp();
        }
        if(this.state.questionState == 8){
            this.handleSubmit();
        } else {
            let newQuestionState = this.state.questionState + 1;
            this.setState({
                questionState: newQuestionState,
            });
        }
    }

    handleNoClick = (event) => {
        event.preventDefault();
        if(this.state.questionState == 7) {
            this.handleSubmit();
        } else {
            let newQuestionState = this.state.questionState + 2;
            this.setState({
                questionState: newQuestionState,
            });
        }
    }

    handleBackClick = (event) => {
        event.preventDefault();
        let newQuestionState = this.state.questionState - 1;
        this.setState({
            questionState: newQuestionState,
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.renderQuestion()}
                </div>
            </React.Fragment>
        );
    }
}

export default withAuth(TeacherInterview);
