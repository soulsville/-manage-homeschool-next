import React from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import { withRedux } from '../lib/redux'
import { auth, firebase } from '../src/firebase';
import Router from 'next/router';
import { Card, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import stylesheet from 'antd/dist/antd.min.css';
import { MailOutlined, LockOutlined, GoogleCircleFilled } from '@ant-design/icons';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onBlurHandleEmail = this.onBlurHandleEmail.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.onBlurHandlePassword = this.onBlurHandlePassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
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
      clientEmail: '',
      clientPassword: '',
      firebase: this.props.firebase,
      loading: false,
    }
  }

  handleSignInWithGoogle = () => {
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

  onBlurHandlePassword = () => {
    if (!this.isPasswordValid()) {
      this.setState({
        validationPasswordError: {
          message: 'Password needs to be minumum of six characters',
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

  handlePassword = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      clientPassword: value,
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
    if ((!this.isPasswordValid() && !this.isEmailValid())) {
      this.setState({
        validationPasswordError: {
          message: 'Password needs to be minumum of six characters',
        },
        validationEmailError: {
          message: 'Email Address Not Valid',
        },
      });
    } else if (!this.isPasswordValid()) {
      this.setState({
        validationPasswordError: {
          message: 'Password needs to be minumum of six characters',
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
    auth.signInWithEmailAndPassword(this.state.clientEmail, this.state.clientPassword)
    .then((firebaseUser) => {
      console.log(firebaseUser);
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

  render() {
    return (
      <React.Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet}}/>
      <Row type= "flex" align="middle" justify="center" style={{minHeight: '100vh', backgroundColor: '#F2F6FF'}}>
        <Col span={8} align="center">
          <Card title={<span style={{color: '#60789B'}}>Sign In</span>}>
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
                  type='email'
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
              <Form.Item>
                <Button
                  type="primary" block
                  shape="round"
                  onClick={(e) => this.handleClick(e)}>
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                <p> or sign in with </p>
                <Button
                  type="primary" block
                  shape="round"
                  style={{background: '#F2F6FF', border: 'none', color: '#4E6991'}}
                  icon={<GoogleCircleFilled style={{color: '#267FFF'}}/>}
                  onClick={this.handleSignInWithGoogle}>
                  Google
                </Button>
              </Form.Item>
              <span> Don't have an account yet? </span>
              <Link href="/sign_up">
                <a>Sign up</a>
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
      </React.Fragment>
    )
  }
}

export default withRedux(SignIn)
