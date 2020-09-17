import React, { Component } from 'react';
import * as API from './api';

import Table from './components/Table';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  state = {
    error: null,
    phones: [],
    specs: [],
    joined: [],
  };

  async componentDidMount() {
    const phones = await API.getPhones();
    if (phones) this.setState({ phones });

    const specs = await API.getSpecs();
    if (specs) this.setState({ specs });
  }

  innerJoin = async () => {
    console.log('INNER JOIN');
    const joined = await API.getInnerJoin();
    if (joined) this.setState({ joined });
  };

  leftOuterJoin = async () => {
    console.log('LEFT OUTER JOIN');
    const joined = await API.getLeftOuterJoin();
    if (joined) this.setState({ joined });
  };

  rightOuterJoin = async () => {
    console.log('RIGHT OUTER JOIN');
    const joined = await API.getRightOuterJoin();
    if (joined) this.setState({ joined });
  };

  fullJoin = async () => {
    console.log('FULL JOIN');
    const joined = await API.getFullJoin();
    if (joined) this.setState({ joined });
  };

  render() {
    console.log(this.state);
    const { phones, specs, joined } = this.state;
    const phoneHeaders =
      phones.length > 0 ? Object.keys(phones[0]) : null;
    const specHeaders = specs.length > 0 ? Object.keys(specs[0]) : null;
    const joinedHeaders =
      joined.length > 0 ? Object.keys(joined[0]) : null;
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
        <div>
          <button onClick={this.innerJoin.bind(this)}>
            Inner Join
          </button>
          <button onClick={this.leftOuterJoin.bind(this)}>
            Left Outer Join
          </button>
          <button onClick={this.rightOuterJoin.bind(this)}>
            Right Outer Join
          </button>
          <button onClick={this.fullJoin.bind(this)}>Full Join</button>
          <h2>Joined</h2>
          {joinedHeaders ? (
            <Table headers={joinedHeaders} items={joined} />
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
