import React, { Component } from 'react';

class Result extends Component {
	
	render() {
		return (
			<div className="main-reuslt">
				<div className="title">
					<h2>您现在的肌肤类型</h2>
				</div>
				<div className="type">
					<h3>{this.props.result().type}</h3>
				</div>	
				<div className="typeImg">
					<img src={this.props.result().typeImg} />
				</div>
				<div className="skinImg">
					<img src={this.props.result().skinImg} />
				</div>
				<div className="skinDes">
					<h4>肌の写真の解説</h4>
					{
						this.props.result().skinDes.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
				<div className="beforeDes">
					<h4>先天的肌質の説明</h4>
					{
						this.props.result().beforeDes.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
				<div className="afterDes">
					<h4>先天的肌質の説明</h4>
					{
						this.props.result().beforeDes.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
				<div className="status">
					<h4>後天的肌状態の説明</h4>
					{
						this.props.result().status.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
				<div className="keypoint">
					<h4>肌の状態</h4>
					{
						this.props.result().keypoint.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
				<div className="notice">
					<h4>お手入れのポイント</h4>
					{
						this.props.result().notice.map((d)=> {
							return <p key={d}>{d}</p>
						})
					}
				</div>
			</div>
		);
	}
}
  
export default Result;