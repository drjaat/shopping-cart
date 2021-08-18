import React, { useState, useEffect } from 'react'
import CartStyle from './Cart.module.css'
import Data from '../Data/Data.json'
import CartItem from '../Component/CartItem/CartItem'
import SubTotal from '../Component/SubTotal/SubTotal'
import Quantity from '../Component/Quantity/Quantity'
import Notification from '../Component/Notification/Notification'

export default function Cart() {
  const [listItems, setListItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState([])

  useEffect(() => {
    setLoading(true)
    const list = JSON.parse(localStorage.getItem('Items'))
    updateItemList(list ? list : Data.map((item) => ({ ...item, quantity: 1 })))
    setLoading(false)
  }, [])

  const updateItemList = (updatedList) => {
    setListItems(updatedList)
    localStorage.setItem('Items', JSON.stringify(updatedList))
  }

  const deleteItem = (id) => {
    const index = listItems.findIndex((item) => item.id === id)

    const newNotification = {
      message: `${listItems[index].name} is successfully removed from your shopping cart`,
      timer: 2000,
      type: 'success',
    }
    updateNotification(newNotification)
    updateItemList(listItems.filter((item) => item.id !== id))
  }

  const updateNotification = ({ message, timer, type }) => {
    setNotification((prevState) => {
      setTimeout(() => {
        removeNotification(prevState.length + 1)
      }, timer)
      return [
        ...prevState,
        {
          message,
          id: prevState.length + 1,
          type,
        },
      ]
    })
  }

  const removeNotification = (id) => {
    setNotification((prevState) => {
      return prevState.filter((item) => item.id !== id)
    })
  }

  const changeQuantity = (id, type) => {
    updateItemList(
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
    updateItemList(Data.map((item) => ({ ...item, quantity: 1 })))
  }

  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <>
      <Notification notification={notification} />
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
    </>
  )
}
