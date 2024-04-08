import { GuitarComponent } from "./components/Guitar"
import { HeaderComponent } from "./components/Header"

import { useCart } from "./hooks/useCart"


function App() {
  
 const { 
  cart,
  data,
  setCart,
  addToCart,
  deleteToCart,
  incrementQuantity,
  decreaseQuantity,
  clearCart,
  isEmpty,
  totalQuantity
} = useCart()


  return (
    <>
    <HeaderComponent 
      cart={cart}
      deleteToCart = {deleteToCart} 
      incrementQuantity = {incrementQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart = {clearCart}
      isEmpty = {isEmpty}
      totalQuantity = {totalQuantity}
    />  
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map( d => (
            <GuitarComponent
               key={d.id}  
              guitar = {d}
              setCart={setCart}
              addToCart = {addToCart}
             
              />))
          }        
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
