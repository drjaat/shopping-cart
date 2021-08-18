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

  const changeQuantity = (id, type) => {
    setListItems(
      listItems.map((item) => {
        if (item.id === id) {
          const quantity = item.quantity + (type === 'Inc' ? +1 : -1)
          return { ...item, quantity }
        }
        return item
      })
    )
  }

  const reloadItems = () => {
    setListItems(Data.map((item) => ({ ...item, quantity: 1 })))
  }

  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <div className={CartStyle.main}>
      <h1>Order Summary</h1>
      <div className={CartStyle.item_list}>
        <div className={CartStyle.head_container}>
          <p>Items({listItems.length})</p>
          <p>Qty</p>
          <p>Price</p>
        </div>
        <div className={CartStyle.list_box}>
          {listItems && listItems.length ? (
            listItems.map(({ id, name, img_url, price, quantity }) => {
              return (
                <div key={id} className={CartStyle.list_row}>
                  <CartItem
                    id={id}
                    name={name}
                    img_url={img_url}
                    deleteItem={() => {
                      deleteItem(id)
                    }}
                  />
                  <Quantity
                    quantity={quantity}
                    incerement={() => {
                      changeQuantity(id, 'Inc')
                    }}
                    decerement={() => {
                      changeQuantity(id, 'Dec')
                    }}
                  />
                  <p> &#36;{price}</p>
                </div>
              )
            })
          ) : (
            <button
              type='button'
              className={CartStyle.reload}
              onClick={reloadItems}
            >
              Reload items in the Cart
            </button>
          )}
        </div>
      </div>
      <div className={CartStyle.subTotal}>
        <SubTotal listItems={listItems} />
      </div>
    </div>
  )
}
