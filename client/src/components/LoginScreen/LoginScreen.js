import React from 'react';
import Tilt from 'react-tilt';
import spotify from './Spotify_Icon_RGB_Green.png';

const LOGIN_URI = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8888/login' : 'https:/somethingelse'

const LoginScreen = () => {
	return(
		<div>
			<a href = {LOGIN_URI}>
				<div className = 'center pv6'>
					<Tilt options={{ max : 55, scale: 1.5,}} style={{height: 300, width: 300}}>
						<div className = "Tilt-inner pa3 pointer">
							<img 
								style = {{paddingTop: '1px'}} 
								alt='logo' 
								src={spotify} 
							/>
						</div>
					</Tilt>
				</div>
			</a>
			<p className = 'white f2 mb2'>
				{'Welcome to Playlistify, press the Spotify logo to create your new playlist!'}
			</p>
		</div>
	);
}

export default LoginScreen;