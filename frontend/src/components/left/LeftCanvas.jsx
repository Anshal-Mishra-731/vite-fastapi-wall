import ProfileBtn from "./ProfileBtn.jsx"; 
import LogoutBtn from "./LogoutBtn.jsx";
import Button from "../Button.jsx";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function LeftCanvas() {
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth.isAuthenticated);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: authState
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authState
        },{
            name: 'Signup',
            slug: '/signup', 
            active: !authState
        },
    ]
    return (
        <div className="fixed left-0 top-0 h-screen w-1/4 bg-black text-white border-r border-zinc-800 flex flex-col justify-between px-6 py-6">
            <div>
                <nav>
                    <ul className="space-y-2 text-lg font-medium">
                        {
                            authState ? <li><ProfileBtn /></li> : null
                        }
                        {navItems.map((item) => 
                            item.active? (
                                <li key={item.name}>
                                    <Button
                                        onClick={() => navigate(item.slug)}
                                        className='w-full text-left px-4 py-3 rounded-full hover:bg-zinc-800 transition cursor-pointer'
                                    >{item.name}</Button>
                                </li>
                            ) : (null)
                        )}
                    </ul>
                </nav>
            </div>
            <div>
                {authState && (
                    <div className="space-y-4">
                        <Button
                            className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-zinc-300 transition cursor-pointer"
                            onClick={() => navigate('posts/new')}
                        >
                            Create Post
                        </Button>

                        <LogoutBtn />
                    </div>
                )}
            </div>
        </div>
    )
}
export default LeftCanvas;