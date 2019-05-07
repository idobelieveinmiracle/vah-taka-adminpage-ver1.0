import React, { Component } from 'react'
import Axios from 'axios';
import {hostname} from "../GlobalVariables";
import { Link } from "react-router-dom";

export default class OrderInfo extends Component {
  state = {
    order: null
  }

  componentDidMount = () => {
    setTimeout(() => {
      if (! this.props.id) this.props.history.push("/");
      else {
        Axios.post(`${hostname}/orders/get/${this.props.match.params.id}`, {
          user: {
            username: this.props.username,
            password: this.props.password
          }
        }).then(res => {
          if (res.status === 200) {
            //console.log(res.data.items);
            this.setState({
              order: res.data
            })
          } else this.props.history.push("/order_manager");
        }).catch(() => this.props.history.push("/order_manager"))
      }
    }, 1000);
  }

  nextSTT = (e) => {
    Axios.put(`${hostname}/orders/${this.state.order._id}`, {
      user: {
        username: this.props.username,
        password: this.props.password
      },
      order: {
        status: this.state.order.status === "ORDERED" ? "SHIPPING" : "DONE"
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        this.setState({
          order: res.data
        })
      } else alert("error");
    }).catch(() => alert("error"))
  }

  cancelOrder = () => {
    Axios.put(`${hostname}/orders/${this.state.order._id}`, {
      user: {
        username: this.props.username,
        password: this.props.password
      },
      order: {
        status: "CANECLED"
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        this.setState({
          order: res.data
        })
      } else alert("error");
    }).catch(() => alert("error"))
  }

  render() {
    if (this.state.order === null) return (<p>loading...</p>)
    const {order} = this.state;

    if (order === null) return (<p>loading...</p>)

    const displayButton = order.status === "ORDERED" ? (
      <button type="button" className="btn btn-primary col-sm-3" onClick={this.nextSTT}>Ship now</button>
    ) : (
      order.status === "SHIPPING" ? (
        <button type="button" className="btn btn-primary col-sm-3" onClick={this.nextSTT}>Done</button>
      ) : (<span></span>)
    )

    const displayCancel = order.status === "ORDERED" ? (
      <button type="button" className="btn btn-warning col-sm-3" onClick={this.cancelOrder}>Cancel</button>
    ) : (<span></span>)

    const displayItems = order.items.map(item => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.number}</td>
        <td>{item.category}</td>
        <td>{item.brand}</td>
        <td>
          <Link className="col-sm-4" to={`/info_item/${item._id}`}>Detail</Link> 
        </td>
      </tr>
    ))

    return (
      <div className="container">
        <h3>Order information</h3>
        <div>
          <p><strong>Order ID: </strong>{order._id}</p>
          <p><strong>Total price: </strong>{order.total}</p>
          <p><strong>Order date: </strong>{formatDate(new Date(order.date))}</p>
          <p><strong>Reciever: </strong>{order.fullName}</p>
          <p><strong>Address: </strong>{order.address}</p>
          <p><strong>Phone: </strong>{order.phone}</p>
          <p><strong>Payment: </strong>{order.payment}</p>
          <p><strong>Status: </strong>{order.status}</p>
        </div>
        <h3>List items</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="col-sm-6">Name</th>
              <th className="col-sm-1">Price</th>
              <th className="col-sm-1">Available</th>
              <th className="col-sm-1">Category</th>
              <th className="col-sm-1">Brand</th>
              <th className="col-sm-2"></th>
            </tr>
          </thead>
          <tbody>
            {displayItems}     
          
          </tbody>
        </table>
        <div className="col-sm-4">
          {displayButton}
          <div className="col-sm-1"></div>
          {displayCancel}
        </div>
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

