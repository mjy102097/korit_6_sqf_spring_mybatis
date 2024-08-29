import { instance } from "./util/instance"

export const signupApi = async (user) => {
    let response = null;
    try {
        response = await instance.post("/auth/signup", user);
    } catch(e) {
        response = e.response;
    }
    return response;
}