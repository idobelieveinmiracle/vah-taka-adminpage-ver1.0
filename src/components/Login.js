import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password); // call login function from props
    this.props.history.push('/');
  }

  render() {
    if (this.props.id !== "") return (
      <div className="container">
        <h3>Loged in</h3>
      </div>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <h1 style={ {textAlign: "center"} }>Đăng nhập</h1>
            <form onSubmit={ this.handleSubmit }>
              <div className="form-group">
                <label htmlFor="username">Tên dăng nhập:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  placeholder="Enter username" 
                  name="username" 
                  onChange={ this.handleChange }
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu:</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter password" 
                  name="password"
                  onChange={ this.handleChange }
                />
              </div>
              <button id="submitBtn" type="submit" className="btn btn-default">Đăng nhập</button><br/><br/>
            </form>
          </div>
        </div>        
      </div>
    )
  }
}
