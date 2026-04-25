import {useForm} from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import servicePost from "../interaction/service-post.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function postForm({post}){

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.data?.title || '',
            content: post?.data?.content || '',
            images: post?.data?.images || [],
            tags: post?.data?.tags ? post?.data.tags.join(", ") : ""
        }
    });

    useEffect(() => {
        if (post?.data) {
            setValue("title", post?.data?.title || "");
            setValue("content", post?.data?.content || "");
            setValue("images", post?.data?.images || []);
            setValue("tags", (post?.data?.tags || []).join(", ") || "");
        }
    }, [post]);

    const navigate = useNavigate();
    const images = watch("images");

    const submit = async (data) => {

        const processedTags = (data.tags || "")
            .split(',')
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0);

        if (data.images.length > 4){
            alert("You can upload a maximum of 4 images.");
            return;
        }
        
        if (post){
            console.log("SENDING TO BACKEND:", {
                content: data.content,
                title: data.title,
                images: data.images,
                tags: processedTags
            });
            servicePost.updatePost(post.data._id, {
                content: data.content,
                title: data.title,
                images: data.images,
                tags : processedTags
            })
            .then(() => navigate(`/`))
            .catch((err) => console.error("Error updating post:", err));
        } else {
            servicePost.createPost({
                content: data.content,
                title: data.title,
                images: data.images,
                tags: processedTags
            })
            .then(() => navigate(`/`))
            .catch((err) => console.log("CREATE POST ERROR:", err.response?.data));
        }
    }

    const handleRemoveImage = async (img) => {
        if(img._id){
            try {
                await servicePost.deleteImage(post.data._id, img._id);
                const updatedImages = getValues('images').filter((image) => image._id !== img._id);
                setValue('images', updatedImages);
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        } else {
            const updatedImages = getValues('images').filter((image) => image !== img);
            setValue('images', updatedImages);
        }
    }

    const handleImageLimit = (e) => {
        const currentImages = getValues('images'); 
        if (currentImages.length + e.target.files.length > 4) {
            alert("You can upload a maximum of 4 images.");
            e.target.value = null;
            return;
        }
    }

    return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-6">

        {/* LEFT */}
        <div className="w-3/5 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title")}
            />

            <RTE label="Content :" name="content" control={control} />
        </div>

        {/* RIGHT */}
        <div className="w-2/5 px-2 flex flex-col gap-4">

            <Input
                label="Featured Image :"
                type="file"
                className="mb-2 cursor-pointer"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={(e) => {
                    handleImageLimit(e);
                    const files = Array.from(e.target.files);
                    const updated = [...getValues("images"), ...files];
                    setValue("images", updated);
                }}
            />

            {images && images.length > 0 && (
                <div className="flex flex-col gap-2 mb-2">

                    {images.map((img, index) => (
                        <div
                            key={img._id || index}
                            className="flex items-center gap-3 bg-zinc-800 px-3 py-2 rounded-md"
                        >
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(img)}
                                className="text-gray-400 hover:text-red-400 text-sm"
                            >
                                ✕
                            </button>

                            <span className="text-sm text-gray-200 truncate">
                                {img.name || img.url?.split('/').pop()}
                            </span>
                        </div>
                    ))}

                </div>
            )}

            <Input
                label="Tags (comma separated) :"
                placeholder="history, india, politics"
                className="mb-2"
                {...register("tags")}
            />

            <Button
                type="submit"
                bgColor={"bg-green-500"}
                className="w-full mt-2 cursor-pointer"
            >
                {post ? "Update" : "Submit"}
            </Button>

        </div>
    </form>
    );
}

export default postForm;