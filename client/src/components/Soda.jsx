import React, { useContext } from "react";
import styles from '../styles/User.module.scss'
import Context from '../Context/Context';
import Modal from "../Modal/Modal";
import Loader from './Loader'
import SodaItem from "./SodaItem";

function Soda({ admin }) {
  const { sodas, load } = useContext(Context);

  return (
    <>
    {sodas.length <= 0 && !admin ? 
      (load ? 
        (<div className={styles.soda_empty}><Loader/></div>) : 
        (<div className={styles.soda_empty}>Empty</div>)
      )  : (
        <div className={styles.soda}>
          {sodas.map((soda, i) => {
            return (
              <SodaItem key={i} soda={soda} admin={admin} />
            )
          })}
          {admin && (
            <Modal />
          )}
        </div>
      )}
    </>
  )
}

export default Soda;