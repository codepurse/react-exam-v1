import { useRouter } from "next/router";
import { useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";

export default function Products({ items }) {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const handleClick = (e) => router.push(`/product/${e}`);

  const handleFavorites = (e, data) => {
    e.stopPropagation();
    if (!checkFavorite(data)) {
      setFavorites((prev) => [...prev, data]);
    } else {
      setFavorites(favorites.filter((el) => el != data));
    }
  };

  const checkFavorite = (e) => {
    return favorites.includes(e);
  };

  return (
    <div className="item-grid">
      {items.map((el, i) => (
        <div key={i} className="item-parent">
          <div className="item-container" onClick={() => handleClick(el.id)}>
            <i>
              <AiTwotoneHeart
                style={{ color: checkFavorite(el.title) ? "tomato" : "black" }}
                onClick={(e) => handleFavorites(e, el.title)}
              />
            </i>
            <img
              src={el.thumbnail}
              alt="Failed to load image"
              className="img-centered"
            />
          </div>
          <div className="form-inline itemDetails">
            <p>{el.title}</p>
            <p>{el.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
