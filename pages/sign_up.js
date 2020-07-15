import React from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import { auth, firebase, db, functions } from '../src/firebase';
import Router from 'next/router';
import { Card, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import stylesheet from 'antd/dist/antd.min.css';
import { MailOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onBlurHandleEmail = this.onBlurHandleEmail.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.onBlurHandlePassword = this.onBlurHandlePassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.onBlurHandleConfirmPassword = this.onBlurHandleConfirmPassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      validationEmailError: {
        message: null,
      },
      validationPasswordError: {
        message: null,
      },
      showServerSideError: {
        message: null,
      },
      validationConfirmPasswordError: {
        message: null,
      },
      clientEmail: '',
      clientPassword: '',
      clientConfirmPassword: '',
      firebase: this.props.firebase,
      loading: false,
    }
  }

  handleSignUpWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.signInWithPopup(provider).then(() => {
      Router.push('/dashboard');
    }).catch(error => {
      console.log(error);
      this.setState({
        showServerSideError: {
          message: 'Invalid Password or Email',
        },
        loading: false,
      });
    });
  }

  handleLogout = () => {
    auth.signOut().then(function() {
      Router.push('/sign_in');
    }).catch(function(error) {
      console.log(error);
    });
  }

  isEmailValid = () => {
    const regex  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.state.clientEmail);
  }

  isPasswordValid = () => {
    if(this.state.clientPassword.length < 6) {
      return false;
    } else {
      return true;
    }
  }

  isConfirmPasswordValid = () => {
    if(this.state.clientConfirmPassword.length < 6) {
      return false;
    } else if (this.state.clientConfirmPassword !== this.state.clientPassword) {
      return false;
    } else {
      return true;
    }
  }

  onBlurHandlePassword = () => {
    if (!this.isPasswordValid()) {
      this.setState({
        validationPasswordError: {
          message: 'Invalid Password needs to be minumum of six characters',
        },
      });
    } else {
      this.setState({
        validationPasswordError: {
          message: null,
        },
      });
    }
  }

  onBlurHandleConfirmPassword = () => {
    if (!this.isConfirmPasswordValid()) {
      this.setState({
        validationConfirmPasswordError: {
          message: 'Confirmation Password and password needs to match be minumum of six characters',
        },
      });
    } else {
      this.setState({
        validationConfirmPasswordError: {
          message: null,
        },
      });
    }
  }

  handlePassword = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      clientPassword: value,
    });
  }

  handleConfirmPassword = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      clientConfirmPassword: value,
    });
  }

  // email
  onBlurHandleEmail = () => {
    if (!this.isEmailValid()) {
      this.setState({
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
      });
    } else {
      this.setState({
        validationEmailError: {
          message: null,
        },
      });
    }
  }

  handleEmail = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      clientEmail: value,
    });
    console.log(this.state.clientEmail);
  }

  // Submit
  handleClick = (event) => {
    event.preventDefault();
    if ((!this.isPasswordValid() && !this.isEmailValid() && !this.isConfirmPasswordValid())) {
      this.setState({
        validationPasswordError: {
          message: 'Invalid Password needs to be minumum of six characters',
        },
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
        validationConfirmPasswordError: {
          message: 'Confirmation Password and password needs to match be minumum of six characters',
        },
      });
    } else if (!this.isConfirmPasswordValid() && !this.isPasswordValid()){
      this.setState({
        validationPasswordError: {
          message: 'Invalid Password needs to be minumum of six characters',
        },
        validationConfirmPasswordError: {
          message: 'Confirmation Password and password needs to match be minumum of six characters',
        },
      });
    } else if (!this.isEmailValid() && !this.isPasswordValid()){
      this.setState({
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
        validationPasswordError: {
          message: 'Invalid Password needs to be minumum of six characters',
        },
      });
    } else if (!this.isEmailValid() && !this.isConfirmPasswordValid()){
      this.setState({
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
        validationConfirmPasswordError: {
          message: 'Confirmation Password and password needs to match be minumum of six characters',
        },
      });
    } else if (!this.isConfirmPasswordValid()){
      this.setState({
        validationConfirmPasswordError: {
          message: 'Confirmation Password and password needs to match be minumum of six characters',
        },
      });
    } else if (!this.isPasswordValid()) {
      this.setState({
        validationPasswordError: {
          message: 'Invalid Password needs to be minumum of six characters',
        },
      });
    } else if (!this.isEmailValid()) {
      this.setState({
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
      });
    } else {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    auth.createUserWithEmailAndPassword(this.state.clientEmail, this.state.clientPassword)
    .then((firebaseUser) => {
      let initialUserDoc = {
        email: this.state.email
      };
      let initialUserDocStringify = JSON.stringify(initialUserDoc);
      let userDataCollection = {
        "uid": firebaseUser.user.uid,
        "displayName": firebaseUser.user.displayName,
        "photoURL": firebaseUser.user.photoURL,
        "email": firebaseUser.user.email,
        "emailVerified": firebaseUser.user.emailVerified,
        "isNewUser": firebaseUser.additionalUserInfo.isNewUser,
        "userType": "teacher"
      }
      db.collection("users").doc(firebaseUser.user.uid).set(userDataCollection).then(() => {
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ uid: firebaseUser.user.uid }).then(results => {
          Router.push('/dashboard');
        });
      }).catch((error) =>{
        console.log(error);
        this.setState({
          showServerSideError: {
            message: 'Something went wrong with the sign up process',
          },
          loading: false,
        });
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        showServerSideError: {
          message: 'Invalid Password or Email',
        },
        loading: false,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet}}/>
      <Row type= "flex" align="middle" justify="center" style={{minHeight: '100vh', backgroundColor: '#F2F6FF'}}>
        <Col span={8} align="center">
          <Card title={<span style={{color: '#60789B'}}>Sign Up</span>}>
            <Form>
              {this.state.validationEmailError.message ?
                <Form.Item
                  validateStatus='error'
                  help='Invalid Email'>
                <Input
                  size='medium'
                  type='email'
                  placeholder='Email'
                  prefix={<MailOutlined style={{color: '#267FFF'}}/>}
                  value={this.state.clientEmail}
                  onChange = {(e) => this.handleEmail(e)}
                  onBlur= {() => this.onBlurHandleEmail()}>
                </Input>
                </Form.Item>
                :
                <Form.Item>
                <Input
                size='medium'
                type='email'
                placeholder='Email'
                prefix={<MailOutlined style={{color: '#267FFF'}}/>}
                value={this.state.clientEmail}
                onBlur= {() => this.onBlurHandleEmail()}
                onChange = {(e) => this.handleEmail(e)}>
                </Input>
                </Form.Item>
              }
              {this.state.validationPasswordError.message ?
                <Form.Item
                  validateStatus='error'
                  help='Minimum of 6 Characters Required'>
                <Input
                  size='medium'
                  type='password'
                  placeholder='Password'
                  prefix={<LockOutlined style={{color: '#267FFF'}}/>}
                  value={this.state.clientPassword}
                  onChange = {(e) => this.handlePassword(e)}
                  onBlur= {() => this.onBlurHandlePassword()}>
                </Input>
                </Form.Item>
                :
                <Form.Item>
                <Input
                size='medium'
                type='password'
                placeholder='Password'
                prefix={<LockOutlined style={{color: '#267FFF'}}/>}
                value={this.state.clientPassword}
                onBlur= {() => this.onBlurHandlePassword()}
                onChange = {(e) => this.handlePassword(e)}>
                </Input>
                </Form.Item>
              }
              {this.state.validationConfirmPasswordError.message ?
                <Form.Item
                  validateStatus='error'
                  help='Passwords Must Match'>
                <Input
                  size='medium'
                  type='password'
                  placeholder='Confirm Password'
                  prefix={<LockOutlined style={{color: '#267FFF'}}/>}
                  value={this.state.clientConfirmPassword}
                  onChange = {(e) => this.handleConfirmPassword(e)}
                  onBlur= {() => this.onBlurHandleConfirmPassword()}>
                </Input>
                </Form.Item>
                :
                <Form.Item>
                <Input
                size='medium'
                type='password'
                placeholder='Confirm Password'
                prefix={<LockOutlined style={{color: '#267FFF'}}/>}
                value={this.state.clientConfirmPassword}
                onBlur= {() => this.onBlurHandleConfirmPassword()}
                onChange = {(e) => this.handleConfirmPassword(e)}>
                </Input>
                </Form.Item>
              }
              <Form.Item>
                <Button
                  type="primary" block
                  shape="round"
                  onClick={(e) => this.handleClick(e)}>
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item>
                <p> or sign up with </p>
                <Button
                  type="primary" block
                  shape="round"
                  style={{background: '#F2F6FF', border: 'none', color: '#4E6991'}}
                  icon={<GoogleCircleFilled style={{color: '#267FFF'}}/>}
                  onClick={this.handleSignInWithGoogle}>
                  Google
                </Button>
              </Form.Item>
              <span> Already a member? </span>
              <Link href="/sign_in">
                <a>Sign in</a>
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
      </React.Fragment>
    )
  }
}
export default SignUp
