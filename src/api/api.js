import axios from "axios";

export let URL = "https://service.owaruuu.xyz";
// URL = "http://localhost:3003";

export const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});
