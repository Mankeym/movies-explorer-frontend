
import React, { useEffect, useState } from "react";
import MoviesHeader from "../MoviesHeader/MoviesHeader";
import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer";
import SavedMoviesCards from "../SavedMoviesCards/SavedMoviesCards";

const Saved = (props) => {
    const moviesLocalStorage = JSON.parse(localStorage.getItem('saved-movies'));
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm onSearch={props.onSearch} isActive={props.isActive} handleChange={props.handleChange}
            />

            <SavedMoviesCards
                savedLike={moviesLocalStorage} movies={moviesLocalStorage} setLike={props.saveMovie} setDislike={props.deleteMovie} savedMovies={props.savedMovies}
            />

            <Footer />
        </main>

    )
};

export default Saved;
