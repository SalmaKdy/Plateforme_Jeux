import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>🎮 GameHuB</h3>
                    <p>
                        Votre plateforme pour découvrir les meilleurs jeux
                        et vivre une expérience gaming immersive.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Navigation</h4>
                    <Link to="/">Accueil</Link>
                    <Link to="/games">Jeux</Link>
                    <Link to="/about">À propos</Link>
                </div>

                <div className="footer-links">
                    <h4>Compte</h4>
                    <Link to="/login">Connexion</Link>
                    <Link to="/register">Inscription</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 GameHuB. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer;