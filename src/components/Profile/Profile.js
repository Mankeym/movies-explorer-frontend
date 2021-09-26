import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useValidation";

export const Profile = (props) => {
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid} = useFormWithValidation()

    function handleSubmit(e){
        e.preventDefault()
        const {name, email} = values;
        props.onUpdateUser({name, email});
    }
    return (
        <>
        <MoviesHeader />
        <section className="profile">
            <form className="profile__container" onSubmit={handleSubmit}>
                <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
                <div className="profile__text-container">
                    <div className="profile__text-content">
                        <p className="profile__name">Имя</p>
                        <input id="profile__input-name" type="text" name="name"
                               value={values.name} className="profile__name"
                               placeholder={currentUser.name} required minLength="2" maxLength="30"
                               onChange={handleChange}/>

                    </div>
                    <span> {errors.name}</span>
                    <div className="profile__text-content">
                        <p className="profile__email">E-mail</p>
                        <input id="profile__input-name" type="email" name="email"
                               value={values.email} className="profile__email"
                               placeholder={currentUser.email} required minLength="2" maxLength="30"
                               onChange={handleChange}/>

                    </div>
                    <span> {errors.email}</span>
                </div>
                <div className="profile__links">
                    <button type="submit" className="profile__link-redact" disabled={!isValid}>Редактировать</button>
                    <Link className="profile__link-exit" onClick={props.onLogOut}>Выйти из аккаунта</Link>
                </div>
            </form>

        </section>
        </>
    );
}
export default Profile;
