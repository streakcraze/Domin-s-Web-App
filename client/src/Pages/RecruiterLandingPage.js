import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import  './RecruiterSignUp.css';
import img2 from './img2.jpg';

export class RecruiterLandingPage extends Component {

  
  render() {

    return (
      <div>
          <div className="Vid">
  <img src={img2} alt=""/>
</div>
       Welcome 

       <div className='section1' > 
<p>Be able to upload available job vacancies.<br/>
   Browse the various applicants and resumes</p>
    </div>

  <Link to="/jobsupload"><button type="button" value='submit' id='btn' onClick={this.submit}>Post Vacancy</button></Link>  
    <button type="button" value='submit' id='btn1' onClick={this.submit}>View Applicants</button>

      </div>
    )
  }
}

export default RecruiterLandingPage
