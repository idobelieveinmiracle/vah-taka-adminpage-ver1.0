import React, { Component } from 'react';
import { withCookies } from "react-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import cf from "./GlobalVariables";
import Axios from 'axios';
import Navbar from './layouts/Navbar';
import Login from "./components/Login";

class App extends Component {
  state = {
    id: "",
    username: "",
    password: ""
  }

  componentDidMount = () => {
    const {cookies} = this.props;
    const {username, password} = cookies.cookies;
    console.log(username);

    Axios.post(`${cf.hostname}/users/login`, {
      username,
      password
    }).then(res => {
      //console.log(res);
      if (res.data) {
        if (res.data.role === "Ad") {
          this.props.cookies.set('username', username);
          this.props.cookies.set('password', password);
  
          this.setState({
            username,
            password,
            id: res.data._id
          })
        }        
      }
    }).catch();
  }

  login = (username, password) => {
    
    Axios.post(`${cf.hostname}/users/login`, {
      username,
      password
    }).then(res => {
      if (res.data) {
        if (res.data.role === "Ad") {
          this.props.cookies.set('username', username);
          this.props.cookies.set('password', password);
  
          this.setState({
            username,
            password,
            id: res.data._id
          })
        } else alert("Login failed");
      } else alert("Login failed");
    }).catch(err =>  alert("Login failed"));
  }

  logout = () => {    
    this.props.cookies.set('username', '');
    this.props.cookies.set('password', '');

    this.setState({
      username: "",
      password: "",
      id: ""
    });
    window.location.reload();
  }

  render() {
    return (
      <BrowserRouter>      
        <div className="App">
          <Navbar id={this.state.id} logout={this.logout} />
          <div className="container">
            <Switch>

              <Route 
                path="/"
                render={props =>
                  <Login {...props}
                    id={this.state.id}
                    login={this.login}
                  />
                }
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
