import React, {useContext} from "react";
import styles from '../styles/User.module.scss'
import Context from '../Context/Context';

function Cart() {
  const { sodaInCart } = useContext(Context);

  return (
        <div className={styles.cart}>
          <h3>Cart:</h3>
          {sodaInCart.length > 0 ? (
            <>
              {sodaInCart.map((soda, i) => {
                return (
                  <div key={i} className={styles.cart__item}>
                    <h4>{soda.name}</h4>
                    <p>{soda.count}x</p>
                    <p>{soda.price * soda.count} coin</p>
                  </div>
                )
              })}
            </>
          ) : (
            <p style={{opacity: '.4', textAlign: "center", width: "100%", margin:"10px 0px"}}>Empty</p>
          )}
        </div>
  )
}

export default Cart;