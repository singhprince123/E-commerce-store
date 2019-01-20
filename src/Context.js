import React, { Component } from 'react'
import { storeProducts , detailProduct } from './data'


const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {

    state={
       products: storeProducts,
       detailProduct: detailProduct
    }

    handleDetalil = () => {
        console.log("hello from detail")
    }

    addToCart =() =>{
        console.log(" Detail from add to cart")
    }
  render() {
    return (
      <ProductContext.Provider 
      value={ { 
        ...this.state,
        hadleDetail : this.handleDetalil,
        addToCart : this.addToCart
      }
       }>
          {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider , ProductConsumer};