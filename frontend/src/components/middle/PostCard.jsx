import { useSelector } from "react-redux";
import servicePost from "../../interaction/service-post";
import { useNavigate } from "react-router-dom";

function PostCard({ post, onDelete }) {

    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth.isAuthenticated);
    const authUserData = useSelector((state) => state.auth.userData);

    const isAuthor = authState && post?.author?.account?._id === authUserData?.data?._id;

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            servicePost.deletePost(post._id)
            .then(() => {
                onDelete(post._id);
            })
            .catch((err) => {
                console.error("Error deleting post:", err);
            });
        }
    };

    return (
        <div className="flex gap-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 transition-all duration-200">

            {/* Avatar */}
            <div className="flex justify-center items-start">
                <div className="w-12 h-12 rounded-full bg-zinc-700 flex-shrink-0"></div>
            </div>

            {/* Content */}
            <div className="flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-2">

                    <h3 className="font-semibold text-base text-white cursor-pointer hover:underline">
                        {post?.author?.account?.username}
                    </h3>

                    {isAuthor && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(`/posts/${post._id}/edit`)}
                                className="px-3 py-1 text-xs border border-zinc-600 rounded-md text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 transition cursor-pointer"
                            >
                                Edit
                            </button>

                            <button
                                onClick={deletePost}
                                className="px-3 py-1 text-xs border border-zinc-600 rounded-md text-red-400 hover:bg-red-500/10 hover:border-red-400 transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                </div>

                {/* Title */}
                {post?.title && (
                    <div className="text-lg font-semibold text-white mb-1">
                        {post.title}
                    </div>
                )}

                {/* Content */}
                {post?.content && (
                    <div
                        className="text-sm text-zinc-300 leading-relaxed mb-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}

                {/* Images */}
                {post?.images?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden mb-3">
                        {post.images.map((img, index) => (
                            <div key={index} className="overflow-hidden rounded-lg">
                                <img
                                    src={img.url}
                                    alt="post"
                                    className="object-cover w-full h-48 cursor-pointer transition-transform duration-200 hover:scale-105"
                                    onClick={() => window.open(img.url, "_blank")}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Tags */}
                {post?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs bg-zinc-800 text-blue-400 rounded-md hover:bg-zinc-700 cursor-pointer transition"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default PostCard;