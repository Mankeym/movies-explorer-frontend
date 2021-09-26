import SavedMoviesCard from "../SavedMovieCard/SavedMoviesCard";
import React, {useEffect} from "react";

function SavedMoviesCards(props) {
    const [renderedMoviesCount, setRenderedMoviesCount] = React.useState(6);
    function clickButtonMoreFilm() {
        setRenderedMoviesCount(renderedMoviesCount+3)
    }
    console.log(props.movies.length)
    return(
        <section className="cards">
            <div className="cards__container">


                {
                    props.movies.slice(0, renderedMoviesCount).map((movie) =>
                        (
                            <>
                                <SavedMoviesCard  movie={movie} key={movie.movieId ? movie.movieId : movie.id}
                                             setLike={props.setLike} setDislike={props.setDislike}
                                             fromSaved={props.savedLike}
                                />
                            </>
                        ))
                }

            </div>
            { props.movies.length > 6 && (
                <div className="cards__button-container">
                    <button onClick={clickButtonMoreFilm} className={"cards__more"}>
                        Ещё
                    </button>
                </div>
            )}

        </section>
    )
}
export default SavedMoviesCards;
