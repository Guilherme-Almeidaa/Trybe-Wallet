import React from 'react'
import { connect } from 'react-redux';
import { passwordSave } from '../actions/index'

class Inputsenha extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
        }
    }

    changePass({ target }) {
        const { value } = target;
        const { savePass } = this.props;
        this.setState({
            password: value
        }, () => savePass(value))
    }
    render() {
        return (
            <div className="field"  >
                <label className="label" >Senha</label>
                <div className="control is-small" >
                    <input className="input is-primary is-small" placeholder="Senha" onChange={(target) => this.changePass(target)} data-testid="password-input" type='password' />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    savePass: pass => dispatch(passwordSave(pass))
})

export default connect(null, mapDispatchToProps)(Inputsenha);