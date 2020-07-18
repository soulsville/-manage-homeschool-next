import * as React from 'react';
import stylesheet from 'antd/dist/antd.min.css';
import Link from 'next/link';
import {Card, Button, Layout, Avatar, Empty} from 'antd';


const { Header, Footer, Sider, Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.siderImage = this.siderImage.bind(this);
    this.headerLogo = this.headerLogo.bind(this);
  }
  siderImage()  {
    return <img src="/images/test.jpg"/>
  }
  headerLogo() {
    return
  }
  render() {
    return (
      <React.Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
      {/*Header starts here*/}
      <Layout>
        <Header
          style={{position: 'fixed',
                  zIndex: 1,
                  width: '100%',
                  backgroundColor: "#FBEECA"}}>
          {/*Sign Up Button*/}
          <Button
            type="link"
            href="sign_up"
            style={{float:'right',
              marginLeft:"1.0rem",
              marginTop:"1.0rem",
              backgroundColor:"#004E56",
              border: 'none',
              color:"white"}}>
              Sign Up
          </Button>
          {/*Login Button*/}
          <Button
            type="link"
            href="/sign_in"
            style={{float:'right',
              marginTop:"1.0rem",
              backgroundColor:"#004E56",
              border: 'none',
              color:"white"}}>
              Login
          </Button>
          {/*Dog Header Mascot*/}
          <a href="/">
            <Avatar size={50} shape="square" src="/images/headerLogo.png" style={{float:'left', marginTop:"0.6rem", marginLeft:"-1.0rem"}}></Avatar>
          </a>
          {/*Header Title*/}
          <a href="/">
            <p style={{color: 'black', fontFamily: 'Marker Felt', fontSize: 'large', fontWeight: 'bold', float:'left', marginLeft:"0.5rem", marginTop:"0.3rem"}}> HomeSchoolZen </p>
          </a>
        </Header>
      </Layout>
      <Card>
        <p></p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      </React.Fragment>
    )
  }
}
