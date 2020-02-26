import React from 'react';
import router from 'next/router';
import { auth } from '../firebase';

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          status: 'LOADING',
          authUser: null,
        }
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        if(authUser) {
          // TODO: add this back or find a better way to do this
          // if (!authUser.emailVerified) {
          //   authUser.sendEmailVerification();
          // }
          this.setState({
            status: 'SIGNED_IN',
            authUser: authUser
          });
        } else {
          router.push('/');
        }
      });
    }

    renderContent() {
      const { status } = this.state;
      const { authUser } = this.state;
      if(status == 'LOADING') {
        return <h1>Loading ......</h1>;
      } else if (status == 'SIGNED_IN') {
        return <Component { ...this.props } authUser={authUser}/>
      }
    }

    render() {
      return (
        <React.Fragment>
          {this.renderContent()}
        </React.Fragment>
      );
    }
  };
}

export default withAuth;
