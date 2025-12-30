"use client";
import Link from "next/link";

interface ExamResultProps {
  onReset: () => void;
  exam: {
    id: string;
    title: string;
    company: string;
    totalPoints: number;
    sections: {
      id: string;
      title: string;
      questions: { id: string; title: string; points: number }[];
    }[];
  };
  completed: Record<string, boolean>;
  answers: Record<string, string>;
}

export default function ExamResult({ exam, completed, answers, onReset }: ExamResultProps) {  const allQuestions = exam.sections.flatMap((s) => s.questions);
  const completedCount = allQuestions.filter((q) => completed[q.id]).length;
  const completedPoints = allQuestions
    .filter((q) => completed[q.id])
    .reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Prüfung abgegeben!
          </h1>
          <p className="text-gray-600">
            {exam.title} - {exam.company}
          </p>
        </div>

        {/* Zusammenfassung */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Zusammenfassung
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-800">Bearbeitete Aufgaben</span>
              <span className="text-blue-800 font-bold text-xl">
                {completedCount} / {allQuestions.length}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-800">Bearbeitete Punkte</span>
              <span className="text-green-800 font-bold text-xl">
                {completedPoints} / {exam.totalPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Details pro Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Details
          </h2>

          <div className="space-y-3">
            {exam.sections.map((section, index) => {
              const sectionCompleted = section.questions.filter((q) => completed[q.id]).length;
              const sectionTotal = section.questions.length;
              const sectionPoints = section.questions
                .filter((q) => completed[q.id])
                .reduce((sum, q) => sum + q.points, 0);
              const sectionTotalPoints = section.questions.reduce((sum, q) => sum + q.points, 0);

              return (
                <div key={section.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-gray-800">
                        HS{index + 1}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {sectionCompleted} von {sectionTotal} Aufgaben
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${sectionCompleted === sectionTotal ? "text-green-600" : "text-amber-600"}`}>
                        {sectionPoints} / {sectionTotalPoints} Punkte
                      </span>
                      {sectionCompleted === sectionTotal && (
                        <p className="text-sm text-green-600">✓ Vollständig</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aktionen */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition text-center"
            >
              ← Zur Übersicht
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              🖨️ Drucken
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition"
          >
            🔄 Prüfung zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}