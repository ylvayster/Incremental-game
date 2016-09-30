import React from 'react';
import ReactDOM from 'react-dom';

//div displaying each upgrade
export class Upgrades extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className={this.props.upgrade.name}>

			<p className='noOfUpgrades'>{this.props.upgrade.noOfUpgrades}</p>
			
			<div className='info'>
				<h2 className='name'>{this.props.upgrade.name}</h2>
				<p className='description'>{this.props.upgrade.description}</p>
			</div>

			<div className='priceAndBuy'>
				<p className='price'>Price: <span>{this.props.upgrade.price}</span></p>
				<button id={this.props.upgrade.name} 
				onClick={() => this.props.buyUpgrade(this.props.upgrade.id, this.props.autoClick)}
				disabled={this.props.totalPoints < this.props.upgrade.price} >
				Buy
				</button>
			</div>

			</div>
		);
	}
}