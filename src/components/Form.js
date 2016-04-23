import React, {Component} from 'react';

export default class Form extends Component {
  render() {
    return (
      <form autoComplete="off" id="chatForm" onSubmit={this.props.textSubmit.bind(this)}>
        <input placeholder="Type here..." id="chatInput" type="text" onChange={this.props.textChange.bind(this)} value={this.props.value}/>
      </form>
    )
  }
}
