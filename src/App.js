import React, {Component} from 'react';
import Particles from 'react-particles-js';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Message from './components/Message/Message';
import './App.css';
import { token } from './spotify/index';

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
  constructor(){
    super();
    this.state = {
      token: '',
    };
  }
  
  componentDidMount = () => {
    this.setState({ token });
  }

  render() {
    return (
      <div className = "App">
        <Particles className = 'particles'
          params={particlesOptions}
        />
        {token ? <Message /> : <LoginScreen />}
      </div>
    );
  }
}

export default App;
