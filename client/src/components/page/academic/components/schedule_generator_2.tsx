import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";

const exampleMapelOptions = [
	{ id: "1", name: "Matematika", jp: 4 },
	{ id: "2", name: "Ilmu Pengetahuan Alam (IPA)", jp: 6 },
	{ id: "3", name: "Bahasa Indonesia", jp: 2 },
	{ id: "4", name: "Bahasa Inggris", jp: 2 },
	{ id: "5", name: "Ilmu Pengetahuan Sosial (IPS)", jp: 3 },
	{ id: "6", name: "Pendidikan Agama", jp: 2 },
	{ id: "7", name: "Pendidikan Jasmani", jp: 1 },
];

const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];
const times = [
	"07:00 - 07:40",
	"07:40 - 08:20",
	"08:20 - 09:00",
	"09:00 - 09:40",
	"09:40 - 10:00", // Break
	"10:00 - 10:40",
	"10:40 - 11:20",
	"11:20 - 12:00",
];

export default function ScheduleGenerator() {
	const [ schedule, setSchedule ] = useState(generateSchedule());

	function generateSchedule() {
		const grid = Array(days.length).fill(null).map(() => Array(times.length).fill(null));

		// Mark break time
		for (let d = 0; d < days.length; d++) {
			grid[d][4] = { name: "Istirahat", isBreak: true };
		}

		// Create pool of subjects based on jp (jam pelajaran)
		const subjectPool = [];
		exampleMapelOptions.forEach(subject => {
			for (let i = 0; i < subject.jp; i++) {
				subjectPool.push({ ...subject });
			}
		});

		// Shuffle the pool
		const shuffled = [ ...subjectPool ].sort(() => Math.random() - 0.5);

		// Fill the schedule
		let subjectIndex = 0;
		for (let d = 0; d < days.length; d++) {
			for (let t = 0; t < times.length; t++) {
				if (grid[d][t] === null && subjectIndex < shuffled.length) {
					grid[d][t] = shuffled[subjectIndex];
					subjectIndex++;
				}
			}
		}

		return grid;
	}

	const handleRegenerate = () => {
		setSchedule(generateSchedule());
	};

	const handleDownload = () => {
		let text = "JADWAL PELAJARAN\n\n";
		text += "Waktu\t\t" + days.join("\t") + "\n";
		text += "=".repeat(80) + "\n";

		times.forEach((time, timeIdx) => {
			text += time + "\t";
			days.forEach((_, dayIdx) => {
				const subject = schedule[dayIdx][timeIdx];
				text += ( subject ? subject.name : "-" ) + "\t";
			});
			text += "\n";
		});

		const blob = new Blob([ text ], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "jadwal-pelajaran.txt";
		a.click();
		URL.revokeObjectURL(url);
	};

	const getSubjectColor = (subjectName: string) => {
		const colors = {
			"Matematika": "bg-blue-100 border-blue-300 text-blue-800",
			"Ilmu Pengetahuan Alam (IPA)": "bg-green-100 border-green-300 text-green-800",
			"Bahasa Indonesia": "bg-purple-100 border-purple-300 text-purple-800",
			"Bahasa Inggris": "bg-pink-100 border-pink-300 text-pink-800",
			"Ilmu Pengetahuan Sosial (IPS)": "bg-yellow-100 border-yellow-300 text-yellow-800",
			"Pendidikan Agama": "bg-indigo-100 border-indigo-300 text-indigo-800",
			"Pendidikan Jasmani": "bg-orange-100 border-orange-300 text-orange-800",
			"Istirahat": "bg-gray-100 border-gray-300 text-gray-600",
		};
		return colors[subjectName] || "bg-gray-100 border-gray-300 text-gray-800";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-7xl mx-auto">
				<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Jadwal Pelajaran</h1>
					<p className="text-gray-600 mb-4">Generator jadwal otomatis berdasarkan jumlah jam pelajaran</p>

					<div className="flex gap-3">
						<button
							onClick={ handleRegenerate }
							className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
						>
							<RefreshCw className="w-4 h-4" />
							Generate Ulang
						</button>
						<button
							onClick={ handleDownload }
							className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
						>
							<Download className="w-4 h-4" />
							Download
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
							<tr className="bg-indigo-600 text-white">
								<th className="border border-indigo-500 p-3 text-left font-semibold min-w-32">Waktu</th>
								{ days.map(day => (
									<th key={ day } className="border border-indigo-500 p-3 text-center font-semibold min-w-40">
										{ day }
									</th>
								)) }
							</tr>
							</thead>
							<tbody>
							{ times.map((time, timeIdx) => (
								<tr key={ timeIdx } className="hover:bg-gray-50">
									<td className="border border-gray-300 p-3 font-medium text-sm text-gray-700 bg-gray-50">
										{ time }
									</td>
									{ days.map((_, dayIdx) => {
										const subject = schedule[dayIdx][timeIdx];
										return (
											<td key={ dayIdx } className="border border-gray-300 p-2">
												{ subject ? (
													<div
														className={ `${ getSubjectColor(subject.name) } border rounded-lg p-2 text-center text-sm font-medium h-full min-h-12 flex items-center justify-center` }
													>
														{ subject.name }
													</div>
												) : (
													<div className="text-center text-gray-400 text-sm">-</div>
												) }
											</td>
										);
									}) }
								</tr>
							)) }
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-6 mt-6">
					<h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Mata Pelajaran</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{ exampleMapelOptions.map(subject => (
							<div key={ subject.id } className={ `${ getSubjectColor(subject.name) } border rounded-lg p-3` }>
								<div className="font-semibold">{ subject.name }</div>
								<div className="text-sm mt-1">{ subject.jp } jam pelajaran/minggu</div>
							</div>
						)) }
					</div>
				</div>
			</div>
		</div>
	);
}
