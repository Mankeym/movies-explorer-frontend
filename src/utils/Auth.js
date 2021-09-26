export const BASE_URL = 'http://diplom.prakticum.api.nomoredomains.club';
//export const BASE_URL = 'http://localhost:3051';


export const registration = ({name, email, password}) => {
    console.log({name, email, password})
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {'Accept': 'application/json',
            "Content-Type": "application/json"} ,
        body: JSON.stringify({name, email, password})
    })
        .then(checkResponse)
}

export const authorization = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {'Accept': 'application/json',
            "Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
}

export const getContent = (token) => {
    return fetch(BASE_URL + '/users/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(checkResponse)
}

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
