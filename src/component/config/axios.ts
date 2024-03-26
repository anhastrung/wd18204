import { IProduct } from './../../interfaces/IProduct';
import axios from "axios";
import { ICategory } from "../../interfaces/ICategory";
import { IUser } from '../../interfaces/IUser';

export const axiosApi = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getApi = async (url: string) => {
    try {
        const response = await axiosApi.get(url);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const postApi = async (url: string, data: ICategory | IProduct | IUser) => {
    try {
        const response = await axiosApi.post(url, data);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const patchApi = async (url: string, data: ICategory | IProduct | IUser) => {
    try {
        const response = await axiosApi.patch(url, data);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const deleteApi = async (url: string) => {
    try {
        const response = await axiosApi.delete(url);
        return response.data;
    }
    catch (error) {
        return error;
    }
}