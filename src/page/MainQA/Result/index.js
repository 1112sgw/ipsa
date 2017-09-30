import React, { Component } from 'react';

class Result extends Component {

	componentDidMount() {
		document.getElementsByClassName('page')[0].style.overflow = 'visible';
	}
	
	render() {
		if(this.props.result().id === 0) {
			return (
				<div className="gotoShop">
					<div className="shopWord">
						{this.props.result().content}
					</div>
					<div className="shopImg">
						<img src="image/test.png" />
					</div>
					<div className="shopLink">
						<a href="http://www.ipsa.com.cn/?page_id=1072"><img src="image/logoipsa.svg" />前往店铺</a>
					</div>						
				</div>
			);
		}else{
			return (
				<div className="main-reuslt left">
					<div className="main-title">目前您的素肌类型</div>
					<div className="title left">先天的肤质
						<span>{`<与生俱来的肌肤特质>`}</span>			
					</div>
					<div className="type">
						<h3>{this.props.result().type}</h3>
					</div>	
					<div className="typeImg">
						<img src={this.props.result().typeImg} />
					</div>
					{ 
						this.props.result().skinImg && 
						<div>
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
						</div>
					}
					<div className="beforeDes">
						{
							this.props.result().beforeDes.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<hr />
					<div className="title">
						后天的肌肤状态说明
						<span>{`<至今积累的肌肤受到的影响>`}</span>			
					</div>
					<div className="afterDes">
						{
							this.props.result().beforeDes.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<hr />
					<div className="title">肌肤状态</div>
					<div className="status">
						{
							this.props.result().status.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<hr />
					<div className="title">护理要点</div>
					<div className="keypoint">
						{
							this.props.result().keypoint.map((d)=> {
								return <p key={d}>{d}</p>
							})
						}
					</div>
					<hr />
					<div className="title">推荐这款产品：</div>
					<div className="product">
						<a href={this.props.product().link}>
							<div className="pro_title">{this.props.product().name}</div>
							<img src={this.props.product().url} alt=""/>
						</a>						
					</div>
					<div className="notice">
						<h4></h4>
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