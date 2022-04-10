import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NavbarElements.js';
import './navbar.css';
export class NavBar extends Component {
  render() {
    return (
      
      <div>
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

  <ReactBootStrap.Navbar.Brand className='logo'> <Link to='/'>iKAZI</Link></ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="me-auto">
    
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
      <ReactBootStrap.NavDropdown title="Log In" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item >
          <Link to='/recruitersignin'>Recruiter</Link></ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Item >
          <Link to='/applicantsignin'>Applicant</Link></ReactBootStrap.NavDropdown.Item>      
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
     
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
  


</ReactBootStrap.Navbar>

      </div>
      
    )
  }

} 

//function NavBar(){
  //return(
//<ul>
//<li><link to="/">LandingPage</link></li>
//<li><link to="/employeepage">EmployeePage</link></li>
//<li><link to="/employerpage">EmployerPage</link></li>
//</ul>
  //)
//}

export default NavBar
