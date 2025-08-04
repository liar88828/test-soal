import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const scheduleData = [
	{
		day: 'Senin',
		time: '07.00 - 08.30',
		subject: 'Matematika',
		className: 'X IPA 1',
	},
	{
		day: 'Senin',
		time: '09.00 - 10.30',
		subject: 'Fisika',
		className: 'X IPA 2',
	},
	{
		day: 'Rabu',
		time: '10.45 - 12.15',
		subject: 'Matematika',
		className: 'XI IPA 1',
	},
	{
		day: 'Jumat',
		time: '08.00 - 09.30',
		subject: 'Statistika',
		className: 'XII IPS 2',
	},
]

export default function TeacherSchedule() {
	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<h1 className='text-3xl font-bold text-primary'>Jadwal Mengajar</h1>
				<p className='text-muted-foreground'>
					Berikut adalah jadwal mengajar Anda minggu ini.
				</p>

				<div className='space-y-4'>
					{scheduleData.map((item, idx) => (
						<Card key={idx}>
							<CardContent className='p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
								<div>
									<h2 className='text-lg font-semibold'>{item.subject}</h2>
									<p className='text-sm text-muted-foreground'>
										{item.day}, {item.time}
									</p>
								</div>
								<Badge className='mt-2 sm:mt-0'>{item.className}</Badge>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
