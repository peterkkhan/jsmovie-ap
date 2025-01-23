import { Component } from '../core/heropy.js'
import TextField from '../components/TextField.js'
import Message from '../components/Message.js'

export default class Home extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <h1>Home Page!</h1>
    `
    this.el.append(
      new TextField().el,
      new Message().el
    )
  }
}