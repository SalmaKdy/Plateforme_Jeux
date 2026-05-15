import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

const FAQ_ITEMS = [
    {
        question: "Comment réinitialiser mon mot de passe ?",
        answer:
            "Rendez-vous sur la page de connexion et cliquez sur « Mot de passe oublié ». Un email de réinitialisation vous sera envoyé dans les minutes qui suivent. Vérifiez vos spams si nécessaire.",
    },
    {
        question: "Un jeu ne s'affiche pas correctement ?",
        answer:
            "Essayez de rafraîchir la page ou d'ouvrir le jeu dans un nouvel onglet via le bouton dédié du lecteur. Si le problème persiste, précisez le nom du jeu et votre navigateur dans votre message.",
    },
    {
        question: "Problème lors d'un achat ?",
        answer:
            "Vérifiez dans votre dashboard si le jeu figure bien dans « Mes Jeux ». En cas d'erreur de paiement, contactez-nous en indiquant votre email et le nom du jeu concerné.",
    },
    {
        question: "Demande de remboursement ?",
        answer:
            "Les remboursements sont examinés au cas par cas et traités sous 5 à 7 jours ouvrés. Envoyez votre demande via ce formulaire en précisant votre numéro de commande.",
    },
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "", email: "", subject: "", message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [openFaq, setOpenFaq] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    }

    function validate() {
        const errs = {};
        if (!form.name.trim())    errs.name    = "Le nom est requis.";
        if (!form.email.trim())   errs.email   = "L'email est requis.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email invalide.";
        if (!form.subject.trim()) errs.subject = "Le sujet est requis.";
        if (!form.message.trim()) errs.message = "Le message est requis.";
        return errs;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        // TODO: Connect this form to a real backend endpoint.
        //       POST /api/contact  with body { name, email, subject, message }
        //       The backend should save the message and optionally send a notification email.
        setSubmitted(true);
    }

    function handleReset() {
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setSubmitted(false);
    }

    return (
        <div className="contact-wrapper">
            <Navbar />

            <div className="contact-page">

                {/* ── Hero ── */}
                <section className="contact-hero">
                    <span className="contact-hero-badge">SUPPORT &amp; CONTACT</span>
                    <h1 className="contact-hero-title">Contactez-nous</h1>
                    <p className="contact-hero-sub">
                        Besoin d'aide, un retour à partager ou un problème à signaler ?
                        L'équipe GameHub est là pour vous.
                    </p>
                </section>

                {/* ── Info cards ── */}
                <section className="contact-info-row">
                    <div className="contact-info-card">
                        <div className="contact-info-icon">✉️</div>
                        <div className="contact-info-label">Email</div>
                        <div className="contact-info-value">support@gamehub.com</div>
                        <div className="contact-info-desc">Écrivez-nous à tout moment</div>
                    </div>

                    <div className="contact-info-card">
                        <div className="contact-info-icon">⏱️</div>
                        <div className="contact-info-label">Délai de réponse</div>
                        <div className="contact-info-value">24h – 48h</div>
                        <div className="contact-info-desc">Réponse garantie en semaine</div>
                    </div>

                    <div className="contact-info-card">
                        <div className="contact-info-icon">🛡️</div>
                        <div className="contact-info-label">Support</div>
                        <div className="contact-info-value">Jeux · Compte · Achats</div>
                        <div className="contact-info-desc">Assistance complète sur tous sujets</div>
                    </div>
                </section>

                {/* ── Main area: form + sidebar ── */}
                <section className="contact-main">

                    {/* Form panel */}
                    <div className="contact-form-panel">
                        <div className="contact-form-header">
                            <h2>Envoyer un message</h2>
                            <p>Remplissez le formulaire et nous reviendrons vers vous rapidement.</p>
                        </div>

                        {submitted ? (
                            <div className="contact-success">
                                <div className="contact-success-icon">✓</div>
                                <h3>Message préparé !</h3>
                                <p>
                                    Votre message a été préparé avec succès.
                                    L'intégration backend du formulaire de contact n'est pas encore active.
                                </p>
                                <p className="contact-success-note">
                                    Vous pouvez contacter directement l'équipe à{" "}
                                    <strong>support@gamehub.com</strong>.
                                </p>
                                <button className="contact-btn-reset" onClick={handleReset}>
                                    Envoyer un autre message
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="contact-form-row">
                                    <div className="contact-field">
                                        <label htmlFor="name">Nom complet</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Votre nom"
                                            value={form.name}
                                            onChange={handleChange}
                                            className={errors.name ? "input-error" : ""}
                                        />
                                        {errors.name && <span className="contact-error">{errors.name}</span>}
                                    </div>

                                    <div className="contact-field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            className={errors.email ? "input-error" : ""}
                                        />
                                        {errors.email && <span className="contact-error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="subject">Sujet</label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        placeholder="Problème, question, suggestion…"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? "input-error" : ""}
                                    />
                                    {errors.subject && <span className="contact-error">{errors.subject}</span>}
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        placeholder="Décrivez votre demande en détail…"
                                        value={form.message}
                                        onChange={handleChange}
                                        className={errors.message ? "input-error" : ""}
                                    />
                                    {errors.message && <span className="contact-error">{errors.message}</span>}
                                </div>

                                <button type="submit" className="contact-btn-submit">
                                    Envoyer le message ➜
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="contact-sidebar">
                        <div className="contact-sidebar-card">
                            <h3>🎮 À propos du support</h3>
                            <p>
                                Notre équipe traite chaque demande avec soin. Précisez
                                bien votre problème pour une réponse plus rapide.
                            </p>
                        </div>

                        <div className="contact-sidebar-card">
                            <h3>❓ Questions fréquentes</h3>
                            <div className="contact-faq-list">
                                {FAQ_ITEMS.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`faq-item${openFaq === i ? " faq-open" : ""}`}
                                    >
                                        <button
                                            className="faq-question"
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            aria-expanded={openFaq === i}
                                        >
                                            <span>{item.question}</span>
                                            <span className="faq-chevron">
                                                {openFaq === i ? "▲" : "▼"}
                                            </span>
                                        </button>
                                        {openFaq === i && (
                                            <div className="faq-answer">{item.answer}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="contact-sidebar-card contact-sidebar-cta">
                            <h3>🕹️ Explorer les jeux</h3>
                            <p>Découvrez notre catalogue de jeux gratuits et premium.</p>
                            <Link to="/games" className="contact-sidebar-link">
                                Voir le catalogue →
                            </Link>
                        </div>
                    </aside>
                </section>

            </div>

            <Footer />
        </div>
    );
}
