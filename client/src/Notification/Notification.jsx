import React from "react";
import styles from './Notification.module.scss'

function Notification({ notification, removeNot }) {
  return (
    <div 
      onClick={() => removeNot(notification.id, true)} 
      className={!notification.type ? (notification.hidden ? styles.notification_hidden : styles.notification) : (notification.hidden ? styles.notification_err_hidden : styles.notification_err)}
    >
      <p className={styles.notification__text}>{notification.text}</p>
    </div>
  )
}

export default Notification;