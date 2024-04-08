import React from 'react'


const GuitarComponent = (props) => {

  
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`../../../public/img/${props.guitar.image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{props.guitar.name}</h3>
                <p>{props.guitar.description}</p>
                <p className="fw-black text-primary fs-3">${props.guitar.price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => props.addToCart(props.guitar)}
                >Agregar al Carrito</button>
            </div>
    </div>
  )
}

export { GuitarComponent }