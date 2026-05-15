import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addToCart } from "../services/api";
import { getGameContent } from "../utils/gameDescriptions";
import { getGameImage } from "../utils/gameImages";
import "./GameDetail.css";

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartMsg, setCartMsg] = useState(null);

    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        fetch(`/api/games/${id}`)
            .then(r => {
                if (!r.ok) throw new Error("Not found");
                return r.json();
            })
            .then(data => { setGame(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    async function handleBuy(e) {
        e.preventDefault();
        if (!isLoggedIn) { navigate("/login"); return; }
        try {
            await addToCart(game.id);
            setCartMsg("✓ Ajouté au panier !");
            setTimeout(() => setCartMsg(null), 2500);
        } catch {
            setCartMsg("Déjà dans le panier ou déjà acheté.");
            setTimeout(() => setCartMsg(null), 2500);
        }
    }

    return (
        <div className="gd-wrapper">
            <Navbar />

            {loading ? (
                <div className="gd-page">
                    <div className="gd-loading">
                        <div className="gd-spinner" />
                        Chargement...
                    </div>
                </div>
            ) : !game ? (
                <div className="gd-page">
                    <div className="gd-not-found">
                        <p>Jeu introuvable.</p>
                        <button className="gd-back-btn" onClick={() => navigate("/games")}>
                            ← Retour au catalogue
                        </button>
                    </div>
                </div>
            ) : (
                <GameContent
                    game={game}
                    isLoggedIn={isLoggedIn}
                    cartMsg={cartMsg}
                    onBuy={handleBuy}
                    onBack={() => navigate("/games")}
                    onDashboard={() => navigate("/dashboard")}
                />
            )}

            <Footer />
        </div>
    );
}

function GameContent({ game, isLoggedIn, cartMsg, onBuy, onBack, onDashboard }) {
    const content = getGameContent(game);
    const imgSrc = game.imageUrl || getGameImage(game);

    return (
        <>
            {/* ── Hero — full bleed ── */}
            <section className="gd-hero">
                {/* Background layers */}
                <div className="gd-hero-bg">
                    <div className="gd-hero-emoji-bg">{game.emoji || "🎮"}</div>
                    {imgSrc && (
                        <img
                            className="gd-hero-img"
                            src={imgSrc}
                            alt={game.title}
                            onError={e => { e.target.style.display = "none"; }}
                        />
                    )}
                </div>
                <div className="gd-hero-overlay-bottom" />
                <div className="gd-hero-overlay-left" />
                <div className="gd-hero-grid" />

                {/* Content */}
                <div className="gd-hero-inner">
                    <button className="gd-back-btn" onClick={onBack}>
                        ← Retour au catalogue
                    </button>
                    <div className="gd-hero-badges">
                        <span className="gd-genre-badge">{game.genre}</span>
                        {game.platform && <span className="gd-platform-badge">{game.platform}</span>}
                        {game.free && <span className="gd-free-badge">GRATUIT</span>}
                    </div>
                    <h1 className="gd-title">{game.title}</h1>
                    <p className="gd-hero-desc">{content.intro}</p>
                </div>
            </section>

            {/* ── Body — constrained ── */}
            <div className="gd-page">
                <div className="gd-body">

                    {/* ── Left column ── */}
                    <div className="gd-left">

                        {/* À propos */}
                        <div className="gd-detail-card gd-detail-green">
                            <div className="gd-detail-header">
                                <span className="gd-detail-icon gd-icon-green">📖</span>
                                <h2 className="gd-detail-title">À propos de ce jeu</h2>
                            </div>
                            <p className="gd-section-text">{content.about}</p>
                        </div>

                        {/* Gameplay */}
                        <div className="gd-detail-card gd-detail-blue">
                            <div className="gd-detail-header">
                                <span className="gd-detail-icon gd-icon-blue">🕹️</span>
                                <h2 className="gd-detail-title">Gameplay</h2>
                            </div>
                            <p className="gd-section-text">{content.gameplay}</p>
                        </div>

                        {/* Fonctionnalités */}
                        <div className="gd-detail-card gd-detail-yellow">
                            <div className="gd-detail-header">
                                <span className="gd-detail-icon gd-icon-yellow">⚡</span>
                                <h2 className="gd-detail-title">Fonctionnalités</h2>
                            </div>
                            <div className="gd-features-grid">
                                {content.features.map((f, i) => (
                                    <div key={i} className="gd-feature-card">
                                        <span className="gd-feature-bullet" />
                                        <span className="gd-feature-text">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pourquoi jouer */}
                        <div className="gd-detail-card gd-detail-orange">
                            <div className="gd-detail-header">
                                <span className="gd-detail-icon gd-icon-orange">🏆</span>
                                <h2 className="gd-detail-title">Pourquoi jouer à ce jeu ?</h2>
                            </div>
                            <p className="gd-section-text">{content.whyPlay}</p>
                        </div>

                    </div>

                    {/* ── Buy sidebar ── */}
                    <div className="gd-sidebar">
                        <div className="gd-buy-card">

                            {/* Image preview */}
                            <div className="gd-thumb-wrap">
                                <div className="gd-thumb-emoji">{game.emoji || "🎮"}</div>
                                {imgSrc && (
                                    <img
                                        className="gd-thumb"
                                        src={imgSrc}
                                        alt={game.title}
                                        onError={e => { e.target.style.display = "none"; }}
                                    />
                                )}
                                <div className="gd-thumb-overlay" />
                            </div>

                            {/* Card body */}
                            <div className="gd-buy-body">
                                <div className="gd-buy-title">{game.title}</div>
                                <div className="gd-buy-genre">{game.genre}</div>

                                <div className="gd-buy-price">
                                    {game.free ? "GRATUIT" : `${game.price} €`}
                                </div>

                                {cartMsg && <div className="gd-cart-msg">{cartMsg}</div>}

                                <button className="gd-buy-btn" onClick={onBuy}>
                                    🛒 {isLoggedIn ? "Acheter maintenant" : "Se connecter pour acheter"}
                                </button>

                                {isLoggedIn && (
                                    <button className="gd-dashboard-btn" onClick={onDashboard}>
                                        Voir mon panier
                                    </button>
                                )}

                                <div className="gd-info-block">
                                    <div className="gd-info-row">
                                        <span className="gd-info-label">Genre</span>
                                        <span className="gd-info-value">{game.genre}</span>
                                    </div>
                                    {game.platform && (
                                        <div className="gd-info-row">
                                            <span className="gd-info-label">Plateforme</span>
                                            <span className="gd-info-value">{game.platform}</span>
                                        </div>
                                    )}
                                    <div className="gd-info-row">
                                        <span className="gd-info-label">Prix</span>
                                        <span className="gd-info-value gd-price-accent">
                                            {game.free ? "Gratuit" : `${game.price} €`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
