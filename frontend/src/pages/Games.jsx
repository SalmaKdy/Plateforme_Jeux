import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getGameImage } from "../utils/gameImages";
import "./Games.css";

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeGenre, setActiveGenre] = useState("Tous");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/games")
            .then(r => { if (!r.ok) throw new Error(); return r.json(); })
            .then(data => { setGames(data); setLoading(false); })
            .catch(() => { setError(true); setLoading(false); });
    }, []);

    const genres = ["Tous", ...new Set(games.map(g => g.genre).filter(Boolean))];

    const filtered = useMemo(() => {
        let result = [...games];

        if (activeGenre !== "Tous") {
            result = result.filter(g => g.genre === activeGenre);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(g =>
                g.title?.toLowerCase().includes(q) ||
                g.description?.toLowerCase().includes(q) ||
                g.genre?.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case "price-asc":
                return [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
            case "price-desc":
                return [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
            default:
                return result;
        }
    }, [games, activeGenre, search, sortBy]);

    const genreCount = genres.length - 1;

    return (
        <div className="games-wrapper">
            <Navbar />

            <div className="games-page">

                {/* ── Hero ── */}
                <section className="games-hero">
                    <span className="games-hero-badge">✨ Catalogue Premium</span>
                    <h1 className="games-hero-title">Catalogue de Jeux</h1>
                    <p className="games-hero-sub">
                        Plongez dans l'univers GameHub et découvrez des expériences de jeu inoubliables.
                    </p>
                </section>

                {/* ── Stats bar — real data from backend ── */}
                {!loading && !error && games.length > 0 && (
                    <div className="games-stats-bar">
                        <div className="games-stat">
                            <span className="games-stat-value">{games.length}</span>
                            <span className="games-stat-label">Jeux Disponibles</span>
                        </div>
                        <div className="games-stat">
                            <span className="games-stat-value">{genreCount}</span>
                            <span className="games-stat-label">Genres</span>
                        </div>
                        <div className="games-stat">
                            <span className="games-stat-value">24/7</span>
                            <span className="games-stat-label">Support Premium</span>
                        </div>
                    </div>
                )}

                {/* ── Catalog section ── */}
                <section className="games-catalog">

                    {/* Header row */}
                    <div className="games-catalog-header">
                        <h2 className="games-catalog-title">🎮 Tous les Jeux</h2>
                        {!loading && !error && (
                            <span className="games-count-badge">{filtered.length} jeu{filtered.length !== 1 ? "x" : ""}</span>
                        )}
                    </div>

                    {/* Genre filters */}
                    {!loading && !error && games.length > 0 && (
                        <div className="games-filters">
                            {genres.map(g => (
                                <button
                                    key={g}
                                    className={`games-filter-btn${activeGenre === g ? " active" : ""}`}
                                    onClick={() => setActiveGenre(g)}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search + sort row */}
                    {!loading && !error && games.length > 0 && (
                        <div className="games-search-row">
                            <div className="games-search-wrap">
                                <span className="games-search-icon">🔍</span>
                                <input
                                    className="games-search-input"
                                    type="text"
                                    placeholder="Rechercher un jeu..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button className="games-search-clear" onClick={() => setSearch("")}>✕</button>
                                )}
                            </div>
                            <select
                                className="games-sort-select"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                            >
                                <option value="default">Par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                            </select>
                        </div>
                    )}

                    {/* Content states */}
                    {loading ? (
                        <div className="games-loading">
                            <div className="games-loading-spinner" />
                            Chargement des jeux...
                        </div>
                    ) : error ? (
                        <div className="games-empty">
                            <div className="games-empty-icon">⚠️</div>
                            <p>Impossible de charger les jeux. Vérifiez que le serveur est démarré.</p>
                            <button className="games-retry-btn" onClick={() => window.location.reload()}>
                                Réessayer
                            </button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="games-empty">
                            <div className="games-empty-icon">🎮</div>
                            <p>
                                {search || activeGenre !== "Tous"
                                    ? "Aucun jeu trouvé pour ces critères."
                                    : "Aucun jeu disponible pour le moment."}
                            </p>
                            {(search || activeGenre !== "Tous") && (
                                <button
                                    className="games-retry-btn"
                                    onClick={() => { setSearch(""); setActiveGenre("Tous"); }}
                                >
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="games-grid">
                            {filtered.map((game, i) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    index={i}
                                    onNavigate={() => navigate(`/games/${game.id}`)}
                                    onBuy={e => { e.stopPropagation(); navigate("/login"); }}
                                />
                            ))}
                        </div>
                    )}
                </section>

            </div>

            <Footer />
        </div>
    );
}

function GameCard({ game, index, onNavigate, onBuy }) {
    const imgSrc = game.imageUrl || getGameImage(game);

    return (
        <div
            className="games-card"
            style={{ animationDelay: `${Math.min(index, 9) * 55}ms` }}
            onClick={onNavigate}
        >
            {/* Banner */}
            <div className="games-card-banner">
                <div className="games-card-emoji">{game.emoji || "🎮"}</div>
                <img
                    src={imgSrc}
                    alt={game.title}
                    className="games-card-img"
                    onError={e => { e.target.style.display = "none"; }}
                />
                <div className="games-card-banner-overlay" />
                <span className="games-card-genre-badge">{game.genre}</span>
                {game.free && <span className="games-card-free-badge">GRATUIT</span>}

                {/* Play overlay on hover */}
                <div className="games-card-play-overlay">
                    <div className="games-card-play-btn">▶</div>
                </div>
            </div>

            {/* Body */}
            <div className="games-card-body">
                <div className="games-card-title">{game.title}</div>
                <p className="games-card-desc">{game.description}</p>
                <div className="games-card-footer">
                    <span className="games-card-price">
                        {game.free ? "Gratuit" : `${game.price} €`}
                    </span>
                    <button className="games-card-cta" onClick={onBuy}>
                        Acheter
                    </button>
                </div>
            </div>
        </div>
    );
}
