import React, {Component} from 'react'
import Message from './Message';

export default class List extends Component {

  render() {

    const {typing, username, color} = this.props

    var tmp = function(msg) {
      if(msg.type == 'notif:join') {
          return(
            <li>
                <div className="notify join">
                  <span>{msg.text}</span>
                </div>
            </li>
          )
      } else if(msg.type == 'notif:leave') {
        return(
          <li>
              <div className="notify leave">
                <span>{msg.text}</span>
              </div>
          </li>
        )
      } else {
       return(
         <Message color={msg.color} msg={msg.text} username={msg.username}/>
       )
     }
    }



    if(typing && username !== '') {
      return(
        <div className="list">
          <ul>
          <div className="welcome">
             <h1>Welcome to socket-react chat!</h1>
          </div>
            {this.props.data.map(tmp)}
          </ul>
           <div className="typing">
              <span>{username} typing...</span>
           </div>
        </div>
       )
  } else {
    return (
      <div className="list">
        <ul>
         <div className="welcome">
            <h1>Welcome to socket-react chat!</h1>
         </div>
         {this.props.data.map(tmp)}
        </ul>
      </div>
    )
  }
  }

}
