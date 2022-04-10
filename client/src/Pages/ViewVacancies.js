import React, { Component } from 'react'
import axios from 'axios';
import './vacancies.css';


export class ViewVacancies extends Component {

    constructor(props){
        super(props);

        this.state ={
            data: []
          }
          this.getVacancies = this.getVacancies.bind(this);
      
    }

    componentDidMount(){
        console.log('vacancypage');
        axios.get('http://localhost:5000/api/getitems')
        .then(response => {
            console.log(response);
            this.setState({
                data : response.data
            })
        }
            )

    }

    getVacancies() {
    
        return this.state.data.map(vacancy => 
            <div  class="wrapper" >
            <div class="outer">
                <div class="content animated fadeInLeft">
                    <span class="bg animated fadeInDown">{vacancy.jobTitle}</span>
                    <h1>{vacancy.jobDescription}</h1>
                    
                    <p>{vacancy.jobLocation}</p>
                    <p>{vacancy.workExperience}</p>
                    <div class="button">
                        <a class="cart-btn" href="#"><i class="cart-icon ion-bag"></i>APPLY JOB</a>
                    </div>
                    
                </div>
               
            </div>
           
        </div>
                )
            
    }
  render() {
    return (
    
      <div style={{flexDirection : 'column', alignItems:'center',backgroundColor:'#262626', }}>


        {this.getVacancies()}
        
      </div>
    )
  }
}

export default ViewVacancies
