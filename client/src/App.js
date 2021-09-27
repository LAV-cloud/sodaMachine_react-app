import React, { useEffect, useState } from 'react';
import UserPage from './pages/User';
import AdminPage from './pages/Admin';
import styles from './styles/Main.module.scss';
import Context from './Context/Context';
import NotificationList from './Notification/NotificationList';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const App = () => {
  var [coins, setCoins] = useState([
    { id: 1, value: 1, count: 10 },
    { id: 2, value: 2, count: 10 },
    { id: 3, value: 5, count: 4 },
    { id: 4, value: 10, count: 5 },
  ]);
  var [sodas, setSodas] = useState([]);
  var [inMachineCoins, setInMachineCoins] = useState([]);
  var [sodaInCart, setSodaInCart] = useState([]);
  var [inMachine, setInMachine] = useState(0);
  var [spareCoins, setSpareCoins] = useState(0);
  var [notifications, setNotifications] = useState([]);
  var [id, setId] = useState(1);
  var [load, setLoad] = useState(true);

  const location = useLocation();
  const adminPass = 'admin';
  const { password } = queryString.parse(location.search);

  useEffect(() => {
    if (notifications.length > 5) {
      removeNot(notifications[0].id);
    }
    if (notifications.length > 0) {
      var timer = setInterval(() => {
        if (notifications.length > 0) removeNot(notifications[0].id);
      }, 3000);
    }

    return () => clearInterval(timer);
    //  eslint-disable-next-line
  }, [id]);

  const removeNot = (id, click) => {
    hiddenNot(id);
    if (click) {
      setNotifications(
        (notifications = notifications.filter((not) => not.id !== id))
      );
      return;
    }
    setTimeout(() => {
      setNotifications(
        (notifications = notifications.filter((not) => not.id !== id))
      );
    }, 300);
  };

  const hiddenNot = (id) => {
    setNotifications(
      notifications.map((not) => {
        if (not.id === id) not.hidden = true;
        return not;
      })
    );
  };

  const addNot = (type, text) => {
    if (notifications.length <= 5) {
      setNotifications(
        (notifications = [...notifications, { id, type, text, hidden: false }])
      );
    }
    setId((id += 1));
  };

  async function getSodas() {
    try {
      await fetch(`http://localhost:5000/sodas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((result) => setSodas((sodas = result)));
    } catch (err) {
      console.error(err);
    }
    setLoad((load = false));
  }

  useEffect(() => {
    getSodas();
    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    setInMachineCoins(
      coins.map((coin) => {
        let inMachineCoin = {
          id: coin.id,
          value: coin.value,
          count: 0,
          toggle: true,
        };
        return inMachineCoin;
      })
    );
    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    let sum = 0;

    inMachineCoins.map((coin) => {
      sum += coin.value * coin.count;
      return coin;
    });

    setInMachine(sum);
  }, [inMachineCoins]);

  //  check for if soda count will be less than 0
  useEffect(() => {
    let id;

    sodas.map((soda) => {
      if (soda.count < 0) id = soda.id;
      return soda;
    });

    if (id) {
      setSodas(
        sodas.map((soda) => {
          if (soda.id === id) soda.count = 0;
          return soda;
        })
      );
    }
  }, [sodas]);

  useEffect(() => {
    let spare = inMachine;

    sodaInCart.map((soda) => {
      spare -= soda.price * soda.count;
      return soda;
    });

    setSpareCoins(spare);
  }, [sodaInCart, inMachine]);

  const reset = () => {
    setInMachineCoins(
      inMachineCoins.map((coin) => {
        coin.count = 0;
        return coin;
      })
    );
    setSodaInCart([]);
    setInMachine(0);
    setSpareCoins(0);
  };

  async function createSoda(soda) {
    let formData = new FormData();
    formData.append('id', soda.id);
    formData.append('image', soda.image, soda.image.name);
    formData.append('name', soda.name);
    formData.append('price', soda.price);
    formData.append('count', soda.count);

    try {
      await fetch(`http://localhost:5000/sodas`, {
        method: 'POST',
        body: formData,
      }).then(() => getSodas());
    } catch (err) {
      addNot(1, `Error: ${err}`);
    }
  }

  const addSoda = (image, name, price, count) => {
    let newSoda = {
      id: Math.round(Math.random() * 1000000),
      image,
      name,
      price,
      count,
    };

    createSoda(newSoda)
      .then(() => addNot(0, 'Successful create new soda'))
      .catch((err) => addNot(1, `Error: ${err}`));
  };

  const removeSoda = (id) => {
    let success = false;

    setSodas(sodas.filter((soda) => soda.id !== id));
    sodas.map((soda) => {
      if (soda.id === id) {
        success = true;
      }
      return soda;
    });

    if (success) {
      addNot(0, 'Successful remove soda');
    } else {
      addNot(1, 'Unsuccessful remove soda');
    }
  };

  const saveChangesSoda = (id, icon, price, count) => {
    setSodas(
      sodas.map((soda) => {
        if (
          soda.id === id &&
          (soda.icon !== icon || soda.price !== price || soda.count !== count)
        ) {
          soda.icon = icon;
          soda.price = price;
          soda.count = count;
          addNot(0, `Changes saved ${soda.name}`);
        }
        return soda;
      })
    );
  };

  const increaseCoinCount = (id) => {
    setCoins(
      coins.map((coin) => {
        if (coin.id === id) coin.count++;
        return coin;
      })
    );
  };

  const decreaseCoinCount = (id) => {
    setCoins(
      coins.map((coin) => {
        if (coin.id === id && coin.count > 0) coin.count--;
        return coin;
      })
    );
  };

  const toggleCoin = (id) => {
    setInMachineCoins(
      inMachineCoins.map((coin) => {
        if (coin.id === id) coin.toggle = !coin.toggle;
        return coin;
      })
    );
  };

  const getSpareCoins = () => {
    let spare = spareCoins;

    addNot(0, `Received spare ${spare} coin`);

    if (spare === 0) {
      reset();
      return;
    }

    for (let i = coins.length - 1; i >= 0; i--) {
      while (spare >= coins[i].value && spare / coins[i].value > 0) {
        spare -= coins[i].value;
        setCoins(
          coins.map((coin) => {
            if (coin.id === coins[i].id) coin.count++;
            return coin;
          })
        );
      }
    }
    reset();
  };

  const addCoins = (id) => {
    let count = 0;

    setCoins(
      coins.map((coin) => {
        if (coin.id === id && coin.count > 0 && inMachineCoins[id - 1].toggle) {
          count = coin.count;
          coin.count--;
        }
        return coin;
      })
    );

    setInMachineCoins(
      inMachineCoins.map((coin) => {
        if (coin.id === id && count > 0 && coin.toggle) coin.count++;
        return coin;
      })
    );
  };

  const addNewSodaInCart = (id, sum) => {
    let err = false,
      bottle;

    setSodas(
      sodas.map((soda) => {
        if (soda.id === id && (soda.count <= 0 || sum - soda.price < 0)) {
          err = true;
        }

        if (soda.id === id && sum - soda.price >= 0 && !err) {
          soda.count--;
          bottle = {
            id: soda.id,
            name: soda.name,
            count: 1,
            price: soda.price,
          };
        }
        return soda;
      })
    );
    return { bottle, err };
  };

  const addInCart = (id) => {
    let hasAlready = false;
    const { bottle, err } = addNewSodaInCart(id, spareCoins);

    if (err) {
      addNot(1, 'Soda is empty or user does not have enough money!');
      return;
    }

    //  check for the same soda in cart
    sodaInCart.map((soda) => {
      if (soda.id === id) hasAlready = true;
      return soda;
    });

    if (hasAlready) {
      setSodaInCart(
        sodaInCart.map((soda) => {
          if (soda.id === id) soda.count++;
          return soda;
        })
      );
    }

    if (!hasAlready) {
      setSodaInCart((sodaInCart = [...sodaInCart, bottle]));
    }

    if (sodaInCart.length === 0) {
      addNot(1, "Don't add in cart!");
      return;
    }
  };

  const buySoda = (id) => {
    if (inMachine <= 0) return;
    addInCart(id);
  };

  return (
    <Context.Provider
      value={{
        coins,
        inMachineCoins,
        inMachine,
        sodas,
        sodaInCart,
        spareCoins,
        getSpareCoins,
        addCoins,
        buySoda,
        addSoda,
        removeSoda,
        saveChangesSoda,
        increaseCoinCount,
        decreaseCoinCount,
        toggleCoin,
        notifications,
        addNot,
        removeNot,
        load,
      }}
    >
      <div className={styles.wrapper}>
        <NotificationList />
        {password === adminPass ? <AdminPage /> : <UserPage />}
      </div>
    </Context.Provider>
  );
};

export default App;
