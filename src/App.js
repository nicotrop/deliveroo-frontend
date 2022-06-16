import "./App.css";
import "./components/Main.scss";
import "./components/Header.scss";
import "./components/Responsive.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./components/Header";
import Body from "./components/Body";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState(0);
  const [delivery] = useState("2.50");
  const [subTotal, setSubtotal] = useState(2.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://deliveroo-replica.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  const handleAddToCart = (dish) => {
    const cartTab = [...cart];
    const objIndex = cartTab.findIndex((element) => element.id === dish.id);
    console.log(cartTab[objIndex]);
    if (objIndex >= 0) {
      cartTab[objIndex].qty += 1;
      cartTab[objIndex].total = cartTab[objIndex].qty * cartTab[objIndex].price;
      setCart(cartTab);
      setTotals(totals + Number(cartTab[objIndex].price));
      setSubtotal(subTotal + Number(cartTab[objIndex].price));
    } else {
      dish.qty = 1;
      dish.total = dish.qty * Number(dish.price);
      cartTab.push(dish);
      setCart(cartTab);
      setTotals(totals + Number(dish.price));
      setSubtotal(subTotal + Number(dish.price));
    }
    console.log(cartTab);
  };

  const handleMinus = (num) => {
    const cartArr = [...cart];
    let item = cartArr[num];
    if (item.qty > 1) {
      item.qty -= 1;
      item.total -= item.price;
      setCart(cartArr);
      setTotals(totals - Number(item.price));
      setSubtotal(subTotal - Number(item.price));
    } else {
      setTotals(totals - Number(item.price));
      setSubtotal(subTotal - Number(item.price));
      cartArr.splice(num, 1);
      setCart(cartArr);
      console.log(num);
      console.log(cart[num].price);
    }
  };

  const handlePlus = (num) => {
    const cartTab = [...cart];
    cartTab[num].qty += 1;
    cartTab[num].total = cartTab[num].qty * cartTab[num].price;
    setCart(cartTab);
    setTotals(totals + Number(cartTab[num].price));
    setSubtotal(subTotal + Number(cartTab[num].price));
  };

  return isLoading ? (
    <div className="App">
      <section className="header">
        <div className="logo-bar">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/f/f7/Deliveroo_logo.svg"
            alt="deliveroo blue logo"
          />
        </div>
        <h2 className="loading">En cours de chargement...</h2>
      </section>
    </div>
  ) : (
    <div className="App">
      <section className="header">
        <Header data={data} />
      </section>
      <div className="container">
        <section>
          <Body
            data={data}
            handleAddToCart={handleAddToCart}
            FontAwesomeIcon={FontAwesomeIcon}
            cart={cart}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            totals={totals}
            delivery={delivery}
            subTotal={subTotal}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
