import React, { Component } from 'react'
import { ProductConsumer } from '../Context'
import { Link} from 'react-router-dom'
import { ButtonContainer } from './Button'

export default class Details extends Component {
  render() {
    return (
     <ProductConsumer>
       { (value) => {
         const { id , title , img , price , company, info , inCart}= value.detailProduct;
          
         return(
           <div className="container">
             {/*title */}
             <div className="row">
               <div className="col-10 mx-auto text-center text-slanted text-blue my-y">
                 <h1>{title}</h1>
               </div>
             </div>
             {/* end title */}
             {/* product Info */}
             <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <img src={img} className="img-fluid" alt="product" />
              </div>
              {/* product text */}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h2>Modal: {title}</h2>
                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                  Made By: <span className="text-uppercase">{company}</span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    price: <span>$</span> {price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weigth-bold mt-3 mb-0">
                  some info about product:
                </p>
                <p className="text-muted lead">{info}</p>
                <div>
                  <Link to='/'>
                   <ButtonContainer>
                     back to products
                   </ButtonContainer>
                  </Link> 

                  <ButtonContainer 
                    cart
                    disabled={inCart ? true: false}
                    onClick={ () => value.addToCart(id)}>
                    {inCart ? "in cart": "add to cart"}
                  </ButtonContainer>
                </div>
             </div>
             </div>
            
           </div>
           
         )
        }
       }
     </ProductConsumer>
    )
  }
}
