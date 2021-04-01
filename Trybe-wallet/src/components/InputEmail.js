import React from 'react'
import { connect } from 'react-redux';
import { emailSave } from '../actions/index'

class InputEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }

    changeEmail({ target }) {
        const { saveEmail } = this.props
        const { value } = target
        this.setState({
            email: value
        }, () => saveEmail(value))
    }

    render() {
        return (
            <div className="field" >
                <label className="label" >Email</label>
                <div className="control is-small" >
                    <input className="input is-primary is-small" placeholder="Email" onChange={(target) => this.changeEmail(target)} data-testid="email-input" type="email" />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    saveEmail: email => dispatch(emailSave(email))
})

export default connect(null, mapDispatchToProps)(InputEmail);