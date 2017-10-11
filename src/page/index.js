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
  IEVersion =()=> {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
  }

  render() {
    return (    
     <div className="page" style={{overflow:'hidden'}}>  
       {
         this.changeStatus()
       }
      
        <div className="back_shape-wrap">
        {this.IEVersion() < 0 ?
       
          <svg className="back_shape" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path d="M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z" ></path>
          </svg>
         : '' }
        </div>
      
      
     </div>
    );
  }
}

export default MainPage;
