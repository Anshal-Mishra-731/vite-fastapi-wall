import { useSelector } from "react-redux";

function ProfileBtn() {
    const profileState = useSelector((state) => state.profile.profileMade);
    return profileState ? 
    (
        <button className="cursor-pointer"> 
            Profile
        </button>
    ) : 
    (
        <button className="cursor-pointer"> 
            Create Profile
        </button>
    );
}
export default ProfileBtn;