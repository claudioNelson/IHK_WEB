"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
    const [email, setEmail] = useState("");

    const features = [
        {
            icon: "📚",
            title: "17 Lernmodule",
            description: "Von Programmierung über Datenbanken bis Wirtschaft – alle prüfungsrelevanten Themen strukturiert aufbereitet"
        },
        {
            icon: "🎯",
            title: "Prüfungssimulation",
            description: "Übe unter echten Prüfungsbedingungen mit Timer, verschiedenen Fragetypen und realistischer Bewertung"
        },
        {
            icon: "⚔️",
            title: "Match Arena",
            description: "Fordere andere Azubis heraus, sammle ELO-Punkte und lerne spielerisch – Wettbewerb macht Spaß!"
        },
        {
            icon: "🤖",
            title: "KI-Erklärungen",
            description: "Verstehst du eine Antwort nicht? Unsere KI erklärt dir jeden Fehler sofort und verständlich"
        },
        {
            icon: "☁️",
            title: "Cloud-Zertifikate",
            description: "Bereite dich zusätzlich auf AWS, Azure, Google Cloud und SAP Zertifizierungen vor"
        },
        {
            icon: "📊",
            title: "Fortschritt überall",
            description: "Dein Lernfortschritt wird synchronisiert – lerne auf dem Handy, PC oder Tablet weiter"
        }
    ];

    const modules = [
        "Programmierung",
        "Datenbanken",
        "Netzwerke",
        "IT-Sicherheit",
        "Betriebssysteme & Linux",
        "Webentwicklung",
        "Cloud & DevOps",
        "Datenstrukturen & Algorithmen",
        "Projektmanagement",
        "Qualitätsmanagement",
        "Betriebswirtschaft",
        "Rechnungswesen",
        "WISO",
        "Recht",
        "Geschäftsprozesse",
        "IT-Grundlagen & Hardware"
    ];

    const certifications = [
        "AWS Cloud Practitioner",
        "Microsoft Azure Fundamentals",
        "Google Cloud Digital Leader",
        "SAP Application Associate"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Vielen Dank! Wir informieren dich unter ${email}`);
    };

    return (
        <div className="min-h-screen">
            <style jsx global>{`
                :root {
                    --primary: #003d82;
                    --primary-dark: #002554;
                    --accent: #ff6b35;
                    --accent-light: #ff8c5a;
                }
                
                .display-font {
                    font-family: 'Georgia', serif;
                }
                
                .hero-shape {
                    position: absolute;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%);
                    filter: blur(60px);
                    animation: float 8s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }
                
                .card-hover {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                
                .card-hover:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0,61,130,0.15);
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
                    box-shadow: 0 4px 15px rgba(255,107,53,0.3);
                    transition: all 0.3s ease;
                }
                
                .btn-primary:hover {
                    box-shadow: 0 6px 25px rgba(255,107,53,0.4);
                    transform: translateY(-2px);
                }
                
                .btn-secondary {
                    background: var(--primary);
                    transition: all 0.3s ease;
                }
                
                .btn-secondary:hover {
                    background: var(--primary-dark);
                    transform: translateY(-2px);
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-in {
                    animation: slideInUp 0.6s ease-out forwards;
                }
                
                .stagger-1 { animation-delay: 0.1s; opacity: 0; }
                .stagger-2 { animation-delay: 0.2s; opacity: 0; }
                .stagger-3 { animation-delay: 0.3s; opacity: 0; }
                .stagger-4 { animation-delay: 0.4s; opacity: 0; }
                
                .module-badge {
                    background: white;
                    border: 2px solid var(--primary);
                    transition: all 0.3s ease;
                }
                
                .module-badge:hover {
                    background: var(--primary);
                    color: white;
                    transform: scale(1.05);
                }
                
                .cert-badge {
                    background: rgba(255,255,255,0.1);
                    border: 2px solid rgba(255,255,255,0.3);
                    color: white;
                    transition: all 0.3s ease;
                }
                
                .cert-badge:hover {
                    background: white;
                    color: var(--primary);
                    transform: scale(1.05);
                }
                
                .gradient-bg {
                    background: linear-gradient(135deg, #003d82 0%, #0052a8 50%, #ff6b35 100%);
                }
            `}</style>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="hero-shape" style={{ top: '10%', left: '10%' }}></div>
                <div className="hero-shape" style={{ bottom: '10%', right: '10%', animationDelay: '2s' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="animate-in stagger-1">
                            <span className="inline-block px-4 py-2 bg-blue-900 text-white text-sm font-semibold rounded-full mb-6">
                                🎓 Für Fachinformatiker-Azubis & Umschüler
                            </span>
                        </div>

                        <h1 className="display-font text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-in stagger-2">
                            IHK-Prüfung?
                            <br />
                            <span className="bg-gradient-to-r from-blue-900 to-orange-500 bg-clip-text text-transparent">
                                Bestanden!
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-in stagger-3">
                            Die Lern-App für deine Fachinformatiker-Prüfung. 17 Module, 600+ Fragen, Multiplayer-Quiz und KI-Erklärungen – Lernen war nie so effektiv.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in stagger-4">
                            <Link href="/pruefungen" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg text-center">
                                Kostenlos loslegen
                            </Link>
                            <button className="btn-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                                App herunterladen
                            </button>
                        </div>

                        <div className="mt-12 text-sm text-gray-500">
                            ✓ Kostenlos starten  ✓ Für AP1 & AP2  ✓ Anwendungsentwicklung & Systemintegration
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="display-font text-5xl font-bold mb-4">
                            Alles was du brauchst
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Von Azubis für Azubis entwickelt – wir wissen was du für die Prüfung brauchst
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card-hover bg-white p-8 rounded-2xl border-2 border-gray-100">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="display-font text-5xl font-bold mb-4">
                            17 Lernmodule
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Alle prüfungsrelevanten Themen für Fachinformatiker – strukturiert und verständlich
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
                        {modules.map((module, index) => (
                            <span key={index} className="module-badge px-5 py-2.5 rounded-full font-medium text-sm">
                                {module}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Match Arena Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
                                ⚔️ Match Arena
                            </span>
                            <h2 className="display-font text-5xl font-bold mb-6">
                                Lernen mit Spaß
                            </h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Fordere andere Azubis zum Quiz-Duell heraus! Beantworte 10 Fragen schneller und besser als dein Gegner, sammle ELO-Punkte und klettere in der Rangliste.
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="text-orange-500 text-xl">🏆</span>
                                    ELO-Ranking wie bei Schach
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-orange-500 text-xl">🎖️</span>
                                    Badges und Achievements freischalten
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-orange-500 text-xl">📈</span>
                                    Verfolge deinen Fortschritt
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-orange-500 text-xl">👥</span>
                                    Spiele gegen Freunde oder Zufallsgegner
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 text-white">
                            <div className="text-center">
                                <div className="text-6xl mb-4">⚔️</div>
                                <h3 className="text-2xl font-bold mb-2">AsyncMatch</h3>
                                <p className="text-orange-100 mb-6">Asynchrones Quiz-Duell</p>
                                <div className="bg-white/20 rounded-xl p-4 mb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold">Du</div>
                                            <div className="text-3xl font-bold">8/10</div>
                                        </div>
                                        <div className="text-4xl">VS</div>
                                        <div>
                                            <div className="font-bold">Gegner</div>
                                            <div className="text-3xl font-bold">6/10</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl font-bold">🎉 Du hast gewonnen!</div>
                                <div className="text-orange-200">+15 ELO Punkte</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-24 gradient-bg">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="display-font text-5xl font-bold mb-4 text-white">
                            Bonus: Cloud-Zertifikate
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Bereite dich zusätzlich auf gefragte Cloud-Zertifizierungen vor – perfekt für deinen Karrierestart
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                        {certifications.map((cert, index) => (
                            <span key={index} className="cert-badge px-6 py-3 rounded-full font-semibold">
                                {cert}
                            </span>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-white/80 text-lg">
                            Mit echten Prüfungssimulationen unter Zeitdruck
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        <div>
                            <div className="display-font text-5xl font-bold text-blue-900 mb-2">600+</div>
                            <div className="text-gray-600">Prüfungsfragen</div>
                        </div>
                        <div>
                            <div className="display-font text-5xl font-bold text-orange-500 mb-2">17</div>
                            <div className="text-gray-600">Lernmodule</div>
                        </div>
                        <div>
                            <div className="display-font text-5xl font-bold text-blue-900 mb-2">4</div>
                            <div className="text-gray-600">Cloud-Zertifikate</div>
                        </div>
                        <div>
                            <div className="display-font text-5xl font-bold text-orange-500 mb-2">∞</div>
                            <div className="text-gray-600">Quiz-Duelle</div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Pricing Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="display-font text-5xl font-bold mb-4">
                            Wähle deinen Plan
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Starte kostenlos oder schalte alle Features mit Premium frei
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* FREE Plan */}
                        <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 card-hover">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-2">Free</h3>
                                <p className="text-gray-600">Zum Reinschnuppern</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="display-font text-6xl font-bold">0€</span>
                                    <span className="text-gray-500">/Monat</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Für immer kostenlos</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Alle 17 Lernmodule</div>
                                        <div className="text-sm text-gray-600">20 Fragen pro Modul</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">3 Matches pro Tag</div>
                                        <div className="text-sm text-gray-600">Match Arena Zugang</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">KI-Erklärungen</div>
                                        <div className="text-sm text-gray-600">Bei falschen Antworten</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-gray-400 text-sm">✗</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-400">Alle 600+ Fragen</div>
                                        <div className="text-sm text-gray-400">Nur in Premium</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-gray-400 text-sm">✗</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-400">Prüfungssimulation</div>
                                        <div className="text-sm text-gray-400">Nur in Premium</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-gray-400 text-sm">✗</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-400">Cloud-Zertifikate</div>
                                        <div className="text-sm text-gray-400">Nur in Premium</div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/register" className="block w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 transition text-center">
                                Kostenlos starten
                            </Link>
                        </div>

                        {/* PREMIUM Plan */}
                        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-8 border-2 border-blue-800 card-hover relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm">
                                ⭐ Empfohlen
                            </div>

                            <div className="mb-6 mt-4">
                                <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
                                <p className="text-blue-200">Für deinen Prüfungserfolg</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="display-font text-6xl font-bold text-white">9,99€</span>
                                    <span className="text-blue-200">/Monat</span>
                                </div>
                                <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block">
                                    <p className="text-white text-sm">
                                        oder <strong className="text-orange-300">89€/Jahr</strong>
                                        <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 rounded text-xs">Spare 25%</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Alle 600+ Fragen</div>
                                        <div className="text-sm text-blue-200">Komplette Fragendatenbank</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Unbegrenzte Matches</div>
                                        <div className="text-sm text-blue-200">Match Arena ohne Limit</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white flex items-center gap-2">
                                            Prüfungssimulation
                                            <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs">Exklusiv</span>
                                        </div>
                                        <div className="text-sm text-blue-200">Echte Prüfungsbedingungen</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">KI-Tutor Korrektur</div>
                                        <div className="text-sm text-blue-200">Detailliertes Feedback zu jeder Frage</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Cloud-Zertifikate</div>
                                        <div className="text-sm text-blue-200">AWS, Azure, GCP, SAP</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Fortschritt überall</div>
                                        <div className="text-sm text-blue-200">Sync auf allen Geräten</div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full btn-primary text-white py-4 rounded-xl font-semibold mb-3">
                                Premium holen
                            </button>

                            <p className="text-xs text-blue-200 text-center">
                                Jederzeit kündbar • 14 Tage Geld-zurück-Garantie
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="display-font text-5xl font-bold mb-4">
                            So funktioniert's
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            In 3 Schritten zur erfolgreichen IHK-Prüfung
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                1️⃣
                            </div>
                            <h3 className="text-xl font-bold mb-2">Lerne die Module</h3>
                            <p className="text-gray-600">
                                Arbeite dich durch alle 17 Themengebiete. Die KI erklärt dir jeden Fehler sofort.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                2️⃣
                            </div>
                            <h3 className="text-xl font-bold mb-2">Spiele Matches</h3>
                            <p className="text-gray-600">
                                Festige dein Wissen in Quiz-Duellen gegen andere Azubis. Lernen mit Spaßfaktor!
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                3️⃣
                            </div>
                            <h3 className="text-xl font-bold mb-2">Simuliere die Prüfung</h3>
                            <p className="text-gray-600">
                                Teste dich unter echten Prüfungsbedingungen – mit Timer und realistischer Bewertung.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="display-font text-5xl font-bold mb-6 text-white">
                            Bereit für die Prüfung?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Starte jetzt kostenlos und bereite dich optimal auf deine IHK-Prüfung vor
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/pruefungen" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg text-center">
                                Jetzt kostenlos starten
                            </Link>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition">
                                App herunterladen
                            </button>
                        </div>

                        <p className="mt-8 text-sm text-gray-500">
                            Verfügbar für Android • iOS App kommt bald
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-950 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="display-font text-2xl font-bold mb-4">IHK Exam Prep</h3>
                            <p className="text-gray-400">
                                Die Lern-App für Fachinformatiker-Azubis und Umschüler
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">App</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Module</a></li>
                                <li><a href="#" className="hover:text-white transition">Match Arena</a></li>
                                <li><a href="#" className="hover:text-white transition">Zertifikate</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Ressourcen</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Hilfe & FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition">Kontakt</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Rechtliches</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Impressum</a></li>
                                <li><a href="#" className="hover:text-white transition">Datenschutz</a></li>
                                <li><a href="#" className="hover:text-white transition">AGB</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        <p>© 2026 IHK Exam Prep. Mit 💙 für Azubis entwickelt.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}