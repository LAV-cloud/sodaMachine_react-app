import React, { useContext } from "react"
import styles from '../styles/User.module.scss'
import adminStyles from '../styles/Admin.module.scss'
import Context from '../Context/Context';

function ThrowCoins({ admin }) {
  const {inMachineCoins} = useContext(Context);

  return (
      <div className={styles.throw}>
        {inMachineCoins.map((coin, i) => {
          return (
            <Coin admin={admin} coin={coin} key={i} />
          )
        })}
      </div>
  )
}

function Coin({ coin, admin }) {
  const { addCoins, toggleCoin } = useContext(Context);

  const userDraw = () => {
    return (
      <div className={coin.toggle ? styles.throw__col : styles.throw__col_disabled}>
        <h3 className={styles.throw__value}>{coin.value}</h3>
        <p className={styles.throw__count}>{coin.count}x</p>
        <button onClick={() => addCoins(coin.id)} className={styles.throw__add}>add</button>
      </div>
    )
  }
  
  const adminDraw = () => {
    return (
      <div className={styles.throw__col}>
        <h3 className={styles.throw__value}>{coin.value}</h3>
        <button onClick={() => toggleCoin(coin.id)} className={coin.toggle ? adminStyles.throw__checkbox_checked : adminStyles.throw__checkbox} />
      </div>
    )
  }

  return admin ? adminDraw() : userDraw();
}

export default ThrowCoins;