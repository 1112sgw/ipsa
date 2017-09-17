import React, { Component } from 'react';

class Result extends Component {
	
	render() {
		if(this.props.result().id === 0) {
			return (
				<div>
					{this.props.result().content}
				</div>
			);
		}else{
			return (
				<div className="main-reuslt">
					<div className="title">
						<p>先天的肤质与生俱来的肌肤特质</p>
						<h2>目前您的素肌类型</h2>
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
						<h4>肌肤图片说明</h4>
						{
							this.props.result().skinDes.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<div className="beforeDes">
						<h4>先天肤质说明</h4>
						{
							this.props.result().beforeDes.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<div className="afterDes">
						<h4>后天的肌肤状态说明</h4>
						{
							this.props.result().beforeDes.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<div className="status">
						<h4>肌肤状态</h4>
						{
							this.props.result().status.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<div className="keypoint">
						<h4>护理要点</h4>
						{
							this.props.result().keypoint.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<div className="product">
						<div>推荐这款产品：</div>
						{
							this.props.product().name
						}
					</div>
					<div className="notice">
						<h4>重新进行肌肤咨询</h4>
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
}
  
export default Result;