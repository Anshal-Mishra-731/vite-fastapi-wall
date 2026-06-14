import axios from "axios";  

export class Auth{
    async createAccount(data) {
        try {
            const response = await axios.post(
                "/api/v1/users/register",
                {
                    ...data,
                    role: "USER"
                },
                { withCredentials: true }
            );
            if (response.status === 201) {
                return this.login(data.username, data.password);
            } else {
                throw new Error("Account creation failed");
            }

        } catch (error) {
            console.error("Error creating account:", error.response?.data || error);
            throw error;
        }
    }
    
    async login(data){
        try {
            const response = await axios.post('/api/v1/users/login', {
                username: data.username,
                password: data.password
            }, { withCredentials: true });

            return response;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            const response = await axios.get('/api/v1/users/current-user',
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error;
        }
    }
    async logout(){
        try {
            const response = await axios.post('/api/v1/users/logout',
                {},
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }
}
const serviceAuth = new Auth();
export default serviceAuth;