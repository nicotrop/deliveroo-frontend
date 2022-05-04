const Cart = ({
  cart,
  handleMinus,
  handlePlus,
  totals,
  delivery,
  subTotal,
}) => {
  return (
    <div className="col-2">
      <div className="panier">
        <button
          className={
            cart.length > 0
              ? "add-to-cart active-cart"
              : "add-to-cart empty-cart"
          }
        >
          <h3>Valider mon panier</h3>
        </button>
        <div className="my-cart">
          {cart.length > 0 ? (
            <div className="cart-wrapper">
              <div className="meals">
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
                        <span>{item.qty}</span>
                        <button
                          onClick={() => {
                            handlePlus(index);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="name">
                        <span>{item.title}</span>
                      </div>
                      <div className="price">
                        <span>{item.total.toFixed(2)} €</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="total-section">
                <div className="sous-total">
                  <span>Sous-total</span> <span>{totals.toFixed(2)} €</span>
                </div>
                <div className="shipping">
                  <span>Frais de livraison</span> <span>{delivery} €</span>
                </div>
              </div>

              <div className="total">
                <h3>Total </h3> <h3>{subTotal.toFixed(2)} €</h3>
              </div>
            </div>
          ) : (
            <span className="empty-cart">Votre panier est vide</span>
          )}
        </div>
      </div>
      <div className="cart-small">
        <button></button>
      </div>
    </div>
  );
};

export default Cart;
