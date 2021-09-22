import find from '../../images/find.svg'
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import {useFormWithValidation } from "../../hooks/useValidationForm";
import React from 'react';


function SearchForm({onSubmit, isFiltered, handleFilter, setIsRequested, checkIsFilteredLocalStorage}) {
    const {values, handleChange, resetFrom, errors, isValid} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, values);
        resetFrom();
        setIsRequested(true);
    }


    return(
        <section className="search">
            <div className="search__container">
                <form className="search__form" onSubmit={handleSubmit}>
                        <input className="search__input"
                               name="search"
                               type="text"
                               placeholder="Фильм"
                               minLength="1"
                               maxLength="200"
                               required
                               autoComplete="off"
                               onChange={handleChange}
                        />
                        <button
                            className="search__button" type="submit" onSubmit={handleSubmit}>
                            <img src={find} className="search__image" />
                        </button>
                </form>
                <ToggleSwitch />
            </div>
        </section>
)
}
export default SearchForm;
