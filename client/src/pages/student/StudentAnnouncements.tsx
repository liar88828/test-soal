import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useLoaderData, useNavigate } from 'react-router-dom'
import React from 'react'
import { Badge } from '@/components/ui/badge'

const announcements = [
	{
		title: 'Ujian Tengah Semester',
		content:
			'UTS akan dilaksanakan pada tanggal 15-20 Agustus 2025. Semua siswa wajib hadir tepat waktu.',
		date: '2025-08-01',
		category: 'Akademik',
	},
	{
		title: 'Perubahan Jadwal Ekstrakurikuler',
		content:
			'Jadwal kegiatan Pramuka dan PMR telah diperbarui. Silakan cek papan pengumuman sekolah.',
		date: '2025-07-28',
		category: 'Kegiatan',
	},
	{
		title: 'Hari Libur Nasional',
		content:
			'Sekolah akan diliburkan pada 17 Agustus 2025 dalam rangka Hari Kemerdekaan RI.',
		date: '2025-07-25',
		category: 'Informasi Umum',
	},
]


export default function StudentAnnouncements() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	const navigate = useNavigate()

	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Pengumuman Siswa</h1>

				<div className='space-y-4'>
					{announcements.map((item, idx) => (
						<Card key={idx}>
							<CardContent className='p-5 space-y-2'>
								<div className='flex justify-between items-center'>
									<h2 className='text-xl font-semibold'>{item.title}</h2>
									<Badge>{item.category}</Badge>
								</div>
								<p className='text-sm text-muted-foreground'>{item.date}</p>
								<p className='text-gray-700 text-sm'>{item.content}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
