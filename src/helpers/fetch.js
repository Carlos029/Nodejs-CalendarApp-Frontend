
const baseUrl = process.env.REACT_APP_BACKEND_API_URL


//para peticiones al backend en donde NO necesito el JWT para las recivir la info
const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`  //localhost:4000/api/......

    if (method === 'GET') {
        return fetch(url);
    } else {

        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

}


//para peticiones al backend en donde NECESITO el JWT para las recivir la info
const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`  //localhost:4000/api/......
    const token = localStorage.getItem('token') || ''

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {

        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }

}


export {
    fetchConToken,
    fetchSinToken
}