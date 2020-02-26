import React from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import { withRedux } from '../lib/redux'
import { auth, firebase } from '../src/firebase';
import Router from 'next/router';


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
          message: 'Invalid Password needs to be minumum of six characters',
        },
        validationEmailError: {
          message: 'Email Address Not Valid',
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
      <div>
        <div className="row">
          <Link href="/sign_up">
            <a className="card">
              <h3>Go to Sign up&rarr;</h3>
              <p>Visit Sign up page</p>
            </a>
          </Link>
          <button onClick={this.handleSignInWithGoogle}>Sign In using google</button>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="row">
          <a className="card">
            <form>
              Email:<br/>
              <input 
                type="email"
                name="Email"
                label='Email'
                placeholder="Email"
                value={this.state.clientEmail}
                onChange={(event)=>this.handleEmail(event)}
                onBlur={() => this.onBlurHandleEmail()}
              />
              <p>
              {
                this.state.validationEmailError ?
                this.state.validationEmailError.message :
                null
               }
              </p>
              <br/>
              Password:<br/>
              <input 
                type="password" 
                name="psw"
                label='Password'
                placeholder='Password'
                onChange={(event) => this.handlePassword(event)}
                onBlur={() => this.onBlurHandlePassword()}
                error={this.state.validationPasswordError.message}
              />
              {
                this.state.validationPasswordError ?
                this.state.validationPasswordError.message :
                null
               }
              <br/>
              {
                this.state.loading ?
                <p>Loading...</p> :
                <button
                  content='Login'
                  onClick={() => this.handleClick(event)}>
                  Login
                </button>
              }
              {
                this.state.showServerSideError ?
                this.state.showServerSideError.message :
                null
              }
            </form>
          </a>
        </div>
        <style jsx>{`
          .hero {
          width: 100%;
          color: #333;
          }
          .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
          }
          .title,
          .description {
          text-align: center;
          }
          .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          }
          .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
          }
          .card:hover {
          border-color: #067df7;
          }
          .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
          }
          .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
          }
        `}</style>
      </div>
    )
  }
}

export default withRedux(SignIn)

