import axios from "axios";

export class Auth {
    async createAccount(data) {
        try {
            const response = await axios.post(
                "/api/v1/auth/signup",
                {
                    ...data
                }
            );

            if (response.status === 201) {
                return this.login({
                    username: data.username,
                    password: data.password
                });
            }

            throw new Error("Account creation failed");

        } catch (error) {
            console.error("Error creating account:", error.response?.data || error);
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await axios.post(
                "/api/v1/auth/login",
                {
                    username: data.username,
                    password: data.password
                }
            );
            localStorage.setItem("access_token", response.data.access_token);
            return response;

        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(
                "/api/v1/auth/current-user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;

        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
    }

    async logout() {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post(
                "/api/v1/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.removeItem("access_token");
            return response;

        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}

const serviceAuth = new Auth();
export default serviceAuth;