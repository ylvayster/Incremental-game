import React from 'react';
import ReactDOM from 'react-dom';

//div container for clickable element
export class ClickDiv extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id='clickerContainer'>
				<div id='clicker' onClick={this.props.clicking}></div>
			</div>
		);
	}
}