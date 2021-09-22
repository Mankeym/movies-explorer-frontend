import { Route, Switch, useHistory,useLocation  } from "react-router-dom";
import Main from "./Main";
import Movies from './Movies/Movies';
import '../index.css';
import Login from "./Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile.js";
import Error from "./Error/Error";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {useCallback, useEffect, useState} from "react";
import auth from '../utils/Auth';
import mainApi from '../utils/MainApi';
import moviesApi from '../utils/MoviesApi';

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Saved from "./Saved/Saved";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isDataInLocalStorage, setIsDataInLocalStorage] = useState(false);

    const history = useHistory();

    const onLogin = ({ password, email }) => {
        auth.login(password, email)
            .then(data => {
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    history.push('/movies')
                }
            })
            .catch(err => console.error(err))
    }

    const onRegister = ({ email, password, name }) => {
        auth.register(password, email, name)
            .then(data => {
                setCurrentUser({
                    email: data.email,
                    name: data.name
                })
                history.push('/signin');
            })
    };

    const onSignOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/signin');
    };

    const handleSuccessMessage = (result) => {
        setShowMessage(result);
    }

    const onEditProfile = ({ email, name }) => {
        const token = localStorage.getItem('token');
        mainApi.updateCurrentProfile(email, name, token)
            .then(data => {
                setCurrentUser({
                    email: data.email,
                    name: data.name
                })
                handleSuccessMessage(true);
            })
    }

    const checkMoviesLocalStorage = () => {
        let movies = localStorage.getItem('movies');
        movies = JSON.parse(movies);
        if (!movies) {
            setIsDataInLocalStorage(false);
            return null;
        }
        setIsDataInLocalStorage(true);
        return movies;
    }

    const setMoviesLocalStorage = (movies) => {
        const moviesToJSON = JSON.stringify(movies);
        localStorage.setItem('movies', moviesToJSON);
    }

    const clearMoviesLocalStorage = () => {
        localStorage.removeItem('movies')
    }

    const clearSavedMoviesLocalStorage = () => {
        localStorage.removeItem('savedMovies')
    }

    const checkSavedMoviesLocalStorage = () => {
        let savedMovies = localStorage.getItem('savedMovies');
        savedMovies = JSON.parse(savedMovies);
        if (savedMovies) {
            setSavedMovies(savedMovies);
            setSavedMoviesLocalStorage(savedMovies)
        }
    }

    const setSavedMoviesLocalStorage = (savedMovies) => {
        const savedMoviesToJSON = JSON.stringify(savedMovies);
        localStorage.setItem('savedMovies', savedMoviesToJSON);
    }

    const checkIsFilteredLocalStorage = () => {
        let isFiltered = localStorage.getItem('isFiltered');
        isFiltered = isFiltered === 'true';
        setIsFiltered(isFiltered);
        setIsFilteredLocalStorage(isFiltered);
    }

    const setIsFilteredLocalStorage = (isFiltered) => {
        localStorage.setItem('isFiltered', isFiltered)
    }

    const handleMovie = (isChecked, movie) => {
        const token = localStorage.getItem('token');
        isChecked
            ? handleMovieDelete(movie, token)
            : handleMovieAdd(movie, token)
    }

    const handleMovieAdd = (movie, token) => {
        mainApi.addMovie(movie, token)
            .then((savedMovie) => {
                setSavedMovies([...savedMovies, savedMovie]);
            })
            .catch(err => console.error(err))
    }

    const handleMovieDelete = (movie, token) => {
        mainApi.deleteMovie(movie._id, token)
            .then((_) => {
                const newSavedMovies = savedMovies.filter((savedMovie) => savedMovie.movieId !== movie.movieId);
                setSavedMovies(newSavedMovies);
            })
            .catch(err => console.error(err))
    }

    const filterMovies = (moviesApi, searchValues) => {
        const filteredMovies =  moviesApi.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(searchValues.search.toLowerCase())
        })
        return filteredMovies;
    }

    const filterSavedMovies = (savedMoviesApi, searchValues) => {
        const filteredSavedMovies = savedMoviesApi.filter((savedMovie) => {
            return savedMovie.nameRU.toLowerCase().includes(searchValues.search.toLowerCase())
        })
        return filteredSavedMovies;
    }

    const onMovieSearchSubmit = (e, searchValues) => {
        e.preventDefault();
        clearMoviesLocalStorage();
        clearSavedMoviesLocalStorage();
        setIsDataInLocalStorage(false);
        setIsLoading(true);
        const token = localStorage.getItem('token');
        Promise.all([
            moviesApi.getMovies(),
            mainApi.getAllMovies(token),
        ])
            .then(([moviesApi, savedMoviesApi]) => {
                const filteredMovies = filterMovies(moviesApi, searchValues);
                const filteredSavedMovies = filterSavedMovies(savedMoviesApi, searchValues);
                setMovies(filteredMovies);
                setSavedMovies(filteredSavedMovies);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false)
            });
    };

    const toggleFilter = () => {
        setIsFiltered((prevIsFiltered) => !prevIsFiltered);
        setIsFilteredLocalStorage(!isFiltered);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            mainApi.getCurrentProfile(token)
                .then((data) => {
                    setCurrentUser(data);
                    setLoggedIn(true);
                });
        };
    }, [history]);

    return (
      <CurrentUserContext.Provider value={currentUser}>

          <Route exact path="/">
              <Main loggedIn={loggedIn}
              />
          </Route >
                    <Switch>

                            <ProtectedRoute
                                path="/saved-movies"
                                loggedIn={loggedIn}
                                onSignOut={onSignOut}
                                isMain={false}
                                isSaved={true}
                                isLoading={isLoading}
                                savedMovies={savedMovies}
                                handleMovie={handleMovie}
                                onMovieSearchSubmit={onMovieSearchSubmit}
                                handleFilter={toggleFilter}
                                isFiltered={isFiltered}
                                checkMoviesLocalStorage={checkMoviesLocalStorage}
                                setMoviesLocalStorage={setMoviesLocalStorage}
                                checkSavedMoviesLocalStorage={checkSavedMoviesLocalStorage}
                                setSavedMoviesLocalStorage={setSavedMoviesLocalStorage}
                                checkIsFilteredLocalStorage={checkIsFilteredLocalStorage}
                                isDataInLocalStorage={isDataInLocalStorage}
                                component={Movies}
                            />
                        <ProtectedRoute
                            path="/movies"
                            loggedIn={loggedIn}
                            onSignOut={onSignOut}
                            isMain={false}
                            isSaved={false}
                            isLoading={isLoading}
                            movies={movies}
                            savedMovies={savedMovies}
                            handleMovie={handleMovie}
                            onMovieSearchSubmit={onMovieSearchSubmit}
                            handleFilter={toggleFilter}
                            isFiltered={isFiltered}
                            checkMoviesLocalStorage={checkMoviesLocalStorage}
                            setMoviesLocalStorage={setMoviesLocalStorage}
                            checkSavedMoviesLocalStorage={checkSavedMoviesLocalStorage}
                            setSavedMoviesLocalStorage={setSavedMoviesLocalStorage}
                            checkIsFilteredLocalStorage={checkIsFilteredLocalStorage}
                            isDataInLocalStorage={isDataInLocalStorage}
                            component={Movies}
                        />



                            <ProtectedRoute
                                path="/profile"
                                isMain={false}
                                onSignOut={onSignOut}
                                loggedIn={loggedIn}
                                component={Profile}
                                onEditProfile={onEditProfile}
                                handleSuccessMessage={handleSuccessMessage}
                                showMessage={showMessage}
                            />

                        <Route path="/signin" render={() => {
                            return <Login onLogin={onLogin}/>
                        }} />
                        <Route path="/signup" render={() => {
                            return <Register loggedIn={loggedIn} onRegister={onRegister} />
                        }}/>
                  <Route path='*'>
                      <Error />
                  </Route>
                    </Switch>
      </CurrentUserContext.Provider>
  );

}


export default App;
