import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Input } from "@/components/ui/input.tsx";
import { formatDate } from "@/lib/format-date.tsx";
import { TableLoading } from "@/components/mini/TableComponent.tsx";
import { useRecapGradeWeek } from "@/lib/swr/use-student.tsx";


export function StudentRecapGradesWeek({ idStudent }: { idStudent?: string }) {
	const { data: weekSchedule } = useRecapGradeWeek(idStudent);

	// simpan nilai sementara
	const subjects = [ "Matematika", "Fisika", "Biologi", "Kimia", "Bahasa Indonesia" ]
	const [ editedData, setEditedData ] = useState(weekSchedule)
	const [ selectedSubject, setSelectedSubject ] = useState("Matematika")

	const handleSave = () => {
		try {
			const data = {
				message: "Data disimpan:",
				data: editedData?.filter((d) => d.subject === selectedSubject),
			}

			// console.log(data)

			// alert harus string
			alert(JSON.stringify(data, null, 2))

			// TODO: kirim ke server / backend (misalnya fetch/axios)
		} catch (error) {
			console.error("Gagal menyimpan data:", error)
			alert("Terjadi kesalahan saat menyimpan data")
		}
	}
	if (!weekSchedule) {
		return null
	}
	const getData = (lesson: string) => {
		return editedData?.filter((row) => row.subject === lesson) ?? []
	}
	const dataTable = getData(selectedSubject)
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
						{
							!dataTable ? <TableLoading spanCol={ 4 } /> :
								dataTable.map(({ nilai, date, week }) => {
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
															prev?.map((row) =>
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
