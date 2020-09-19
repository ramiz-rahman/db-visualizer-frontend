import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class CommentForm extends Component {
  state = {
    name: '',
    company: '',
    resolution: '',
    size: 0,
    os: '',
  };

  handleChange = (e, attr) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [attr]: value });
  };

  handleNameChange = (e) => {
    this.handleChange(e, 'name');
  };

  handleCompanyChange = (e) => {
    this.handleChange(e, 'company');
  };

  handleResolutionChange = (e) => {
    this.handleChange(e, 'resolution');
  };

  handleSizeChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    value = parseFloat(value);
    if (isNaN(value)) this.setState({ size: 0 });
    else this.setState({ size: value });
  };

  handleOSChange = (e) => {
    this.handleChange(e, 'os');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="AddPhone">
        <h5>Add New Phone</h5>
        <label className="AddPhone__Row">
          <span className="AddPhone__Label">Name</span>
          <input
            className="AddPhone__Input"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />
        </label>

        <label className="AddPhone__Row">
          <span className="AddPhone__Label">Company</span>
          <input
            className="AddPhone__Input"
            type="text"
            placeholder="company"
            value={this.state.company}
            onChange={this.handleCompanyChange}
            required
          />
        </label>

        <label className="AddPhone__Row">
          <span className="AddPhone__Label">Resolution</span>
          <input
            className="AddPhone__Input"
            type="text"
            placeholder="resolution"
            value={this.state.resolution}
            onChange={this.handleResolutionChange}
            required
          />
        </label>

        <label className="AddPhone__Row">
          <span className="AddPhone__Label">Size</span>
          <input
            className="AddPhone__Input"
            type="number"
            placeholder="name"
            value={this.state.size}
            onChange={this.handleSizeChange}
            required
          />
        </label>

        <div className="AddPhone__Row">
          <span className="AddPhone__Label">OS</span>

          <div className="AddPhone__RadioContainer">
            <input
              className="AddPhone__Radio"
              type="radio"
              value="Android"
              onChange={this.handleOSChange}
              checked={this.state.os === 'Android'}
            />
            <label htmlFor="Android">Android</label>
          </div>

          <div className="AddPhone__RadioContainer">
            <input
              className="AddPhone__Radio"
              type="radio"
              value="iOS"
              onChange={this.handleOSChange}
              checked={this.state.os === 'iOS'}
            />
            <label htmlFor="iOS">iOS</label>
          </div>
        </div>

        <footer className="">
          <button className="Button" type="submit">
            Submit
          </button>
        </footer>
      </form>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
