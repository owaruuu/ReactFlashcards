import axios from "axios";

export let URL = "https://api.owaruuu.xyz";
// URL = "http://localhost:3003";

export const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});
