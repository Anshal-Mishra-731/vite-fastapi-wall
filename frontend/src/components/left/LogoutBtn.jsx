import { useDispatch } from "react-redux";
import serviceAuth from "../../interaction/auth";
import { logout } from "../../store/authSlice";
import { Navigate } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        serviceAuth.logout().then(() => {
            dispatch(logout());
        });
    }
    return (
        <button 
        className="w-full text-left px-4 py-3 rounded-full hover:bg-zinc-800 transition cursor-pointer"
        onClick={handleLogout}> 
        LogoutBtn </button>
    )
}
export default LogoutBtn;