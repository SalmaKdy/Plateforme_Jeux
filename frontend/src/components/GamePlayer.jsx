import { useState, useEffect } from "react";

export default function GamePlayer({ game, onClose }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                if (isFullscreen) setIsFullscreen(false);
                else onClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, isFullscreen]);

    return (
        <div
            className={`gp-overlay${isFullscreen ? " gp-overlay-fs" : ""}`}
            onClick={(e) => { if (!isFullscreen && e.target === e.currentTarget) onClose(); }}
        >
            <div className={`gp-container${isFullscreen ? " gp-fullscreen" : ""}`}>

                {/* Header */}
                <div className="gp-header">
                    <div className="gp-title">
                        <span className="gp-icon">🎮</span>
                        <h2>{game.title}</h2>
                        {game.genre && <span className="gp-genre">{game.genre}</span>}
                    </div>

                    <div className="gp-header-actions">
                        {/* Fullscreen toggle */}
                        <button
                            className={`gp-fs-btn${isFullscreen ? " gp-fs-btn-exit" : ""}`}
                            onClick={() => setIsFullscreen(f => !f)}
                            title={isFullscreen ? "Quitter le plein écran (Échap)" : "Plein écran"}
                        >
                            <span className="gp-fs-icon">{isFullscreen ? "⊡" : "⛶"}</span>
                            <span className="gp-fs-label">
                                {isFullscreen ? "Réduire" : "Plein écran"}
                            </span>
                        </button>

                        {/* Open in new tab */}
                        {game.gameUrl && (
                            <a
                                href={game.gameUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="gp-newtab"
                            >
                                <span>↗</span>
                                <span className="gp-newtab-label">Nouvel onglet</span>
                            </a>
                        )}

                        {/* Close */}
                        <button className="gp-close" onClick={onClose}>
                            <span>✕</span>
                            <span className="gp-close-label">Fermer</span>
                        </button>
                    </div>
                </div>

                {/* Game frame — fills all remaining modal height */}
                <div className="gp-frame-wrap">
                    {game.gameUrl ? (
                        <iframe
                            src={game.gameUrl}
                            title={game.title}
                            className="gp-frame"
                            allowFullScreen
                            allow="fullscreen; autoplay; encrypted-media; gamepad"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
                        />
                    ) : (
                        <div className="gp-unavailable">
                            <div className="gp-unavail-icon">🚫</div>
                            <h3>Jeu non disponible en ligne</h3>
                            <p>Ce jeu ne peut pas être joué directement dans GameHub.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
