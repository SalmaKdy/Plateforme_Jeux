import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getGameImage } from "../utils/gameImages";
import "./Home.css";

const FEATURES = [
    { icon: "⚡", title: "Performance Ultra", desc: "Serveurs optimisés pour une expérience de jeu fluide et sans latence perceptible." },
    { icon: "🛡️", title: "Sécurité Maximale", desc: "Protection avancée de vos données personnelles et transactions 100 % sécurisées." },
    { icon: "🎧", title: "Support 24/7", desc: "Notre équipe est disponible à tout moment pour répondre à vos questions." },
    { icon: "🎮", title: "Catalogue Varié", desc: "Des dizaines de jeux premium dans tous les genres pour satisfaire chaque joueur." },
];

const GENRE_EMOJI = {
    Arcade: "🕹️", Puzzle: "🧩", Action: "⚔️", Strategie: "♟️",
    Memoire: "🧠", Sport: "⚽", Course: "🏎️", Casual: "🎯",
    Aventure: "🗺️", Horreur: "👻",
};

function genreEmoji(genre) {
    return GENRE_EMOJI[genre] || "🎮";
}

export default function Home() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/games")
            .then(r => r.json())
            .then(setGames)
            .catch(() => {});
    }, []);

    const featuredGames = games.slice(0, 6);
    const genres = [...new Set(games.map(g => g.genre).filter(Boolean))];

    return (
        <div className="home-wrapper">
            <Navbar />

            {/* ── Hero ── */}
            <section className="home-hero">
                <video className="home-hero-video" autoPlay muted loop playsInline>
                    <source src="/videos/HeroSection.mp4" type="video/mp4" />
                </video>
                <div className="home-hero-overlay" />
                <div className="home-hero-scroll" aria-hidden="true">↓</div>
            </section>

            {/* ── Stats — real backend data ── */}
            {games.length > 0 && (
                <section className="home-stats">
                    <div className="home-stats-inner">
                        <div className="home-stat">
                            <span className="home-stat-value">{games.length}</span>
                            <span className="home-stat-label">Jeux Disponibles</span>
                        </div>
                        <div className="home-stat">
                            <span className="home-stat-value">{genres.length}</span>
                            <span className="home-stat-label">Genres</span>
                        </div>
                        <div className="home-stat">
                            <span className="home-stat-value">24/7</span>
                            <span className="home-stat-label">Support Premium</span>
                        </div>
                        <div className="home-stat">
                            <span className="home-stat-value">100%</span>
                            <span className="home-stat-label">Sécurisé</span>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Featured games — real API data ── */}
            {featuredGames.length > 0 && (
                <section className="home-section home-featured">
                    <div className="home-section-header">
                        <div>
                            <h2>Jeux <span>Populaires</span></h2>
                            <p>Les jeux les plus appréciés de notre catalogue</p>
                        </div>
                        <Link to="/games" className="home-see-all">Voir tout →</Link>
                    </div>
                    <div className="home-games-grid">
                        {featuredGames.map(game => (
                            <FeaturedGameCard
                                key={game.id}
                                game={game}
                                onClick={() => navigate(`/games/${game.id}`)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* ── Genres — derived from real games ── */}
            {genres.length > 0 && (
                <section className="home-section home-genres">
                    <div className="home-section-center">
                        <h2>Explorer par <span>Genre</span></h2>
                        <p>Trouvez votre style de jeu préféré parmi notre sélection</p>
                    </div>
                    <div className="home-genres-grid">
                        {genres.map((genre, i) => (
                            <Link
                                to="/games"
                                key={genre}
                                className="home-genre-card"
                                style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}
                            >
                                <span className="home-genre-emoji">{genreEmoji(genre)}</span>
                                <span className="home-genre-name">{genre}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Why GameHub — marketing copy ── */}
            <section className="home-section home-features">
                <div className="home-section-center">
                    <h2>Pourquoi choisir <span>GameHuB</span> ?</h2>
                    <p>Une plateforme conçue par des gamers, pour des gamers</p>
                </div>
                <div className="home-features-grid">
                    {FEATURES.map((f, i) => (
                        <div key={i} className="home-feature-card">
                            <span className="home-feature-icon">{f.icon}</span>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="home-cta">
                <div className="home-cta-inner">
                    <span className="home-cta-badge">🏆 Rejoignez la communauté</span>
                    <h2>Prêt à commencer l'aventure ?</h2>
                    <p>
                        Créez votre compte et accédez au catalogue complet de jeux.
                        Achetez, jouez, et profitez d'une expérience gaming premium.
                    </p>
                    <div className="home-cta-actions">
                        <Link to="/register" className="home-btn-primary">Créer un compte</Link>
                        <Link to="/games" className="home-btn-secondary">Voir le catalogue</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeaturedGameCard({ game, onClick }) {
    const imgSrc = game.imageUrl || getGameImage(game);

    return (
        <div className="home-game-card" onClick={onClick}>
            <div className="home-game-banner">
                <div className="home-game-emoji">{game.emoji || "🎮"}</div>
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt={game.title}
                        className="home-game-img"
                        onError={e => { e.target.style.display = "none"; }}
                    />
                )}
                <div className="home-game-overlay" />
                <span className="home-game-genre">{game.genre}</span>
                <div className="home-game-play">▶</div>
            </div>
            <div className="home-game-body">
                <div className="home-game-title">{game.title}</div>
                <p className="home-game-desc">{game.description}</p>
                <div className="home-game-price">
                    {game.free ? "Gratuit" : `${game.price} €`}
                </div>
            </div>
        </div>
    );
}
