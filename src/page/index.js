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
     <div>
       {
         this.changeStatus()
       }
     </div>
    );
  }
}

export default MainPage;
