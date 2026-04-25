import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import serviceView from "../interaction/service-view";

function CreatePostPage() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            serviceView.getPost(id)
            .then((data) => {
                setPost(data.data);
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
            })
            .finally(() => setLoading(false));
        }

    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex justify-center">

            <div className="w-[900px] px-6 py-8">

                <h1 className="text-2xl font-semibold mb-6">
                    {id ? "Edit Post" : "Create Post"}
                </h1>

                <div className="border border-zinc-800 rounded-lg p-6 bg-black">
                    <PostForm post={post} />
                </div>

            </div>

        </div>
    );
}

export default CreatePostPage;