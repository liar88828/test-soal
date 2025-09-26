import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'
import { toast } from 'sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

type Absence = {
	id: number
	date: string
	status: string
	note: string
}

const dummyAbsences: Absence[] = [
	{
		id: 1,
		date: '2025-08-01',
		status: 'Hadir',
		note: 'Mengajar seperti biasa',
	},
	{ id: 2, date: '2025-08-02', status: 'Izin', note: 'Ada urusan keluarga' },
	{ id: 3, date: '2025-08-03', status: 'Sakit', note: 'Demam' },
	{ id: 4, date: '2025-08-04', status: 'Alpha', note: 'Tanpa keterangan' },
]

export default function TeacherAbsencePage() {
	const [status, setStatus] = useState('')
	const [note, setNote] = useState('')
	const [absences, setAbsences] = useState<Absence[]>(dummyAbsences)

	const handleSubmit = () => {
		if (!status) {
			toast.error('Status wajib diisi')
			return
		}

		const newAbsence: Absence = {
			id: absences.length + 1,
			date: new Date().toLocaleDateString('id-ID'),
			status,
			note,
		}

		setAbsences((prev) => [newAbsence, ...prev])
		toast.success('Absensi berhasil dikirim')

		// Reset form
		setStatus('')
		setNote('')
	}

	return (
		<div className='min-h-screen bg-muted p-6'>
			<div className=' mx-auto space-y-8'>
				<div>
					<h1 className='text-3xl font-bold text-primary'>Absensi Guru</h1>
					<p className='text-muted-foreground'>
						Silakan isi absensi Anda hari ini.
					</p>
				</div>

				<Card>
					<CardContent className='p-6 flex justify-between items-center'>
						<span className='text-lg font-medium'>
							Klik untuk mengisi absensi Anda
						</span>
						<Dialog>
							<DialogTrigger asChild>
								<Button>Isi Absensi</Button>
							</DialogTrigger>
							<DialogContent className='sm:max-w-md'>
								<DialogHeader>
									<DialogTitle>Form Absensi</DialogTitle>
								</DialogHeader>
								<div className='space-y-4'>
									<div>
										<Label>Status</Label>
										<Select
											value={status}
											onValueChange={setStatus}>
											<SelectTrigger>
												<SelectValue placeholder='Pilih status absensi' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='Hadir'>Hadir</SelectItem>
												<SelectItem value='Izin'>Izin</SelectItem>
												<SelectItem value='Sakit'>Sakit</SelectItem>
												<SelectItem value='Alpha'>Alpha</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label>Keterangan</Label>
										<Textarea
											value={note}
											onChange={(e) => setNote(e.target.value)}
											placeholder='Contoh: Ada urusan keluarga, sedang sakit...'
										/>
									</div>
								</div>

								<DialogFooter className='pt-4'>
									<Button onClick={handleSubmit}>Kirim Absensi</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				{/* Table Riwayat */}
				<Card>
					<CardContent className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Riwayat Absensi</h2>
						{absences.length === 0 ? (
							<p className='text-muted-foreground'>Belum ada data absensi.</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>No</TableHead>
										<TableHead>Tanggal</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Keterangan</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{absences.map((abs, idx) => (
										<TableRow key={abs.id}>
											<TableCell>{idx + 1}</TableCell>
											<TableCell>{abs.date}</TableCell>
											<TableCell>
												<Badge
													className={statusColor(abs.status)}
												// variant={getStatusVariant(abs.status)}
												>
													{abs.status}
												</Badge>
											</TableCell>
											<TableCell>{abs.note || '-'}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export function statusColor(status: string) {
	switch (status) {
		case 'Hadir':
			return 'bg-green-100 text-green-800'
		case 'Izin':
			return 'bg-yellow-100 text-yellow-800'
		case 'Sakit':
			return 'bg-blue-100 text-blue-800'
		case 'Alpha':
			return 'bg-red-100 text-red-800'
		default:
			return ''
	}
}

export function getStatusVariant(
	status: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
	switch (status.toLowerCase()) {
		case 'hadir':
			return 'default' // abu / netral
		case 'izin':
			return 'secondary' // abu terang
		case 'sakit':
			return 'outline' // putih tepi
		case 'alpha':
			return 'destructive' // merah
		default:
			return 'outline'
	}
}
