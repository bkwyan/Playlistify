import React, {Component} from 'react';
import Particles from 'react-particles-js';
import LoginScreen from './components/LoginScreen/LoginScreen';
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
  constructor(){
    super();
    this.state = {
      LOGIN_URI: 'http://localhost:8888/login'
    }
  }

  componentDidMount() {
    fetch('http://localhost:8888/')
      .then(response => response.json())
      .then(console.log)
  }

  render() {
    return (
      <div className = "App">
        <Particles className = 'particles'
          params={particlesOptions}
        />
        <LoginScreen LOGIN_URI = {this.state.LOGIN_URI} />
      </div>
    );
  }
}

export default App;
