import React, {useContext} from "react";
import styles from './Notification.module.scss'
import Notification from './Notification'
import Context from './../Context/Context';

function NotificationList() {
  const {notifications, removeNot} = useContext(Context);

  const reverseArray = () => {
    return notifications.map((_, i) => notifications[notifications.length - 1 - i ])
  }

  return (
    <div className={styles.list}>
      {reverseArray().map(( notification, i ) => {
        return <Notification removeNot={removeNot} notification={notification} key={i} />
      })}
    </div>
  )
}

export default NotificationList;