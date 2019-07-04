import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage'
import './App.css';

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

  render() {
    return (
      <div className = "App">
        <Particles className = 'particles'
          params={particlesOptions}
        />
        <Logo />
      </div>
    );
  }
}

export default App;
