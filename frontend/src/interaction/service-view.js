import axios from "axios";
axios.defaults.withCredentials = true;

export class viewService{
    async getPost(postId){

        const token = localStorage.getItem("accessToken");

        try {
            return await axios.get(`/api/v1/social-media/posts/${postId}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }
    async getAllPosts(page = 1, limit = 10){
        try{
            const token = localStorage.getItem("accessToken");
            const response = await axios.get('/api/v1/social-media/posts', 
                {
                params: 
                {
                    page,
                    limit 
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
        catch(error){
            console.error("Error getting all posts:", error);
            throw error;
        }
    }
    async getAllPostsSelf(page = 1, limit = 10){
        try {
            const response = await axios.get('/api/v1/social-media/posts', 
                {
                params: 
                {
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error getting all your posts:", error);
            throw error;
        }
    }
    async getPostUsername(username, page = 1, limit = 10){
        try {
            const response = await axios.get(`/api/v1/social-media/posts/get/u/${username}`, {
                params: {
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error getting posts by username:", error);
            throw error;
        }
    }
    async getPostTag(tag, page = 1, limit = 10){
        try {
            const response = await axios.get(`/api/v1/social-media/posts/get/t/${tag}`, {
                params: {
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error getting posts by tag:", error);
            throw error;
        }
    }
}
const serviceView = new viewService();
export default serviceView;