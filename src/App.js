import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableInput: false
    }

    this.saveEmail = this.saveEmail.bind(this);
  }

  async saveEmail() {
    const email = this.input.value;
    await this.props.firebase.saveEmail(email);
    this.setState({ disableInput: true });
  }

  render() {
    return (
      <div className="App">
        WeCare
        <img src="https://firebasestorage.googleapis.com/v0/b/wecare-static.appspot.com/o/images%2F1-box.png?alt=media&token=68b11f6b-d134-4bae-a1d1-6749de832951" alt="one-box"/>
        <div>
          <br/>
          <label>Your Email</label>
          <br/>
          <input disabled={this.state.disableInput} type="text" name="email" ref={el => this.input = el} /><br/>
          <button disabled={this.state.disableInput} onClick={this.saveEmail}>{this.state.disableInput ? 'Saved' : 'Submit'}</button>
        </div>
      </div>
    );
  }
}

export default App;
