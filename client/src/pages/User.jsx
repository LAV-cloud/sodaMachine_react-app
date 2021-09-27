import React from "react";
import { Soda, Cart, Balance, ThrowCoins, Total } from "../components/index";
import styles from '../styles/User.module.scss'

function UserPage() {

  return (
    <div className={styles.wrapper}>
      <Soda/>
      <div className={styles.panel}>
        <Balance/>
        <ThrowCoins/>
        <Cart/>
        <Total/>
      </div>
    </div>
  )
}

export default UserPage;