import axios from "axios";

export let URL = "https://api.owaruuu.xyz";
// URL = "https://service.owaruuu.xyz";
// URL = "http://localhost:443";
export const cloudFrontURL = "https://d2x9kal0r3kbk6.cloudfront.net";

export const api = axios.create({
    withCredentials: true, // Include credentials (cookies) in the request
});
