import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication}) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
        if (authentication == true && !isAuthenticated) {
            navigate("/login");
        }
        else if(authentication == false && isAuthenticated) {
            navigate("/");
        }
        setLoader(false);
    }, [authentication, isAuthenticated, navigate]);

    return loader ? 
        <h1>Loading....</h1> : 
        <>{children}</>
}
export default AuthLayout;