import {AxiosRequestConfig, AxiosResponse} from 'axios';

const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://flosty.herokuapp.com',
    timeout: 60000,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const {
        method = '',
        url,
        baseURL,
        params,
        data,
    } = config;
    const methodToUpperCase: string = method.toLocaleUpperCase()
    console.log(`${methodToUpperCase} ${baseURL}${url}`);

    if (methodToUpperCase === 'GET') {
        console.log('params: ', params);
    }

    if (methodToUpperCase === 'POST') {
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

export const get = (url: string, data?: any) => data ? instance.get(url, {params: data}) : instance.get(url);

export const post = (url: string, data?: any) => data ? instance.post(url, data) : instance.post(url);

export const setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = token;
};
