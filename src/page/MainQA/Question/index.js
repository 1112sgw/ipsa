import React, { Component } from 'react';

import {Checkbox} from 'material-ui';


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
		let oldObj = '';
		setTimeout(() => {
			this.setState({answer:newAnswer}, () => {
				oldObj = this.props.question(this.state.answers)
				}
			);
		}, 500);
		setTimeout(() => {
			this.setState({items:oldObj});
		}, 1510);
	}
	
	componentDidMount() {
		this.setState({items: this.props.question(this.state.answers)})
	}

	render() {
	
		return (
			<div className="main-quiz">
				<h4 className="main-question">
					{this.props.num + "." + this.state.items.question }
				</h4>
				<p>{this.state.items.des}</p>		       
				<div className="main-answer">
					{
						this.state.items !== '' ? this.state.items.option.map((op)=> {
							return <Checkbox label={op.text} iconStyle={{color:"#82786f",fill:"#82786f"}} onClick={(e)=> this.questionAnswer(op.id, e)} key={this.state.items.id*10 + op.id} />
						}) : ''
					}
				</div>			
			</div>		
		);
	}
}
  
export default Question;