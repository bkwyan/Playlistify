import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import './App.css';

const client_id = '7c8b8bec741244df8ee854c4e1794ad7' // Your client id
const redirect_uri = 'http://localhost:3000/callback' // Your redirect uri

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim:{
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: false
    },
  }
}

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(console.log)
  }

  generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  logoClick = () => {
    var state = this.generateRandomString(16);

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private';
    var windowLocation = 'https://accounts.spotify.com/authorize?' +
      require('querystring').stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });
    window.location.replace(windowLocation)
  }

  render() {
    return (
      <div className = "App">
        <Particles className = 'particles'
          params={particlesOptions}
        />
        <Logo logoClick={ this.logoClick }/>
      </div>
    );
  }
}

export default App;
