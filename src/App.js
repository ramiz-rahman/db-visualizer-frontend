import React, { Component } from 'react';
import * as API from './api';

import './App.css';
import './AppDark.css';

import Table from './components/Table';
import Footer from './components/Footer';
import Info from './components/Info';
import Switch from './components/Switch';
import AddPhone from './components/AddPhone';

class App extends Component {
  state = {
    darkMode: false,
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

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

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

  union = async () => {
    console.log('UNION');
    const joined = await API.getUnion();
    if (joined)
      this.setState({
        joined: joined,
        type: 'Union',
      });
  };

  intersection = async () => {
    console.log('INTERSECTION');
    const joined = await API.getIntersection();
    if (joined)
      this.setState({
        joined: joined,
        type: 'Intersection',
      });
  };

  difference = async () => {
    console.log('DIFFERENCE');
    const joined = await API.getDifference();
    if (joined)
      this.setState({
        joined: joined,
        type: 'Difference',
      });
  };

  crossJoin = async () => {
    console.log('CROSS JOIN');
    const joined = await API.getCrossJoin();
    if (joined)
      this.setState({
        joined: joined,
        type: 'Cross Join / Cartesian Product',
      });
  };

  enableTrigger = async () => {
    console.log('ENABLE TRIGGER');
    this.setState({ joined: [], type: 'Trigger' });
  };

  addPhone = async (phone) => {
    console.log('ADD PHONE', phone);
    await API.addPhone(phone);
    await this.setState({ type: 'Triggered' });
    await this.componentDidMount();
  };

  render() {
    let theme = `App`;
    if (this.state.darkMode) theme += ` App_dark`;

    const { phones, specs, joined, type, darkMode } = this.state;
    const phoneHeaders =
      phones.length > 0 ? Object.keys(phones[0]) : null;
    const specHeaders = specs.length > 0 ? Object.keys(specs[0]) : null;
    const joinedHeaders =
      joined.length > 0 ? Object.keys(joined[0]) : null;
    return (
      <div className={theme}>
        <header className="Header">
          <h1 className="Header__H1">Relational Algebra Visualizer</h1>
          <div className="Header__Switch">
            <p>Dark Mode</p>
            <Switch
              onSwitch={this.toggleDarkMode.bind(this)}
              checked={darkMode}
            />
          </div>
        </header>
        <main className="App__Grid">
          <section className="App__GridArea_a App__a">
            <h2>Phones</h2>
            {phoneHeaders ? (
              <Table headers={phoneHeaders} items={phones} />
            ) : null}
          </section>
          <section className="App__GridArea_a App__b">
            <h2>Specs</h2>
            {specHeaders ? (
              <Table headers={specHeaders} items={specs} />
            ) : null}
          </section>
          <section className="App__GridArea_b App__c">
            <div className="ButtonGroup">
              <button
                className="Button"
                onClick={this.union.bind(this)}
              >
                Union
              </button>
              <button
                className="Button"
                onClick={this.intersection.bind(this)}
              >
                Intersection
              </button>
              <button
                className="Button"
                onClick={this.difference.bind(this)}
              >
                Difference
              </button>
              <button
                className="Button"
                onClick={this.crossJoin.bind(this)}
              >
                Cartesian Product
              </button>
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
              <button
                className="Button"
                onClick={this.enableTrigger.bind(this)}
              >
                Trigger
              </button>
            </div>
            <Info type={type} />

            <h2>{type}</h2>

            {type === 'Trigger' ? (
              <AddPhone onSubmit={this.addPhone.bind(this)} />
            ) : null}

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
