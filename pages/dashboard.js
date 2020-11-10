// pages/dashboard.js
import React from 'react';
import withAuth from '../src/helpers/withAuth';
import { db, functions } from '../src/firebase';
import Router from 'next/router';
import { TeacherDashboard } from '../components/teacherDashboard';
import { auth } from 'firebase';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: this.props.authUser,
      currentUserDoc: null,
      teacherStudentRef: null,
      newTeacherUserFlow: false,
      loading: true,
      studentDashboard: false,
      teacherDashboard: false,
    };
    this.handleUpdateOnStudent = this.handleUpdateOnStudent.bind(this);
  }

  componentDidMount() {
    console.log("in component did mount");
    console.log(this.state.authUser);
    // get the doc with uid
    // check if the uid is isNewUser than go to the
    // new teacher interview flow
    if(this.state.authUser !== null) {
      let docRef = db.collection("users").doc(this.state.authUser.uid);
      let currentComponent = this;
      docRef.get().then((doc) => {
        console.log("innn docRef.get()...");
        if(doc.exists) {
          console.log("innn doc exists...");
          // check if the users uid isNewUser
          // console.log("Document data:", doc.data());
          // if(doc.data().isNewUser && doc.data().userType === "teacher") {
          //   console.log("newTeacherUserFlow interview questions");
          //   currentComponent.setState({
          //     newTeacherUserFlow: true,
          //   });
          // } else
          if(doc.data().userType == "teacher"){
            // TODO: handle the below when it fails the teacher doc doesn't exist for whatever reason handle that
            let teacherRef = db.collection("teachers").doc(this.state.authUser.uid);
            console.log("teacherRef: " + teacherRef);
            teacherRef.get().then((teacherDoc) => {
              console.log(("teacherDoc.data()" + teacherDoc.data()));
              const getStudentCollectionDocumentsAsTeacher = functions.httpsCallable('getStudentCollectionDocumentsAsTeacher');
              getStudentCollectionDocumentsAsTeacher({
                    uid: this.state.authUser.uid,
                }).then(result => {
                    console.log('update sucessful for email and password as teacher' + JSON.stringify(result));
                    currentComponent.setState({teacherDashboard: true, currentUserDoc: teacherDoc.data(), teacherStudentRef: result});
                }).catch(err => {
                    console.log(err)
                })
              // db.collection("teachers").doc(this.state.authUser.uid).collection("teacherStudents").getDocuments().then((studentDocs) => {
              //   currentComponent.setState({teacherDashboard: true, currentUserDoc: teacherDoc.data(), teacherStudentRef: studentDocs});
              // });
            });
            // currentComponent.setState({teacherDashboard: true, currentUserDoc: doc.data()})
          }
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  }

  handleUpdateOnStudent = () => {
    // get the latest update on the students
    const getStudentCollectionDocumentsAsTeacher = functions.httpsCallable('getStudentCollectionDocumentsAsTeacher');
    getStudentCollectionDocumentsAsTeacher({
          uid: this.state.authUser.uid,
      }).then(result => {
          console.log('update sucessful for email and password as teacher' + JSON.stringify(result));
          this.setState({
            teacherStudentRef: result
          });
      }).catch(err => {
          console.log(err)
      });
  }

  render() {
    const renderConditionalDashboard = () => {
      console.log("be here now")
      if(this.state.newTeacherUserFlow === true) {
        console.log("i'm here man");
        Router.push('/teacher_setup');
      } else if(this.state.teacherDashboard == true) {
        console.log("made it to teacher dashboard conditional");
        console.log(this.state.currentUserDoc);
        return <TeacherDashboard 
                authUser={this.state.authUser}
                currentUserDoc={this.state.currentUserDoc}
                teacherStudentRef={this.state.teacherStudentRef}
                handleUpdateOnStudent={this.handleUpdateOnStudent}
                />
      } else {
        return <p>Nothing implemented for these conditions yet...</p>
      }
    }

    return(
        <div>
          {renderConditionalDashboard()}
        </div>
    )
  }
}

export default withAuth(Dashboard);
