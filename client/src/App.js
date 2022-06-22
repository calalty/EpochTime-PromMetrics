import './App.css';
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { timeAPIResponse: "", metricsAPIResponse: "" };
  }

  loading = true

  getTimeAPI() {
    fetch("http://localhost:4000/gettime", {
      headers: { 'Authorization': 'mysecrettoken' }
    })
      .then(res => res.text())
      .then(res => this.setState({ timeAPIResponse: res }));
  }

  getMetricsAPI() {
    fetch("http://localhost:4000/metrics", {
      headers: { 'Authorization': 'mysecrettoken' }
    })
      .then(res => res.text())
      .then(res => this.setState({ metricsAPIResponse: res }));
  }

  componentDidMount() {
    this.getTimeAPI()
    this.getMetricsAPI();
    setInterval(() => {
      this.getTimeAPI()
      this.getMetricsAPI();
    }, 30000);
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.timeAPIResponse}</p>
        <p>{this.state.metricsAPIResponse}</p>
      </div>
    );
  };
}

export default App;
