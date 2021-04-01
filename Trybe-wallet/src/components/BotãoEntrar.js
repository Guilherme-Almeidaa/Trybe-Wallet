import React from 'react';
import { connect } from 'react-redux';


class BotaoEntrar extends React.Component {


    validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
    }
    render() {
        const { buttonEnter, email , password } = this.props;
        
        return (
            <div class="control" >
            <button className="button is-primary enter" disabled={ password.length !== 0 && this.validateEmail(email) ? '' : 'disabled'} onClick={buttonEnter} type="button">Entrar</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    email: state.user.email,
    password: state.user.password,
})

export default connect(mapStateToProps)(BotaoEntrar);