import vector from "../images/logohead.svg";

function Header () {
    return(
    <header className="header">
        <img src={vector} className="header__logo" alt="Место"/>
        <div className="header__container">
            <a className="header__link" href="#">Регистрация</a>
            <button className="header__button">Войти</button>
        </div>
    </header>
    );
}
export default Header;
