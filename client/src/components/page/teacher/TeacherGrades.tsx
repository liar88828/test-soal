import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { studentGrades } from "@/assets/example/student.ts";

export type StudentGradesProps = {
	name: string
	nisn: string
	grade: number
	status: "present" | "absent" | "sick"
}

export default function TeacherGrades() {
	// simple calculations
	const totalStudents = studentGrades.length
	const scores = studentGrades.map((s) => s.grade)
	const averageScore = scores.reduce((sum, val) => sum + val, 0) / totalStudents
	const highestScore = Math.max(...scores)
	const lowestScore = Math.min(...scores)

	// ✅ Status counts
	const totalPresent = studentGrades.filter((s) => s.status === "present").length
	const totalAbsent = studentGrades.filter((s) => s.status === "absent").length
	const totalSick = studentGrades.filter((s) => s.status === "sick").length

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-primary">Input Nilai Siswa</h1>
			<p className="text-muted-foreground">
				Silakan masukkan atau ubah nilai siswa pada tabel di bawah ini.
			</p>

			{/* Statistik Ringkas */ }
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">Total Siswa</p>
						<p className="text-2xl font-bold">{ totalStudents }</p>
					</CardContent>
				</Card>
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">Rata-rata</p>
						<p className="text-2xl font-bold">{ averageScore.toFixed(1) }</p>
					</CardContent>
				</Card>
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">Nilai Tertinggi</p>
						<p className="text-2xl font-bold">{ highestScore }</p>
					</CardContent>
				</Card>
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">Nilai Terendah</p>
						<p className="text-2xl font-bold">{ lowestScore }</p>
					</CardContent>
				</Card>

				{/* ✅ Status Counts */ }
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">✅ Hadir</p>
						<p className="text-2xl font-bold text-green-600">{ totalPresent }</p>
					</CardContent>
				</Card>
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">❌ Absen</p>
						<p className="text-2xl font-bold text-red-600">{ totalAbsent }</p>
					</CardContent>
				</Card>
				<Card className="shadow-sm">
					<CardContent className="p-4 text-center">
						<p className="text-sm text-muted-foreground">🤒 Sakit</p>
						<p className="text-2xl font-bold text-yellow-600">{ totalSick }</p>
					</CardContent>
				</Card>
			</div>

			{/* Tabel Input Nilai */ }
			<ClassInputTable students={ studentGrades } />
		</div>
	)
}

export function ClassInputTable({ students }: { students: StudentGradesProps[] }) {
	const [ search, setSearch ] = useState("")
	const [ studentList, setStudentList ] = useState<StudentGradesProps[]>(students)

	const updateStatus = (nisn: string, status: "present" | "absent" | "sick") => {
		setStudentList((prev) =>
			prev.map((s) => ( s.nisn === nisn ? { ...s, status } : s ))
		)
	}

	const updateGrade = (nisn: string, grade: number) => {
		setStudentList((prev) =>
			prev.map((s) => ( s.nisn === nisn ? { ...s, grade } : s ))
		)
	}

	const onSave = () => {
		console.log("Saving students data:", studentList)
		// TODO: send studentList to API
	}

	return (
		<Card>
			<CardHeader className="flex items-center justify-between gap-4">
				<Input
					className="max-w-md"
					onChange={ (e) => setSearch(e.target.value) }
					placeholder="Search..."
				/>
				<Button onClick={ onSave }>Simpan</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>NISN</TableHead>
							<TableHead>Nilai</TableHead>
							<TableHead>Status</TableHead>
							{/*<TableHead>Aksi</TableHead>*/ }
						</TableRow>
					</TableHeader>
					<TableBody>
						{ studentList
						.filter((item) =>
							item.name.toLowerCase().includes(search.toLowerCase())
						)
						.map((student, index) => (
							<TableRow key={ student.nisn }>
								<TableCell>{ index + 1 }</TableCell>
								<TableCell>{ student.name }</TableCell>
								<TableCell>{ student.nisn }</TableCell>
								<TableCell>
									<Input
										type="number"
										value={ student.grade }
										onChange={ (e) =>
											updateGrade(student.nisn, Number(e.target.value))
										}
										className="w-24"
										min={ 0 }
										max={ 100 }
									/>
								</TableCell>
								<TableCell>
									<Select
										value={ student.status }
										onValueChange={ (value) =>
											updateStatus(student.nisn, value as "present" | "absent" | "sick")
										}
									>
										<SelectTrigger className="w-[120px]">
											<SelectValue placeholder="Pilih status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="present">✅ Hadir</SelectItem>
											<SelectItem value="absent">❌ Absen</SelectItem>
											<SelectItem value="sick">🤒 Sakit</SelectItem>
										</SelectContent>
									</Select>
								</TableCell>
								{/*<TableCell>*/ }
								{/*	<Button size="sm" variant="outline">*/ }
								{/*		Simpan*/ }
								{/*	</Button>*/ }
								{/*</TableCell>*/ }
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
