import "./Register.css";
import bg from "../assets/images/bg.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setServerError("");
        setSuccessMessage("");
    }
    function validateForm() {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Le nom d'utilisateur est obligatoire.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est obligatoire.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide.";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est obligatoire.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Veuillez confirmer le mot de passe.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        if (!formData.acceptedTerms) {
            newErrors.acceptedTerms = "Vous devez accepter les conditions d'utilisation.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    async function handleSubmit(e) {
        e.preventDefault();

        setServerError("");
        setSuccessMessage("");

        if (!validateForm()) return;

        try {
            setLoading(true);

            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            const data = await registerUser(payload);

            setSuccessMessage(data.message || "Inscription réussie.");
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptedTerms: false,
            });
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="register-wrapper">
            <Navbar />

            <div className="register-page">
                <div
                    className="register-bg"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                ></div>

                <div className="register-overlay"></div>

                <div className="register-card">
                    <div className="register-card-header">
                        <p className="register-badge">Nouveau compte</p>
                        <h2>Inscription</h2>
                        <p className="register-subtitle">
                            Crée ton compte pour rejoindre l’univers GameHuB.
                        </p>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Nom d'utilisateur</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Choisir un username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="error-text">{errors.username}</p>}
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Entrer votre email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="input-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Créer un mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <div className="input-group">
                            <label>Confirmer le mot de passe</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmer votre mot de passe"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="error-text">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="register-row">
                            <label className="terms-check">
                                <input
                                    type="checkbox"
                                    name="acceptedTerms"
                                    checked={formData.acceptedTerms}
                                    onChange={handleChange}
                                />
                                <span>
            J’accepte les <a href="#">conditions d’utilisation</a>
        </span>
                            </label>
                            {errors.acceptedTerms && <p className="error-text">{errors.acceptedTerms}</p>}
                        </div>
                        {serverError && <p className="error-text">{serverError}</p>}
                        {successMessage && <p className="success-text">{successMessage}</p>}
                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? "Inscription..." : "Créer un compte"}
                        </button>

                        <p className="login-redirect">
                            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
                        </p>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}