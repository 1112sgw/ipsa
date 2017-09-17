import React, { Component } from 'react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import {VelocityTransitionGroup, velocityHelpers} from 'velocity-react';
import {Checkbox} from 'material-ui';

var Animations = {
	// Register these with UI Pack so that we can use stagger later.
	In: velocityHelpers.registerEffect({
	  calls: [
		[{
		  transformPerspective: [ 800, 800 ],
		  transformOriginX: [ '50%', '50%' ],
		  transformOriginY: [ '100%', '100%' ],
		  marginBottom: 0,
		  opacity: 1,
		  rotateX: [0, 130],
		}, 1, {
		  easing: 'ease-out',
		  display: 'block',
		}]
	  ],
	}),
  
	Out: velocityHelpers.registerEffect({
	  calls: [
		[{
		  transformPerspective: [ 800, 800 ],
		  transformOriginX: [ '50%', '50%' ],
		  transformOriginY: [ '0%', '0%' ],
		  marginBottom: -30,
		  opacity: 0,
		  rotateX: -70,
		}, 1, {
		  easing: 'ease-out',
		  display: 'block',
		}]
	  ],
	}),
};



class Question extends Component {
	
	state = {
		items: '',
		duration: 400,
		answers:[],
	}
	
	questionAnswer = (answer)=> {

		let an = this.state.answers;
		let qa = {
			q:this.state.items.id,
			a:answer
		}
		let oldAnswer = this.state.answers;
		let newAnswer = oldAnswer.push(qa);
		setTimeout(() => {
			this.setState({answer:newAnswer}, () => {
				this.setState({items: this.props.question(this.state.answers)})
				}
			);
		}, 500);
	}
	
	componentDidMount() {
		this.setState({items: this.props.question(this.state.answers)})
	}


	render() {
		var enterAnimation = {
			animation: Animations.In,
			stagger: this.state.duration,
			duration: this.state.duration,
			backwards: true,
			display: 'block',
			style: {
			  // Since we're staggering, we want to keep the display at "none" until Velocity runs
			  // the display attribute at the start of the animation.
			  display: 'none',
			},
		};
	
		var leaveAnimation = {
			animation: Animations.Out,
			stagger: this.state.duration,
			duration: this.state.duration,
			backwards: true,
		};
		return (
			<div className="main-quiz">
				<h3 className="main-question">
					{this.props.num + "." + this.state.items.question }
				</h3>
				<p>{this.state.items.des}</p>
				<div className="main-answer">
				<VelocityTransitionGroup enter={enterAnimation} leave={{animation: "slideUp"}}>
						{
							this.state.items !== '' ? this.state.items.option.map((op)=> {
								return <div key={this.state.items.id*10 + op.id} onClick={()=> this.questionAnswer(op.id)}><Checkbox label={op.text} iconStyle={{color:"#00299f",fill:"#ffffff"}} /></div>
							}) : ''
						}	
				</VelocityTransitionGroup>			
				</div>							
			</div>
		);
	}
}
  
export default Question;