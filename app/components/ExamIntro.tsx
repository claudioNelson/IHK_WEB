"use client";

import { Exam } from "@/data/exam-types";

interface ExamIntroProps {
    exam: Exam;
    onStart: () => void;
}

export default function ExamIntro({ exam, onStart }: ExamIntroProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {exam.title}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {exam.company} • {exam.season} {exam.year}
                    </p>
                </div>

                {/* Prüfungsinfos */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-blue-800 mb-2">📋 Prüfungsinfos</h2>
                    <ul className="text-blue-700 space-y-1 text-sm">
                        <li>⏱️ Bearbeitungszeit: <strong>{exam.duration} Minuten</strong></li>
                        <li>📝 Maximale Punktzahl: <strong>{exam.totalPoints} Punkte</strong></li>
                        <li>📚 Handlungsschritte: <strong>{exam.sections.length}</strong> (wähle 4 von 5)</li>
                    </ul>
                </div>

                {/* Hinweise */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-amber-800 mb-2">⚠️ Wichtige Hinweise</h2>
                    <ul className="text-amber-700 space-y-2 text-sm">
                        <li>
                            <strong>Keine Hilfsmittel:</strong> Bearbeite die Prüfung ohne Google, ChatGPT oder andere Hilfen - nur so lernst du wirklich!
                        </li>
                        <li>
                            <strong>Echte Prüfungsbedingungen:</strong> Der Timer läuft. Versuche, die Zeit einzuhalten.
                        </li>
                        <li>
                            <strong>Zwischenspeicherung:</strong> Deine Antworten werden automatisch gespeichert.
                        </li>
                    </ul>
                </div>

                {/* Diagramm-Tool Hinweis */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
                    <h2 className="font-semibold text-purple-800 mb-2">🎨 Diagramm-Tool</h2>
                    <p className="text-purple-700 text-sm">
                        Einige Aufgaben erfordern das Zeichnen von Diagrammen (UML, ER, etc.). 
                        Mach dich vorher mit dem Tool vertraut - du kannst es jederzeit testen, 
                        ohne dass es gespeichert wird.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <a 
                        href="/"
                        className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition"
                    >
                        ← Zurück
                    </a>
                    <button
                        onClick={onStart}
                        className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        🚀 Prüfung starten
                    </button>
                </div>
            </div>
        </div>
    );
}