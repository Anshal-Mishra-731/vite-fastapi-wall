import PostCard from "./PostCard";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import serviceView from "../../interaction/service-view";

function HomeCanvas() {
    const authStatus = useSelector((state) => state.auth.isAuthenticated);

    const [Posts, setPosts] = useState([]);
    useEffect(() => {
        if (!authStatus){
            setPosts([]); 
            return;
        }

        serviceView.getAllPosts()
        .then(data => {
            setPosts(data?.data?.posts || []);
            console.log("POSTS:", Posts);
        }).catch(error => {            
            console.error("Error fetching posts:", error);
        });
    }, [authStatus]);

    const handleDeletePost = (postId) => {
        setPosts(Posts.filter(post => post._id !== postId));
    };

    return (
        <div className="ml-[25%] mr-[25%] w-1/2 h-screen flex flex-col border-x border-zinc-800 bg-black">
            <div className="sticky top-0 z-10 bg-black border-b border-zinc-800 px-4 py-3 text-center">
                <h2 className="text-xl font-semibold text-white">
                    Home - All Posts
                </h2>
            </div>

            {!authStatus && (
                <div className="px-4 py-3 border-b border-zinc-800 text-center">
                    <p className="font-bold text-white">
                        Login if you haven't already, so that you can post, follow, and more!
                    </p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto">
                {Posts.map(post => (
                    <div className="border-b border-zinc-800 px-4 py-3" key={post._id}>
                        <PostCard post={post} onDelete={handleDeletePost} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeCanvas;