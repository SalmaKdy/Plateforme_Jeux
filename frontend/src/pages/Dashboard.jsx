import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import GamePlayer from "../components/GamePlayer";
import { getGameImage } from "../utils/gameImages";
import {
    getUserData, getAllGames, getPurchasedGames, getCartItems,
    addToCart, removeFromCart, checkout
} from "../services/api";

export default function Dashboard() {
    const navigate = useNavigate();

    const user = (() => {
        try { return JSON.parse(localStorage.getItem("user")) || {}; }
        catch { return {}; }
    })();
    const username = user.username || user.email?.split("@")[0] || "Joueur";
    const userInitials = username.substring(0, 2).toUpperCase();

    const [activeSection,  setActiveSection]  = useState("mes-jeux");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartItems,      setCartItems]      = useState([]);
    const [catalogGames,   setCatalogGames]   = useState([]);
    const [purchasedGames, setPurchasedGames] = useState([]);
    const [activeGenre,    setActiveGenre]    = useState("Tous");
    const [playingGame,    setPlayingGame]    = useState(null);
    const [checkoutMsg,    setCheckoutMsg]    = useState(null);
    const [loading,        setLoading]        = useState(true);
    const [searchQuery,    setSearchQuery]    = useState("");
    const [profileData,    setProfileData]    = useState({
        fullName: "", email: user.email || "", username,
        phone: "", address: "", country: "France",
    });
    const [paymentData, setPaymentData] = useState({
        cardHolder: "", cardNumber: "", expiry: "", billing: "",
    });

    /* ── Data loading ── */
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [userData, allGames, purchased, cart] = await Promise.all([
                getUserData(username),
                getAllGames(),
                getPurchasedGames(username),
                getCartItems(username),
            ]);
            setProfileData(prev => ({
                ...prev,
                email: userData.email,
                username: userData.username,
            }));
            setCatalogGames(allGames);
            setPurchasedGames(purchased);
            setCartItems(cart.map(mapCartItem));
        } catch (err) {
            console.error("Fetch error:", err);
            if (err.message?.includes("401") || err.message?.includes("403")) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    }, [username, navigate]);

    useEffect(() => { loadData(); }, [loadData]);

    function mapCartItem(item) {
        return {
            cartItemId: item.id,
            id: item.game.id,
            title: item.game.title,
            genre: item.game.genre,
            price: item.game.free ? 0 : parseFloat(item.game.price || "0"),
            imageUrl: item.game.imageUrl,
            gameUrl: item.game.gameUrl,
            emoji: item.game.emoji || "🎮",
        };
    }

    /* ── Handlers ── */
    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    function nav(section) {
        setActiveSection(section);
        setMobileMenuOpen(false);
        setSearchQuery("");
    }

    async function handleAddToCart(game) {
        if (cartItems.find(c => c.id === game.id)) { nav("panier"); return; }
        if (purchasedGames.find(p => p.id === game.id)) return;
        try {
            await addToCart(game.id);
            setCartItems(prev => [...prev, {
                cartItemId: null,
                id: game.id,
                title: game.title,
                genre: game.genre,
                price: game.free ? 0 : parseFloat(game.price || "0"),
                imageUrl: game.imageUrl,
                gameUrl: game.gameUrl,
                emoji: game.emoji || "🎮",
            }]);
            nav("panier");
        } catch (err) { console.error("Add to cart error:", err); }
    }

    async function handleRemoveFromCart(gameId) {
        try {
            await removeFromCart(gameId);
            setCartItems(prev => prev.filter(i => i.id !== gameId));
        } catch (err) { console.error("Remove from cart error:", err); }
    }

    async function handleCheckout() {
        try {
            await checkout();
            setCartItems([]);
            const purchased = await getPurchasedGames(username);
            setPurchasedGames(purchased);
            setCheckoutMsg("Achat réussi ! Vos jeux sont dans Mes Jeux.");
            nav("mes-jeux");
            setTimeout(() => setCheckoutMsg(null), 4000);
        } catch (err) {
            console.error("Checkout error:", err);
            setCheckoutMsg("Erreur lors du paiement. Veuillez réessayer.");
            setTimeout(() => setCheckoutMsg(null), 4000);
        }
    }

    /* ── Derived ── */
    const genres = ["Tous", ...new Set(catalogGames.map(g => g.genre).filter(Boolean))];

    const filteredCatalog = (activeGenre === "Tous"
        ? catalogGames
        : catalogGames.filter(g => g.genre === activeGenre)
    ).filter(g => !searchQuery || g.title?.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredPurchased = purchasedGames.filter(g =>
        !searchQuery || g.title?.toLowerCase().includes(searchQuery.toLowerCase()));

    const cartTotal = cartItems.reduce((acc, i) => acc + i.price, 0);

    const sectionTitles = {
        "mes-jeux":  "Ma Bibliothèque",
        "jeux":      "Boutique",
        "panier":    "Mon Panier",
        "mes-infos": "Mon Profil",
    };

    const mobileNavItems = [
        { id: "mes-jeux",  icon: "🕹️", label: "Mes Jeux",   badge: purchasedGames.length },
        { id: "jeux",      icon: "🎯", label: "Boutique" },
        { id: "panier",    icon: "🛒", label: "Panier",      badge: cartItems.length || null },
        { id: "mes-infos", icon: "👤", label: "Profil" },
    ];

    /* ════════════ RENDER ════════════ */
    return (
        <div className="db-root">

            {playingGame && (
                <GamePlayer game={playingGame} onClose={() => setPlayingGame(null)} />
            )}

            {checkoutMsg && (
                <div className={`db-toast ${checkoutMsg.includes("Erreur") ? "db-toast-error" : "db-toast-success"}`}>
                    {checkoutMsg}
                </div>
            )}

            {/* Ambient glow blobs */}
            <div className="db-ambients" aria-hidden="true">
                <div className="db-ambient db-ambient-1" />
                <div className="db-ambient db-ambient-2" />
                <div className="db-ambient db-ambient-3" />
            </div>

            {/* ── MOBILE TOP BAR ── */}
            <header className="db-mobile-topbar">
                <div className="db-mobile-logo">
                    <div className="db-logo-icon-sm">🎮</div>
                    <span className="db-logo-text">Game<span>Hub</span></span>
                </div>
                <div className="db-mobile-topbar-right">
                    <div className="db-topbar-avatar-chip">{userInitials}</div>
                    <button
                        className="db-mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(o => !o)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </header>

            {/* ── MOBILE OVERLAY MENU ── */}
            {mobileMenuOpen && (
                <div className="db-mobile-overlay">
                    <nav className="db-mobile-nav-list">
                        {mobileNavItems.map(item => (
                            <button
                                key={item.id}
                                className={`db-mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                                onClick={() => nav(item.id)}
                            >
                                <span className="db-mobile-nav-icon">{item.icon}</span>
                                <span>{item.label}</span>
                                {item.badge > 0 && <span className="db-nav-badge">{item.badge}</span>}
                            </button>
                        ))}
                        <button className="db-mobile-nav-item db-mobile-logout" onClick={handleLogout}>
                            <span className="db-mobile-nav-icon">🚪</span>
                            <span>Déconnexion</span>
                        </button>
                    </nav>
                </div>
            )}

            <div className="db-layout">

                {/* ── SIDEBAR ── */}
                <aside className="db-sidebar">
                    {/* Logo */}
                    <div className="db-logo">
                        <div className="db-logo-icon">
                            <span>🎮</span>
                            <div className="db-logo-pulse" />
                        </div>
                        <div>
                            <div className="db-logo-text">Game<span>Hub</span></div>
                            <div className="db-logo-sub">Premium Gaming</div>
                        </div>
                    </div>

                    {/* User card */}
                    <div className="db-user-card-wrap">
                        <div className="db-user-card">
                            <div className="db-user-card-top">
                                <div className="db-avatar-ring">
                                    <div className="db-avatar">{userInitials}</div>
                                    <div className="db-avatar-crown">👑</div>
                                </div>
                                <div className="db-user-info">
                                    <div className="db-username">{username}</div>
                                    <span className="db-user-badge">✦ Elite</span>
                                </div>
                            </div>
                            <div className="db-user-mini-stats">
                                <div className="db-mini-stat">
                                    <div className="db-mini-stat-val">{purchasedGames.length}</div>
                                    <div className="db-mini-stat-label">Jeux</div>
                                </div>
                                <div className="db-mini-stat db-mini-stat-mid">
                                    <div className="db-mini-stat-val db-mini-stat-gold">0</div>
                                    <div className="db-mini-stat-label">Succès</div>
                                </div>
                                <div className="db-mini-stat">
                                    <div className="db-mini-stat-val db-mini-stat-purple">1</div>
                                    <div className="db-mini-stat-label">Niveau</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="db-nav">
                        <span className="db-nav-label">Menu</span>

                        {[
                            { id: "mes-jeux", icon: "🕹️", label: "Mes Jeux",   badge: purchasedGames.length },
                            { id: "jeux",     icon: "🎯", label: "Boutique" },
                            { id: "panier",   icon: "🛒", label: "Mon Panier",  badge: cartItems.length || null },
                        ].map(item => (
                            <button
                                key={item.id}
                                className={`db-nav-item ${activeSection === item.id ? "active" : ""}`}
                                onClick={() => nav(item.id)}
                            >
                                <span className="db-nav-icon">{item.icon}</span>
                                <span className="db-nav-text">{item.label}</span>
                                {item.badge > 0 && <span className="db-nav-badge">{item.badge}</span>}
                            </button>
                        ))}

                        <span className="db-nav-label">Compte</span>

                        <button
                            className={`db-nav-item ${activeSection === "mes-infos" ? "active" : ""}`}
                            onClick={() => nav("mes-infos")}
                        >
                            <span className="db-nav-icon">👤</span>
                            <span className="db-nav-text">Profil</span>
                        </button>
                    </nav>

                    <div className="db-logout-wrap">
                        <button className="db-logout-btn" onClick={handleLogout}>
                            <span className="db-nav-icon">🚪</span> Déconnexion
                        </button>
                    </div>
                </aside>

                {/* ── MAIN ── */}
                <main className="db-main">

                    {/* Sticky header */}
                    <header className="db-topbar">
                        <div className="db-topbar-left">
                            <h1 className="db-topbar-title">{sectionTitles[activeSection]}</h1>
                            <p className="db-topbar-sub">
                                Bienvenue,{" "}
                                <span className="db-topbar-username">{username}</span>
                                {activeSection === "panier" && ` — ${cartItems.length} article(s)`}
                                {activeSection === "mes-jeux" && " — prêt à jouer ?"}
                            </p>
                        </div>
                        <div className="db-topbar-actions">
                            {(activeSection === "mes-jeux" || activeSection === "jeux") && (
                                <div className="db-search-wrap">
                                    <span className="db-search-icon">🔍</span>
                                    <input
                                        className="db-search-input"
                                        placeholder="Rechercher un jeu..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="db-topbar-avatar-chip">{userInitials}</div>
                        </div>
                    </header>

                    <div className="db-content">

                        {/* ══════════════════════════════════
                            MES JEUX — Library
                        ══════════════════════════════════ */}
                        {activeSection === "mes-jeux" && (
                            <section>
                                {/* Stats grid — real count for games owned; honest fallbacks for unavailable stats */}
                                <div className="db-stats-grid">
                                    <div className="db-stat-card db-stat-cyan">
                                        <div className="db-stat-gradient db-stat-grad-cyan" />
                                        <div className="db-stat-icon-box db-sib-cyan">🎮</div>
                                        <div className="db-stat-value">{purchasedGames.length}</div>
                                        <div className="db-stat-label">Jeux Possédés</div>
                                        <div className="db-stat-trend">⚡ Collection totale</div>
                                    </div>
                                    <div className="db-stat-card db-stat-purple">
                                        <div className="db-stat-gradient db-stat-grad-purple" />
                                        <div className="db-stat-icon-box db-sib-purple">⏱️</div>
                                        <div className="db-stat-value">—</div>
                                        <div className="db-stat-label">Temps de Jeu</div>
                                        <div className="db-stat-trend db-stat-trend-muted">Non disponible</div>
                                    </div>
                                    <div className="db-stat-card db-stat-gold">
                                        <div className="db-stat-gradient db-stat-grad-gold" />
                                        <div className="db-stat-icon-box db-sib-gold">🏆</div>
                                        <div className="db-stat-value">0</div>
                                        <div className="db-stat-label">Succès Débloqués</div>
                                        <div className="db-stat-trend">⚡ À débloquer</div>
                                    </div>
                                    <div className="db-stat-card db-stat-green">
                                        <div className="db-stat-gradient db-stat-grad-green" />
                                        <div className="db-stat-icon-box db-sib-green">📈</div>
                                        <div className="db-stat-value">1</div>
                                        <div className="db-stat-label">Niveau Actuel</div>
                                        <div className="db-stat-trend">⚡ Continuez à jouer</div>
                                    </div>
                                </div>

                                <div className="db-section-head">
                                    <div>
                                        <h2 className="db-section-title">🔥 Mes Jeux Achetés</h2>
                                        <p className="db-section-sub">Reprenez là où vous vous êtes arrêté</p>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="db-empty-state">
                                        <div className="db-empty-icon">⏳</div>
                                        <h3>Chargement...</h3>
                                    </div>
                                ) : filteredPurchased.length === 0 ? (
                                    <div className="db-empty-state">
                                        <div className="db-empty-icon">🎮</div>
                                        <h3>{searchQuery ? "Aucun résultat" : "Aucun jeu acheté"}</h3>
                                        <p>
                                            {searchQuery
                                                ? `Aucun jeu ne correspond à "${searchQuery}".`
                                                : "Parcourez la boutique et achetez vos premiers jeux."}
                                        </p>
                                        {!searchQuery && (
                                            <button className="db-btn-save" onClick={() => nav("jeux")}>
                                                Voir la boutique
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="db-games-grid">
                                        {filteredPurchased.map(game => (
                                            <div key={game.id} className="db-game-card">
                                                <div className="db-game-thumb-wrap">
                                                    <img
                                                        src={game.imageUrl || getGameImage(game)}
                                                        alt={game.title}
                                                        className="db-game-thumb-img"
                                                        onError={e => { e.target.style.display = "none"; }}
                                                    />
                                                    <div className="db-game-img-overlay" />
                                                    <div className="db-game-play-overlay">
                                                        {game.gameUrl ? (
                                                            <button
                                                                className="db-play-circle"
                                                                onClick={() => setPlayingGame(game)}
                                                                aria-label={`Jouer à ${game.title}`}
                                                            >▶</button>
                                                        ) : (
                                                            <div className="db-play-circle db-play-unavail">🚫</div>
                                                        )}
                                                    </div>
                                                    <div className="db-game-owned-badge">✓ Acheté</div>
                                                </div>
                                                <div className="db-game-card-body">
                                                    <div className="db-game-genre">{game.genre}</div>
                                                    <div className="db-game-title">{game.title}</div>
                                                    <div className="db-game-card-footer">
                                                        <div className="db-game-price">
                                                            {parseFloat(game.price || 0) === 0 ? "Gratuit" : `${parseFloat(game.price || 0).toFixed(2)}€`}
                                                        </div>
                                                        {game.gameUrl ? (
                                                            <button className="db-btn-play" onClick={() => setPlayingGame(game)}>
                                                                ▶ Jouer
                                                            </button>
                                                        ) : (
                                                            <button className="db-btn-play db-btn-unavail" disabled>
                                                                🚫 Indisponible
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* ══════════════════════════════════
                            JEUX — Boutique / Catalogue
                        ══════════════════════════════════ */}
                        {activeSection === "jeux" && (
                            <section>
                                <div className="db-section-head">
                                    <div>
                                        <h2 className="db-section-title">🎯 Boutique</h2>
                                        <p className="db-section-sub">Découvrez et ajoutez de nouveaux jeux à votre collection.</p>
                                    </div>
                                </div>

                                <div className="db-catalog-filters">
                                    {genres.map(g => (
                                        <button
                                            key={g}
                                            className={`db-filter-btn ${activeGenre === g ? "active" : ""}`}
                                            onClick={() => setActiveGenre(g)}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>

                                {loading ? (
                                    <div className="db-empty-state">
                                        <div className="db-empty-icon">⏳</div>
                                        <h3>Chargement des jeux...</h3>
                                    </div>
                                ) : filteredCatalog.length === 0 ? (
                                    <div className="db-empty-state">
                                        <div className="db-empty-icon">🎯</div>
                                        <h3>Aucun jeu trouvé</h3>
                                        <p>Essayez un autre genre ou terme de recherche.</p>
                                    </div>
                                ) : (
                                    <div className="db-catalog-grid">
                                        {filteredCatalog.map(game => {
                                            const inCart = cartItems.some(c => c.id === game.id);
                                            const owned  = purchasedGames.some(p => p.id === game.id);
                                            return (
                                                <div key={game.id} className="db-catalog-card">
                                                    <div className="db-catalog-thumb-wrap">
                                                        <img
                                                            src={game.imageUrl || getGameImage(game)}
                                                            alt={game.title}
                                                            className="db-catalog-thumb-img"
                                                            onError={e => { e.target.style.display = "none"; }}
                                                        />
                                                    </div>
                                                    <div className="db-catalog-body">
                                                        <div className="db-catalog-tags">
                                                            <span className="db-catalog-tag">{game.genre}</span>
                                                        </div>
                                                        <div className="db-catalog-title">{game.title}</div>
                                                        <div className="db-catalog-desc">{game.description}</div>
                                                        <div className="db-catalog-footer">
                                                            <span className={`db-catalog-price${game.free ? " free" : ""}`}>
                                                                {game.free ? "Gratuit" : `${parseFloat(game.price || 0).toFixed(2)}€`}
                                                            </span>
                                                            {owned ? (
                                                                <button className="db-btn-add db-btn-owned" disabled>✓ Acheté</button>
                                                            ) : inCart ? (
                                                                <button className="db-btn-add db-btn-incart" onClick={() => nav("panier")}>🛒 Dans le panier</button>
                                                            ) : (
                                                                <button className="db-btn-add" onClick={() => handleAddToCart(game)}>Acheter</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* ══════════════════════════════════
                            PANIER — Cart
                        ══════════════════════════════════ */}
                        {activeSection === "panier" && (
                            <section>
                                <div className="db-section-head">
                                    <div>
                                        <h2 className="db-section-title">🛒 Mon Panier</h2>
                                        <p className="db-section-sub">Vérifiez vos articles et finalisez votre commande.</p>
                                    </div>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="db-empty-state">
                                        <div className="db-empty-icon">🛒</div>
                                        <h3>Votre panier est vide</h3>
                                        <p>Parcourez la boutique et ajoutez des jeux à votre panier.</p>
                                        <button className="db-btn-save" onClick={() => nav("jeux")}>
                                            Voir la boutique
                                        </button>
                                    </div>
                                ) : (
                                    <div className="db-cart-layout">
                                        <div className="db-cart-items">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="db-cart-item">
                                                    <div className="db-cart-item-img">
                                                        <img
                                                            src={item.imageUrl || getGameImage(item)}
                                                            alt={item.title}
                                                            onError={e => { e.target.style.display = "none"; }}
                                                        />
                                                    </div>
                                                    <div className="db-cart-item-info">
                                                        <div className="db-cart-item-title">{item.title}</div>
                                                        <div className="db-cart-item-genre">{item.genre}</div>
                                                    </div>
                                                    <div className="db-cart-item-price">
                                                        {item.price === 0 ? "Gratuit" : `${item.price.toFixed(2)}€`}
                                                    </div>
                                                    <button
                                                        className="db-cart-remove"
                                                        onClick={() => handleRemoveFromCart(item.id)}
                                                        aria-label="Retirer du panier"
                                                    >✕</button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="db-cart-summary">
                                            <h3>Récapitulatif</h3>
                                            {cartItems.map(item => (
                                                <div key={item.id} className="db-cart-summary-row">
                                                    <span>{item.title}</span>
                                                    <span>{item.price === 0 ? "Gratuit" : `${item.price.toFixed(2)}€`}</span>
                                                </div>
                                            ))}
                                            <div className="db-card-divider" />
                                            <div className="db-cart-summary-row">
                                                <span>Sous-total</span>
                                                <span>{cartTotal.toFixed(2)}€</span>
                                            </div>
                                            <div className="db-cart-summary-row">
                                                <span>Taxes (20%)</span>
                                                <span>{(cartTotal * 0.2).toFixed(2)}€</span>
                                            </div>
                                            <div className="db-cart-summary-row total">
                                                <span>Total</span>
                                                <span>{(cartTotal * 1.2).toFixed(2)}€</span>
                                            </div>
                                            <div className="db-promo-input">
                                                <input placeholder="Code promo" />
                                                <button className="db-promo-apply">Appliquer</button>
                                            </div>
                                            <button className="db-checkout-btn" onClick={handleCheckout}>
                                                Passer la commande
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* ══════════════════════════════════
                            MES INFORMATIONS — Profile
                        ══════════════════════════════════ */}
                        {activeSection === "mes-infos" && (
                            <section>
                                <div className="db-section-head">
                                    <div>
                                        <h2 className="db-section-title">👤 Mon Profil</h2>
                                        <p className="db-section-sub">Gérez vos données personnelles et vos moyens de paiement.</p>
                                    </div>
                                </div>

                                <div className="db-panel" style={{ marginBottom: 22 }}>
                                    <div className="db-avatar-section">
                                        <div className="db-avatar-big">{userInitials}</div>
                                        <div className="db-avatar-info">
                                            <h4>{profileData.fullName || profileData.username}</h4>
                                            <p>{profileData.email}</p>
                                            <button className="db-btn-change-avatar">📷 Changer l&apos;avatar</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="db-profile-layout">
                                    <div className="db-panel db-profile-full">
                                        <div className="db-panel-header">
                                            <div className="db-panel-icon">👤</div>
                                            <h3>Informations Personnelles</h3>
                                        </div>
                                        <div className="db-form-grid">
                                            <div className="db-form-field">
                                                <label>Nom complet</label>
                                                <input value={profileData.fullName}
                                                    onChange={e => setProfileData(p => ({ ...p, fullName: e.target.value }))}
                                                    placeholder="Votre nom complet" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Nom d&apos;utilisateur</label>
                                                <input value={profileData.username}
                                                    onChange={e => setProfileData(p => ({ ...p, username: e.target.value }))}
                                                    placeholder="Votre pseudonyme" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Email</label>
                                                <input type="email" value={profileData.email}
                                                    onChange={e => setProfileData(p => ({ ...p, email: e.target.value }))}
                                                    placeholder="votre@email.com" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Téléphone</label>
                                                <input value={profileData.phone}
                                                    onChange={e => setProfileData(p => ({ ...p, phone: e.target.value }))}
                                                    placeholder="+33 6 XX XX XX XX" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Adresse</label>
                                                <input value={profileData.address}
                                                    onChange={e => setProfileData(p => ({ ...p, address: e.target.value }))}
                                                    placeholder="Votre adresse" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Pays</label>
                                                <select value={profileData.country}
                                                    onChange={e => setProfileData(p => ({ ...p, country: e.target.value }))}>
                                                    <option>France</option>
                                                    <option>Belgique</option>
                                                    <option>Suisse</option>
                                                    <option>Canada</option>
                                                    <option>Maroc</option>
                                                    <option>Algérie</option>
                                                    <option>Tunisie</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="db-form-actions">
                                            <button className="db-btn-save">Enregistrer</button>
                                            <button className="db-btn-cancel">Annuler</button>
                                        </div>
                                    </div>

                                    <div className="db-panel db-profile-full">
                                        <div className="db-panel-header">
                                            <div className="db-panel-icon">💳</div>
                                            <h3>Informations de Paiement</h3>
                                        </div>

                                        <div className="db-payment-card-visual">
                                            <div className="db-card-chip" />
                                            <div className="db-card-number">{paymentData.cardNumber || "**** **** **** ****"}</div>
                                            <div className="db-card-meta">
                                                <div className="db-card-meta-group">
                                                    <label>Titulaire</label>
                                                    <span>{paymentData.cardHolder || "VOTRE NOM"}</span>
                                                </div>
                                                <div className="db-card-meta-group">
                                                    <label>Expire</label>
                                                    <span>{paymentData.expiry || "MM/AA"}</span>
                                                </div>
                                                <div className="db-card-brand">VISA</div>
                                            </div>
                                        </div>

                                        <div className="db-form-grid">
                                            <div className="db-form-field">
                                                <label>Nom du titulaire</label>
                                                <input value={paymentData.cardHolder}
                                                    onChange={e => setPaymentData(p => ({ ...p, cardHolder: e.target.value }))}
                                                    placeholder="NOM PRÉNOM" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Numéro de carte</label>
                                                <input value={paymentData.cardNumber}
                                                    onChange={e => setPaymentData(p => ({ ...p, cardNumber: e.target.value }))}
                                                    placeholder="**** **** **** ****" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Date d&apos;expiration</label>
                                                <input value={paymentData.expiry}
                                                    onChange={e => setPaymentData(p => ({ ...p, expiry: e.target.value }))}
                                                    placeholder="MM / AA" />
                                            </div>
                                            <div className="db-form-field">
                                                <label>Adresse de facturation</label>
                                                <input value={paymentData.billing}
                                                    onChange={e => setPaymentData(p => ({ ...p, billing: e.target.value }))}
                                                    placeholder="Adresse de facturation" />
                                            </div>
                                        </div>
                                        <div className="db-form-actions">
                                            <button className="db-btn-save">Mettre à jour</button>
                                            <button className="db-btn-cancel">Annuler</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>
                </main>
            </div>

            {/* ── MOBILE BOTTOM NAV ── */}
            <nav className="db-mobile-bottom-nav">
                {mobileNavItems.map(item => (
                    <button
                        key={item.id}
                        className={`db-bottom-nav-item ${activeSection === item.id ? "active" : ""}`}
                        onClick={() => nav(item.id)}
                    >
                        <div className={`db-bottom-icon-wrap ${activeSection === item.id ? "active" : ""}`}>
                            <span>{item.icon}</span>
                            {item.badge > 0 && <span className="db-bottom-badge">{item.badge}</span>}
                        </div>
                        <span className="db-bottom-label">{item.label}</span>
                    </button>
                ))}
            </nav>

        </div>
    );
}
