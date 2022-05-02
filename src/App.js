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
      <section className="main">
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
                          <div className="cat-card" key={i}>
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
              <span>Votre panier est vide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
