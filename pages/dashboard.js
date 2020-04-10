// pages/dashboard.js
import React from 'react';
import withAuth from '../src/helpers/withAuth';
import { db } from '../src/firebase';
import Router from 'next/router';
import { TeacherDashboard } from '../components/teacherDashboard';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: this.props.authUser,
      currentUserDoc: null,
      newTeacherUserFlow: false,
      loading: true,
      studentDashboard: false,
      teacherDashboard: false,
    };
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
        if(doc.exists) {
          // check if the users uid isNewUser
          console.log("Document data:", doc.data());
          if(doc.data().isNewUser && doc.data().userType === "teacher") {
            console.log("newTeacherUserFlow interview questions");
            currentComponent.setState({
              newTeacherUserFlow: true,
            });
          } else if(doc.data().userType == "teacher"){
            // TODO: get the teacher doc here instad of the users doc
            currentComponent.setState({teacherDashboard: true, currentUserDoc: doc.data()})
          }
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  }

  render() {
    const renderConditionalDashboard = () => {
      console.log("be here now")
      if(this.state.newTeacherUserFlow === true) {
        console.log("i'm here man");
        Router.push('/teacher_setup');
      } else if(this.state.teacherDashboard == true) {
        console.log("made it to teacher dashboard conditional");
        return <TeacherDashboard authUser={this.state.authUser} currentUserDoc={this.state.currentUserDoc} />
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
