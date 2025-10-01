import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { formatDate } from "@/components/page/student/component/format-date.tsx";

{/* Single Big Card */
}

export type WeekSchedule = {
	week: number
	date: string
	subject: string
	nilai: number
}

export const exampleTableWeek: WeekSchedule[] = [
	// Matematika
	{ week: 1, date: "2025-01-06", subject: "Matematika", nilai: 85 },
	{ week: 2, date: "2025-01-13", subject: "Matematika", nilai: 90 },
	{ week: 3, date: "2025-01-20", subject: "Matematika", nilai: 78 },
	{ week: 4, date: "2025-01-27", subject: "Matematika", nilai: 88 },
	{ week: 5, date: "2025-02-03", subject: "Matematika", nilai: 92 },
	{ week: 6, date: "2025-02-10", subject: "Matematika", nilai: 81 },
	{ week: 7, date: "2025-02-17", subject: "Matematika", nilai: 87 },
	{ week: 8, date: "2025-02-24", subject: "Matematika", nilai: 79 },
	{ week: 9, date: "2025-03-03", subject: "Matematika", nilai: 95 },
	{ week: 10, date: "2025-03-10", subject: "Matematika", nilai: 84 },
	{ week: 11, date: "2025-03-17", subject: "Matematika", nilai: 91 },
	{ week: 12, date: "2025-03-24", subject: "Matematika", nilai: 86 },

	// Fisika
	{ week: 1, date: "2025-01-06", subject: "Fisika", nilai: 80 },
	{ week: 2, date: "2025-01-13", subject: "Fisika", nilai: 82 },
	{ week: 3, date: "2025-01-20", subject: "Fisika", nilai: 79 },
	{ week: 4, date: "2025-01-27", subject: "Fisika", nilai: 85 },
	{ week: 5, date: "2025-02-03", subject: "Fisika", nilai: 90 },
	{ week: 6, date: "2025-02-10", subject: "Fisika", nilai: 83 },
	{ week: 7, date: "2025-02-17", subject: "Fisika", nilai: 81 },
	{ week: 8, date: "2025-02-24", subject: "Fisika", nilai: 87 },
	{ week: 9, date: "2025-03-03", subject: "Fisika", nilai: 88 },
	{ week: 10, date: "2025-03-10", subject: "Fisika", nilai: 92 },
	{ week: 11, date: "2025-03-17", subject: "Fisika", nilai: 84 },
	{ week: 12, date: "2025-03-24", subject: "Fisika", nilai: 89 },

	// (Tambahin juga Biologi, Kimia, Bahasa Indonesia biar lengkap)
]

const subjects = [ "Matematika", "Fisika", "Biologi", "Kimia", "Bahasa Indonesia" ]

export function WeekGradesWeek({ weekSchedule }: { weekSchedule: WeekSchedule[] }) {
	// simpan nilai sementara
	const [ editedData, setEditedData ] = useState(weekSchedule)
	const [ selectedSubject, setSelectedSubject ] = useState("Matematika")

	const getData = (lesson: string) => {
		return editedData.filter((row) => row.subject === lesson)
	}

	const dataTable = getData(selectedSubject)

	const handleSave = () => {
		try {
			const data = {
				message: "Data disimpan:",
				data: editedData.filter((d) => d.subject === selectedSubject),
			}

			console.log(data)

			// alert harus string
			alert(JSON.stringify(data, null, 2))

			// TODO: kirim ke server / backend (misalnya fetch/axios)
		} catch (error) {
			console.error("Gagal menyimpan data:", error)
			alert("Terjadi kesalahan saat menyimpan data")
		}
	}

	return (
		<Card className="shadow-md border rounded-2xl">
			<CardHeader className="flex justify-between items-center">
				<div>
					<h2 className="text-xl font-semibold text-primary">
						Nilai { selectedSubject } (12 Minggu)
					</h2>
					<p className="text-sm text-muted-foreground">
						Rekap perkembangan nilai { selectedSubject } per minggu
					</p>
				</div>

				<div className="flex gap-2">
					<Select value={ selectedSubject } onValueChange={ setSelectedSubject }>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Pilih Mata Pelajaran" />
						</SelectTrigger>
						<SelectContent>
							{ subjects.map((subj) => (
								<SelectItem key={ subj } value={ subj }>
									{ subj }
								</SelectItem>
							)) }
						</SelectContent>
					</Select>

					{/* Tombol Save */ }
					<Button onClick={ handleSave } variant="default">
						Save
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[80px] text-center">Minggu</TableHead>
							<TableHead className="text-center">Nilai</TableHead>
							<TableHead className="text-center">Keterangan</TableHead>
							<TableHead className="text-center">Tanggal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ dataTable.map(({ nilai, date, week }) => {
							let keterangan = "Cukup"
							if (nilai >= 90) keterangan = "Sangat Baik"
							else if (nilai >= 80) keterangan = "Baik"
							else if (nilai >= 75) keterangan = "Cukup"
							else keterangan = "Kurang"

							return (
								<TableRow key={ week }>
									<TableCell className="text-center">{ week }</TableCell>
									<TableCell className="text-center font-semibold flex justify-center">

										<Input
											type="number"
											defaultValue={ Number.isFinite(nilai) ? nilai : "" } // fallback ke string kosong
											className="w-16 text-center border rounded px-2 py-1"
											onChange={ (e) => {
												const newValue = e.target.value === "" ? null : parseInt(e.target.value, 10)

												setEditedData((prev) =>
													prev.map((row) =>
														row.week === week && row.subject === selectedSubject
															? { ...row, nilai: newValue ?? 0 } // fallback ke 0 kalau kosong
															: row
													)
												)
											} }
										/>

									</TableCell>
									<TableCell className="text-center">{ keterangan }</TableCell>
									<TableCell className="text-center">{ formatDate(date) }</TableCell>
								</TableRow>
							)
						}) }
					</TableBody>

					{/* FOOTER */ }
					<TableFooter>
						<TableRow>

							<TableCell className="text-center font-bold">Total</TableCell>
							<TableCell className="text-center font-bold">
								{ dataTable.reduce((sum, row) => sum + ( row.nilai || 0 ), 0) / 12 }
							</TableCell>
							<TableCell className="text-center font-bold">
								{ ( () => {
									// Hitung rata-rata
									const total = dataTable.reduce((sum, row) => sum + ( row.nilai || 0 ), 0)
									const avg = total / dataTable.length

									if (avg >= 90) return "Sangat Baik"
									if (avg >= 80) return "Baik"
									if (avg >= 75) return "Cukup"
									return "Kurang"
								} )() }
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	)
}

export function StudentProfileModal() {
	return (
		<div className="min-h-screen bg-muted ">
			<div className="max-w-2xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Profil Siswa</h1>

				<Card>
					<CardContent className=" space-y-4">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Nama Lengkap</Label>
								<Input
									id="name"
									placeholder="Contoh: Rafi Maulana"
									defaultValue="Rafi Maulana"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="nisn">NISN</Label>
								<Input
									id="nisn"
									placeholder="Contoh: 1234567890"
									defaultValue="1234567890"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="kelas">Kelas</Label>
								<Input
									id="kelas"
									placeholder="Contoh: XII IPA 2"
									defaultValue="XII IPA 2"
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Contoh: rafi@email.com"
									defaultValue="rafi@email.com"
								/>
							</div>
						</div>

						<Button className="w-full">Simpan Perubahan</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
