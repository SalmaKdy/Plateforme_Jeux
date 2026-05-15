import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsers, deleteUser } from "../services/adminService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem("user")) || {}; }
        catch { return {}; }
    })();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionMsg, setActionMsg] = useState({ text: "", type: "success" });

    const loadData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (e) {
            setError(e.message || "Erreur de chargement des données");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    function showMsg(text, type = "success") {
        setActionMsg({ text, type });
        setTimeout(() => setActionMsg({ text: "", type: "success" }), 3500);
    }

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    async function handleDelete(user) {
        if (!window.confirm(`Supprimer l'utilisateur "${user.username}" ? Cette action est irréversible.`)) return;
        try {
            await deleteUser(user.id);
            showMsg(`Utilisateur "${user.username}" supprimé`, "success");
            loadData();
        } catch (e) {
            showMsg(e.message, "error");
        }
    }

    return (
        <div className="adm-wrapper">
            <div className="adm-layout">

                {/* ── Sidebar ── */}
                <aside className="adm-sidebar">
                    {/* Profile block at top */}
                    <div className="adm-sidebar-profile">
                        <div className="adm-sidebar-avatar">
                            {(currentUser.username || "A")[0].toUpperCase()}
                        </div>
                        <div className="adm-sidebar-info">
                            <span className="adm-sidebar-username">{currentUser.username || "Admin"}</span>
                            <span className="adm-sidebar-role-tag">ADMIN</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="adm-sidebar-nav">
                        <div
                            className={`adm-nav-item${location.pathname === "/admin/dashboard" ? " adm-nav-item--active" : ""}`}
                            onClick={() => navigate("/admin/dashboard")}
                        >
                            <span>👥</span>
                            <span>Utilisateurs</span>
                        </div>
                        <div
                            className={`adm-nav-item${location.pathname === "/admin/profile" ? " adm-nav-item--active" : ""}`}
                            onClick={() => navigate("/admin/profile")}
                        >
                            <span>👤</span>
                            <span>Profil</span>
                        </div>
                    </nav>

                    {/* Logout at bottom */}
                    <div className="adm-sidebar-footer">
                        <button className="adm-logout-btn" onClick={handleLogout}>
                            <span>⏻</span>
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </aside>

                {/* ── Main content ── */}
                <main className="adm-main">
                    <div className="adm-header">
                        <h1 className="adm-title">Admin Dashboard</h1>
                        <p className="adm-subtitle">Gestion des utilisateurs de la plateforme GameHub</p>
                    </div>

                    {/* Feedback message */}
                    {actionMsg.text && (
                        <div className={`adm-msg adm-msg--${actionMsg.type}`}>
                            {actionMsg.type === "success" ? "✓" : "⚠"} {actionMsg.text}
                        </div>
                    )}

                    {/* Users table */}
                    <div className="adm-card">
                        <div className="adm-card-header">
                            <h2 className="adm-card-title">Gestion des Utilisateurs</h2>
                            <button className="adm-refresh-btn" onClick={loadData} disabled={loading}>
                                {loading ? "..." : "↻ Rafraîchir"}
                            </button>
                        </div>

                        {loading ? (
                            <div className="adm-state">
                                <div className="adm-spinner" />
                                <span>Chargement des utilisateurs...</span>
                            </div>
                        ) : error ? (
                            <div className="adm-state adm-state--error">
                                <span className="adm-state-icon">⚠️</span>
                                <p>{error}</p>
                                <button className="adm-retry-btn" onClick={loadData}>Réessayer</button>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="adm-state">
                                <span className="adm-state-icon">👥</span>
                                <p>Aucun utilisateur trouvé.</p>
                            </div>
                        ) : (
                            <div className="adm-table-wrap">
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Utilisateur</th>
                                            <th>Email</th>
                                            <th>Rôle</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr
                                                key={u.id}
                                                className={u.username === currentUser.username ? "adm-row--self" : ""}
                                            >
                                                <td className="adm-td-id">{u.id}</td>

                                                <td>
                                                    <div className="adm-user-cell">
                                                        <div className="adm-avatar">
                                                            {u.username[0].toUpperCase()}
                                                        </div>
                                                        <span className="adm-username">{u.username}</span>
                                                        {u.username === currentUser.username && (
                                                            <span className="adm-you-badge">vous</span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="adm-td-email">{u.email}</td>

                                                <td>
                                                    <span className={`adm-role-badge adm-role--${u.role?.toLowerCase()}`}>
                                                        {u.role === "ADMIN" ? "🛡️ ADMIN" : "👤 USER"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        className="adm-btn adm-btn--delete"
                                                        onClick={() => handleDelete(u)}
                                                        disabled={u.username === currentUser.username}
                                                        title={u.username === currentUser.username
                                                            ? "Vous ne pouvez pas supprimer votre propre compte"
                                                            : "Supprimer cet utilisateur"}
                                                    >
                                                        🗑 Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
