import React, { Component } from 'react';
import _ from 'lodash';
import anime from 'animejs'
import logo from '../logo.svg';
import qalist from '../../data/questionCN.js';
import resultlist from '../../data/resultCN.js';
import productlist from '../../data/productCN.js';
import Question from './Question';
import Result from './Result';
import shapes from '../../data/shape.js'


class MainQA extends Component {

  state = {
    status: 'question',
    resultId: 1,
    productType: '',
    productNum: '',
    num: 0,
    pos: 0,
    DOM: {},
  }

  handleQuestion = (an) => {
    let id = 1;
    let numold = this.state.num;

    //
    //handle result
    if (an.length > 0) {

      let lastid = _.last(an).q;
      id = lastid + 1;

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
            this.setState({ productType: 2 });
            break;
          case 3:
            this.setState({ productType: 3 });
            break;
          case 4:
            this.setState({ productType: 4 });
            break;
          default:
            break;
        }
      }
      if (lastid === 51) {
        if (an[4].a === 1) {
          this.setState({ status: 'finished', product: 'MESE1', resultId: 5 });
        } else {
          this.setState({ status: 'finished', product: 'MESE2', resultId: 6 });
        }
      }
      if (lastid === 6) {
        if (an[5].a === 3) {
          id = 71;
        }
      }
      if (lastid === 7) {
      }
      if (lastid === 71) {
        id = 81;
      }
      if (lastid === 8) {
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
            if (this.state.productType === 1) {
              this.setState({ productType: 2 });
            }
          default:
            id = 11;
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
            this.setState({ productType: 2 });
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
    this.setState({ pos: oldpos + 1 }, () => this.initShapeEl(this.state.DOM))
    //handle background

    setTimeout(() => {
      this.setState({ num: numold + 1 });
    }, 500);


    return _.find(qalist, (qa) => {
      return qa.id === id;
    })
  }

  findAnByQuestionId = (anlist, id) => {
    return _.result(_.find(anlist, { 'q': id }), 'a');
  }

  findResultId = () => {
    var type = this.state.productType;
    var num = this.state.productNum;
    if (num === 1) {
      return 1;
    } else if (num === 2) {
      return 2;
    } else if (num === 3) {
      if (type === 5) {
        return 4;
      } else {
        return 3;
      }
    } else if (num === 4 && type !== 5) {
      return 4;
    }
  }

  handleResult = () => {
    return _.find(resultlist, (result) => {
      return result.id === this.state.resultId;
    });
  }

  handleProduct = () => {

    let product = _.result(_.find(productlist, { 'id': this.state.productType}), 'option');
    return _.find(product, { 'id': this.state.productNum});
  
  }

  theMainStage = () => {

    if (this.state.status === "question") {
      return <Question question={(an) => this.handleQuestion(an)} num={this.state.num} />
    }
    else {
      return <Result result={() => this.handleResult()} product={() => this.handleProduct()} />
    }
  }

  handleProcessBar = () => {
    let bar = `<span class="solid"></span>`;
    for (let x = 1; x < this.state.num; x++) {
      bar = bar + `<span class="solid"></span>`
    }

    for (let i = this.state.num; i < 13; i++) {
      bar = bar + `<span class="empty"></span>`
    }
    return bar;
  }

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
      scaleX: shapes[this.state.pos].scaleX,
      scaleY: shapes[this.state.pos].scaleY,
      translateX: shapes[this.state.pos].tx + 'px',
      translateY: shapes[this.state.pos].ty + 'px',
      rotate: shapes[this.state.pos].rotate + 'deg'
    });

    this.initShapeLoop(this.state.pos, DOM);
  };

  componentDidMount() {
    const DOM = {};
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('path');
    this.setState({ pos: 0, DOM: DOM })
    this.initShapeEl(this.state.DOM)
  }

  render() {
    return (
      <div className="main-qa">
        <div className="background" dangerouslySetInnerHTML={{
          __html:
          `<svg class="morph" width="1400" height="770" viewBox="0 0 1400 770">
					  <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z"/>
				  </svg>`}} />
        <div className="header">
          <h1>ONLINE COUNSELING</h1>
          <div className="processbar">
            {
              <div dangerouslySetInnerHTML={{ __html: this.handleProcessBar() }} />
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
