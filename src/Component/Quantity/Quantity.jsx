import React from 'react'
import QuantityStyles from './Quantity.module.css'

export default function Quantity({ quantity, decerement, incerement }) {
  return (
    <div className={QuantityStyles.main}>
      <button type='button' onClick={decerement}>
        -
      </button>
      <input
        className={QuantityStyles.input}
        type='number'
        value={quantity}
        readOnly
      />
      <button type='button' onClick={incerement}>
        +
      </button>
    </div>
  )
}
