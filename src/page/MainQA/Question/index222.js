import React, { Component } from 'react';

import {Checkbox} from 'material-ui';
// import GSAP from 'react-gsap-enhancer';
import {TweenLite} from "gsap";
var isSafari = /constructor/i.test(window.HTMLElement);
var isFF = !!navigator.userAgent.match(/firefox/i);

class Question extends Component {
	
	constructor(props) {
		super(props);
		this.TweenFn = this.TweenFn.bind(this);
		this.questionAnswer = this.questionAnswer.bind(this);
	}

	state = {
		items: '',
		duration: 300,
		answers:[],
	}
	
	questionAnswer = (answer,e)=> {
		console.log(e)
		this.doChange(e);
		let an = this.state.answers;
		let qa = {
			q:this.state.items.id,
			a:answer
		}
		let oldAnswer = this.state.answers;
		let newAnswer = oldAnswer.push(qa);
		setTimeout(() => {
			this.setState({answer:newAnswer,items: this.props.question(this.state.answers)})
		}, 750);
	}
	
	componentDidMount() {
		this.setState({items: this.props.question(this.state.answers)});
	}

	TweenFn= (e)=> {
		this.doChange(e);
	}

	doChange =(e)=>{
		var bt = document.querySelectorAll('#main-quiz')[0];
		var turb = document.querySelectorAll('#filter-ripple-1 feImage')[0];
		var dm = document.querySelectorAll('#filter-ripple-1 feDisplacementMap')[0];
		TweenLite.set(turb, { attr: { x: isFF ? e.nativeEvent.offsetX : e.nativeEvent.offsetX + 10, y: isFF ? e.nativeEvent.offsetY : e.nativeEvent.offsetY + 10, width: 0, height: 0 } });
		TweenLite.to(turb, 3, { attr: { x: '-=300', y: '-=300', width: 600, height: 600} });
		TweenLite.fromTo(dm, 2, { attr: { scale: 20,backgroundColor:"black" } }, { attr: { scale: 0,backgroundColor:"#fff" } });
	}


	render() {

		return (
			<div id="main-quiz" style={{filter:`url('#filter-ripple-1')`}} onClick={this.TweenFn}>
				<div dangerouslySetInnerHTML={{__html: 
					`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-filters">
						<defs>
							<filter id="filter-ripple-1">
								<feImage xlink:href="image/ripple.png" x="30" y="20" width="0" height="0" result="ripple"></feImage>
								<feDisplacementMap xChannelSelector="R" yChannelSelector="G" color-interpolation-filters="sRGB" in="SourceGraphic" in2="ripple" scale="20" result="dm" />
								<feComposite operator="in" in2="ripple"></feComposite>
								<feComposite in2="SourceGraphic"></feComposite>
							</filter>
						</defs>
					</svg>`}} />
					<div className="mainQuestion">		       
							<h3 className="main-question">
								{this.props.num + "." + this.state.items.question}
							</h3>
							<div className="main-answer">
								{
									this.state.items !== '' ? this.state.items.option.map((op)=> {
										return <div key={this.state.items.id*10 + op.id} onClick={(e)=> this.questionAnswer(op.id, e)}>{op.text}</div>
									}) : ''
								}
							</div>			
					</div>		
							
			</div>
		);
	}
}
  
// export default GSAP()(Question);
export default Question;