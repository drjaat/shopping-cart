import React from 'react'

export default function Quantity({ quantity, decerement, incerement }) {
  return (
    <div>
      <button onClick={decerement}>-</button>
      <input type='number' value={quantity} readOnly />
      <button onClick={incerement}>+</button>
    </div>
  )
}
