import React from 'react';
import {ClipLoader} from 'react-spinners';

class Message extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			code: '',
			state: '',
			loading: true
		};
	}

	componentWillMount() {


		// var paramsString = window.location.search;
		// var searchParams = new URLSearchParams(paramsString);
		// this.setState({code: searchParams.get('code')})
		// this.setState({state: searchParams.get('state')})
  	}

	render(){
		return (
			<div className='sweet-loading'>
		        <ClipLoader
		          sizeUnit={"px"}
		          size={150}
		          color={'#123abc'}
		          loading={this.state.loading}
		        />
		    </div> 
		);
	}
}

export default Message;