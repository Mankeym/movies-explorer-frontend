import {beatFilmUrl} from "./constants";

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res)
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // запрос данных пользователя с сервера
  getProfileInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
        .then(this._checkResponse)
  }

  // редактирование данных пользователя
  editProfileInfo(name, email) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
        .then(this._checkResponse)
  }

  setToken() {
    this.headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
  //добавление нового фильма
  addNewMovie(movie) {
    return fetch(this.baseUrl + '/movies', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: beatFilmUrl + movie.image.url,
        trailer: movie.trailerLink,
        thumbnail:beatFilmUrl + movie.image.formats.thumbnail.url,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
      })
    })
        .then(this._checkResponse)
  }

  //получить все сохраненные пользователем фильмы
  getMovies() {
    return fetch(this.baseUrl + '/movies', {
      method: 'GET',
      headers: this.headers,
    })

        .then(this._checkResponse)
  }

  //удалить фильм по id
  deleteMovie(movieId) {
    return fetch(this.baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
        .then(this._checkResponse)

  }
}

const newMainApi = new MainApi({

  //baseUrl: 'http://localhost:3051',
  baseUrl: 'http://diplom.prakticum.api.nomoredomains.club',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
})

export default newMainApi
