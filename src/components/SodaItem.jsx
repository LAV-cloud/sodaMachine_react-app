import React, { useState, useContext } from 'react';
import Context from '../Context/Context';
import useInput from './../Hooks/useInput';
import useFile from './../Hooks/useFile';
import styles from '../styles/User.module.scss'
import adminStyles from '../styles/Admin.module.scss'

function SodaItem({soda, admin}) {
  const { buySoda, removeSoda, saveChangesSoda } = useContext(Context);
  const file = useFile();
  var [count, setCount] = useState(soda.count);
  const price = useInput(soda.price, 'number');

  const userDraw = () => {
    return (
      <div className={soda.count > 0 ? styles.soda__item : styles.soda__item_empty}>
        <img src={soda.icon} alt={soda.name} className={styles.soda__icon} />
        <h4 className={styles.soda__title}>{soda.name}</h4>
        <p className={styles.soda__count}>{soda.count} left</p>
        <button onClick={() => buySoda(soda.id)} className={styles.soda__buy}>buy {soda.price} coin</button>
      </div>
    )
  }

  function changeCount(type) {
    if (type) setCount(count += 1);
    if (!type && count > 0) setCount(count -= 1);
  }

  function clear() {
    file.clear();
    price.clear();
  }

  function saveChanges(id) {
    saveChangesSoda(id, file.value().img, price.value(), count);
    clear();
  }

  const adminDraw = () => {
    return (
      <div className={count > 0 ? styles.soda__item : styles.soda__item_empty}>
        <div className={adminStyles.soda__iconBlock}>
          <label className={adminStyles.soda__iconText}>
            <input {...file.bind} hidden/>
            Change icon
          </label>
          <img src={file.value() ? file.value().img : soda.icon} alt={soda.name} className={adminStyles.soda__icon} />
        </div>
        <h4 className={styles.soda__title}>{soda.name}</h4>
        <p><input {...price.bind} className={adminStyles.soda__price} /> coin</p>
        <div className={adminStyles.soda__count}>
          <p className={styles.soda__count}>{count}x</p>
          <div className={adminStyles.soda__btns}>
            <button onClick={() => changeCount(1)} className={adminStyles.soda__btn}>+</button>
            <button onClick={() => changeCount(0)} className={adminStyles.soda__btn}>-</button>
          </div>
        </div>
        <div>
        <button onClick={() => saveChanges(soda.id)} className={adminStyles.soda__saveChanges}>Save</button>
        <button onClick={() => removeSoda(soda.id)} className={adminStyles.soda__remove}>&times;</button>
        </div>
      </div>
    )
  }

  return admin ? adminDraw() : userDraw();
}

export default SodaItem;