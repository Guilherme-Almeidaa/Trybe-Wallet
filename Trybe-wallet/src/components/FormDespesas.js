import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrences, saveExpenses } from '../actions/index';
import bitcoin from '../imgs/Bitcoin.png';
import dolar from '../imgs/dolar.png';
import euro from '../imgs/euro.png';
import dolarCanadense from '../imgs/dolar-canadense.png';
import cartao from '../imgs/cartao.png';
import money from '../imgs/money.png';
import food from '../imgs/food.png';
import saude from '../imgs/saude.png';
import lazer from '../imgs/lazer.png';
import trabalho from '../imgs/trabalho.png';
import transporte from '../imgs/transporte.png';


class FormDespesas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            value: 0,
            description: '',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: {},
            edit: false,
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.expenseSaved = this.expenseSaved.bind(this);
    }

    componentDidMount() {
        const { requestCurrence } = this.props;
        requestCurrence()
    }
    expenseSaved() {
        const { expensesSave, sigleCurrence, expenses ,requestCurrence } = this.props
        requestCurrence()
        this.setState({
            id: expenses.length,
            exchangeRates: { ...sigleCurrence }
        }, () => expensesSave(this.state))

    }

    handlerChange({ target }) {
        const { value, name } = target
        this.setState({ [name]: value })
    }

    
    selectedImg(coin) {
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

    selectedImgTag (tag) {
        if(tag === 'Alimentação') {
            return food
        } else if (tag === 'Saúde') {
            return saude
        } else if (tag === 'Lazer') {
            return lazer
        } else if (tag === 'Trabalho') {
            return trabalho
        } else {
            return transporte
        }
    }
    

    render() {
        const { sigleCurrence } = this.props
        const { currency, method , tag } = this.state;
        const currenceFilter = Object.values(sigleCurrence).filter((item) => item.name !== 'Dólar Turismo')
        const moedas = ['USD' , 'EUR' , 'BTC' , 'CAD']
        const tags = ['Alimentação' , 'Saúde' , 'Lazer' , 'Trabalho' , 'Transporte']
        
        return (
            
            <form className="form" >
                
                <label htmlFor="valor" >Valor:
              <input  type="number" min="0" onChange={this.handlerChange} name="value" id="valor" data-testid="value-input" />
                </label>
                <label htmlFor="descricao" >Descrição:
              <input type="text" onChange={this.handlerChange} name="description" id="descricao" data-testid="description-input" />
                </label>
                <div  >
                <div  >
                    <div >
                <label htmlFor="moeda" >Moeda:
              <select onChange={this.handlerChange} name="currency" id="moeda" data-testid="currency-input" >
                        {currenceFilter.map((currence) => {
                            return (
                                < option key={currence.code} data-testid={currence.code} >
                                    {currence.code}
                                </option>
                            )
                        })}
                    </select>
                    
                </label>
                </div>
                </div>
                </div>
                {moedas.includes(currency) ? <img className="img-coin" alt="moeda" src={this.selectedImg(currency)} ></img> : ''}
                <div >
                <div  >
                    <div  >
                <label>Método de pagamento:
                    <select onChange={this.handlerChange} name="method" data-testid="method-input" >
                        <option value="Dinheiro" >Dinheiro</option>
                        <option value="Cartão de crédito" >Cartão de crédito</option>
                        <option value="Cartão de débito" >Cartão de débito</option>
                    </select>
                </label>
            </div>
                </div>
                </div>
                <img className="img-coin-2" alt="metodo" src={method === 'Dinheiro' ? money : cartao} ></img>
                <label>Categoria:
                    <select onChange={this.handlerChange} name="tag" data-testid="tag-input"  >
                        <option value="Alimentação" >Alimentação</option>
                        <option value="Lazer" >Lazer</option>
                        <option value="Trabalho" >Trabalho</option>
                        <option value="Transporte" >Transporte</option>
                        <option value="Saúde" >Saúde</option>
                    </select>
                </label>
                {tags.includes(tag) ? <img alt="tag" className="img-coin-3" src={this.selectedImgTag(tag)}/> : ''}
                <button className="button is-primary add" type="button" onClick={this.expenseSaved} >Adicionar</button>
            </form>
            
            
        )
    }
}

const mapStateToProps = (state) => ({
    sigleCurrence: state.wallet.currencies,
    expenses: state.wallet.expenses

})

const mapDispatchToProps = (dispatch) => ({
    requestCurrence: () => dispatch(fetchCurrences()),
    expensesSave: (expense) => dispatch(saveExpenses(expense))
})


export default connect(mapStateToProps, mapDispatchToProps)(FormDespesas);