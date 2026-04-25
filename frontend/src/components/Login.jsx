import serviceAuth from "../interaction/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";
import Button from "./Button.jsx";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const authStatus = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (authStatus) {
            navigate("/");
        }
    }, [authStatus, navigate]);

    const loginUser = async (data) => {
        try {
            const response = await serviceAuth.login(data);

            if (response) {
                const UserData = await serviceAuth.getCurrentUser();
                const accessToken = response.data.data.accessToken;
                localStorage.setItem("accessToken", accessToken);

                if (UserData) {
                    dispatch(login(UserData.data));
                }

                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

                <h2 className="text-center text-2xl font-semibold text-white mb-6">
                    Sign in to your account
                </h2>

                <form onSubmit={handleSubmit(loginUser)} className="space-y-5">

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        {...register("username", { required: true })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />

                    <Button type="submit" className="bg-gray-800 w-full cursor-pointer">
                        Sign in
                    </Button>

                </form>

                <p className="text-center text-sm text-zinc-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;