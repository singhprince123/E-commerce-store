import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar'
import Details from './components/Details'
import Cart from './components/Cart/Cart'
import Default from './components/Default'
import Modal from './components/Modal'


require('dotenv').config();
class App extends Component {
  render() {
    return (
     <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/details" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route  exact path="/" component={ProductList}></Route>
          <Route  component={Default}></Route>
        </Switch>
        <Modal />
     </React.Fragment>
    );
  }
}

export default App;
