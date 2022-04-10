import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import NavBar from "../components/views/NavBar";
import axios from 'axios';
import  './RecruiterSignUp.css';
import img2 from './img2.jpg';

export class RecruiterSignIn extends Component {

  constructor(props){
    super(props);

    this.state ={
      userName:"",
      password:"",
      signInError:"",
      success:false
    }

    this.submit = this.submit.bind(this);
    this.changeInput = this.changeInput.bind(this);
    
  }

  changeInput = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  submit = (event) => {
    event.preventDefault();
   
    const data = this.state;
  
    axios.post('http://localhost:5000/api/recruitersignin',data)
    .then(
      res =>{
        if (!res.data.success){
          return this.setState({signInError: res.data.message})
        }

        this.setState({
          userName:"",
          password:"",
          signInError:"",
         success:true
        })
        

      }
    )

  } 


  render() {
    if(this.state.success){ 
      return <Redirect to={{
        pathname: "/recruiterlandingpage",
        search: "?utm=your+face",
        state: { userName: this.state.userName }
      }} />
    }
    return (
      <div>
         <NavBar/>
         <div className="Vid">
  <img src={img2} alt=""/>
</div>

      <div className='container' style={{marginTop:'130px', width:"600px", letterSpacing:'2px'}}>

              <div >
                    <h1>Recruiter Sign In</h1>
                    <label>userName :</label> <input type="text" id='userName' onChange={this.changeInput} placeholder="employeeName..." /><br />
                    <label>password :</label> <input type="password" id='password' onChange={this.changeInput} placeholder="email..." /><br />
                  
                    {this.state.signInError ? this.state.signInError : ''}
      <br/>
      <input type="button" value='submit' id='btn' onClick={this.submit} />
                    <p>If you do not have an account <Link to='/recruitersignup'>Sign Up</Link></p>
                </div>

      </div>
      </div>
    )
  }
}

export default RecruiterSignIn
