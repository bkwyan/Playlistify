import React from 'react';
import {ClipLoader} from 'react-spinners';
import { createPlaylist, getRecommendations, addTracksToPlaylist, getTopTracksMedium } from '../../spotify/index';
import './Message.css';

class Message extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			topTracks: null,
			recommendations: null,
			playlistId: null,
		};
	}

	async componentDidMount(){
		await this.getData();

		const resp = await createPlaylist()
		const data = await resp.json();

		this.setState({playlistId: data.id});

		addTracksToPlaylist(this.state.playlistId, this.state.recommendations);
		this.setState({loading: false})
	}

	async getData() {
		try{
			const resp = await getTopTracksMedium()
			const data = await resp.json()
			this.setState({topTracks: data.items})


			const resp2 = await getRecommendations(this.state.topTracks)
			const data2 = await resp2.json()
			this.setState({recommendations: data2.tracks})

		} catch {
			console.log("error")
		}
	}

	render(){
		return (
			<div className = 'center ma'>
				{ this.state.loading === 'true'
				? <div className='sweet-loading'>
						<ClipLoader
							sizeUnit={"px"}
							size={150}
							color={'#123abc'}
							loading={this.state.loading}
						/>
					</div>
				: <iframe className = 'absolute mt4'
						src={`https://open.spotify.com/embed/playlist/${this.state.playlistId}`}
						marginHeight= '300'
						width="600" 
						height="600" 
						allowtransparency="true" 
						allow="encrypted-media">
					</iframe>
				}
			</div>
		);
	}
}

export default Message;