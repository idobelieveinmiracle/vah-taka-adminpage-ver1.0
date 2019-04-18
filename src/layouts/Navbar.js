import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.logout();
  }

  const logoutButton = props.id !== "" ? (<Link to="/" onClick={handleClick}>Log out</Link>) : (<span></span>);

  //console.log(props.id);

  return (    
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Taka</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="#">Item manager</Link></li>
            <li><Link to="#">Order manager</Link></li>
            <li>{logoutButton}</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
