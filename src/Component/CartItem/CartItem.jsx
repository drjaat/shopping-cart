import React from 'react'
import CartItemCss from './CartItem.module.css'

export default function CartItem({ name, deleteItem, img_url }) {
  return (
    <div className={CartItemCss.cartItem}>
      <div
        className={CartItemCss.img}
        style={{ backgroundImage: `url(${img_url})` }}
      />
      <span>{name}</span>
      <button type='button' onClick={deleteItem}>
        X
      </button>
    </div>
  )
}
