class MainApi {
  constructor(url) {
    this._url = url;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  getAllMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((res) => this._checkResponse(res))
  };

  addMovie(movie, token) {
    const URL = 'https://api.nomoreparties.co';
    const NO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg';
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country || "No information",
        director: movie.director || "No information",
        duration: movie.duration,
        year: movie.year,
        description: movie.description || "No information",
        image: movie.image ? URL + movie.image.url: NO_IMAGE,
        trailer: movie.trailerLink,
        thumbnail: movie.image ? URL + movie.image.formats.thumbnail.url: NO_IMAGE,
        movieId: movie.id,
        nameRU: movie.nameRU || movie.nameEN,
        nameEN: movie.nameEN || movie.nameRU,
      })
    })
        .then((res) => this._checkResponse(res))
  }

  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
        .then((res) => this._checkResponse(res))
  };

  getCurrentProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
        .then(res => this._checkResponse(res))
        .then(data => data)
  }

  updateCurrentProfile(email, name, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        name,
      })
    })
        .then((res) => this._checkResponse(res))
  };
}

const mainApi = new MainApi('http://localhost:3050');

export default mainApi;
