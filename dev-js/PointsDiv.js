import React from 'react';
import ReactDOM from 'react-dom';

//div displaying current total points
export class PointsDiv extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id='points'>
				<p>You have <span id='currentPoints'>{Math.floor(this.props.totalPoints)}</span> gifts. Keep on clicking!</p>
			</div>
		);
	}
}