import React, { Component } from 'react';
import _ from 'lodash';
import Landing from './Landing';
import MainQA from './MainQA';
import './page.css';
import anime from 'animejs'
import CanvasShow from './firework.js';






class MainPage extends Component {


  componentDidMount() {
  }

  render() {
    return (    
      <div className="main">
        {/* {<Landing />} */}
        {<MainQA />}
        <CanvasShow />
      </div>
    );
  }
}

export default MainPage;
