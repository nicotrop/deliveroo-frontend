const Header = ({ data }) => {
  return (
    <div>
      <div className="logo-bar">
        <div className="container">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/f/f7/Deliveroo_logo.svg"
            alt="deliveroo blue logo"
          />
        </div>
      </div>
      <div className="top-content">
        <div className="container">
          <div className="desc">
            <div className="left-col">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div className="right-col">
              <img src={data.restaurant.picture} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
