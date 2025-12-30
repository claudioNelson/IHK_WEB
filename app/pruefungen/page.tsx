import Link from "next/link";
import { examList } from "@/data/exams";

export default function Home() {
  // Prüfungen nach Typ trennen
  const aeExams = examList.filter((exam) => exam.id.startsWith("ae-"));
  const siExams = examList.filter((exam) => exam.id.startsWith("si-"));

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700">
            IHK Prüfungssimulation
          </h1>
          <p className="mt-4 text-gray-600">
            Fachinformatiker – Anwendungsentwicklung & Systemintegration
          </p>
        </div>

        {/* Anwendungsentwicklung */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💻 Anwendungsentwicklung
          </h2>
          <div className="grid gap-4">
            {aeExams.map((exam) => (
              <Link
                key={exam.id}
                href={`/pruefung/${exam.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  📝 {exam.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {exam.company} • {exam.season} {exam.year} • {exam.duration} Minuten
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Systemintegration */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🖧 Systemintegration
          </h2>
          <div className="grid gap-4">
            {siExams.map((exam) => (
              <Link
                key={exam.id}
                href={`/pruefung/${exam.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 border-green-500"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  📝 {exam.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {exam.company} • {exam.season} {exam.year} • {exam.duration} Minuten
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}