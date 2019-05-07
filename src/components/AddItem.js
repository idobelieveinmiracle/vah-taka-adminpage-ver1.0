import React, { Component } from 'react';
import Axios from 'axios';
import {hostname} from "../GlobalVariables";

export default class AddItem extends Component {
  state = {
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
    setTimeout(()=>{
      //console.log(this.props.id);
      if (!this.props.id) this.props.history.push('/');
      else{
        Axios.get(`${hostname}/items/categories`).then(res => {
          if (res.data) {
            this.setState({
              categories: res.data
            });
          }
        });
      } 
    }, 1000)
        
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddProperty = (e) => {
    //e.preventDefault();
    const current = this.state;
    this.setState({
      properties: [...current.properties, current.property],
      property: ""
    });
    
  }

  reset = (e) => {
    this.setState({   
      properties: []
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${hostname}/items`, {
      user: {
        username: this.props.username,
        password: this.props.password
      },
      item: this.state
    }).then(res => {
      if (res.status === 200) {
        alert("Added Item");
        this.setState({          
          name: "",
          properties: [],
          brand: "",
          img: "",
          number: "",
          price: "",
          property: ""
        });
      } else alert("Can not add item")
    })
  }

  render() {
    if (!this.props.id) return (<p>loading...</p>)
    const categoriesSelect = this.state.categories.map(category => (
      <option value={category.ID} key={category.ID}>{category.name}</option>
    ))

    const propertiesDisplay = this.state.properties.map(prop => (
      <p key={prop}>{prop}</p>
    ))

    const item = this.state;

    return (
      <div className="container">
        <div className="col-sm-1"></div>
        <form onSubmit={this.handleSubmit} className="col-sm-10">        
          <h3>Add item</h3>
          <div className="form-group">
            <label htmlFor="name">Item name:</label>
            <input value={item.name} onChange={this.handleChange} type="text" className="form-control" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select value={item.category.ID} onChange={this.handleChange} className="form-control" id="category">
              {categoriesSelect}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="properties">Properties:</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={this.state.property} 
                onChange={this.handleChange} 
                id="property"
              />

              <div className="input-group-btn">
                <button className="btn btn-default" onClick={this.handleAddProperty} type="button">
                  Add
                </button>
              </div>              
            </div>
          </div>                  
          <div>
            {propertiesDisplay}
          </div>
          <button onClick={this.reset} type="button" className="btn btn-default">Reset</button> 
          <div className="form-group">
            <label htmlFor="img">Item image:</label>
            <input value={item.img} onChange={this.handleChange} type="text" className="form-control" id="img" />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input value={item.brand} onChange={this.handleChange} type="text" className="form-control" id="brand" />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number:</label>
            <input value={item.number} onChange={this.handleChange} type="text" className="form-control" id="number" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input value={item.price} onChange={this.handleChange} type="text" className="form-control" id="price" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="col-sm-1"></div>
      </div>
    )
  }
}
