import MoviesCard from "../MoviesCard/MoviesCard";
import React, {useEffect} from "react";

function MoviesCards(props) {
    const [renderedMoviesCount, setRenderedMoviesCount] = React.useState(6);
    function clickButtonMoreFilm() {
        setRenderedMoviesCount(renderedMoviesCount+3)
    }
    return(
        <section className="cards">
            <div className="cards__container">


                {
                    props.movies.slice(0, renderedMoviesCount).map((movie) =>
                        (
                            <>
                                <MoviesCard  movie={movie} key={movie.movieId ? movie.movieId : movie.id}
                                            setLike={props.setLike} setDislike={props.setDislike}
                                            fromSaved={props.savedMovies}
                                />
                            </>
                        ))
                }

            </div>

            <div className="cards__button-container">
                <button onClick={clickButtonMoreFilm} className="cards__more">
                    Ещё
                </button>
            </div>
        </section>
    )
}
export default MoviesCards;
