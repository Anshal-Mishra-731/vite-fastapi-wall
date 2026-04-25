import Login from "../components/Login";

function LoginPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-xl">
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;