import MoviesHeader from "../MoviesHeader/MoviesHeader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Footer from "../Footer";
import Menu from "../Menu/Menu";
import React, { useEffect, useState } from "react";
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    const {
        checkMoviesLocalStorage,
        checkSavedMoviesLocalStorage,
        isMain,
        loggedIn,
        onSignOut,
        onMovieSearchSubmit,
        isFiltered,
        handleFilter,
        checkIsFilteredLocalStorage,
        isDataInLocalStorage,
        handleMovie,
        isSaved,
        savedMovies,
        showFilteredMovies,
        setSavedMoviesLocalStorage,
        setIsFilteredLocalStorage,
        isLoading,
        movies,
        setMoviesLocalStorage,
    } = props;

    const [isRequested, setIsRequested] = useState(false);
    const [localMovies, setLocalMovies] = useState([]);

    useEffect(() => {
        setIsRequested(false);
    }, [isSaved])


    useEffect(() => {
        const handleCheckSavedMovies = (moviesFromStorage) => {
            setLocalMovies(moviesFromStorage);
        }
        const moviesFromStorage = checkMoviesLocalStorage();
        moviesFromStorage
            ? handleCheckSavedMovies(moviesFromStorage)
            : setLocalMovies(movies);
    }, [checkMoviesLocalStorage, checkSavedMoviesLocalStorage, movies]);
    return(
        <main>
            <MoviesHeader />
            <Menu />
            <SearchForm  onSubmit={onMovieSearchSubmit}
                         isFiltered={isFiltered}
                         handleFilter={handleFilter}
                         setIsRequested={setIsRequested}
                         checkIsFilteredLocalStorage={checkIsFilteredLocalStorage}

            />
            {
                isRequested || isDataInLocalStorage
                    ? isLoading
                    ? <Preloader />
                    : isSaved
                        ? <MoviesCards
                            handleMovie={handleMovie}
                            isSaved={isSaved}
                            savedMovies={savedMovies}
                            showFilteredMovies={showFilteredMovies}
                            isFiltered={isFiltered}
                            checkMoviesLocalStorage={checkMoviesLocalStorage}
                            setMoviesLocalStorage={setMoviesLocalStorage}
                            checkSavedMoviesLocalStorage={checkSavedMoviesLocalStorage}
                            setSavedMoviesLocalStorage={setSavedMoviesLocalStorage}
                            checkIsFilteredLocalStorage={checkIsFilteredLocalStorage}
                            setIsFilteredLocalStorage={setIsFilteredLocalStorage}
                        />
                        : <MoviesCards
                            handleMovie={handleMovie}
                            isSaved={isSaved}
                            movies={!localMovies ? movies : localMovies}
                            savedMovies={savedMovies}
                            showFilteredMovies={showFilteredMovies}
                            isFiltered={isFiltered}
                            checkSavedMoviesLocalStorage={checkSavedMoviesLocalStorage}
                            setSavedMoviesLocalStorage={setSavedMoviesLocalStorage}
                            checkMoviesLocalStorage={checkMoviesLocalStorage}
                            setMoviesLocalStorage={setMoviesLocalStorage}
                            checkIsFilteredLocalStorage={checkIsFilteredLocalStorage}
                            setIsFilteredLocalStorage={setIsFilteredLocalStorage}
                        />
                    : null
            }
            <Footer />
        </main>

    )
}
export default Movies;
