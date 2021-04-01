import React from 'react';
import HeaderWallet from '../components/HeaderWallet';
import FormDespesas from '../components/FormDespesas'
import TableInfo from '../components/TableInfo'
import { connect } from 'react-redux';

class Wallet extends React.Component {

 
  render() {
    return (
      <div className='header-complete'  >
      <HeaderWallet />
      <FormDespesas />
      <TableInfo/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses
})

export default connect(mapStateToProps)(Wallet);
