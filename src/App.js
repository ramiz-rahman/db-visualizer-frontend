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
    type: [],
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
    if (joined) this.setState({ joined: joined, type: 'Inner Join' });
  };

  leftOuterJoin = async () => {
    console.log('LEFT OUTER JOIN');
    const joined = await API.getLeftOuterJoin();
    if (joined)
      this.setState({ joined: joined, type: 'Left Outer Join' });
  };

  rightOuterJoin = async () => {
    console.log('RIGHT OUTER JOIN');
    const joined = await API.getRightOuterJoin();
    if (joined)
      this.setState({ joined: joined, type: 'Right Outer Join' });
  };

  fullJoin = async () => {
    console.log('FULL JOIN');
    const joined = await API.getFullJoin();
    if (joined)
      this.setState({
        joined: joined,
        type: 'Full Join / Full Outer Join',
      });
  };

  render() {
    console.log(this.state);
    const { phones, specs, joined, type } = this.state;
    const phoneHeaders =
      phones.length > 0 ? Object.keys(phones[0]) : null;
    const specHeaders = specs.length > 0 ? Object.keys(specs[0]) : null;
    const joinedHeaders =
      joined.length > 0 ? Object.keys(joined[0]) : null;
    return (
      <div className="App">
        <header className="Header">
          <h1 className="Header__H1">Relational Algebra Visualizer</h1>
        </header>
        <main className="App__Grid">
          <section className="App__GridArea_a">
            <h2>Phones</h2>
            {phoneHeaders ? (
              <Table headers={phoneHeaders} items={phones} />
            ) : null}
          </section>
          <section className="App__GridArea_a">
            <h2>Specs</h2>
            {specHeaders ? (
              <Table headers={specHeaders} items={specs} />
            ) : null}
          </section>
          <section className="App__GridArea_b">
            <div className="ButtonGroup">
              <button
                className="Button"
                onClick={this.innerJoin.bind(this)}
              >
                Inner Join
              </button>
              <button
                className="Button"
                onClick={this.leftOuterJoin.bind(this)}
              >
                Left Outer Join
              </button>
              <button
                className="Button"
                onClick={this.rightOuterJoin.bind(this)}
              >
                Right Outer Join
              </button>
              <button
                className="Button"
                onClick={this.fullJoin.bind(this)}
              >
                Full Join
              </button>
            </div>

            <h2>{type}</h2>
            {joinedHeaders ? (
              <Table headers={joinedHeaders} items={joined} />
            ) : null}
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
