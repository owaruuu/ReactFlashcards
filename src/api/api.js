import axios from "axios";

export let URL = "https://api.owaruuu.xyz";
// URL = "https://service.owaruuu.xyz";
URL = "http://localhost:443";

export const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});
