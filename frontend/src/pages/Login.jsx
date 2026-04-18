import "./Login.css";
import bg from "../assets/images/bg.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useEffect, useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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

        if (!formData.email.trim()) {
            newErrors.email = "L'email est obligatoire.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide.";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est obligatoire.";
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

            const data = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            setSuccessMessage(data.message || "Connexion réussie.");

            if (formData.rememberMe) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);
        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");

        if (savedEmail !== null) {
            setFormData((prev) => ({
                email: savedEmail,
                password: prev.password,
                rememberMe: true,
            }));
        }
    }, []);
    return (
        <div className="login-wrapper">
            <Navbar />

            <div className="login-page">
                <div
                    className="login-bg"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                ></div>

                <div className="login-overlay"></div>

                <div className="login-card">
                    <div className="login-card-header">
                        <p className="login-badge">Espace membre</p>
                        <h2>Connexion</h2>
                        <p className="login-subtitle">
                            Connecte-toi à ton compte pour accéder à ton univers GameHuB.
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
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
                                placeholder="Entrer votre mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <div className="login-row">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span>Se souvenir de moi</span>
                            </label>

                            <a href="#" className="forgot-link">
                                Mot de passe oublié ?
                            </a>
                        </div>

                        {serverError && <p className="error-text">{serverError}</p>}
                        {successMessage && <p className="success-text">{successMessage}</p>}

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="login-extra">
                <h3>Pourquoi rejoindre GameHuB ?</h3>

                <div className="extra-features">
                    <div className="feature-box">
                        <h4>Découvre de nouveaux jeux</h4>
                        <p>Explore des univers variés et trouve rapidement ce qui te plaît.</p>
                    </div>

                    <div className="feature-box">
                        <h4>Suis tes favoris</h4>
                        <p>Retrouve facilement les jeux que tu aimes et reste informé des nouveautés.</p>
                    </div>

                    <div className="feature-box">
                        <h4>Rejoins la communauté</h4>
                        <p>Échange avec d’autres joueurs et profite de recommandations personnalisées.</p>
                    </div>
                </div>
            </div>

            <div className="login-cta">
                <div className="cta-text">
                    <h3>Prêt à commencer ton aventure ?</h3>
                    <p>Rejoins GameHuB et découvre un monde de jeux sans limites.</p>
                </div>

                <Link to="/register" className="cta-btn">
                    Créer un compte
                </Link>
            </div>

            <Footer />
        </div>
    );
}