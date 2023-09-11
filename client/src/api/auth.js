import axios from "./axios";

export const registerReq = (user) => axios.post(`/register`, user);

export const loginReq = (user) => axios.post(`/login`, user);

export const verifiyTokenReq = () => axios.get("verify");
