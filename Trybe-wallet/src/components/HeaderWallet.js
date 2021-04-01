import React from 'react';
import { connect } from 'react-redux';
import { sumExpense } from '../actions/index'
import './HeaderWallet.css';
class HeaderWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sumEx: 0,
        }
        this.sumExpensesTotal = this.sumExpensesTotal.bind(this);
    }



    sumExpensesTotal() {
        const { expenses, sigleCurrence, sumExpenses } = this.props
        const filterCurrence = Object.values(sigleCurrence).filter((item) => item.name !== 'Dólar Turismo')

        const sum = expenses.map((item) => {
            return parseFloat(filterCurrence.find((currence) => currence.code === item.currency).ask) * parseFloat(item.value)
        }).reduce((acc, reduce) => acc + reduce, 0)
        sumExpenses(sum)
        return sum
    }
    render() {
        const { email } = this.props
        const convert = this.sumExpensesTotal().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        return (
            <header className="notification is-info headerP" >
                <div className="container">
                    <div className="container-2">
                        <p data-testid="email-field" >Email:{email}</p>
                        <p className="total" data-testid="total-field" >Total: {convert}</p>
                        <p data-testid="header-currency-field" >BRL</p>
                    </div>
                </div>

            </header>
        )
    }
}
const mapStateToProps = (state) => ({
    email: state.user.email,
    expenses: state.wallet.expenses,
    sigleCurrence: state.wallet.currencies,
    sumExp: state.wallet.sumExpenses
})

const mapDispatchToProps = (dispatch) => ({
    sumExpenses: sum => dispatch(sumExpense(sum))
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWallet);
