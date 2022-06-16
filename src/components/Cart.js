import CartBody from "./CartBody";
import "./Main.scss";

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
        <CartBody
          cart={cart}
          handleMinus={handleMinus}
          handlePlus={handlePlus}
          totals={totals}
          delivery={delivery}
          subTotal={subTotal}
        />
      </div>
      <div className="cart-small">
        <button
          className={
            cart.length > 0
              ? "add-to-cart active-cart"
              : "add-to-cart empty-cart"
          }
        >
          <h3>Valider mon panier</h3>
        </button>
      </div>
    </div>
  );
};

export default Cart;
