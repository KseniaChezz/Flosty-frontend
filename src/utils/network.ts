import {AxiosRequestConfig, AxiosResponse} from 'axios';

export const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://flosty.herokuapp.com',
    timeout: 60000,
});

let authToken: string = '';

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const {
        method = '',
        url,
        baseURL,
        params,
        data,
        headers,
    } = config;
    const methodToUpperCase: string = method.toLocaleUpperCase();

    console.log(`${methodToUpperCase} ${baseURL}${url}`);
    console.log('headers', headers);

    if (methodToUpperCase === 'GET' || methodToUpperCase === 'DELETE') {
        console.log('params: ', params);
    }

    if (methodToUpperCase === 'POST' || methodToUpperCase === 'PUT') {
        console.log('data: ', data);
    }

    return config;
}, (err: Error) => {
    console.log('requestError: ', err);

    return Promise.reject(err);
});

instance.interceptors.response.use(function (response: AxiosResponse) {
    console.log('response ', response);

    return response;
}, (err: Error) => {
    console.log(err);

    return Promise.reject(`responseError: ${err}`);
});

export const get = (url: string, data?: any) => data
    ? instance.get(url, {params: data, headers: axios.defaults.headers.common})
    : instance.get(url, {headers: axios.defaults.headers.common});

export const post = (url: string, data?: any) => instance.post(
    url,
    data,
    {headers: axios.defaults.headers.common},
);

export const put = (url: string, data?: any) => instance.put(url, data, {headers: axios.defaults.headers.common})

export const deleteMethod = (url: string, data?: any) => data
    ? instance.delete(url, {params: data, headers: axios.defaults.headers.common})
    : instance.delete(url, {headers: axios.defaults.headers.common});

export const setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = token;
};
