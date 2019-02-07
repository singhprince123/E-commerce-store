import React from 'react'
import { ProductConsumer } from '../Context'
export default function Carousel() {
    
  return (
    <ProductConsumer>
        { value => {
            console.log( "value =" ,value)
            const { iphone, one , lg , huwai }  = value.carouselImages;
        
            return (
                <div id="demo" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" className="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                    <li data-target="#demo" data-slide-to="3"></li>
                </ul>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                   <img src={iphone} alt="Los Angeles" className="carousel-img" />
                   </div>
                 <div className="carousel-item">
            <img src={one} alt="Chicago" className="carousel-img" />
          </div>
          <div className="carousel-item">
            <img src={lg} alt="New York" className="carousel-img" />
          </div>
          <div className="carousel-item">
            <img src={huwai} alt="New York" className="carousel-img" />
          </div>
                </div>
        {/* 
        <!-- Left and right controls --> */}
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
        </div>
        
            )
        }}
    
    </ProductConsumer>
  )
}
