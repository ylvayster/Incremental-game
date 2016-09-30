import React from 'react';
import ReactDOM from 'react-dom';

//intro div, with information about game
export class Intro extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id='intro'>
				<h1>X-MAS GIFT MADNESS</h1>
				<p>No need to be good all year – just click away and watch your pile of Christmas gifts grow faster than Santa can say ho-ho-ho!</p>
			</div>
		);
	}
}