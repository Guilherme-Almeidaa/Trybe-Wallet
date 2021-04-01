import React from 'react';
import { connect } from 'react-redux';
import { sumExpense } from '../actions/index'
import bitcoin from '../imgs/Bitcoin.png';
import dolar from '../imgs/dolar.png';
import euro from '../imgs/euro.png';
import dolarCanadense from '../imgs/dolar-canadense.png';


class TableInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deleted: false,
            edit:false
        }

        this.deleteExpense = this.deleteExpense.bind(this);
        this.editExpense = this.editExpense.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }



    deleteExpense(index) {
        const { expenses, sigleCurrence, sumExpenses } = this.props
        expenses.splice(index, 1)
        this.setState({
            deleted: true
        })
        const filterCurrence = Object.values(sigleCurrence).filter((item) => item.name !== 'Dólar Turismo')
        const sum = expenses.map((item) => {
            return parseFloat(filterCurrence.find((currence) => currence.code === item.currency).ask) * parseFloat(item.value)
        }).reduce((acc, reduce) => acc + reduce, 0)
        sumExpenses(sum)
        return sum

    }

    isSelected(e) {

        if (e.target.className === 'item-table is-selected') {
            e.target.className = ''
        } else {
            e.target.className = 'item-table is-selected'
        }
    }

    selectedImgCurrency(coin) {
        if (coin === 'USD') {
            return dolar
        } else if (coin === 'EUR') {
            return euro
        } else if (coin === 'BTC') {
            return bitcoin
        } else if (coin === 'CAD') {
            return dolarCanadense
        } else {
            return ''
        }
    }

    

    editExpense () {
        const {edit} = this.state
        this.setState({
            edit:!edit
        })
    }

    render() {
        const { expenses } = this.props
        const moedas = ['USD' , 'EUR' , 'BTC' , 'CAD']
        
        return (

            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" >
                <thead>
                    <tr>
                        <td>Descrição</td>
                        <td>Tag</td>
                        <td>Método de pagamento</td>
                        <td>Valor</td>
                        <td>Moeda</td>
                        <td>Câmbio utilizado</td>
                        <td>Valor convertido</td>
                        <td>Moeda de conversão</td>
                        <td>Editar/Excluir</td>
                    </tr>
                </thead>
                {expenses.map((item, index) => {
                    const { currency, exchangeRates } = item
                    const convert = (exchangeRates[currency].ask * item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                    return (
                        <tbody  onClick={this.isSelected} key={index} >
                            <tr className='item-table is-edit'  >
                                <td>{item.description}</td>
                                <td>{item.tag}</td>
                                <td>{item.method}</td>
                                <td>{item.value}</td>
                                <td>{moedas.includes(currency) ? <img className="img-coin" alt="moeda" src={this.selectedImgCurrency(exchangeRates[currency].code)} /> : ''} {exchangeRates[currency].name}</td>
                                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                                <td>{convert}</td>
                                <td>Real</td>
                                <td>
                                    <button onClick={this.editExpense} className="edit button is-warning" type="button"></button>
                                    <button className="delete- button is-danger" type="button" onClick={() => this.deleteExpense(index)} >X</button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}


            </table>
        )
    }
}

const mapStateToProps = (state) => ({
    expenses: state.wallet.expenses,
    sigleCurrence: state.wallet.currencies,
})

const mapDispatchToProps = (dispatch) => ({
    sumExpenses: sum => dispatch(sumExpense(sum)),

})

export default connect(mapStateToProps, mapDispatchToProps)(TableInfo);