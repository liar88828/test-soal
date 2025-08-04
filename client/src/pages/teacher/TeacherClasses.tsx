import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const classList = [
	{ name: 'X IPA 1', students: 32 },
	{ name: 'X IPA 2', students: 30 },
	{ name: 'XI IPA 1', students: 29 },
	{ name: 'XII IPA 2', students: 28 },
]

export default function TeacherClasses() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Manajemen Kelas</h1>
				<p className='text-muted-foreground'>
					Berikut adalah daftar kelas yang Anda ampu. Klik "Lihat Detail" untuk
					melihat daftar siswa atau mengelola nilai.
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{classList.map((item, idx) => (
						<Card key={idx}>
							<CardContent className='p-5 space-y-3'>
								<h2 className='text-xl font-semibold'>{item.name}</h2>
								<p className='text-sm text-muted-foreground'>
									Jumlah siswa: {item.students}
								</p>
								<Button
									asChild
									variant='outline'>
									<Link
										to={`/teacher/classes/${item.name
											.replace(/\s+/g, '-')
											.toLowerCase()}`}>
										Lihat Detail
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
