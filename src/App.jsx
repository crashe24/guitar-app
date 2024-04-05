import { useEffect, useState } from "react"
import { GuitarComponent } from "./components/Guitar"
import { HeaderComponent } from "./components/Header"

import { db } from "./data/db"

/**
 * 
 * <GuitarComponent 
              image={d.image} 
              price={d.price} 
              auth={d.auth} 
              name={d.name} 
              description = {d.description}/>
 * 
 * 
 */
function App() {
  
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart): []
  } 

  const [data, setData ] = useState([])
  const [cart, setCart] = useState(initialCart)

  const  MAX_ITEMS = 5
  const  MIN_ITEMS = 1



  useEffect(() => {
    setData(db)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
  

  const addToCart = (guitar) => {

    const itemExist = cart.findIndex( item => item.id === guitar.id)
    if (itemExist >=0) {
        if (cart[itemExist].quantity >= MAX_ITEMS) return 
        const updateCart = [...cart]
        updateCart[itemExist].quantity++
        setCart(updateCart)
    } else {
        guitar.quantity = 1
        setCart( prevCart => [...prevCart, guitar])
    }
    
  }

  const deleteToCart = (id) => {
    const newCart = cart.filter( c => c.id !== id)
    setCart(newCart)
  }

 const incrementQuantity = (id) => {
   const newCart = cart.map( c =>{
     if (c.id === id && c.quantity < MAX_ITEMS) {
       return {
         ...c, quantity: c.quantity +1
       }
     }
     return c
   })
   setCart(newCart)
 }

 const decreaseQuantity = (id) => {
  const newCart = cart.map( c =>{
    if (c.id === id && c.quantity > MIN_ITEMS) {
      return {
          ...c,  quantity: c.quantity -1
      } 
    }
    return c
  })
  setCart(newCart)
 }
  
 const clearCart = () => {
   setCart([])
 }


  return (
    <>
    <HeaderComponent 
      cart={cart}
      deleteToCart = {deleteToCart} 
      incrementQuantity = {incrementQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart = {clearCart}
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
