import React, { useContext } from "react";
import styles from '../styles/User.module.scss'
import Context from '../Context/Context';

function Total() {
  const {inMachine, spareCoins, getSpareCoins} = useContext(Context);

  return (
    <div className={styles.total}>
      <div className={styles.total__block}>
        <h4>Total:</h4>
        <div className={styles.total__row}>
          <p className={styles.total__money}>{inMachine}</p>
          <p>coin</p>
        </div>
      </div>
      <div className={styles.total__block}>
        <h4>Spare money:</h4>
        <div className={styles.total__row}>
          <p className={styles.total__money}>{spareCoins}</p>
          <p>coin</p>
        </div>
      </div>
      <button onClick={() => getSpareCoins()} className={styles.total__pay}>Get spare</button>
    </div>
  )
}

export default Total;