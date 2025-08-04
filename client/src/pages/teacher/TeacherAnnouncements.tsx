import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const announcements = [
	{
		title: 'Pengumpulan Nilai UTS',
		content:
			'Harap seluruh guru mengumpulkan nilai UTS paling lambat tanggal 10 Agustus 2025.',
		date: '2025-08-01',
		category: 'Akademik',
	},
	{
		title: 'Rapat Guru',
		content:
			'Rapat dewan guru akan dilaksanakan pada hari Jumat pukul 13.00 WIB di ruang rapat utama.',
		date: '2025-07-29',
		category: 'Informasi',
	},
]

export default function TeacherAnnouncements() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Kelola Pengumuman</h1>
				<p className='text-muted-foreground'>
					Tambahkan atau hapus pengumuman untuk siswa atau guru lainnya.
				</p>

				{/* Form Tambah Pengumuman */}
				<Card>
					<CardContent className='p-6 space-y-4'>
						<h2 className='text-xl font-semibold'>Buat Pengumuman Baru</h2>
						<div className='grid gap-2'>
							<Input placeholder='Judul Pengumuman' />
							<Textarea
								placeholder='Isi pengumuman...'
								rows={4}
							/>
							<Button>Kirim</Button>
						</div>
					</CardContent>
				</Card>

				{/* List Pengumuman */}
				<div className='space-y-4'>
					{announcements.map((item, idx) => (
						<Card key={idx}>
							<CardContent className='p-5 space-y-2'>
								<div className='flex justify-between items-center'>
									<h2 className='text-lg font-semibold'>{item.title}</h2>
									<Badge>{item.category}</Badge>
								</div>
								<p className='text-sm text-muted-foreground'>{item.date}</p>
								<p className='text-sm text-gray-800'>{item.content}</p>
								<div className='text-right'>
									<Button
										variant='destructive'
										size='sm'>
										Hapus
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
