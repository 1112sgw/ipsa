import React, { Component } from 'react';
import _ from 'lodash';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import anime from 'animejs'
import {VelocityTransitionGroup, velocityHelpers, VelocityComponent} from 'velocity-react';
import logo from '../logo.svg';
import qalist from '../../data/questionCN.js';
import resultlist from '../../data/resultCN.js';
import productlist from '../../data/productCN.js';
import Question from './Question';
import Result from './Result';
import shapes from '../../data/shape.js';
import {RaisedButton} from 'material-ui';


class MainQA extends Component {

  state = {
    status: 'question',
    resultId: 1,
    isIn:true,
    first:true,
    productType: 0,
    productNum: 0,
    pos: 0,
    DOM: {},
    processId: 0,
    processTotle: 13
  }

  handleQuestion = (an) => {
    let id = 1;
    let processId = 0;
    let processTotle = 13;
    if (!this.state.first) {
      this.setState({isIn: !this.state.isIn});
      setTimeout(() => {
        this.setState({
          isIn: !this.state.isIn,
        });
      }, 1000);
    }
    this.setState({first: false});
    if (an.length > 0) {

      let lastid = _.last(an).q;
      id = lastid + 1;
      processId = this.state.processId + 1;
      processTotle  = this.state.processTotle;

      if (lastid === 1) {
        switch (this.findAnByQuestionId(an, 1)) {
          case 1:
          case 2:
            this.setState({ productType: 1 });
            break;
          case 3:
            this.setState({ productType: 2 });
            break;
          case 4:
          case 5:
          case 5:
            this.setState({ productType: 3 });
            break;
          default:
            break;
        }
      }
      if (lastid === 4) {
        if (this.findAnByQuestionId(an, 3) === 1) {
          this.setState({ status: 'finished', resultId: 0 });
          return [];
        } else {
          if (an[3].a === 1) {
            id = 51;
          } else {
            id = 5;
          }
        }
      }
      if (lastid === 5) {
        switch (this.findAnByQuestionId(an, 5)) {
          case 1:
            this.setState({ productType: 1 });
            break;
          case 2:
            if (this.state.productType === 1) {
              this.setState({ productType: 2 });
            }
            break;
          case 3:
            if (this.state.productType === 1 || this.state.productType === 2) {
              this.setState({ productType: 3 });
            }
            break;
          case 4:
            if (this.state.productType === 1 || this.state.productType === 2 || this.state.productType === 3) {
              this.setState({ productType: 4 });
            }
            break;
          default:
            break;
        }
      }
      if (lastid === 51) {
        if (this.findAnByQuestionId(an, 51) === 1) {
          this.setState({ productType: 4, productNum: 1, status: 'finished' }, () => {
            this.setState({ resultId: this.findResultId() });
          });
        } else {
          this.setState({ productType: 4, productNum: 2, status: 'finished' }, () => {
            this.setState({ resultId: this.findResultId() });
          });
        }
        return [];
      }
      if (lastid === 6) {
        if (an[5].a === 3) {
          id = 71;
        }
      }
      if (lastid === 7) {
        if (this.state.productType === 4) {
          if (this.findAnByQuestionId(an, 7) === 1) {
            this.setState({ productNum: 2 });
          } else {
            this.setState({ productNum: 1 });
          }
        }
      }
      if (lastid === 71) {
        id = 81;
      }
      if (lastid === 8) {
        if (this.state.productType !== 4) {
          var anOfQ7 = this.findAnByQuestionId(an, 7);
          if (this.findAnByQuestionId(an, 8) === 1) {
            switch (anOfQ7) {
              case 1:
                this.setState({ productNum: 4 });
                break;
              case 2:
                this.setState({ productNum: 3 });
                break;
              default:
                break;
            }
          } else {
            switch (anOfQ7) {
              case 1:
                this.setState({ productNum: 2 });
                break;
              case 2:
                this.setState({ productNum: 1 });
                break;
              default:
                break;
            }
          }
        }
      }
      if (lastid === 81) {
        id = 9;
        var anOfQ71 = this.findAnByQuestionId(an, 71);
        if (this.findAnByQuestionId(an, 81) === 1) {
          switch (anOfQ71) {
            case 1:
              this.setState({ productType: 5, productNum: 3 });
              break;
            case 2:
              this.setState({ productType: 5, productNum: 1 });
              break;
            default:
              break;
          }
        } else {
          switch (anOfQ71) {
            case 1:
              this.setState({ productType: 5, productNum: 2 });
              break;
            case 2:
              this.setState({ productType: 5, productNum: 1 });
              break;
            default:
              break;
          }
        }
      }
      if (lastid === 9) {
        switch (this.findAnByQuestionId(an, 9)) {
          case 1:
            id = 10;
            break;
          case 8:
            id = 101;
            break;
          case 5:
          case 6:
            id = 11;
            processTotle--;
            if (this.state.productType === 1) {
              this.setState({ productType: 2 });
            }
            break;
          default:
            id = 11;
            processTotle--;
            break;
        }
      }
      if (lastid === 101) {
        id = 11;
        if (this.findAnByQuestionId(an, 9) === 2) {
          if (this.state.productType === 1 || this.state.productType === 2) {
            this.setState({ productType: 3 });
          } else if (this.state.productType === 3) {
            this.setState({ productType: 5 });
            switch (this.state.productNum) {
              case 1:
              case 3:
                this.setState({ productNum: 1 });
                break;
              case 2:
                this.setState({ productNum: 2 });
                break;
              case 4:
                this.setState({ productNum: 3 });
                break;
              default:
                break;
            }
          }
        }
      }
      if (lastid === 11) {
        if (this.findAnByQuestionId(an, 11) === 3) {
          id = 111;
          processTotle++;
        }
      }
      if (lastid === 111) {
        id = 12;
        switch (this.findAnByQuestionId(an, 111)) {
          case 3:
            if (this.state.productType === 1) {
              this.setState({ productType: 2 });
            }
            break;
          case 4:
            if (this.state.productType === 1 || this.state.productType === 2) {
              this.setState({ productType: 3 });
            }
            break;
          default:
            break;
        }
      }
      if (lastid === 13) {
        if (this.findAnByQuestionId(an, 13) === 1) {
          if (this.state.productType === 1) {
            this.setState({ productType: 2 }, ()=>{
              this.setState({resultId: this.findResultId()});
            });
          }
        }
        this.setState({ status: 'finished', resultId: this.findResultId() });
        return [];
      }
    }
    let oldpos = this.state.pos;
    if (oldpos === 5) {
      oldpos = -1;
    }
    this.setState({ pos: oldpos + 1, processId: processId, processTotle: processTotle }, () => this.initShapeEl(this.state.DOM))
    //handle background
    return _.find(qalist, (qa) => {
      return qa.id === id;
    })
  };

  findAnByQuestionId = (anlist, id) => {
    return _.result(_.find(anlist, { 'q': id }), 'a');
  };

  findResultId = () => {
    let type = this.state.productType;
    let num = this.state.productNum;
    if (type === 1 || type === 2 || type === 3) {
      switch (num) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
          return 3;
          break;
        case 4:
          return 4;
          break;
        default:
          break;
      }
    } else if (type === 4) {
      switch (num) {
        case 1:
          return 5;
          break;
        case 2:
          return 6;
          break;
        default:
          break;
      }
    } else if (type === 5) {
      switch (num) {
        case 1:
          return 1;
          break;
        case 2:
          return 2;
          break;
        case 3:
          return 4;
          break;
        default:
          break;
      }
    }
  };

  handleResult = () => {
    return _.find(resultlist, (result) => {
      return result.id === this.state.resultId;
    });
  };

  handleProduct = () => {
    let product = _.result(_.find(productlist, { 'id': this.state.productType }), 'option');
    return _.find(product, { 'id': this.state.productNum });

  };

  theMainStage = () => {
    if (this.state.status === "question") {
      return <Question question={(an) => this.handleQuestion(an)} num={this.state.num} handleProcess={()=> this.updateProcessId()} ref='reStartTest'  />
    }
    else {
      return <Result result={() => this.handleResult()} product={() => this.handleProduct()} />
    }
  };

  backToLastQuestion = () => {
    if(this.state.status === "finished"){
      this.setState({status: "question"})
    }else{
      this.refs.reStartTest.restart();
    }
  }

  updateProcessId = () =>{
    var oldprocess = this.state.processId - 1;
    this.setState({processId:  oldprocess})
  }

  handleProcessBar = () => {
    console.log(this.state.status)
    if(this.state.status === "question") {
      let bar = `<span class="solid"></span>`;
      for (let x = 0; x < this.state.processId; x++) {
        bar = bar + `<span class="solid"></span>`
      }
      for (let i = this.state.processId + 1; i < this.state.processTotle; i++) {
        bar = bar + `<span class="empty"></span>`
      }
      return bar;
    }else{
      return "";
    }

  };

  initShapeLoop = (pos, DOM) => {
    anime.remove(DOM.shapeEl);
    anime({
      targets: DOM.shapeEl,
      easing: 'linear',
      d: [{ value: shapes[pos].pathAlt, duration: 3500 }, { value: shapes[pos].path, duration: 3500 }],
      loop: true,
      fill: {
        value: shapes[pos].fill.color,
        duration: shapes[pos].fill.duration,
        easing: shapes[pos].fill.easing
      },
      direction: 'alternate'
    });
  };

  initShapeEl = (DOM) => {
    anime.remove(DOM.svg);
    anime({
      targets: DOM.svg,
      duration: shapes[this.state.pos].animation.svg.duration,
      easing: shapes[this.state.pos].animation.svg.easing,
      elasticity: shapes[this.state.pos].animation.svg.elasticity || 0,
      scaleX: shapes[this.state.pos].scaleX / 2,
      scaleY: shapes[this.state.pos].scaleY / 2,
      translateX: shapes[this.state.pos].tx + 'px',
      translateY: shapes[this.state.pos].ty + 'px',
      rotate: shapes[this.state.pos].rotate + 'deg'
    });

    this.initShapeLoop(this.state.pos, DOM);
  };

  componentDidMount() {
    // const DOM = {};
    // DOM.svg = document.querySelector('.morph');
    // DOM.shapeEl = DOM.svg.querySelector('path');
    // this.setState({ pos: 0, DOM: DOM })
    // this.initShapeEl(this.state.DOM)
  };

  render() {
    var animation = this.state.isIn ? 'transition.expandIn' : 'transition.expandOut';
    let duration = this.state.isIn ? 500 : 500;
    return (
      <div className="main-qa">
        {/* <div className="background" dangerouslySetInnerHTML={{
          __html:
          `<svg class="morph" width="1400" height="770" viewBox="0 0 1400 770">
					  <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"/>
				  </svg>`}} /> */}
        <div className="header">
         <div className="logoArea">
            <svg version="1.1" width="60px" height="60px" viewBox="0 0 24 24" fill="#000000" id="headerLogo">
              <path d="M5.223,3.934l0.693,0.56l-4.155,5.991L1,9.966l4.131-6.032H5.223z"/>
              <path d="M1.164,11.357h0.937v7.455H1.164V11.357z"/>
              <path d="M7.404,15.901l-0.293-0.779c0.585-0.146,1.209-0.266,1.449-0.879c0.12-0.312,0.154-0.65,0.097-0.979 c-0.167-0.85-0.829-1.137-2.187-0.993v6.547H5.527v-7.405c0.959,0.059,1.929-0.167,2.863,0.182c1.079,0.43,1.606,1.65,1.178,2.73 c-0.097,0.243-0.238,0.466-0.417,0.658C8.688,15.475,8.073,15.798,7.404,15.901z"/>
              <path d="M11.436,17.88l0.665-0.523c0.274,0.201,0.562,0.388,0.858,0.557c0.501,0.282,1.135,0.139,1.464-0.334 c0.35-0.435,0.308-1.065-0.097-1.45c-0.32-0.3-0.663-0.576-1.024-0.825c-0.365-0.246-0.717-0.512-1.055-0.793	c-0.603-0.516-0.785-1.372-0.445-2.089c0.363-0.73,1.13-1.174,1.944-1.124c0.644,0.032,1.238,0.356,1.616,0.878l-0.554,0.562	c-0.292-0.191-0.598-0.361-0.916-0.51c-0.403-0.146-0.854,0.01-1.08,0.373c-0.26,0.328-0.24,0.796,0.047,1.101	c0.263,0.275,0.552,0.525,0.86,0.746c0.381,0.293,0.803,0.548,1.172,0.88c0.793,0.708,0.986,1.645,0.556,2.462	c-0.475,0.885-1.489,1.336-2.466,1.096C12.364,18.743,11.817,18.387,11.436,17.88z"/>
              <path d="M17.4,18.689l2.296-7.356h1.288l1.982,7.356h-1.002l-1.656-6.557l-1.807,6.557H17.4z"/>
            </svg>
            <div className="online">在线肌肤测试</div>
            <span className="onlineSpan">ONLINE COUNSELING</span>
         </div>
          <div className="processbar">
            {
              <div dangerouslySetInnerHTML={{ __html: this.handleProcessBar() }} />
            }
          </div>
          <div onClick={this.backToLastQuestion} className="reTest">
            <svg fill="#82786f" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            重新测试
          </div>
        </div>
        <hr />
        <VelocityComponent key='slideLeftBig' animation={animation} duration={duration}>    
          {this.theMainStage()}     
        </VelocityComponent>
      </div>
    );
  }
}

export default MainQA;
