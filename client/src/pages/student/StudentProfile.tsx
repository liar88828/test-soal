import { studentProfileLoader } from '@/action/student'
import ProfilePage from '@/components/ProfilePage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import { useLoaderData } from 'react-router-dom'

export default function StudentProfile() {
	const { user } = useLoaderData<typeof studentProfileLoader>()
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-2xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Profil Siswa</h1>

				<Card>
					<CardContent className='p-6 space-y-6'>
						<div className='flex items-center space-x-4'>
							<Avatar className='h-20 w-20'>
								<AvatarImage
									src='/avatar-siswa.png'
									alt='Foto Siswa'
								/>
								<AvatarFallback>RM</AvatarFallback>
							</Avatar>
							<div>
								<h2 className='text-xl font-semibold'>Rafi Maulana</h2>
								<p className='text-muted-foreground'>Siswa Aktif</p>
							</div>
						</div>

						<div className='space-y-2 text-sm text-gray-700'>
							<div className='flex justify-between border-b pb-2'>
								<span className='font-medium'>NISN</span>
								<span>1234567890</span>
							</div>
							<div className='flex justify-between border-b pb-2'>
								<span className='font-medium'>Kelas</span>
								<span>XII IPA 2</span>
							</div>
							<div className='flex justify-between border-b pb-2'>
								<span className='font-medium'>Email</span>
								<span>rafi@email.com</span>
							</div>
							<div className='flex justify-between'>
								<span className='font-medium'>Alamat</span>
								<span>Jl. Pendidikan No. 45</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export function StudentProfileModal() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-2xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Profil Siswa</h1>

				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='grid gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='name'>Nama Lengkap</Label>
								<Input
									id='name'
									placeholder='Contoh: Rafi Maulana'
									defaultValue='Rafi Maulana'
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='nisn'>NISN</Label>
								<Input
									id='nisn'
									placeholder='Contoh: 1234567890'
									defaultValue='1234567890'
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='kelas'>Kelas</Label>
								<Input
									id='kelas'
									placeholder='Contoh: XII IPA 2'
									defaultValue='XII IPA 2'
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='Contoh: rafi@email.com'
									defaultValue='rafi@email.com'
								/>
							</div>
						</div>

						<Button className='w-full'>Simpan Perubahan</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
