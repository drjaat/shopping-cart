import React from 'react'
import NotificationCss from './Notification.module.css'

export default function Notification({ notification, options }) {
  console.log(notification, options)
  return (
    <div className={NotificationCss.main} style={options}>
      {notification &&
        notification.map((item) => {
          return (
            <div
              className={NotificationCss.message}
              style={{
                backgroundColor: item.type === 'error' ? 'red' : 'green',
              }}
            >
              <hr className={NotificationCss.timer} />
              <p>{item.message}</p>
            </div>
          )
        })}
    </div>
  )
}
