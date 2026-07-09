import api from "../axios";

export async function login(email, password) {

    console.log({
        email,
        password,
    });

    const response = await api.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    console.log(response);

    return response.data;
}

export async function getCurrentUser() {

    const response = await api.get(
        "/auth/me"
    );

    return response.data;
}