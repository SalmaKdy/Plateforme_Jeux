import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Games() {
    return (
        <div className="games-wrapper">
            <Navbar />
            
            <div className="games-page">
                <h1>Games Page</h1>
                <p>Browse and explore all available games here.</p>
            </div>
            
            <Footer />
        </div>
    );
}

