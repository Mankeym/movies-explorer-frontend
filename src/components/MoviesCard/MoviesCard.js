import React from "react";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

const convertDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч${minutes}м`;
}

const URL = '';
const NO_IMAGE = '';
function MoviesCard({ name, image, duration, isChecked, isSaved, handleMovie, movieData, savedMovie, trailerLink }) {
    const handleClick = () => {
        isChecked ? handleMovie(isChecked, savedMovie) : handleMovie(isChecked, movieData);
    }

    const handleImage = () => {
        return isSaved
            ? image
            : image ? URL + image : NO_IMAGE;
    };


    return(
        <>
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movies-card__image-container">

                    {
                        isSaved ?
                            <button
                                className={`movies-card__button movies-card__button-ok`}
                                type="button"
                                aria-label="Bookmark Button"
                                value="Сохранить"
                                onClick={handleClick}
                            ></button> : (<button
                                className={`movies-card__button`}
                                type="button"
                                aria-label="Bookmark Button"
                                value="Сохранить"
                                onClick={handleClick}
                            ></button>)
                    }
                    <img className="movies-card__image" src={ handleImage() } />

                </div>
                <div className="movie-card__info">
                    <h3 className="movies-card__name">{ name }</h3>
                    <p className="movies-card__duration">{ convertDuration(duration) }</p>
                </div>

            </div>
        </article>
        </>
    )
}
export default MoviesCard;
