import serviceAuth from "../interaction/auth";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const signUp = async (data) => {

        const payload = {
            ...data,
            role: "USER" 
        };

        try {
            const response = await serviceAuth.createAccount(payload);

            if (response) {
                const UserData = await serviceAuth.getCurrentUser();

                if (UserData) {
                    dispatch(login(UserData.data));
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("SERVER DATA:", error.response?.data);

            if (error.response?.data?.errors) {
                error.response.data.errors.forEach((err) => {
                    console.log("VALIDATION ERROR:", err);
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

                <h2 className="text-center text-2xl font-semibold text-white mb-6">
                    Create a new account
                </h2>

                <form onSubmit={handleSubmit(signUp)} className="space-y-5">

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                    "Invalid email address",
                            },
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", { required: true })}
                    />

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Choose a username"
                        {...register("username", { required: true })}
                    />

                    <Button type="submit" className="w-full cursor-pointer bg-gray-800">
                        Sign Up
                    </Button>

                </form>

                <p className="text-center text-sm text-zinc-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default SignUp;