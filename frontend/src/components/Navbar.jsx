import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                🎮 GameHuB
            </div>

            <div className="navbar-center">
                <Link to="/">Accueil</Link>
                <Link to="/games">Jeux</Link>
                <Link to="/about">À propos</Link>
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <span>{user.email}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register" className="btn-register">Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;