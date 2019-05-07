import React, { Component } from 'react';
import { withCookies } from "react-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {hostname} from "./GlobalVariables";
import Axios from 'axios';
import Navbar from './layouts/Navbar';
import Login from "./components/Login";
import Item from './components/Item';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import DeleteItem from './components/DeleteItem';
import ItemInfo from './components/ItemInfo';
import Order from './components/Order';
import OrderInfo from './components/OrderInfo';

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

    Axios.post(`${hostname}/users/login`, {
      type: "NORMAL",
      username,
      password
    }).then(res => {
      //console.log(res);
      if (res.status === 200) {
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
    Axios.post(`${hostname}/users/login`, {
      type: "NORMAL",
      username,
      password
    }).then(res => {
      if (res.status === 200) {
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
          <div className="container" style={{marginBottom: "50px"}}>
            <Switch>

              <Route 
                path="/item_manager"
                render={props =>
                  <Item {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/order_manager"
                render={props =>
                  <Order {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/add_item"
                render={props =>
                  <AddItem {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/edit_item/:id"
                render={props =>
                  <EditItem {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/delete_item/:id"
                render={props =>
                  <DeleteItem {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/info_item/:id"
                render={props =>
                  <ItemInfo {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

              <Route 
                path="/info_order/:id"
                render={props =>
                  <OrderInfo {...props}
                    id={this.state.id}
                    username={this.state.username}
                    password={this.state.password}
                  />
                }
              />

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
