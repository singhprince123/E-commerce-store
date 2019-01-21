import React, { Component } from 'react'
import { storeProducts , detailProduct } from './data'


const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {

    state={
       products: [],
       detailProduct: detailProduct,
       cart: storeProducts,
       modalOpen : false,
       modalProduct: detailProduct,
       cartSubTotal: 0,
       cartTax: 0,
       cartTotal:0
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

    getItem = (id) => {
      const product = this.state.products.find(item => item.id === id);
      return product;
    }
    handleDetalil = (id) => {
        const product = this.getItem(id);
        this.setState({
          detailProduct: product
        })
    }

    openModal = (id) => {
      const product = this.getItem(id);
      this.setState( () => {
        return { modalOpen: true, modalProduct: product}
      })
    }

    closeModal = () => {
      this.setState( () => {
        return { modalOpen: false}
      });
    }
    addToCart =(id) =>{
        const tempProducts = [...this.state.products];
        const indexOfProducts = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[indexOfProducts];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState( () => {
          return { product : tempProducts ,
                   cart : [...this.state.cart, product]
          }
        }, ()=> console.log(this.state)) 
    }

    increment = (id) => {
      console.log("this is increment method")
    }

    decrement = (id) => {
      console.log("this is decrement method")
    }
 
    removeItem = (id) => {
      console.log("this is item removed method")
    }

    clearCart = () => {
      console.log("cart was cleared")
    }

  render() {
    return (
      <ProductContext.Provider 
      value={ { 
        ...this.state,
        handleDetail : this.handleDetalil,
        addToCart : this.addToCart,
        openModal : this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart
      }
       }>
          {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider , ProductConsumer};