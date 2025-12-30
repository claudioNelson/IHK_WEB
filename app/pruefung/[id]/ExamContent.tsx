"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DiagramTool from "@/app/components/DiagramTool";
import FillBlanksSQL from "@/app/components/FillBlanksSQL";
import ExamTimer from "@/app/components/ExamTimer";
import { Exam } from "@/data/exam-types";
import SubmitExam from "@/app/components/SubmitExam";
import ExamResult from "@/app/components/ExamResult";
import ExamIntro from "@/app/components/ExamIntro";

interface ExamContentProps {
  exam: Exam;
}

export default function ExamContent({ exam }: ExamContentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  // Laden aus localStorage
  // Laden aus localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`exam-${exam.id}-answers`);
    const savedCompleted = localStorage.getItem(`exam-${exam.id}-completed`);
    const savedSubmitted = localStorage.getItem(`exam-${exam.id}-submitted`);
    const savedStarted = localStorage.getItem(`exam-${exam.id}-started`);
    if (savedStarted) {
      setStarted(JSON.parse(savedStarted));
    }
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
    if (savedSubmitted) {
      setSubmitted(JSON.parse(savedSubmitted));
    }
    setLoaded(true);
  }, [exam.id]);

  // Speichern in localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(`exam-${exam.id}-answers`, JSON.stringify(answers));
      localStorage.setItem(`exam-${exam.id}-completed`, JSON.stringify(completed));
    }
  }, [answers, completed, exam.id, loaded]);

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const toggleCompleted = (questionId: string) => {
    setCompleted((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleStart = () => {
    setStarted(true);
    localStorage.setItem(`exam-${exam.id}-started`, JSON.stringify(true));
  };

  const clearAllAnswers = () => {
    if (confirm("Alle Antworten und Markierungen löschen?")) {
      setAnswers({});
      setCompleted({});
      localStorage.removeItem(`exam-${exam.id}-answers`);
      localStorage.removeItem(`exam-${exam.id}-completed`);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    localStorage.setItem(`exam-${exam.id}-submitted`, JSON.stringify(true));
  };

  const handleReset = () => {
    if (confirm("Prüfung wirklich zurücksetzen? Alle Antworten werden gelöscht.")) {
      setAnswers({});
      setCompleted({});
      setSubmitted(false);
      localStorage.removeItem(`exam-${exam.id}-answers`);
      localStorage.removeItem(`exam-${exam.id}-completed`);
      localStorage.removeItem(`exam-${exam.id}-submitted`);
    }
  };

  const getProgress = () => {
    const allQuestions = exam.sections.flatMap((s) => s.questions);
    const completedCount = allQuestions.filter((q) => completed[q.id]).length;
    return { completed: completedCount, total: allQuestions.length };
  };

  const progress = getProgress();

  if (!loaded) {
    return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  }

  if (!started) {
    return <ExamIntro exam={exam} onStart={handleStart} />;
  }

  if (submitted) {
    return <ExamResult exam={exam} completed={completed} answers={answers} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <Link href="/pruefungen" className="text-blue-600 hover:underline text-sm">
              ← Zurück zur Übersicht
            </Link>
            <button
              onClick={clearAllAnswers}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              🗑️ Alles löschen
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {exam.title} - {exam.company}
          </h1>
          <p className="text-gray-600 mt-2">
            {exam.duration} Minuten • {exam.totalPoints} Punkte
          </p>
        </div>

        {/* Timer, Navigation & Fortschritt */}
        <div className="mb-6 sticky top-4 z-10 space-y-2">
          <ExamTimer
            durationMinutes={exam.duration}
            onTimeUp={() => alert("Die Prüfungszeit ist abgelaufen!")}
          />

          {/* Navigation */}
          <div className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-gray-500 mr-2">Gehe zu:</span>
            {exam.sections.map((section, index) => {
              const sectionQuestions = section.questions;
              const sectionCompleted = sectionQuestions.every((q) => completed[q.id]);
              const sectionPartial = sectionQuestions.some((q) => completed[q.id]);

              return (

                <a key={section.id}
                  href={`#${section.id}`}
                  className={`px-3 py-1 rounded text-sm font-medium transition whitespace-nowrap ${sectionCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : sectionPartial
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {sectionCompleted && "✓ "}HS{index + 1}
                </a>
              );
            })}
          </div>

          {/* Fortschritt */}
          <div className="bg-white border rounded-lg px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                📝 {progress.completed} von {progress.total} Aufgaben erledigt
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                />
              </div>
            </div>
            {progress.completed === progress.total && (
              <span className="text-green-600 text-sm font-medium">✓ Vollständig</span>
            )}
          </div>
        </div>

        {/* Fragen */}
        {exam.sections.map((section) => (
          <div key={section.id} id={section.id} className="bg-white rounded-lg shadow-md p-6 mb-6 scroll-mt-40">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h2>

            {section.questions.map((question) => (
              <div
                key={question.id}
                className={`border-t pt-4 ${completed[question.id] ? "bg-green-50 -mx-6 px-6 pb-4" : ""}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {completed[question.id] && (
                      <span className="text-green-600">✓</span>
                    )}
                    <h3 className={`font-medium ${completed[question.id] ? "text-green-800" : "text-gray-800"}`}>
                      {question.title}
                    </h3>
                  </div>
                  {question.type !== "info" && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {question.points} Punkte
                    </span>
                  )}
                </div>

                <pre className="text-gray-700 whitespace-pre-wrap font-mono text-sm leading-relaxed bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  {question.description}
                </pre>

                {/* Bild */}
                {question.image && (
                  <img
                    src={question.image}
                    alt="Grafik zur Aufgabe"
                    className="mt-4 rounded-lg"
                  />
                )}

                {/* Hinweis */}
                {question.hint && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <p className="text-amber-800 text-sm">
                      💡 Hinweis: {question.hint}
                    </p>
                  </div>
                )}

                {/* Antwort-Feld (nicht bei Info-Blöcken) */}
                {question.type !== "info" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ihre Antwort:
                    </label>
                    {question.type === "diagram" ? (
                      <DiagramTool onSave={(data) => updateAnswer(question.id, data)} />
                    ) : question.type === "fillBlanks" ? (
                      <FillBlanksSQL questionId={question.id} />
                    ) : (
                      <textarea
                        className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-white text-black placeholder-gray-400"
                        placeholder="Antwort hier eingeben..."
                        value={answers[question.id] || ""}
                        onChange={(e) => updateAnswer(question.id, e.target.value)}
                      />
                    )}
                  </div>
                )}

                {/* Fertig Button (nicht bei Info-Blöcken) */}
                {question.type !== "info" && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => toggleCompleted(question.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${completed[question.id]
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {completed[question.id] ? "✓ Erledigt" : "Als erledigt markieren"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Abgabe */}
        <SubmitExam
          sections={exam.sections}
          completed={completed}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}