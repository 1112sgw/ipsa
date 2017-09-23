import React, { Component } from 'react';
import _ from 'lodash';
import Landing from './Landing';
import MainQA from './MainQA';
import './page.css';
import anime from 'animejs'

class MainPage extends Component {

  state={
    status: "open",
  }

  componentDidMount() {
    
  }



  changeStatus = ()=>{
    
    if(this.state.status !== "start") {
      return <Landing startQA={()=>this.startQA()}/>
    }
    else{
     return <MainQA />
    }
  }

  startQA = ()=> {
		this.setState({status:'start'})
  }

  render() {
    return (    
     <div className="page" style={{overflow:'hidden'}}>  
       {
         this.changeStatus()
       }
       {/* <MainQA /> */}
       <div className="back_shape-wrap">
          <svg className="back_shape" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path d="M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z" ></path>
          </svg>
        </div>
     </div>
    );
  }
}

export default MainPage;
