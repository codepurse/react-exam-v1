import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const DivOval = ({ label, data }) => {
  return (
    <div className="divOval">
      <span className="firstSpan">{label}: </span>
      <span className="secondSpan">{data}</span>
    </div>
  );
};

export default function ProductDetails({ data }) {
  const { title, price, rating, stock, category, description } = data;
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const handleClickAdd = () => {
    if (count != stock) setCount((prevCount) => prevCount + 1);
  };

  const handleClickMinus = () => {
    if (count != 0) setCount((prevCount) => prevCount - 1);
  };

  const handleAddCart = (e) => {
    setCart((prev) => [...prev, { item: title, quantity: count }]);
  };

  useEffect(() => {
    return () => localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  return (
    <div>
      <div className="divCart">
        <i className="iCart" onClick={() => router.push("/cart")}>
          <AiOutlineShoppingCart />
        </i>
        <span>{cart.length}</span>
      </div>
      <p className="pTitle">{title}</p>
      <p className="pPrice">${price}.00 USD</p>
      <div className="form-inline">
        <DivOval label="Rating" data={rating} />
        <DivOval label="Stock" data={stock} />
        <DivOval label="Category" data={category} />
      </div>
      <div className="form-inline mt-4" style={{ gap: "10px" }}>
        <button className="btnCtrl" onClick={handleClickMinus}>
          -
        </button>
        <span>{count}</span>
        <button className="btnCtrl" onClick={handleClickAdd}>
          +
        </button>
      </div>
      <p className="pTotal">
        Total: <span>{count * price}</span>
      </p>
      <p className="mb-1" style={{ fontSize: "1.1rem", fontWeight: "500" }}>
        Description
      </p>
      <p className="pDescription">{description}</p>
      <button onClick={handleAddCart}>Add to cart</button>
    </div>
  );
}
