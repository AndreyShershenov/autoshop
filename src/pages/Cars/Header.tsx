import { IoIosHeart } from "react-icons/io";
import { Link } from "react-router-dom"; 
import "./styles.css";


const Header = () => {

  const IosHeart = IoIosHeart as React.ElementType;


    return (
      <header className='header'>
       <h1 className="custom-title">
        <Link to="/"> {/* Перенаправление на главную страницу */}
          <span className="bold-purple">АВТО</span>МАГАЗИН
        </Link>
      </h1>

<nav>
    <div className="dropdown hover">
    <a href="#">☰ КАТАЛОГ</a>
    </div>
    </nav>
    <div className="custom-element"/>
    <div className="adress">
    <h4>Ваш адрес</h4>
    </div>
    <div className="phone">
    <h4> Ваш номер</h4>
    </div>
    <div className="heart-icon">
      <IosHeart />
      <Link to="/favorites" className="favourites"> 
        Перейти в избранные
      </Link>
    </div>
      </header>
    )
  }

  
  export default Header