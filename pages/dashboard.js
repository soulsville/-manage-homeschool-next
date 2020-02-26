// pages/dashboard.js
import React from 'react';
import Nav from '../components/nav';
import withAuth from '../src/helpers/withAuth';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: this.props.authUser,
    }
  }

  componentDidMount() {
    console.log("in component did mount");
    console.log(this.state.authUser)
    if(this.state.authUser !== null){
      
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <h1>Dashboard  Page</h1>
        <p>You can't go into this page if you are not authenticated.</p>
      </div>
    )
  }
}

export default withAuth(Dashboard);
