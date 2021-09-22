import vector from "../images/logohead.svg";

function Header () {
    return(
    <header className="header">
        <img src={vector} className="header__logo" alt="Место"/>
        <div className="header__container">
            <a className="header__link" href="/sign-up">Регистрация</a>
            <a className="header__button" href="/sign-in"><p className="header__text">Войти</p></a>
        </div>
    </header>
    );
}
export default Header;
