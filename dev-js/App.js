require('../css/styles.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import {Intro} from './Intro.js';
import {PointsDiv} from './PointsDiv.js';
import {ClickDiv} from './ClickDiv.js';
import {Upgrades} from './Upgrades.js';

export class App extends React.Component {
	constructor() {
		super();

		this.state = {
			totalPoints: 0,  //init

			//upgrades below; each one is written out in render() via Upgrades.js
			//priceInc - price increase in % per buy
			//pointsPerSecond, value used in autoClick(i) to increase totalPoints with given value per second
			//noOfUpgrades - init at 0, increases with 1 for each buy
			upgrades: [
				{id: 0, name: 'Wish list', price: 10, priceInc: 20, pointsPerSecond: 0.1, noOfUpgrades: 0, description: 'One more wish list sent to the North Pole gives you 0.1 extra gifts per second.'},
				{id: 1, name: 'Santa\'s little helper', price: 140, priceInc: 30, pointsPerSecond: 2, noOfUpgrades: 0, description: 'One more helper in Santa\'s workshop gives you 2 extra gifts per second.'},
				{id: 2, name: 'Extra oats', price: 500, priceInc: 40, pointsPerSecond: 20, noOfUpgrades: 0, description: 'Extra oats makes Santa\'s reindeers super fast and gives you 20 extra gifts per second.'},
				{id: 3, name: 'Gift-wrapping robot', price: 12000, priceInc: 45, pointsPerSecond: 150, noOfUpgrades: 0, description: 'One gift-wrapping robot gives you 150 extra gifts per second.'},
				{id: 4, name: 'Santa clone', price: 50000, priceInc: 65, pointsPerSecond: 1000, noOfUpgrades: 0, description: 'A clone of Santa gives you 1000 extra gifts per second.'}
			]
		};
		
		//binding of this
		this.clicking = this.clicking.bind(this);
		this.buyUpgrade = this.buyUpgrade.bind(this);
		this.autoClick = this.autoClick.bind(this);
	}

	//function Clicking
	//Increases points with each click on calling element
	//Usage of previous state according to https://facebook.github.io/react/docs/component-api.html
	clicking() {
		this.setState( previousState => { previousState.totalPoints = (previousState.totalPoints + 1) });
	}

	//function autoclick(i)
	//Increases points with given value per upgrade[i], called from buyUpgrade function
	//Usage of previous state according to https://facebook.github.io/react/docs/component-api.html
	autoClick (i) { 
		this.setState( previousState => { previousState.totalPoints = previousState.totalPoints + previousState.upgrades[i].pointsPerSecond });
	}

	//function buyUpgrade(i, autoClick):
	//Decreases total points with price of upgrade[i]
	//Increases price with given percentage value from upgrade[i]
	//Increases no of upgrades[i] bought by one per "purchase"
	//Sets time interval calling autoclick function
	//Usage of previous state so objects won't be overwritten, see https://facebook.github.io/react/docs/component-api.html and http://stackoverflow.com/a/38779819
	buyUpgrade(i, autoClick) {
		this.setState( previousState => {
			previousState.totalPoints = (previousState.totalPoints - previousState.upgrades[i].price);
 			previousState.upgrades[i].price = Math.floor((previousState.upgrades[i].price * (1 + (previousState.upgrades[i].priceInc/100))));
 			previousState.upgrades[i].noOfUpgrades = previousState.upgrades[i].noOfUpgrades + 1; 
  		return previousState
		});

		window.setInterval(function (){autoClick(i)}, 1000); //call autoClick(i) each second
	}

    render() {
        return (
        	<div>
        		<Intro />
        		<div id='game'>
        			<PointsDiv totalPoints = {this.state.totalPoints} />
	        		<ClickDiv clicking = {this.clicking} />
	            	<div id='upgrades'>
	            		{this.state.upgrades.map((upgradeData, i) =>
	            			<Upgrades key={i} upgrade = {upgradeData} 
	            			buyUpgrade = {this.buyUpgrade} 
	            			autoClick = {this.autoClick} 
	            			totalPoints = {this.state.totalPoints} />
	            		)}
	            	</div>
            	</div>
            </div>
        	);
  		}
}

ReactDOM.render(<App />, document.getElementById('app'));