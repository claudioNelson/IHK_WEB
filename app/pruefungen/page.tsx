"use client";

import Link from "next/link";
import { examList } from "@/data/exams";

export default function PruefungenPage() {
  // Prüfungen nach Typ trennen
  const aeExams = examList.filter((exam) => exam.id.startsWith("ae-"));
  const siExams = examList.filter((exam) => exam.id.startsWith("si-"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <style jsx>{`
        .display-font {
          font-family: 'Georgia', serif;
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,61,130,0.15);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #003d82 0%, #ff6b35 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-back {
          transition: all 0.3s ease;
        }
        
        .btn-back:hover {
          transform: translateX(-5px);
        }
      `}</style>

      {/* Header */}
      <header className="py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="btn-back flex items-center gap-2 text-gray-600 hover:text-blue-900">
            <span className="text-xl">←</span>
            <span className="font-medium">Zurück zur Startseite</span>
          </Link>
          <div className="text-sm text-gray-500">
            {examList.length} Prüfungen verfügbar
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-blue-900 text-white text-sm font-semibold rounded-full mb-6">
            Prüfungssimulation
          </span>
          <h1 className="display-font text-5xl md:text-6xl font-bold mb-4">
            Wähle deine{" "}
            <span className="gradient-text">Prüfung</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Realistische IHK-Prüfungssimulationen mit Timer, verschiedenen Aufgabentypen und sofortigem Feedback
          </p>
        </div>
      </section>

      {/* Exam Cards */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Anwendungsentwicklung */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                💻
              </div>
              <div>
                <h2 className="display-font text-3xl font-bold text-gray-800">
                  Anwendungsentwicklung
                </h2>
                <p className="text-gray-500">{aeExams.length} Prüfungen</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aeExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/pruefung/${exam.id}`}
                  className="card-hover block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {exam.season} {exam.year}
                    </span>
                    <span className="text-2xl">📝</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {exam.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {exam.company}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        ⏱️ {exam.duration} Min
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {exam.totalPoints} Pkt
                      </span>
                    </div>
                    <span className="text-blue-600 font-medium text-sm">
                      Starten →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Systemintegration */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🖧
              </div>
              <div>
                <h2 className="display-font text-3xl font-bold text-gray-800">
                  Systemintegration
                </h2>
                <p className="text-gray-500">{siExams.length} Prüfungen</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/pruefung/${exam.id}`}
                  className="card-hover block bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {exam.season} {exam.year}
                    </span>
                    <span className="text-2xl">📝</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {exam.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {exam.company}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        ⏱️ {exam.duration} Min
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {exam.totalPoints} Pkt
                      </span>
                    </div>
                    <span className="text-green-600 font-medium text-sm">
                      Starten →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>
            ✓ Echte Prüfungsbedingungen  ✓ 90 Minuten Timer  ✓ Verschiedene Aufgabentypen  ✓ Sofortiges Feedback
          </p>
        </div>
      </section>
    </div>
  );
}