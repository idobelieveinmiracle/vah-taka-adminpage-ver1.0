import React, { Component } from 'react'
import Axios from 'axios';
import {hostname} from "../GlobalVariables";
import { Link } from "react-router-dom";

export default class ItemInfo extends Component {
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
          }
        })
      }    
    }, 1000);
     
  }
  render() {
    if (!this.state._id) return (<p>loading...</p>)
    const displayProps = this.state.properties.map(prop => (
      <p key={prop}>{prop}</p>
    ))

    return (
      <div className="container">
      <h3>Item Infomation</h3>
      <div className="row">
        <div className="col-sm-2">
          <img width="100%" src={ this.state.img } alt="no img"/>
        </div>
        <div className="col-sm-10">
          <p><strong>ID: </strong>{this.state._id}</p>
          <p><strong>Name: </strong>{this.state.name}</p>
          <p><strong>Brand: </strong>{this.state.brand}</p>
          <p><strong>Category: </strong>{this.state.category}</p>
          <p><strong>Price: </strong>{this.state.price}</p>
          <p><strong>Number: </strong>{this.state.number}</p>
          <p><strong>Props: </strong></p>
          {displayProps}

          
          <Link className="col-sm-1 btn btn-primary" to={`/edit_item/${this.state._id}`}>Sửa</Link> 
          <div className="col-sm-1"></div>
          <Link className="col-sm-1 btn btn-primary" to={`/delete_item/${this.state._id}`}>Xóa</Link>
          <div className="col-sm-9"></div>
        </div>
      </div>
        
      </div>
    )
  }
}
