import Cart from "./Cart";
import Meals from "./Meals";

const Body = ({
  data,
  handleAddToCart,
  FontAwesomeIcon,
  cart,
  handleMinus,
  handlePlus,
  totals,
  delivery,
  subTotal,
}) => {
  return (
    <div className="main">
      <Meals
        data={data}
        handleAddToCart={handleAddToCart}
        FontAwesomeIcon={FontAwesomeIcon}
      />
      <Cart
        cart={cart}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        totals={totals}
        delivery={delivery}
        subTotal={subTotal}
      />
    </div>
  );
};

export default Body;
