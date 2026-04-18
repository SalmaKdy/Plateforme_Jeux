import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";



export default function About() {
    return (
        <div className="about-wrapper">
            <Navbar />

            <div className="about-page">

                {/* HERO */}
                <section className="about-hero">
                    <div className="about-hero-content">
                        <div className="about-hero-left">
                            <span className="about-hero-badge">UNIVERS GAMEHUB</span>

                            <h1>Découvrez une nouvelle manière d’explorer le jeu vidéo</h1>

                            <p className="about-hero-desc">
                                GameHuB réunit découverte, immersion et simplicité dans une interface
                                pensée pour offrir une expérience fluide, moderne et élégante.
                            </p>

                            <div className="about-hero-features">
                                <div className="hero-feature">
                                    <h3>Interface immersive</h3>
                                    <p>Un environnement visuel propre et pensé pour les joueurs.</p>
                                </div>

                                <div className="hero-feature">
                                    <h3>Expérience fluide</h3>
                                    <p>Navigation rapide, contenu clair et accès simple aux jeux.</p>
                                </div>
                            </div>


                            <div className="about-hero-actions">
                                <Link to="/games" className="hero-btn-primary">
                                    Explorer les jeux
                                </Link>
                            </div>
                        </div>

                        <div className="about-hero-video">
                            <video
                                src="/videos/about.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>
                </section>
                <section
                    className="about-scroll-section"
                    onClick={() =>
                        document.querySelector("#next-section")?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    <div className="scroll-indicator">
                        <span>EN SAVOIR PLUS</span>
                        <div className="arrow"></div>
                    </div>
                </section>

                <section className="steam-style-section" id="next-section">
                    <div className="steam-center-content">
                        <span className="steam-badge">POURQUOI GAMEHUB</span>
                        <h2>Accès instantané à l’univers gaming</h2>
                        <p>
                            Explore rapidement de nouveaux jeux, retrouve tes favoris et profite
                            d’une expérience moderne pensée pour les joueurs.
                        </p>
                    </div>

                    <img src="/images/game1.png" className="floating-game game-1" />
                    <img src="/images/game2.png" className="floating-game game-2" />
                    <img src="/images/game3.png" className="floating-game game-3" />
                    <img src="/images/game4.png" className="floating-game game-4" />
                    <img src="/images/game5.png" className="floating-game game-5" />
                    <img src="/images/game6.png" className="floating-game game-6" />
                    <img src="/images/game7.png" className="floating-game game-7" />
                    <img src="/images/game8.png" className="floating-game game-8" />

                    <div className="advantages-container">
                        <div className="advantage-card reveal">Découverte rapide</div>
                        <div className="advantage-card reveal">Interface immersive</div>
                        <div className="advantage-card reveal">Navigation fluide</div>
                        <div className="advantage-card reveal">Communauté active</div>
                    </div>
                </section>

                <section className="steps-section">
                    <div className="steps-header">
                        <span className="steps-badge">COMMENT ÇA MARCHE</span>
                        <h2>Commence ton aventure en quelques étapes</h2>
                        <p>
                            GameHuB te permet d’explorer, sauvegarder et profiter de ton univers gaming
                            en toute simplicité.
                        </p>
                    </div>

                    <div className="steps-timeline">
                        <div className="timeline-line"></div>

                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Explore les jeux</h3>
                            <p>Découvre de nouveaux titres et parcours différentes catégories.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>Ajoute tes favoris</h3>
                            <p>Sauvegarde les jeux que tu aimes pour les retrouver rapidement.</p>
                        </div>

                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Rejoins l’univers gaming</h3>
                            <p>Profite d’une plateforme moderne pensée pour une expérience fluide.</p>
                        </div>
                    </div>
                </section>

                <section className="immersive-section">
                    <div className="immersive-header">
                        <span className="immersive-badge">EXPÉRIENCE IMMERSIVE</span>
                        <h2>Plonge dans une interface pensée pour les joueurs</h2>
                        <p>
                            Une expérience visuelle moderne, des interactions fluides et un univers
                            gaming conçu pour rendre chaque exploration plus captivante.
                        </p>
                    </div>

                    <div className="immersive-showcase">
                        <div className="immersive-glow"></div>

                        <div className="immersive-container">
                            <video
                                src="/videos/about2.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />

                            <div className="floating-card top-left">
                                <span>⚡ Navigation fluide</span>
                            </div>

                            <div className="floating-card top-right">
                                <span>🎮 Interface moderne</span>
                            </div>

                            <div className="floating-card bottom-left">
                                <span>🔥 Expérience immersive</span>
                            </div>

                            <div className="floating-card bottom-right">
                                <span>🌌 Univers gaming</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="about-cta">
                    <h2>Prêt à rejoindre l’aventure ?</h2>
                    <Link to="/register" className="hero-btn-primary">
                        Créer un compte
                    </Link>
                </section>

            </div>

            <Footer />
        </div>
    );
}