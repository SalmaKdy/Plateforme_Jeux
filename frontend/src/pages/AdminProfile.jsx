import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAdminProfile, updateAdminProfile, changeAdminPassword } from "../services/adminService";
import "./AdminProfile.css";

const EMPTY_PWD = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function AdminProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem("user")) || {}; }
        catch { return {}; }
    })();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Profile edit state
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ username: "", email: "" });
    const [saving, setSaving] = useState(false);

    // Password change state
    const [pwdOpen, setPwdOpen] = useState(false);
    const [pwdForm, setPwdForm] = useState(EMPTY_PWD);
    const [pwdError, setPwdError] = useState("");
    const [pwdSaving, setPwdSaving] = useState(false);

    // Global feedback
    const [msg, setMsg] = useState({ text: "", type: "success" });

    useEffect(() => {
        getAdminProfile()
            .then(data => {
                setProfile(data);
                setForm({ username: data.username, email: data.email });
            })
            .catch(e => showMsg(e.message || "Erreur de chargement", "error"))
            .finally(() => setLoading(false));
    }, []);

    function showMsg(text, type = "success") {
        setMsg({ text, type });
        setTimeout(() => setMsg({ text: "", type: "success" }), 4000);
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        try {
            const updated = await updateAdminProfile({ username: form.username, email: form.email });
            setProfile(updated);
            const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...storedUser, username: updated.username, email: updated.email }));
            setEditing(false);
            showMsg("Profil mis à jour avec succès");
        } catch (e) {
            showMsg(e.message || "Erreur lors de la mise à jour", "error");
        } finally {
            setSaving(false);
        }
    }

    function validatePwd() {
        if (!pwdForm.currentPassword) return "Le mot de passe actuel est requis";
        if (!pwdForm.newPassword) return "Le nouveau mot de passe est requis";
        if (pwdForm.newPassword.length < 6) return "Le nouveau mot de passe doit contenir au moins 6 caractères";
        if (pwdForm.newPassword !== pwdForm.confirmPassword) return "Les mots de passe ne correspondent pas";
        return "";
    }

    async function handlePasswordChange(e) {
        e.preventDefault();
        const err = validatePwd();
        if (err) { setPwdError(err); return; }
        setPwdError("");
        setPwdSaving(true);
        try {
            await changeAdminPassword(pwdForm.currentPassword, pwdForm.newPassword, pwdForm.confirmPassword);
            setPwdForm(EMPTY_PWD);
            setPwdOpen(false);
            showMsg("Mot de passe mis à jour avec succès");
        } catch (e) {
            setPwdError(e.message || "Erreur lors du changement de mot de passe");
        } finally {
            setPwdSaving(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    const sidebar = (
        <aside className="adm-sidebar">
            <div className="adm-sidebar-profile">
                <div className="adm-sidebar-avatar">
                    {(currentUser.username || "A")[0].toUpperCase()}
                </div>
                <div className="adm-sidebar-info">
                    <span className="adm-sidebar-username">{currentUser.username || "Admin"}</span>
                    <span className="adm-sidebar-role-tag">ADMIN</span>
                </div>
            </div>

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

            <div className="adm-sidebar-footer">
                <button className="adm-logout-btn" onClick={handleLogout}>
                    <span>⏻</span>
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );

    return (
        <div className="adm-wrapper">
            <div className="adm-layout">
                {sidebar}

                <main className="adm-main">
                    <div className="adm-header">
                        <h1 className="adm-title">Mon Profil</h1>
                        <p className="adm-subtitle">Gérez vos informations personnelles d'administrateur</p>
                    </div>

                    {msg.text && (
                        <div className={`adm-msg adm-msg--${msg.type}`}>
                            {msg.type === "success" ? "✓" : "⚠"} {msg.text}
                        </div>
                    )}

                    {loading ? (
                        <div className="adm-state">
                            <div className="adm-spinner" />
                            <span>Chargement du profil...</span>
                        </div>
                    ) : profile ? (
                        <div className="apr-grid">

                            {/* ── Avatar card ── */}
                            <div className="apr-avatar-card">
                                <div className="apr-big-avatar">
                                    {profile.username[0].toUpperCase()}
                                </div>
                                <div className="apr-avatar-glow" />
                                <h2 className="apr-display-name">{profile.username}</h2>
                                <span className="apr-role-badge">🛡️ Administrateur</span>
                                <p className="apr-display-email">{profile.email}</p>
                                <div className="apr-meta-row">
                                    <span className="apr-meta-label">ID compte</span>
                                    <span className="apr-meta-value">#{profile.id}</span>
                                </div>
                            </div>

                            {/* ── Right column ── */}
                            <div className="apr-info-col">

                                {/* Info card */}
                                <div className="adm-card apr-info-card">
                                    <div className="adm-card-header">
                                        <h2 className="adm-card-title">Informations du compte</h2>
                                        {!editing && (
                                            <button className="adm-refresh-btn" onClick={() => setEditing(true)}>
                                                ✏️ Modifier
                                            </button>
                                        )}
                                    </div>

                                    {editing ? (
                                        <form className="apr-form" onSubmit={handleSave}>
                                            <div className="apr-field">
                                                <label className="apr-label">Nom d'utilisateur</label>
                                                <input
                                                    className="apr-input"
                                                    value={form.username}
                                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                                    required
                                                    minLength={3}
                                                />
                                            </div>
                                            <div className="apr-field">
                                                <label className="apr-label">Adresse e-mail</label>
                                                <input
                                                    className="apr-input"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div className="apr-form-actions">
                                                <button type="submit" className="apr-save-btn" disabled={saving}>
                                                    {saving ? "Enregistrement..." : "✓ Enregistrer"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="apr-cancel-btn"
                                                    onClick={() => { setEditing(false); setForm({ username: profile.username, email: profile.email }); }}
                                                    disabled={saving}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="apr-info-rows">
                                            <div className="apr-info-row">
                                                <span className="apr-info-label">Nom d'utilisateur</span>
                                                <span className="apr-info-value">{profile.username}</span>
                                            </div>
                                            <div className="apr-info-row">
                                                <span className="apr-info-label">Adresse e-mail</span>
                                                <span className="apr-info-value">{profile.email}</span>
                                            </div>
                                            <div className="apr-info-row">
                                                <span className="apr-info-label">Rôle</span>
                                                <span className="adm-role-badge adm-role--admin">🛡️ ADMIN</span>
                                            </div>
                                            <div className="apr-info-row">
                                                <span className="apr-info-label">Identifiant</span>
                                                <span className="apr-info-value apr-id-value">#{profile.id}</span>
                                            </div>
                                            <div className="apr-info-row">
                                                <span className="apr-info-label">Mot de passe</span>
                                                <span className="apr-info-value apr-password-mask">••••••••••</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Password change card */}
                                <div className="adm-card apr-pwd-card">
                                    <div className="adm-card-header">
                                        <div className="apr-pwd-header-left">
                                            <span className="apr-pwd-icon">🔑</span>
                                            <h2 className="adm-card-title">Changer le mot de passe</h2>
                                        </div>
                                        {!pwdOpen && (
                                            <button className="apr-pwd-toggle-btn" onClick={() => setPwdOpen(true)}>
                                                Modifier
                                            </button>
                                        )}
                                    </div>

                                    {pwdOpen ? (
                                        <form className="apr-form" onSubmit={handlePasswordChange}>
                                            {pwdError && (
                                                <div className="apr-pwd-error">
                                                    <span>⚠</span> {pwdError}
                                                </div>
                                            )}
                                            <div className="apr-field">
                                                <label className="apr-label">Mot de passe actuel</label>
                                                <input
                                                    className="apr-input"
                                                    type="password"
                                                    value={pwdForm.currentPassword}
                                                    onChange={e => { setPwdForm(f => ({ ...f, currentPassword: e.target.value })); setPwdError(""); }}
                                                    autoComplete="current-password"
                                                    placeholder="Votre mot de passe actuel"
                                                />
                                            </div>
                                            <div className="apr-field">
                                                <label className="apr-label">Nouveau mot de passe</label>
                                                <input
                                                    className="apr-input"
                                                    type="password"
                                                    value={pwdForm.newPassword}
                                                    onChange={e => { setPwdForm(f => ({ ...f, newPassword: e.target.value })); setPwdError(""); }}
                                                    autoComplete="new-password"
                                                    placeholder="Minimum 6 caractères"
                                                />
                                            </div>
                                            <div className="apr-field">
                                                <label className="apr-label">Confirmer le nouveau mot de passe</label>
                                                <input
                                                    className="apr-input"
                                                    type="password"
                                                    value={pwdForm.confirmPassword}
                                                    onChange={e => { setPwdForm(f => ({ ...f, confirmPassword: e.target.value })); setPwdError(""); }}
                                                    autoComplete="new-password"
                                                    placeholder="Répétez le nouveau mot de passe"
                                                />
                                            </div>
                                            <div className="apr-form-actions">
                                                <button type="submit" className="apr-save-btn" disabled={pwdSaving}>
                                                    {pwdSaving ? "Mise à jour..." : "🔒 Mettre à jour"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="apr-cancel-btn"
                                                    onClick={() => { setPwdOpen(false); setPwdForm(EMPTY_PWD); setPwdError(""); }}
                                                    disabled={pwdSaving}
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="apr-pwd-closed">
                                            <p className="apr-pwd-hint">
                                                Cliquez sur "Modifier" pour définir un nouveau mot de passe. Vous devrez fournir votre mot de passe actuel.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Security notice */}
                                <div className="apr-notice">
                                    <span className="apr-notice-icon">🔒</span>
                                    <p className="apr-notice-text">
                                        Ce compte dispose de privilèges d'administration complets.
                                        Gardez vos identifiants en sécurité.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="adm-state adm-state--error">
                            <span className="adm-state-icon">⚠️</span>
                            <p>Impossible de charger le profil.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
