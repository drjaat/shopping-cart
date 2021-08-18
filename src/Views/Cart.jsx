import React, { useState, useEffect } from 'react'
import CartStyle from './Cart.module.css'
import Data from '../Data/Data.json'
import CartItem from '../Component/CartItem/CartItem'
import SubTotal from '../Component/SubTotal/SubTotal'
import Quantity from '../Component/Quantity/Quantity'

export default function Cart() {
  const [listItems, setListItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setListItems(Data.map((item) => ({ ...item, quantity: 1 })))
    setLoading(false)
  }, [])

  const deleteItem = (id) => {
    setListItems(listItems.filter((item) => item.id !== id))
  }

  const incerement = (id) => {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          const quantity = item.quantity + 1
          return { ...item, quantity }
        }
        return item
      })
    )
  }
  const decerement = (id) => {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity-- }
        }
        return item
      })
    )
  }

  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <div>
      <div>
        {listItems &&
          listItems.map(({ id, name, img_url, price, quantity }) => {
            return (
              <>
                <CartItem
                  id={id}
                  name={name}
                  img={img_url}
                  deleteItem={() => {
                    deleteItem(id)
                  }}
                />
                <Quantity
                  quantity={quantity}
                  incerement={() => {
                    incerement(id)
                  }}
                  decerement={() => {
                    decerement(id)
                  }}
                />
                <span>{price}</span>
              </>
            )
          })}
      </div>
      <SubTotal />
    </div>
  )
}
