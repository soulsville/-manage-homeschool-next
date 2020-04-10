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
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        console.log("in teacher dashboard class....");
        console.log(this.state.currentUserDoc);
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

    handleMenuClick = (index) => {
        console.log('index:' + parseInt(index));
        if(parseInt(index) === -1){
            this.setState({
                currentUserClicked: this.state.currentUserDoc,
            });
        } else {
            let userClicked = this.state.currentUserDoc.teacherStudents[index];
            console.log("teacherStudents: " + JSON.stringify(this.state.currentUserDoc.teacherStudents[index]))
            this.setState({
                currentUserClicked: userClicked,
            });
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Nav 
                        currentUserDoc={this.state.currentUserDoc}
                        currentUserClicked={this.state.currentUserClicked}
                        handleMenuClick={this.handleMenuClick}
                    />
                </div>
            </React.Fragment>
        );
    }
}

// export default withAuth(TeacherDashboard);
