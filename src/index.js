import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form'
import List from './components/List'
import LoginPage from './components/LoginPage'
require('./less/main.less');
var socket = io();

class App extends Component {
  constructor() {
    super()
    this.messageRecieve = this.messageRecieve.bind(this);
    this.userJoined = this.userJoined.bind(this)
    this.userOut = this.userOut.bind(this)
    this.listenTyping = this.listenTyping.bind(this)
    this.state = {
      text: '',
      msgArr: [],
      login: false,
      userName: '',
      typing: false,
      typUser: '',
      color: ''
    }
  }

  componentWillMount() {
    //set color
    let colArr = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ]
    let rand = Math.floor(Math.random() * colArr.length);
    this.setState({
      color: colArr[rand]
    })
      socket.on('messageGet', this.messageRecieve)
      socket.on('userJoined', this.userJoined)
      socket.on('userOut', this.userOut)
      socket.on('listenTyping', this.listenTyping)
  }

  addUser(e) {
    e.preventDefault()
    this.setState({
      login: true
    })
    socket.emit('addUser', {username: this.state.userName})
  }

  listenTyping(data) {
    this.setState({
      typUser: data.username,
      typing: true
    })
    setTimeout(() => {
      this.setState({
        typing: false,
        typUser: ''
      })
    }, 1000)
    console.log('typing ' + data.username)
  }

  userJoined(data) {
    this.setState({
      messages: this.state.msgArr.push({
        text: `user ${data.username} joined, there are ${data.count} participans`,
        type: 'notif:join'
      })
    })
  }

  userOut(data) {
    this.setState({
      messages: this.state.msgArr.push({
        text: `user ${data.username} leave chat, there are ${data.count} participans`,
        type: 'notif:leave'
      })
    })
  }
  messageRecieve(data) {
    this.setState({
      messages: this.state.msgArr.push(data)
    })
  }

  textSubmit(e) {
    e.preventDefault()
    this.state.msgArr.push({text: this.state.text, username: this.state.userName, color: this.state.color})
    socket.emit('messageSend', {text: this.state.text, color: this.state.color});
    this.setState({"text": ''})
  }

  textChange(e) {
    this.setState({
      "text": e.target.value
    })
    socket.emit('typing')
  }
  changeNick(e) {
    this.setState({
      userName: e.target.value
    })
  }

  render() {

    const {login} = this.state

    if(!login) {
      return(
          <LoginPage addUser={this.addUser.bind(this)} changeNick={this.changeNick.bind(this)}/>
      )
    }  else {
    return(
      <div id="container">
        <List username={this.state.typUser} color={this.state.color} typing={this.state.typing} data={this.state.msgArr}/>
        <Form textChange={this.textChange.bind(this)} textSubmit={this.textSubmit.bind(this)} value={this.state.text}/>
      </div>
     )
    }
   }
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
