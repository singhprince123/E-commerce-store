import React, { Component } from 'react'
import { storeProducts , detailProduct , carouselImages } from './data'


const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {

    state={
       products: [],
       detailProduct: detailProduct,
       cart: [],
       modalOpen : false,
       modalProduct: detailProduct,
       cartSubTotal: 0,
       cartTax: 0,
       cartTotal:0,
       carouselImages: carouselImages
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
        }, ()=> this.addTotal()) 
    }

    increment = (id) => {
     let tempCart = [...this.state.cart];
     const selectedProduct = tempCart.find( item => item.id === id);
     const index = tempCart.indexOf(selectedProduct);
     const product = tempCart[index];

     product.count = product.count + 1;
     product.total = product.price * product.count;

     this.setState(()=> {
       return { cart: [...tempCart] } 
                }, () => this.addTotal()
     )

    }

    decrement = (id) => {
      let tempCart = [...this.state.cart];
      const selectedProduct = tempCart.find( item => item.id === id);
      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      product.count= product.count - 1;
      if(product.count ===  0){
        this.removeItem(id)
      }else{
        product.total = product.count * product.price;
        this.setState(()=> {
          return { 
             cart: [...tempCart] 
            } 
          }, () => this.addTotal()
        )
      }
    }
 
    removeItem = (id) => {
     let tempProducts = [...this.state.products];
     let tempCart = [...this.state.cart];
     tempCart = tempCart.filter(item => item.id !== id);
     const index = tempProducts.indexOf(this.getItem(id));
     let removeItem = tempProducts[index];
     removeItem.inCart=false;
     removeItem.count = 0;
     removeItem.total = 0;

     this.setState( () => {
       return { cart: [...tempCart],
               products: [...tempProducts]
       }
     })
    }

    clearCart = () => {
      this.setState( ()=> {
        return { 
          cart: []
        } }, () => {this.setProduct();
                 this.addTotal()
        } 
      )
    }

    addTotal = () => {
     let subTotal = 0;
     this.state.cart.map( item => (subTotal += item.total));
     const temptax = subTotal * 0.1;
     const tax = parseFloat(temptax.toFixed(2));
     const total = subTotal + tax;
     this.setState(() => {
       return {
         cartSubTotal: subTotal,
         cartTax: tax,
         cartTotal: total
       }
     })
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
        clearCart: this.clearCart,
        carouselImages: this.state.carouselImages
      }
       }>
          {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider , ProductConsumer};