import React, { useContext } from "react";
import styles from '../styles/User.module.scss'
import adminStyles from '../styles/Admin.module.scss'
import Context from '../Context/Context';

function Balance({admin}) {
  const { coins, increaseCoinCount, decreaseCoinCount } = useContext(Context);
  
  const calculatedSum = () => {
    let sum = 0;
    coins.forEach(coin => {
      sum += coin.value * coin.count;
    })
    return sum;
  }

  const userDraw = () => {
    return (
      <div className={styles.balance}>
        <p className={styles.balance__coins}>{calculatedSum()} coin</p>
        <div className={styles.balance__list}>
          {coins.map((coin, i) => {
            return (<div key={i} className={styles.balance__coin}>
              <h4>{coin.value}</h4>
              <p>{coin.count}x</p>
            </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  const adminDraw = () => {
    return (
      <div className={styles.balance}>
        <p className={styles.balance__coins}>{calculatedSum()} coin</p>
        <div className={adminStyles.balance__list}>
          {coins.map((coin, i) => {
            return (<div key={i} className={styles.balance__coin}>
              <h4>{coin.value}</h4>
              <div className={adminStyles.balance__count}>
                <p>{coin.count}x</p>
                <div className={adminStyles.balance__btns}>
                  <button onClick={() => increaseCoinCount(coin.id)} className={adminStyles.balance__btn}>+</button>
                  <button onClick={() => decreaseCoinCount(coin.id)} className={adminStyles.balance__btn}>-</button>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    )
  }

  return admin ? adminDraw() : userDraw();

}

export default Balance;