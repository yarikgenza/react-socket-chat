import React, {Component} from 'react'

export default class LoginPage extends Component {
  render() {
    return (
      <div className="lp-page">
        <form id="lp-form" autoComplete="off" onSubmit={this.props.addUser.bind(this)}>
          <h3>What's your nickname?</h3>
          <input autoComplete="off" id='lp-input' type="text" onChange={this.props.changeNick.bind(this)}/>
        </form>
      </div>
    )
  }
}
