import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'

const students = [
	{ name: 'Alya Rahma', nisn: '1001234567', gender: 'Perempuan' },
	{ name: 'Bagas Dwi', nisn: '1001234568', gender: 'Laki-laki' },
	{ name: 'Citra Ayu', nisn: '1001234569', gender: 'Perempuan' },
	{ name: 'Dimas Pratama', nisn: '1001234570', gender: 'Laki-laki' },
	{ name: 'Eka Putri', nisn: '1001234571', gender: 'Perempuan' },
]

export default function TeacherClassDetail() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>
					Detail Kelas: X IPA 1
				</h1>
				<p className='text-muted-foreground'>Daftar siswa dalam kelas ini:</p>

				<Card>
					<CardContent >
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>No</TableHead>
									<TableHead>Nama</TableHead>
									<TableHead>NISN</TableHead>
									<TableHead>Jenis Kelamin</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{students.map((student, index) => (
									<TableRow key={student.nisn}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{student.name}</TableCell>
										<TableCell>{student.nisn}</TableCell>
										<TableCell>{student.gender}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
