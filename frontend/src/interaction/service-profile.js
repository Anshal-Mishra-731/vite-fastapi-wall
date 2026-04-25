import axios from "axios";
axios.defaults.withCredentials = true;

export class profileService{
    async getProfileSelf(){
        try {
            return await axios.get('/api/v1/social-media/profile');
        } catch (error) {
            console.error("Error getting your profile:", error);
            throw error;
        }
    }
    async getProfileUsername(username){
        try {
            return await axios.get(`/api/v1/social-media/profile/u/${username}`);
        } catch (error) {
            console.error("Error getting profile by username:", error);
            throw error;
        }
    }
    async updateProfile(username, bio, location){
        try {
            await axios.patch('/api/v1/social-media/profile', {
                username,
                bio,
                location
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error; 
        }
    }
    async updateAvatar(image){
        try {
            FormData = new FormData();
            FormData.append('avatar', image);
            await axios.patch('/api/v1/users/avatar', 
                FormData, 
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Error updating avatar:", error);
            throw error; 
        }
    }
    async updateCover(image){
        try {
            FormData = new FormData();
            FormData.append('cover', image);
            await axios.patch('/api/v1/social-media/profile/cover-image', 
                FormData, 
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Error updating cover:", error);
            throw error; 
        }
    }
}
const serviceProfile = new profileService();
export default serviceProfile;