import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'

const reportData = [
	{ subject: 'Matematika', grade: 88, semester: 'Ganjil' },
	{ subject: 'Bahasa Indonesia', grade: 92, semester: 'Ganjil' },
	{ subject: 'Fisika', grade: 79, semester: 'Ganjil' },
	{ subject: 'Kimia', grade: 85, semester: 'Ganjil' },
	{ subject: 'Sejarah', grade: 90, semester: 'Ganjil' },
]

export default function StudentReport() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Laporan Nilai</h1>
				<p className='text-muted-foreground'>
					Berikut adalah laporan nilai Anda selama semester ini.
				</p>

				<Card>
					<CardContent className='p-4'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Mata Pelajaran</TableHead>
									<TableHead>Semester</TableHead>
									<TableHead className='text-right'>Nilai</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{reportData.map((item, idx) => (
									<TableRow key={idx}>
										<TableCell>{item.subject}</TableCell>
										<TableCell>{item.semester}</TableCell>
										<TableCell className='text-right font-semibold'>
											{item.grade}
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
