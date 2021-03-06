import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import './App.css';

class App extends Component {
  state = {
    coins: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ coins: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    console.log(this.state.coins);
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>

        <div></div>
      </div>
    );
  };
};

export default App;
