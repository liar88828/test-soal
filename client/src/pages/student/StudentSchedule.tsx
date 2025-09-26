import { Card, CardContent, } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'

import React from 'react'

const scheduleData = [
	{
		day: 'Senin',
		time: '07:00 - 08:40',
		subject: 'Matematika',
		teacher: 'Bu Siti',
	},
	{
		day: 'Senin',
		time: '09:00 - 10:40',
		subject: 'Bahasa Indonesia',
		teacher: 'Pak Joko',
	},
	{
		day: 'Selasa',
		time: '07:00 - 08:40',
		subject: 'Fisika',
		teacher: 'Pak Andi',
	},
	{
		day: 'Rabu',
		time: '09:00 - 10:40',
		subject: 'Biologi',
		teacher: 'Bu Rina',
	},
	{
		day: 'Kamis',
		time: '10:00 - 11:40',
		subject: 'Sejarah',
		teacher: 'Pak Dedi',
	},
	{
		day: 'Jumat',
		time: '07:00 - 08:40',
		subject: 'Pendidikan Agama',
		teacher: 'Bu Rahma',
	},
]

export default function StudentSchedule() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	const navigate = useNavigate()

	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-5xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Jadwal Pelajaran</h1>

				<Card>
					<CardContent  >
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Hari</TableHead>
									<TableHead>Jam</TableHead>
									<TableHead>Mata Pelajaran</TableHead>
									<TableHead>Guru</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{scheduleData.map((item, idx) => (
									<TableRow key={idx}>
										<TableCell>{item.day}</TableCell>
										<TableCell>{item.time}</TableCell>
										<TableCell>{item.subject}</TableCell>
										<TableCell>{item.teacher}</TableCell>
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
