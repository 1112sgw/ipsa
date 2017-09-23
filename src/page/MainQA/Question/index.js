import React, { Component } from 'react';
import _ from 'lodash';
import {Checkbox,RaisedButton} from 'material-ui';
import qalist from '../../../data/questionCN.js';

class Question extends Component {
	
	state = {
		items: '',
		duration: 400,
		answers:[],
		num: 1,
	}
	
	questionAnswer = (answer)=> {

		let an = this.state.answers;
		let numold = this.state.num;
		let qa = {
			q:this.state.items.id,
			a:answer
		}
		let oldAnswer = this.state.answers;
		let newAnswer = oldAnswer.push(qa);
		let oldObj = '';
		setTimeout(() => {
			this.setState({answer:newAnswer,num: numold+1}, () => {
				oldObj = this.props.question(this.state.answers)
				}
			);
		}, 500);
		setTimeout(() => {
			this.setState({items:oldObj});
		}, 1510);
	}
	
	componentDidMount() {
		
		this.setState({items: this.props.question(this.state.answers)});
	}

	backToLastQuestion = () => {
		if(!_.isEmpty(this.state.answers)){
			let lastid = _.last(this.state.answers).q;
			let numold = this.state.num;
			let newAnswer = _.slice(this.state.answers, 0,this.state.answers.length-1 );
			this.setState({answers: newAnswer,num: numold-1});
			const lastQuestion = _.find(qalist, (qa) => {
				return qa.id === lastid;
			});
			this.setState({items:lastQuestion});
			console.log(this.state.answers);
		}
	}

	render() {
	
		return (
			<div className="main-quiz">
				<h4 className="main-question">
					{this.state.num + "." + this.state.items.question }
				</h4>
				<p>{this.state.items.des}</p>		       
				<div className="main-answer">
					{
						this.state.items !== '' ? this.state.items.option.map((op)=> {
							return <Checkbox label={op.text} iconStyle={{color:"#82786f",fill:"#82786f"}} onClick={(e)=> this.questionAnswer(op.id, e)} key={this.state.items.id*10 + op.id} />
						}) : ''
					}
				</div>
				{
					!_.isEmpty(this.state.answers) ? <RaisedButton label="上一题" onClick = {this.backToLastQuestion} /> : ''
				}				
			</div>		
		);
	}
}
  
export default Question;