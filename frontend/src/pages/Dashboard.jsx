import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { getUserData, getAllGames, getPurchasedGames, getCartItems } from "../services/api";

/* ── Mock data ─────────────────────────────────────── */
const PURCHASED_GAMES = [
    { id: 1, title: "Cyber Odyssey", genre: "Action / RPG",   price: "49.99€", emoji: "🎮" },
    { id: 2, title: "Shadow Realms", genre: "FPS / Horror",   price: "34.99€", emoji: "👁️" },
    { id: 3, title: "Neon Racer X",  genre: "Racing",         price: "29.99€", emoji: "🏎️" },
    { id: 4, title: "Vortex Wars",   genre: "Strategy",       price: "39.99€", emoji: "⚔️" },
];

const CATALOG_GAMES = [
    { id: 1, title: "Cyber Odyssey",     genre: "Action / RPG",  price: "49.99€", emoji: "🎮", desc: "Un RPG cyberpunk immersif dans un monde ouvert futuriste." },
    { id: 2, title: "Shadow Realms",     genre: "FPS / Horror",  price: "34.99€", emoji: "👁️", desc: "Un FPS horrifique dans des ruines mystérieuses." },
    { id: 3, title: "Neon Racer X",      genre: "Racing",        price: "29.99€", emoji: "🏎️", desc: "Courses à grande vitesse dans des circuits néon." },
    { id: 4, title: "Vortex Wars",       genre: "Strategy",      price: "39.99€", emoji: "⚔️", desc: "Domination tactique sur plusieurs factions." },
    { id: 5, title: "Quantum Breach",    genre: "Stealth",       price: "44.99€", emoji: "🔦", desc: "Infiltration et espionnage dans un futur dystopique." },
    { id: 6, title: "Arena Legends",     genre: "Battle Royale", price: "Free",   emoji: "🏆", desc: "100 joueurs, une seule survie.", free: true },
    { id: 7, title: "Starfall Protocol", genre: "Sci-Fi / RPG",  price: "54.99€", emoji: "🚀", desc: "Explorez la galaxie et forgez votre destin." },
    { id: 8, title: "Iron Citadel",      genre: "Tower Defense", price: "19.99€", emoji: "🏰", desc: "Défendez votre forteresse contre des vagues ennemies." },
];

const CART_ITEMS_INIT = [
    { id: 5, title: "Quantum Breach",    genre: "Stealth",       price: 44.99, qty: 1, emoji: "🔦" },
    { id: 7, title: "Starfall Protocol", genre: "Sci-Fi / RPG",  price: 54.99, qty: 1, emoji: "🚀" },
];

const GENRES = ["Tous", "Action / RPG", "FPS / Horror", "Racing", "Strategy", "Stealth", "Battle Royale", "Sci-Fi / RPG", "Tower Defense"];

/* ── Dashboard Component ───────────────────────────── */
export default function Dashboard() {
    const navigate = useNavigate();

    const user = (() => {
        try { return JSON.parse(localStorage.getItem("user")) || { email: "joueur@gamehub.com" }; }
        catch { return { email: "joueur@gamehub.com" }; }
    })();

    const username = user.username || user.email?.split("@")[0] || "Joueur";

    /* Sidebar state */
    const [activeSection, setActiveSection] = useState("mes-jeux");
    const [profileOpen,   setProfileOpen]   = useState(false);

    /* Cart state */
    const [cartItems, setCartItems] = useState([]);

    /* Catalog state */
    const [catalogGames, setCatalogGames] = useState([]);
    const [purchasedGames, setPurchasedGames] = useState([]);

    /* Catalog filter */
    const [activeGenre, setActiveGenre] = useState("Tous");

    /* Profile form */
    const [profileData, setProfileData] = useState({
        fullName: "Alex Dupont", email: user.email || "", username: username,
        phone: "+33 6 12 34 56 78", address: "12 Rue de la Paix", country: "France",
    });

    /* Payment form */
    const [paymentData, setPaymentData] = useState({
        cardHolder: "ALEX DUPONT", cardNumber: "**** **** **** 4242",
        expiry: "08 / 27", billing: "12 Rue de la Paix, 75001 Paris",
    });

    /* ── Handlers ── */
    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    function navigate2(section) {
        setActiveSection(section);
        if (section !== "profil" && section !== "mes-infos") setProfileOpen(false);
    }

    function handleProfileNav(sub) {
        setProfileOpen(true);
        setActiveSection(sub);
    }

    function changeQty(id, delta) {
        setCartItems(prev =>
            prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        );
    }

    function removeItem(id) {
        setCartItems(prev => prev.filter(i => i.id !== id));
    }

    const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
    const filteredCatalog = activeGenre === "Tous"
        ? catalogGames
        : catalogGames.filter(g => g.genre === activeGenre);

    /* ── Section Labels ── */
    const sectionMeta = {
        "mes-jeux":  { title: "Mes Jeux",                      subtitle: "Vos jeux achetés et votre bibliothèque" },
        "jeux":      { title: "Catalogue",                      subtitle: "Explorez tous les jeux disponibles" },
        "panier":    { title: "Mon Panier",                     subtitle: `${cartItems.length} article(s) dans votre panier` },
        "mes-infos": { title: "Mes Informations Personnelles",  subtitle: "Gérez votre profil et vos paiements" },
    };

    const meta = sectionMeta[activeSection] || sectionMeta["mes-jeux"];

    /* ── Effects ── */
    useEffect(() => {
        // Fetch user data on mount
        const fetchData = async () => {
            try {
                const [userData, allGames, purchased, cart] = await Promise.all([
                    getUserData(username),
                    getAllGames(),
                    getPurchasedGames(username),
                    getCartItems(username)
                ]);

                setProfileData(prev => ({
                    ...prev,
                    email: userData.email,
                    username: userData.username,
                }));

                setCatalogGames(allGames);
                setPurchasedGames(purchased);
                setCartItems(cart.map(item => ({
                    id: item.game.id,
                    title: item.game.title,
                    genre: item.game.genre,
                    price: item.game.free ? 0 : parseFloat(item.game.price.replace('€', '')),
                    qty: item.quantity,
                    emoji: item.game.emoji
                })));

            } catch (error) {
                console.error("Error fetching data:", error);
                // If unauthorized, redirect to login
                if (error.message.includes("401") || error.message.includes("403")) {
                    navigate("/login");
                }
            }
        };

        fetchData();
    }, [username, navigate]);

    /* ════════════════════════════════════════════════════
       RENDER
    ════════════════════════════════════════════════════ */
    return (
        <div className="dashboard-root">

            {/* ── SIDEBAR ──────────────────────────────── */}
            <aside className="db-sidebar">

                {/* Logo */}
                <div className="db-logo">
                    <div className="db-logo-icon">🎮</div>
                    <span className="db-logo-text">Game<span>HuB</span></span>
                </div>

                {/* User mini card */}
                <div className="db-user-card">
                    <div className="db-avatar">👤</div>
                    <div className="db-user-info">
                        <div className="db-username">{username}</div>
                        <span className="db-user-badge">Membre</span>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="db-nav">
                    <span className="db-nav-label">Menu</span>

                    {/* Mes Jeux */}
                    <button
                        className={`db-nav-item ${activeSection === "mes-jeux" ? "active" : ""}`}
                        onClick={() => navigate2("mes-jeux")}
                    >
                        <span className="db-nav-icon">🕹️</span>
                        <span className="db-nav-text">Mes Jeux</span>
                        <span className="db-nav-badge">{purchasedGames.length}</span>
                    </button>

                    {/* Jeux */}
                    <button
                        className={`db-nav-item ${activeSection === "jeux" ? "active" : ""}`}
                        onClick={() => navigate2("jeux")}
                    >
                        <span className="db-nav-icon">🎯</span>
                        <span className="db-nav-text">Jeux</span>
                    </button>

                    {/* Panier */}
                    <button
                        className={`db-nav-item ${activeSection === "panier" ? "active" : ""}`}
                        onClick={() => navigate2("panier")}
                    >
                        <span className="db-nav-icon">🛒</span>
                        <span className="db-nav-text">Mon Panier</span>
                        {cartItems.length > 0 && (
                            <span className="db-nav-badge">{cartItems.length}</span>
                        )}
                    </button>

                    {/* Profil (with submenu) */}
                    <span className="db-nav-label">Compte</span>

                    <button
                        className={`db-nav-item ${activeSection === "mes-infos" ? "active" : ""}`}
                        onClick={() => { setProfileOpen(o => !o); }}
                    >
                        <span className="db-nav-icon">👤</span>
                        <span className="db-nav-text">Profil</span>
                        <span className={`db-nav-chevron ${profileOpen ? "open" : ""}`}>▶</span>
                    </button>

                    <div className={`db-submenu ${profileOpen ? "open" : ""}`}>
                        <button
                            className={`db-submenu-item ${activeSection === "mes-infos" ? "active" : ""}`}
                            onClick={() => handleProfileNav("mes-infos")}
                        >
                            <span>📋</span> Mes Informations
                        </button>
                    </div>
                </nav>

                {/* Logout */}
                <div className="db-logout-wrap">
                    <button className="db-logout-btn" onClick={handleLogout}>
                        <span className="db-nav-icon">🚪</span>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* ── MAIN ─────────────────────────────────── */}
            <main className="db-main">

                {/* Topbar */}
                <div className="db-topbar">
                    <div className="db-topbar-title">
                        <h1>{meta.title}</h1>
                        <p>{meta.subtitle}</p>
                    </div>
                    <div className="db-topbar-actions">
                        <div className="db-topbar-avatar">👤</div>
                    </div>
                </div>

                {/* Content area */}
                <div className="db-content">

                    {/* ── MES JEUX ── */}
                    {activeSection === "mes-jeux" && (
                        <section>
                            <div className="db-section-header">
                                <div className="db-section-badge">Bibliothèque</div>
                                <h2>Mes Jeux Achetés</h2>
                                <p>Accédez à tous vos jeux et lancez votre prochaine aventure.</p>
                            </div>

                            <div className="db-stats-row">
                                <div className="db-stat-card">
                                    <div className="db-stat-icon">🎮</div>
                                    <div className="db-stat-value">{purchasedGames.length}</div>
                                    <div className="db-stat-label">Jeux possédés</div>
                                </div>
                                <div className="db-stat-card">
                                    <div className="db-stat-icon">⭐</div>
                                    <div className="db-stat-value">148h</div>
                                    <div className="db-stat-label">Temps de jeu</div>
                                </div>
                                <div className="db-stat-card">
                                    <div className="db-stat-icon">🏆</div>
                                    <div className="db-stat-value">23</div>
                                    <div className="db-stat-label">Succès</div>
                                </div>
                                <div className="db-stat-card">
                                    <div className="db-stat-icon">💎</div>
                                    <div className="db-stat-value">Niveau 7</div>
                                    <div className="db-stat-label">Progression</div>
                                </div>
                            </div>

                            <div className="db-games-grid">
                                {purchasedGames.map(game => (
                                    <div key={game.id} className="db-game-card">
                                        <div className="db-game-thumb-placeholder">{game.emoji}</div>
                                        <div className="db-game-card-body">
                                            <div className="db-game-genre">{game.genre}</div>
                                            <div className="db-game-title">{game.title}</div>
                                            <div className="db-game-price">{game.price}</div>
                                            <div className="db-game-card-actions">
                                                <button className="db-btn-play">▶ Jouer</button>
                                                <button className="db-btn-icon">⭐</button>
                                                <button className="db-btn-icon">⋯</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── CATALOGUE JEUX ── */}
                    {activeSection === "jeux" && (
                        <section>
                            <div className="db-section-header">
                                <div className="db-section-badge">Catalogue</div>
                                <h2>Tous les Jeux</h2>
                                <p>Découvrez et ajoutez de nouveaux jeux à votre collection.</p>
                            </div>

                            <div className="db-catalog-filters">
                                {GENRES.map(g => (
                                    <button
                                        key={g}
                                        className={`db-filter-btn ${activeGenre === g ? "active" : ""}`}
                                        onClick={() => setActiveGenre(g)}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>

                            <div className="db-catalog-grid">
                                {filteredCatalog.map(game => (
                                    <div key={game.id} className="db-catalog-card">
                                        <div className="db-catalog-thumb-placeholder">{game.emoji}</div>
                                        <div className="db-catalog-body">
                                            <div className="db-catalog-tags">
                                                <span className="db-catalog-tag">{game.genre}</span>
                                            </div>
                                            <div className="db-catalog-title">{game.title}</div>
                                            <div className="db-catalog-desc">{game.description}</div>
                                            <div className="db-catalog-footer">
                                                <span className={`db-catalog-price ${game.free ? "free" : ""}`}>
                                                    {game.price}
                                                </span>
                                                <button
                                                    className="db-btn-add"
                                                    onClick={() => {
                                                        if (!cartItems.find(c => c.id === game.id)) {
                                                            setCartItems(prev => [...prev, {
                                                                id: game.id, title: game.title,
                                                                genre: game.genre,
                                                                price: game.free ? 0 : parseFloat(game.price),
                                                                qty: 1, emoji: game.emoji
                                                            }]);
                                                        }
                                                        navigate2("panier");
                                                    }}
                                                >
                                                    {game.free ? "Obtenir" : "Ajouter"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── PANIER ── */}
                    {activeSection === "panier" && (
                        <section>
                            <div className="db-section-header">
                                <div className="db-section-badge">Panier</div>
                                <h2>Mon Panier</h2>
                                <p>Vérifiez vos articles et finalisez votre commande.</p>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="db-empty-state">
                                    <div className="db-empty-icon">🛒</div>
                                    <h3>Votre panier est vide</h3>
                                    <p>Parcourez le catalogue et ajoutez des jeux à votre panier.</p>
                                    <button className="db-btn-save" onClick={() => navigate2("jeux")}>
                                        Voir le catalogue
                                    </button>
                                </div>
                            ) : (
                                <div className="db-cart-layout">
                                    <div className="db-cart-items">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="db-cart-item">
                                                <div className="db-cart-item-img">{item.emoji}</div>
                                                <div className="db-cart-item-info">
                                                    <div className="db-cart-item-title">{item.title}</div>
                                                    <div className="db-cart-item-genre">{item.genre}</div>
                                                    <div className="db-cart-qty">
                                                        <button className="db-qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                                                        <span className="db-qty-val">{item.qty}</span>
                                                        <button className="db-qty-btn" onClick={() => changeQty(item.id,  1)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="db-cart-item-price">
                                                    {item.price === 0 ? "Gratuit" : `${(item.price * item.qty).toFixed(2)}€`}
                                                </div>
                                                <button className="db-cart-remove" onClick={() => removeItem(item.id)}>✕</button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="db-cart-summary">
                                        <h3>Récapitulatif</h3>

                                        {cartItems.map(item => (
                                            <div key={item.id} className="db-cart-summary-row">
                                                <span>{item.title} ×{item.qty}</span>
                                                <span>
                                                    {item.price === 0 ? "Gratuit" : `${(item.price * item.qty).toFixed(2)}€`}
                                                </span>
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

                                        <button className="db-checkout-btn">
                                            Passer la commande
                                        </button>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* ── MES INFORMATIONS ── */}
                    {activeSection === "mes-infos" && (
                        <section>
                            <div className="db-section-header">
                                <div className="db-section-badge">Profil</div>
                                <h2>Mes Informations Personnelles</h2>
                                <p>Gérez vos données personnelles et vos moyens de paiement.</p>
                            </div>

                            {/* Avatar */}
                            <div className="db-panel" style={{ marginBottom: 22 }}>
                                <div className="db-avatar-section">
                                    <div className="db-avatar-big">👤</div>
                                    <div className="db-avatar-info">
                                        <h4>{profileData.fullName}</h4>
                                        <p>{profileData.email}</p>
                                        <button className="db-btn-change-avatar">📷 Changer l'avatar</button>
                                    </div>
                                </div>
                            </div>

                            <div className="db-profile-layout">

                                {/* Personal Info */}
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
                                            <label>Nom d'utilisateur</label>
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

                                {/* Payment Info */}
                                <div className="db-panel db-profile-full">
                                    <div className="db-panel-header">
                                        <div className="db-panel-icon">💳</div>
                                        <h3>Informations de Paiement</h3>
                                    </div>

                                    {/* Visual card */}
                                    <div className="db-payment-card-visual">
                                        <div className="db-card-chip" />
                                        <div className="db-card-number">{paymentData.cardNumber}</div>
                                        <div className="db-card-meta">
                                            <div className="db-card-meta-group">
                                                <label>Titulaire</label>
                                                <span>{paymentData.cardHolder}</span>
                                            </div>
                                            <div className="db-card-meta-group">
                                                <label>Expire</label>
                                                <span>{paymentData.expiry}</span>
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
                                            <label>Date d'expiration</label>
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

                </div>{/* end db-content */}
            </main>
        </div>
    );
}
