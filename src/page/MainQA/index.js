import React, { Component } from 'react';
import _ from 'lodash';
import anime from 'animejs'
import logo from '../logo.svg';
import qalist from '../../data/question.js';
import resultlist from '../../data/result.js';
import Question from './Question';
import Result from './Result';
import shapes from '../../data/shape.js'


class MainQA extends Component {

  state = {
    status: 'question',
    resultId : 1,
    num:0,
    pos:0,
    DOM:{},
  }
  


  handleQuestion = (an)=> {
    let id = 1;
    let numold = this.state.num;
    
    //
    //handle result
    if(an.length > 0) {
      let lastid = _.last(an).q;
      id = _.last(an).q + 1
   
      if(lastid === 4 && an[2].a === 1) {
        this.setState({status:'10',num:13});
        return [];
      }
      else if(lastid === 4 && an[2].a === 2 && an[3].a === 1) {
        id = 51
      }     
      else if(lastid === 51) {
        this.setState({status:'11',num:13})
        return [];
      }
      else if(lastid === 6 && _.last(an).a === 3) {
        id = 71
      }
      else if(lastid === 71) {
        id = 81
      }
      else if(lastid === 81) {
        id = 9
      }
      else if(lastid === 9 && _.last(an).a === 8) {
        id = 101
      }
      else if(lastid === 101) {
        id = 11
      }
      else if(lastid === 11 && _.last(an).a === 3) {
        id = 111
      }
      else if(lastid === 111) {
        id = 12
      }
      else if(lastid === 13) {
        this.setState({status:'finished',num:12})
      }     
    }

    let oldpos = this.state.pos;
    if(oldpos === 5) {
      oldpos = -1;
    }
    this.setState({pos: oldpos + 1}, ()=> this.initShapeEl(this.state.DOM))
    //handle background
    
    setTimeout(() => {
      this.setState({num: numold + 1});
    }, 500);


    return _.find(qalist, (qa)=> {
      return qa.id === id;
    })
  }

  handleResult = ()=> {
    return _.find(resultlist, (result)=> {
      return result.id === this.state.resultId;
    })
  }

  theMainStage = ()=> {

    if(this.state.status ==="question") {
      return <Question question= {(an)=> this.handleQuestion(an)} num={this.state.num}/>
    }
    else {
      return <Result result={()=> this.handleResult()} />
    }
  }

  handleProcessBar = ()=> {
    let bar = `<span class="solid"></span>`;
    for(let x=1; x< this.state.num; x++) {
      bar = bar + `<span class="solid"></span>`
    }

    for(let i=this.state.num; i< 13; i++) {
      bar = bar + `<span class="empty"></span>`
    }
    return bar;
  }

	initShapeLoop = (pos,DOM)=> {
		anime.remove(DOM.shapeEl);
		anime({
			targets: DOM.shapeEl,
			easing: 'linear',
			d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
			loop: true,
			fill: {
				value: shapes[pos].fill.color,
				duration: shapes[pos].fill.duration,
				easing: shapes[pos].fill.easing
			},
			direction: 'alternate'
		});
	};

	initShapeEl = (DOM)=> {
		anime.remove(DOM.svg);
    anime({
      targets: DOM.svg,
      duration: shapes[this.state.pos].animation.svg.duration,
      easing: shapes[this.state.pos].animation.svg.easing,
      elasticity: shapes[this.state.pos].animation.svg.elasticity || 0,
      scaleX: shapes[this.state.pos].scaleX,
      scaleY: shapes[this.state.pos].scaleY,
      translateX: shapes[this.state.pos].tx+'px',
      translateY: shapes[this.state.pos].ty+'px',
      rotate: shapes[this.state.pos].rotate+'deg'
    });

		this.initShapeLoop(this.state.pos,DOM);
	};

  componentDidMount() {
    const DOM = {};
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('path');
    this.setState({pos:0,DOM:DOM})
    this.initShapeEl(this.state.DOM)
  }

  render() {
    return (    
      <div className="main-qa">        				
        <div className="background" dangerouslySetInnerHTML={{__html: 
					`<svg class="morph" width="1400" height="770" viewBox="0 0 1400 770">
					  <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"/>
				  </svg>`}} />
        <div className="header">
          <h1>ONLINE COUNSELING</h1>
          <div className="processbar">
            {
              <div dangerouslySetInnerHTML={{__html:this.handleProcessBar()}} />           
            }
          </div>
        </div>
        <hr /> 
          {this.theMainStage()}
      </div>
    );
  }
}

export default MainQA;
