import "./App.css";
import "./Header.scss";
import "./Main.scss";
import "/Users/nicolastroplent/Downloads/LeReacteur/Javascript/Day-26/deliveroo-replica/src/Header.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        console.log(response.data);
        console.log(response.data.categories[0].meals[0].title);
      } catch (error) {
        console.log(error.response);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  const handleAddToCart = (dish, index) => {
    const cartTab = [...cart];
    if (cartTab.filter((element) => (element.id === dish[0].id).length > 1)) {
      cartTab[index].qty += 1;
      cartTab[index].total = cartTab[index].qty * cartTab[index].price;
      setCart(cartTab);
      setTotals(totals + cartTab[index].total);
      setSubtotal(subTotal + totals);
    } else {
      dish.qty = 1;
      dish.total = dish.qty * Number(dish.price);
      cartTab.push(dish);
      setCart(cartTab);
      setTotals(totals + dish.total);
      setSubtotal(subTotal + totals);
    }
    console.log(cartTab);
  };

  const handleMinus = (num) => {
    const cartArr = [...cart];
    cartArr.splice(num, 1);
    setCart(cartArr);
    setTotals(totals - Number(cart[num].price));
    console.log(num);
    console.log(cart[num].price);
    // console.log(cartArr);
  };

  const handlePlus = (item) => {
    const cartArr = [...cart];
    cartArr.push(item);
    setCart(cartArr);
    console.log(item);
    console.log(cartArr);
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
        <div className="logo-bar">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/f/f7/Deliveroo_logo.svg"
            alt="deliveroo blue logo"
          />
        </div>
        <div className="top-content">
          <div className="left-col">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="right-col">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </div>
      </section>
      <section className="main full-bg">
        <div className="col-1">
          {data.categories.map((cat, index) => {
            return (
              <div>
                {data.categories[index].meals.length > 0 && (
                  <div className="cat-wrapper" key={index}>
                    <h2>{data.categories[index].name}</h2>
                    <div className="card-container">
                      {data.categories[index].meals.map((dish, i) => {
                        return (
                          <div
                            className="cat-card"
                            key={i}
                            onClick={() => {
                              handleAddToCart(dish);
                            }}
                          >
                            <div
                              className={
                                dish.picture ? "left-side" : "full-width"
                              }
                            >
                              <h3 className="title">
                                {data.categories[index].meals[i].title}
                              </h3>
                              <p className="description">
                                {data.categories[index].meals[i].description}
                              </p>
                              <div>
                                <span className="prix"></span>
                                <span>
                                  {data.categories[index].meals[i].price} €
                                </span>
                                {data.categories[index].meals[i].popular ===
                                  true && (
                                  <span className="popular">
                                    <FontAwesomeIcon icon="star" />
                                    Populaire
                                  </span>
                                )}
                              </div>
                            </div>
                            {data.categories[index].meals[i].picture && (
                              <div className="right-side">
                                <img
                                  src={data.categories[index].meals[i].picture}
                                  alt="brunch"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="col-2">
          <div className="panier">
            <button className="add-to-cart">
              <h3>Valider mon panier</h3>
            </button>
            <div className="my-cart">
              {cart.length > 0 ? (
                <div className="cart-wrapper">
                  {cart.map((item, index) => {
                    return (
                      <div className="items-ordered" key={index}>
                        <div className="controls">
                          <button
                            onClick={() => {
                              handleMinus(index);
                            }}
                          >
                            -
                          </button>
                          <span>1</span>
                          <button>+</button>
                        </div>
                        <div className="name">
                          <span>{item.title}</span>
                        </div>
                        <div className="price">
                          <span>{item.price} €</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="sous-total">
                    <span>Sous-total</span> <span>{totals} €</span>
                  </div>
                  <div className="shipping">
                    <span>Frais de livraison</span> <span>{delivery} €</span>
                  </div>
                  <div className="total">
                    <span>Total </span> <span>{subTotal} €</span>
                  </div>
                </div>
              ) : (
                <span className="empty-cart">Votre panier est vide</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
