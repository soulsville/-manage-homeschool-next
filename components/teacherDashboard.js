import React from 'react';
import withAuth from '../src/helpers/withAuth';
import ErrorPage from 'next/error'
import { db, storage, functions } from "../src/firebase";
import Router from 'next/router';

export class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.authUser
        }
    }

    componentDidMount() {
        console.log("in teacher dashboard class....");
        console.log(this.state.currentUser);
        // here check if the user is actually an teacher again
        // if not throw a 404
        // if (this.state.authUser !== null) {
        //     let docRef = db.collection("users").doc(this.state.authUser.uid);
        //     let currentComponent = this;
        //     docRef.get().then((doc) => {
        //         if (doc.exists) {
        //             // check if the userType is teacher
        //             console.log("User Document data:", doc.data());
        //             if (doc.data().userType !== "teacher") {
        //                 currentComponent.setState({
        //                     teacherType: false,
        //                     firstTimeRender: false,
        //                 });
        //             } else {
        //                 currentComponent.setState({
        //                     firstTimeRender: false,
        //                     teacherType: true,
        //                 });
        //             }
        //         } else {
        //             console.log("No such document!");
        //         }
        //     }).catch((error) => {
        //         console.log("Error getting document:", error);
        //     });
        // }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p>Things are happenings</p>
                </div>
            </React.Fragment>
        );
    }
}

// export default withAuth(TeacherDashboard);
