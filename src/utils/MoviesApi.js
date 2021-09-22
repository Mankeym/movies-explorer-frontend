class MoviesApi {
  constructor(url) {
    this._url = url;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  getMovies() {
    return fetch(`${this._url}`).then((res) => this._checkResponse(res))
  };
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;
