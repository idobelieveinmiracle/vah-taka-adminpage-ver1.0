import React, { Component } from 'react'
import Axios from 'axios';
import {hostname} from "../GlobalVariables";

export default class DeleteItem extends Component {
  state = {
    _id: "",
    name: "",
    category: "MOUPAD",
    properties: [],
    brand: "",
    img: "",
    number: "",
    price: "",
    property: "",
    categories: []
  }

  componentDidMount = () => {
    setTimeout(() => {
      const _id = this.props.match.params.id;
      //console.log(this.props.id);
      if (!this.props.id) this.props.history.push('/');
      else{
        Axios.get(`${hostname}/items/item/${_id}`).then(res => {
          console.log(res.status);
          if (res.status === 200) {
            this.setState(res.data);
            console.log(this.state._id);
          }
        })
      }    
    }, 1000);
     
  }

  deleteItem = (e) => {
    console.log(this.props.password);
    Axios.delete(`${hostname}/items/${this.props.match.params.id}`, {
      data: {
        username: this.props.username,
        password: this.props.password
      }
    }).then(res => {
      if (res.status === 200) {
        alert("deleted");
        this.props.history.push('/item_manager');
      } else alert('can not delete');
    }).catch(err => console.log(err));
  }

  render() {
    if (!this.state._id) return (<p>loading...</p>)
    return (
      <div className="container">
        <p>Are you sure to delete item {this.state.name}</p>
        <button type="button" onClick={this.deleteItem} className="btn btn-default">Sure vl</button>
      </div>
    )
  }
}
