const Meals = ({ data, handleAddToCart, FontAwesomeIcon }) => {
  return (
    <div className="col-1">
      {data.categories.map((cat, index) => {
        return (
          <div key={index}>
            {data.categories[index].meals.length > 0 && (
              <div className="cat-wrapper">
                <h2>{data.categories[index].name}</h2>
                <div className="card-container">
                  {data.categories[index].meals.map((dish, i) => {
                    return (
                      <div
                        className="cat-card"
                        key={i}
                        onClick={() => {
                          handleAddToCart(dish, index);
                        }}
                      >
                        <div
                          className={dish.picture ? "left-side" : "full-width"}
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
  );
};

export default Meals;
