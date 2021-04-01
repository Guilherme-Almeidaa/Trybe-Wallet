import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet'
import './bulma.css';
class App extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-primary all">
          <div className="hero-body">
            <div className="container cont-title">
              <h1 className="title">
                Hello, TrybeWallet!
      </h1>
              <h2 className="subtitle">
                Wallet
      </h2>
            </div>
          </div>
        </section>

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/carteira" component={Wallet} />
        </Switch>
      </div>
    )
  }
}

export default App;
