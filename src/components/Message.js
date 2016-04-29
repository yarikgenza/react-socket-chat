import React, {Component} from 'react';
export default class Message extends Component {

  render() {
    return(
      <li className="message">
        <span style={{color: this.props.color}} className="nick">{this.props.username}</span>
        <span className="msgText">{this.props.msg}</span>
      </li>
    )
  }
}
