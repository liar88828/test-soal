import { Card, CardContent } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"

export default function TeacherHome() {
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-primary">
				Selamat Datang, Guru!
			</h1>
			<p className="text-muted-foreground">
				Silakan pilih menu untuk melanjutkan.
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardContent className=" space-y-3">
						<h2 className="text-xl font-semibold">📚 Manajemen Kelas</h2>
						<p className="text-sm text-muted-foreground">
							Lihat dan kelola siswa di setiap kelas yang Anda ampu.
						</p>
						<Button
							asChild
							variant="outline"
						>
							<Link to="/teacher/classes">Lihat Kelas</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardContent className=" space-y-3">
						<h2 className="text-xl font-semibold">📝 Input Nilai</h2>
						<p className="text-sm text-muted-foreground">
							Masukkan nilai ujian dan tugas siswa.
						</p>
						<Button
							asChild
							variant="outline"
						>
							<Link to="/teacher/grades">Input Nilai</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="space-y-3">
						<h2 className="text-xl font-semibold">📢 Pengumuman</h2>
						<p className="text-sm text-muted-foreground">
							Buat dan kelola pengumuman untuk siswa.
						</p>
						<Button asChild variant="outline">
							<Link to="/teacher/exampleAnnouncements">Kelola Pengumuman</Link>
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardContent className=" space-y-3">
						<h2 className="text-xl font-semibold">📆 Jadwal Mengajar</h2>
						<p className="text-sm text-muted-foreground">
							Lihat jadwal mengajar Anda setiap minggu.
						</p>
						<Button
							asChild
							variant="outline"
						>
							<Link to="/teacher/exampleSchedule">Lihat Jadwal</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
