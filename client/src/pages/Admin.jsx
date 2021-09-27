import React from 'react'
import {Soda, Balance, ThrowCoins} from '../components/index'
import styles from '../styles/Admin.module.scss'

function AdminPage() {
  return (
  <div className={styles.wrapper}>
  <Soda admin={true}/>
  <div className={styles.panel}>
    <Balance admin={true}/>
    <ThrowCoins admin={true}/>
  </div>
</div>
  )
}

export default AdminPage;