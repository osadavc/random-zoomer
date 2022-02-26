import axios from "axios";

const { NEXTAUTH_URL } = process.env;
export const API = axios.create({
  baseURL: NEXTAUTH_URL,
});
