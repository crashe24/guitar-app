//import { useMemo } from "react"

const HeaderComponent = (props) => {

    // state derivado
  //const isEmpty =  useMemo(() => props.cart.length ===0, [props.cart])
  //const totalQuantity = useMemo(() => props.cart.reduce((acc, item) => acc + (item.price * item.quantity),0 ),[props.cart])

   const handleDeleteToCart = (guitar) => {
          //  console.log('guitar.id', guitar.id)
            props.deleteToCart(guitar)
   }   

  return (
    <header className="py-5 header">
    <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
                <a href="index.html">
                    <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                <div 
                    className="carrito"
                >
                    <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                    <div id="carrito" className="bg-white p-3">
                        { props.isEmpty ? (
                            <p className="text-center">El carrito esta vacio</p>
                        ) : (
                            <>
                            <table className="w-100 table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    props.cart.map( guitar => (
                                        
                                        <tr key={guitar.id}>
                                            <td>
                                                <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                            </td>
                                            <td>{guitar.name}</td>
                                            <td className="fw-bold">
                                                    ${guitar.price}
                                            </td>
                                            <td className="flex align-items-start gap-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={()=> props.decreaseQuantity(guitar.id)}
                                                >
                                                    -
                                                </button>
                                                    {guitar.quantity}
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={ () => props.incrementQuantity(guitar.id)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={ () => handleDeleteToCart(guitar.id)}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                   
                                    ))
                                }

                                </tbody>
                        </table>
                        <p className="text-end">Total pagar: <span className="fw-bold">${props.totalQuantity}</span></p>
                        <button className="btn btn-dark w-100 mt-3 p-2" onClick={props.clearCart}>Vaciar Carrito</button>
                        </>
                        )
                        }
                        
                        
                    </div>
                </div>
            </nav>
        </div>
    </div>
</header>
  )
}

export { HeaderComponent }