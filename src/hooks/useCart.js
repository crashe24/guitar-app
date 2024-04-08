import { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"
import {db} from '../data/db'


function useCart ()  {

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

        // state derivado
  const isEmpty =  useMemo(() => cart.length ===0, [cart])
  const totalQuantity = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity),0 ),[cart])

    return {
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
    }
}

export {
    useCart
}
