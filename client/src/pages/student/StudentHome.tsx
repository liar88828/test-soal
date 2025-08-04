import { studentHomeLoader, studentProfileLoader } from '@/action/student'
import ProfilePage from '@/components/ProfilePage'
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

export default function StudentHome() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	const navigate = useNavigate()

	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Halo, Siswa!</h1>
				<p className='text-muted-foreground'>
					Selamat datang di halaman utama siswa. Temukan informasi penting
					terkait profilmu, jadwal belajar, dan pengumuman terbaru.
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					<Card>
						<CardHeader>
							<CardTitle>📘 Profil</CardTitle>
							<CardDescription>Lihat dan ubah data pribadimu.</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button
								variant='outline'
								onClick={() => navigate('/student/profile')}>
								Lihat Profil
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>📅 Jadwal</CardTitle>
							<CardDescription>Cek jadwal pelajaran terbaru.</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button
								variant='outline'
								onClick={() => navigate('/student/schedule')}>
								Lihat Jadwal
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>📢 Pengumuman</CardTitle>
							<CardDescription>
								Lihat informasi dari guru & sekolah.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button
								variant='outline'
								onClick={() => navigate('/student/announcements')}>
								Lihat Pengumuman
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	)
}
