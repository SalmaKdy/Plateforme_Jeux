import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <div className="hero">
            <video className="hero-video" autoPlay muted loop playsInline>
                <source src="/videos/HeroSection.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo HTML5.
            </video>

            <div className="hero-overlay"></div>

            <div className="hero-content">
                <h1>Entrez dans l’univers du gaming</h1>
                <p>
                    Découvrez les meilleurs jeux, explorez les nouveautés et vivez une expérience immersive.
                </p>
                <Link to="/games" className="btn-main">
                    Explorer les jeux
                </Link>
            </div>
        </div>
    );
}

export default HeroSection;