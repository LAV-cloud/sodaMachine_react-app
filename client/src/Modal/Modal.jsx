import React, { useState } from 'react'
import styles from './Modal.module.scss'
import useInput from '../Hooks/useInput'
import Context from '../Context/Context';
import { useContext } from 'react';
import useFile from '../Hooks/useFile'

export default class Modal extends React.Component {
  state = {
    isOpen: false
  }

  toggleOpen() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.toggleOpen()} className={styles.add}>+</button>

        {this.state.isOpen && (
          <>
            <div onClick={() => this.toggleOpen()} className={styles.modal}>
            </div>
            <ModalBody/>
          </>
        )}
      </React.Fragment>
    )
  }
}

function ModalBody() {
  const file = useFile(null);
  const name = useInput('Default name', 'text');
  const price = useInput(0, 'number');

  var [count, setCount] = useState(0);

  const { addSoda, addNot } = useContext(Context);

  function changeCount(type) {
    if (type) setCount(count += 1);
    if (!type && count > 0) setCount(count-= 1);
  }

  function clear() {
    file.clear();
    name.clear();
    price.clear();
    setCount(0);
  }

  function checkEmpty() {
    if (name.isEmpty || price.isEmpty || !file.value()) {
      return true;
    }
    return false;
  }

  function createNew() {
    if (!checkEmpty()) {
      addSoda(file.value().file, name.value(), price.value(), count);
      clear();
    } else {
      addNot(1, 'Error one of field is empty or file have not image type');
    }
  }

  return (
    <div className={styles.modalBody}>
      <div className={styles.file}>
        <label>
          <input hidden {...file.bind} />
          {!file.value() ? (
            <div className={styles.file__input}>Выберите файл</div>
          ) : (
            <div className={[styles.file__input, styles.file__input_with].join(' ')}>
              <div className={styles.file__info}>
                <h4>{file.value().name}</h4>
                <p>{file.value().sizeMod}</p>
              </div>
              <div className={styles.file__settings}>
                <button onClick={() => file.clear()}>&times;</button>
              </div>
              <img className={styles.file__img} src={file.value().img} alt={file.value().name} />
            </div>
          )}
        </label>
      </div>
      <div className={styles.row}>
        <h4>Name</h4>
        <input {...name.bind} className={styles.input}/>
      </div>
      <div className={styles.row}>
        <h4>Price</h4>
        <input className={styles.input} {...price.bind} />
      </div>
      <div className={styles.row}>
        <h4>Count</h4>
        <div className={styles.count}>
          <p>{count}</p>
          <div className={styles.btns}>
            <button onClick={() => changeCount(1)} className={styles.btn}>+</button>
            <button onClick={() => changeCount(0)} className={styles.btn}>-</button>
          </div>
        </div>
      </div>
      <button onClick={() => createNew()} className={styles.create}>Create new soda</button>
    </div>
  )
}