import React, { Component } from 'react';
import Table from './components/Table';
import './App.css';

class App extends Component {
  state = {
    error: null,
    phones: [],
    specs: [],
  };

  componentDidMount() {
    const api = 'http://localhost:3000';
    const headers = {
      Accept: 'application/json',
    };

    fetch(`${api}/phones`, { headers })
      .then((res) => res.json())
      .then(
        (data) => this.setState({ phones: data }),
        (error) => this.setState({ error })
      );

    fetch(`${api}/specs`, { headers })
      .then((res) => res.json())
      .then(
        (data) => this.setState({ specs: data }),
        (error) => this.setState({ error })
      );
  }

  render() {
    const { phones, specs } = this.state;
    const phoneHeaders =
      phones.length > 0 ? Object.keys(phones[0]) : null;
    const specHeaders = specs.length > 0 ? Object.keys(specs[0]) : null;
    return (
      <div className="App">
        <div>
          <h2>Phones</h2>
          {phoneHeaders ? (
            <Table headers={phoneHeaders} items={phones} />
          ) : null}
        </div>
        <div>
          <h2>Specs</h2>
          {specHeaders ? (
            <Table headers={specHeaders} items={specs} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
