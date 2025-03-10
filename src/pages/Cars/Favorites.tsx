import { FC, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./styles.css"; 



const Favorites: FC = () => {
  const DeleteBin5Line = RiDeleteBin5Line as React.ElementType;
  const [favorites, setFavorites] = useState<any[]>([]);
  const length = favorites.length;

  // Удаление товара из избранных
  const removeFromFavorites = (car: any) => {
    let updatedFavorites = [...favorites];

    const index = updatedFavorites.findIndex((item) => item.id === car.id);
    if (index !== -1) {
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
};

useEffect(() => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  setFavorites(savedFavorites);
}, []);

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Количество избранных товаров — {length}</h1>
      <div className="favorites-list">
        {favorites.map((car) => (
          <div key={car.id} className="favorite-item">
            <div className="favorite-image">
              <img
                src={car.img_src}
                alt={`${car.brand} ${car.model}`}
                className="favorite-image-img"
              />
            </div>
            <div className="favorite-info">
              <h2 className="favorite-name">{car.brand} {car.model}</h2>
              <p className="favorite-description">{car.description}</p>
              <p className="favorite-year">
                Год: {car.model_year}
              </p>
              <p className="favorite-color">
                Цвет: {car.color}
              </p>
              <p className="favorite-price">
                от {car.price}
              </p>
              <div className="fav-buttons">
              <button className="favorites-button">Комплектация</button>
              <button className="fav-icon" onClick={ () => removeFromFavorites(car)}><DeleteBin5Line className="icon-fav"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
