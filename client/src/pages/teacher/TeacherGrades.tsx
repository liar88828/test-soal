import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const studentGrades = [
	{ name: 'Alya Rahma', nisn: '1001234567', grade: 85 },
	{ name: 'Bagas Dwi', nisn: '1001234568', grade: 78 },
	{ name: 'Citra Ayu', nisn: '1001234569', grade: 92 },
	{ name: 'Dimas Pratama', nisn: '1001234570', grade: 67 },
	{ name: 'Eka Putri', nisn: '1001234571', grade: 88 },
]

export default function TeacherGrades() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-6xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Input Nilai Siswa</h1>
				<p className='text-muted-foreground'>
					Silakan masukkan atau ubah nilai siswa pada tabel di bawah ini.
				</p>

				<Card>
					<CardContent >
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>No</TableHead>
									<TableHead>Nama</TableHead>
									<TableHead>NISN</TableHead>
									<TableHead>Nilai</TableHead>
									<TableHead>Aksi</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{studentGrades.map((student, index) => (
									<TableRow key={student.nisn}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{student.name}</TableCell>
										<TableCell>{student.nisn}</TableCell>
										<TableCell>
											<Input
												type='number'
												defaultValue={student.grade}
												className='w-24'
												min={0}
												max={100}
											/>
										</TableCell>
										<TableCell>
											<Button
												size='sm'
												variant='outline'>
												Simpan
											</Button>
										</TableCell>
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
