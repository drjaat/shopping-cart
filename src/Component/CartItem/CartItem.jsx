import React from 'react'
import CartItemCss from './CartItem.module.css'

export default function CartItem({ id, name, deleteItem, img_url }) {
  return (
    <div key={id} className={CartItemCss.cartItem}>
      <img src='https://place-hold.it/40.jpg' alt={name} />
      <h3>{name}</h3>
      <button onClick={deleteItem}>X</button>
    </div>
  )
}
