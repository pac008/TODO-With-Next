import axios from "axios";

const entriesApi = axios.create({
    baseURL: 'https://todo-with-next-beta.vercel.app/api'
});

export default entriesApi;