import React from 'react';
import InputEmail from '../components/InputEmail';
import InputSenha from '../components/InputSenha';
import BotaoEntrar from '../components/BotãoEntrar'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.buttonEnter = this.buttonEnter.bind(this);
  }

  buttonEnter() {
    const { history } = this.props
    history.push('/carteira')
  }
  render() {
    return (
      <div className="Login-content" >
      <div className="Login">
        
        <InputEmail />
        <InputSenha />
        <BotaoEntrar buttonEnter={this.buttonEnter} />
      </div>
      </div>
    )
  }
}

export default Login;
