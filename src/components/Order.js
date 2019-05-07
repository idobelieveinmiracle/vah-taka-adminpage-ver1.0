import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {hostname} from "../GlobalVariables";
import Axios from 'axios';

export default class Order extends Component {
  state = {
    orders: [],
    dislayOrders: []
  }

  componentDidMount = () => {
    setTimeout(()=>{
      //console.log(this.props.id);
      if (!this.props.id) this.props.history.push('/');
      else{
        Axios.post(`${hostname}/orders/get_all`, {
          user: {
            username: this.props.username,
            password: this.props.password
          }
        }).then(res => {
          console.log(res.data);
          if (res.data) this.setState({
            orders: res.data,
            dislayOrders: res.data
          })
        })
      } 
    }, 1000);
    
    
  }

  handlChange = (e) => {
    // console.log(e.target.value);
    let dislayOrders;
    switch(e.target.value) {
      case "Carts":
        dislayOrders = this.state.orders.filter(order => order.status === "CART");
        this.setState({
          dislayOrders
        })
        break;
      case "Ordered":
        dislayOrders = this.state.orders.filter(order => order.status === "ORDERED");
        this.setState({
          dislayOrders
        })
        break;
      case "Shipping":
        dislayOrders = this.state.orders.filter(order => order.status === "SHIPPING");
        this.setState({
          dislayOrders
        })
        break;
      case "Paid":
        dislayOrders = this.state.orders.filter(order => order.payment === "Paid" || order.payment === "PaidByPaypal");
        this.setState({
          dislayOrders
        })
        break;
      case "Did not pay":
        dislayOrders = this.state.orders.filter(order => order.payment === "NotPay");
        this.setState({
          dislayOrders
        })
        break;
      case "Done":
        dislayOrders = this.state.orders.filter(order => order.status === "DONE");
        this.setState({
          dislayOrders
        })
        break;
      default:
        Axios.post(`${hostname}/orders/get_all`, {
          user: {
            username: this.props.username,
            password: this.props.password
          }
        }).then(res => {
          console.log(res.data);
          if (res.data) this.setState({
            orders: res.data,
            dislayOrders: res.data
          })
        })
        break;
    }
  }

  render() {
    if (this.state.orders.length === 0) return (<p>loading...</p>)
    const ordersDisplay = this.state.dislayOrders.map(order => (
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.fullName}</td>
        <td>{order.address}</td>
        <td>{formatDate(new Date(order.date))}</td>
        <td>{order.status}</td>
        <td>{order.payment}</td>
        <td>
          <Link to={`/info_order/${order._id}`}>Detail</Link> 
        </td>
      </tr>
    ))

    return (
      <div className="container">
        <h3>List Orders</h3>
        <div className="form-group">
          <select className="form-control" id="filter" onChange={this.handlChange}>
            <option>All orders</option>
            <option>Carts</option>
            <option>Ordered</option>
            <option>Shipping</option>
            <option>Done</option>
            <option>Paid</option>            
            <option>Did not pay</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="col-sm-2">ID</th>
              <th className="col-sm-2">Receiver</th>
              <th className="col-sm-4">Address</th>
              <th className="col-sm-1">Order Date</th>
              <th className="col-sm-1">Status</th>
              <th className="col-sm-1">Payment</th>
              <th className="col-sm-1"></th>
            </tr>
          </thead>
          <tbody>   
          {ordersDisplay}
          </tbody>
        </table>
      </div>
    )
  }
}

function formatDate(date) {
  console.log(date);
  var day = date.getDate();
  var monthIndex = date.getMonth()+1;
  var year = date.getFullYear();

  if (monthIndex < 10) monthIndex = '0'+monthIndex;
  if (day < 10) day = '0'+day;

  return day + '-' + monthIndex + '-' + year;
}
