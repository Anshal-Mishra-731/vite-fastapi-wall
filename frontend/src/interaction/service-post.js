import axios from "axios";
axios.defaults.withCredentials = true;

export class postService{
    async createPost({ content, title, images = [], tags = [] }) {
        try {
            const formData = new FormData();

            formData.append("content", content);
            
            formData.append("title", title || "Untitled");

            Array.from(images || []).forEach((image) => {
                if (image instanceof File) {
                    formData.append("images", image);
                }
            });

            tags.forEach((tag) => {
                formData.append("tags[]", tag);
            })

            const token = localStorage.getItem("accessToken");

            return await axios.post(
                "/api/v1/social-media/posts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error);
            throw error;
        }
    }
    
    async updatePost(id, {content, title, images = [], tags = []}) {
        try {
            const formData = new FormData();

            formData.append("content", content);

            formData.append("title", title || "Untitled");


            Array.from(images || []).forEach((image) => {
                if (image instanceof File) {
                    formData.append("images", image);
                }
            });

            tags.forEach(tag => {
                formData.append("tags[]", tag);
            });

            for (let pair of formData.entries()) {
                console.log("FORM DATA:", pair[0], pair[1]);
            }

            const token = localStorage.getItem("accessToken");

            return await axios.patch(
                `/api/v1/social-media/posts/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            console.error("Error updating post:", error.response?.data || error);
            throw error;
        }
    }

    async deletePost(postId){
        try {
            return await axios.delete(`/api/v1/social-media/posts/${postId}`);
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }
    
    async deleteImage(postId, imageId){
        try {
            return await axios.patch(`/api/v1/social-media/posts/remove/image/${postId}/${imageId}`);
        } catch (error) {
            console.error("Error deleting image:", error);
            throw error;
        }
    }

}
const servicePost = new postService();
export default servicePost;