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
    } = config;
    console.log(`${method.toLocaleUpperCase()} ${baseURL}${url}`);
    console.log(`params: ${params}`);

    return config;
}, (err: Error) => {
    console.log(`requestError: ${err}`);

    return Promise.reject(err);
});

axios.interceptors.response.use(function (response: AxiosResponse) {
    console.log(`response ${response}`);

    return response;
}, (err: Error) => {
    console.log(err);

    return Promise.reject(`responseError: ${err}`);
});

export const get = (url: string, data: any) => axios.get(url, {params: data});

export const post = (url: string, data: any) => axios.post(url, data);

export const setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = token;
};
