import { Card, CardContent } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

const students = [
	{ name: 'Aulia Rahma', nis: '220301', gender: 'P', class: 'X IPA 1' },
	{ name: 'Rizky Hidayat', nis: '220302', gender: 'L', class: 'X IPA 1' },
	{ name: 'Salsabila N', nis: '220303', gender: 'P', class: 'X IPA 2' },
	{ name: 'Bagus Saputra', nis: '220304', gender: 'L', class: 'X IPA 3' },
]

export default function TeacherStudentPage() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Daftar Siswa</h1>
				<p className='text-muted-foreground'>
					Berikut adalah daftar siswa yang Anda ajar.
				</p>

				<Input
					type='text'
					placeholder='Cari nama siswa...'
					className='max-w-sm'
				/>

				<Card>
					<CardContent className='p-4'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>NIS</TableHead>
									<TableHead>Nama</TableHead>
									<TableHead>Jenis Kelamin</TableHead>
									<TableHead>Kelas</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{students.map((student, idx) => (
									<TableRow key={idx}>
										<TableCell>{student.nis}</TableCell>
										<TableCell>{student.name}</TableCell>
										<TableCell>
											{student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
										</TableCell>
										<TableCell>{student.class}</TableCell>
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
