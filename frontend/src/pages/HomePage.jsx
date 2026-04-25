import LeftCanvas from "../components/left/LeftCanvas.jsx";
import HomeCanvas from "../components/middle/HomeCanvas.jsx";
import RightCanvas from "../components/right/RightCanvas.jsx";

function Homepage() {
    return (
        <div className="bg-black min-h-screen">
            <LeftCanvas />
            <HomeCanvas />
            <RightCanvas />
        </div>
    );
}

export default Homepage;