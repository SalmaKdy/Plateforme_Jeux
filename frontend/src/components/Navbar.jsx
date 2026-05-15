import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    function navClass(path) {
        if (path === "/") return location.pathname === "/" ? "nav-active" : "";
        return location.pathname === path || location.pathname.startsWith(path + "/") ? "nav-active" : "";
    }


    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                🎮 GameHuB
            </div>

            <div className="navbar-center">
                <Link to="/" className={navClass("/")}>Accueil</Link>
                <Link to="/games" className={navClass("/games")}>Jeux</Link>
                <Link to="/about" className={navClass("/about")}>À propos</Link>
                <Link to="/contact" className={navClass("/contact")}>Contact</Link>
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        {user.role === "ADMIN" ? (
                            <Link to="/admin/dashboard">Admin</Link>
                        ) : (
                            <Link to="/dashboard" className={navClass("/dashboard")}>Dashboard</Link>
                        )}
                        <span>{user.email}</span>
                        <button onClick={handleLogout} className="btn-logout">
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={navClass("/login")}>Connexion</Link>
                        <Link to="/register" className={`btn-register${location.pathname === "/register" ? " nav-active" : ""}`}>Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;