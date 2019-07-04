import React from 'react';
import Tilt from 'react-tilt';
import spotify from './Spotify_Icon_RGB_Green.png';

class Logo extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<div className = 'center pv6'>
					<Tilt options={{ max : 55, scale: 1.5,}} style={{height: 300, width: 300}}>
						<div className = "Tilt-inner pa3 pointer">
							<img style = {{paddingTop: '1px'}} alt='logo' src={spotify}/>
						</div>
					</Tilt>
				</div>
				<p className = 'white f2 mb2'>
					{'Welcome to Playlistify, press the Spotify logo to create your new playlist!'}
				</p>
			</div>
		);
	}
}

export default Logo