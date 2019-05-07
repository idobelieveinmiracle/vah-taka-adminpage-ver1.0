import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {hostname} from "../GlobalVariables";
import Axios from 'axios';

export default class Item extends Component {
  state = {
    items: [],
    search: ""
  }

  componentDidMount = () => {
    setTimeout(()=>{
      //console.log(this.props.id);
      if (!this.props.id) this.props.history.push('/');
      else{
        Axios.get(`${hostname}/items`).then(res => {
          // console.log(res.data);
          if (res.data) this.setState({
            items: res.data
          })
        })
      } 
    }, 1000);
        
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.search) {
      Axios.get(`${hostname}/items/search/${this.state.search}`).then(res => {
        console.log(res.data);
        if (res.data) this.setState({
          items: res.data
        })
      })
    } else {
      Axios.get(`${hostname}/items`).then(res => {
        console.log(res.data);
        if (res.data) this.setState({
          items: res.data
        })
      })
    }
    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    if (this.state.items.length === 0) return (<p>loading...</p>)
    const displayItems = this.state.items.map(item => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.number}</td>
        <td>{item.category}</td>
        <td>{item.brand}</td>
        <td>
          <Link className="col-sm-4" to={`/info_item/${item._id}`}>Detail</Link> 
          <Link className="col-sm-4" to={`/edit_item/${item._id}`}>Edit</Link> 
          <Link className="col-sm-4" to={`/delete_item/${item._id}`}>Delete</Link>
        </td>
      </tr>
    ));

    return (
      <div className="container">
        <h3>List Item</h3>
        <div className="row">
          <div className="col-sm-1">
            <Link to="/add_item" className="btn btn-primary">Add Item</Link>
          </div>
          <div className="col-sm-11">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.search} 
                  onChange={this.handleChange} 
                  placeholder="Search"
                  id="search"
                />

                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
      </div>
    )
  }
}
