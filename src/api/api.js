import axios from "axios";

export let URL = import.meta.env.VITE_API_URL;

export const cloudFrontURL = "https://d2x9kal0r3kbk6.cloudfront.net";

export const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});
