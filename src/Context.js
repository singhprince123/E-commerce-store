import React, { Component } from 'react'
import { storeProducts , detailProduct } from './data'


const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {

    state={
       products: [],
       detailProduct: detailProduct
    }

    componentDidMount(){
      
      this.setProduct()
    }
    setProduct = () => {
      let tempProducts = [];
      storeProducts.forEach( item => {
        const singleProduct = { ...item};
        tempProducts = [...tempProducts, singleProduct];
      });
      this.setState( () => {
       return { products: tempProducts }  
      })
    }
    handleDetalil = () => {
        console.log("hello from detail")
    }

    addToCart =(id) =>{
        console.log(" Detail from add to cart: ", id)
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