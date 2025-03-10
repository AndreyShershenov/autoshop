import { FC, useEffect, useState } from "react";
import carsJSON from "../../cars.json";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import "./styles.css";
import { Query } from "../../graphql/generated";

// Явно указываем типы для иконок
const SearchIcon = FaSearch as React.ElementType;
const HeartIcon = FaHeart as React.ElementType;
const RegHeartIcon = FaRegHeart as React.ElementType;

const Cars: FC = () => {
  const cars: Query["cars"] = carsJSON;
  const [sortOption, setSortOption] = useState<string>("");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Функция для сортировки
  const sortCars = (cars: any[], option: string) => {
    switch (option) {
      case "availability":
        return cars.filter((car) => car.availability);
      case "nameAsc":
        return [...cars].sort((a, b) => a.brand.localeCompare(b.brand));
      case "nameDesc":
        return [...cars].sort((a, b) => b.brand.localeCompare(a.brand));
      case "oldest":
        return [...cars].sort((a, b) => a.model_year - b.model_year);
      case "cheapest":
        return [...cars].sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "").replace(",", "")) -
            parseFloat(b.price.replace("$", "").replace(",", ""))
        );
      case "expensive":
        return [...cars].sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "").replace(",", "")) -
            parseFloat(a.price.replace("$", "").replace(",", ""))
        );
      default:
        return cars;
    }
  };

  // Функция для фильтрации автомобилей по поисковому запросу
  const filterCars = (cars: any[], query: string) => {
    if (!query) return cars;
    return cars.filter((car) =>
      `${car.brand} ${car.model}`.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Применяем фильтрацию и сортировку
  const filteredCars = filterCars(cars, searchQuery);
  const sortedCars = sortCars(filteredCars, sortOption);

  // Функция добавления или удаления из избранных
  const toggleFavorite = (car: any) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((item) => item.id === car.id);

    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(car);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Сохраняем избранные товары в localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <div className="sort-search">
        <div className="sort-options">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="">Сортировать по...</option>
            <option value="availability">Сначала в наличии</option>
            <option value="nameAsc">По имени (A-Z)</option>
            <option value="nameDesc">По имени (Z-A)</option>
            <option value="oldest">Сначала старше</option>
            <option value="cheapest">Сначала дешевле</option>
            <option value="expensive">Сначала дороже</option>
          </select>
          <div className="custom-element2" />
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Найти авто"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="search-button"
                onClick={() => setSearchQuery(searchQuery)}
              >
                <SearchIcon className="search-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cars-container">
        {sortedCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <img
                src={car.img_src}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
              />
              {car.availability === false && (
                <div className="unavailable-overlay">Нет в наличии</div>
              )}
            </div>
            <div className="car-info">
              <h2 className="car-title">
                {car.brand} {car.model}
              </h2>
              <p className="car-details">
                Год: {car.model_year} Цвет: {car.color}
              </p>
              <p className="car-price">
                от <strong>{car.price}</strong>
              </p>
            </div>
            <div className="car-actions">
              <button className="buy-button">Купить</button>
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(car)}
              >
                {favorites.some((fav) => fav.id === car.id) ? (
                  <HeartIcon className="icon" />
                ) : (
                  <RegHeartIcon className="icon" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;