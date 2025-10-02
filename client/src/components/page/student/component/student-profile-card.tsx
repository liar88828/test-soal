import { SiswaType } from "@/interface/siswa-type.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Badge, BookOpen, Calendar, Mail, MapPin, UserIcon, UsersIcon } from "lucide-react";


export function StudentProfileCard({ user }: { user: SiswaType }) {
	return (
		<Card className="shadow-md border rounded-2xl">
			<CardHeader className="flex flex-col items-center gap-4 pb-8">
				<Avatar className="h-24 w-24 border-2 border-primary shadow">
					<AvatarImage src="/avatar-siswa.png" alt="Foto SiswaType" />
					<AvatarFallback>
						{ user.namaLengkap
						?.split(" ")
						.map((n: string) => n[0])
						.join("")
						.toUpperCase() }
					</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<h2 className="text-2xl font-semibold">{ user.namaLengkap }</h2>
					<p className="text-sm text-muted-foreground">
						{ user.status === "aktif" ? "SiswaType Aktif" : "Alumni" }
					</p>
				</div>
			</CardHeader>

			<CardContent className="space-y-8">
				{/* Data Utama */ }
				<section className="grid gap-4 sm:grid-cols-2">
					<InfoItem icon={ <Badge className="h-4 w-4 text-primary" /> } label="NISN" value={ user.nis } />
					<InfoItem icon={ <BookOpen className="h-4 w-4 text-primary" /> } label="Kelas" value={ user.kelas } />
					<InfoItem icon={ <Mail className="h-4 w-4 text-primary" /> } label="Email" value={ user.email ?? "-" } />
					<InfoItem icon={ <MapPin className="h-4 w-4 text-primary" /> } label="Alamat" value={ user.alamat ?? "-" } />
				</section>

				<Divider title="Data Pribadi" />

				{/* Data Pribadi */ }
				<section className="grid gap-4 sm:grid-cols-2">
					<InfoItem icon={ <UserIcon className="h-4 w-4 text-primary" /> } label="Jenis Kelamin" value={ user.jenisKelamin === "L" ? "Laki-laki" : "Perempuan" } />
					<InfoItem icon={ <Calendar className="h-4 w-4 text-primary" /> } label="Tempat & Tanggal Lahir" value={ `${ user.tempatLahir }, ${ user.tanggalLahir }` } />
				</section>

				<Divider title="Data Akademik" />

				{/* Data Akademik */ }
				<section className="grid gap-4 sm:grid-cols-2">
					<InfoItem label="Jurusan" value={ user.jurusan } />
					<InfoItem label="Tahun Masuk" value={ String(user.tahunMasuk) } />
					<InfoItem label="Status" value={ user.status } />
				</section>

				<Divider title="Data Orang Tua / Wali" />

				{/* Data Orang Tua */ }
				<section className="grid gap-4 sm:grid-cols-2">
					<InfoItem icon={ <UsersIcon className="h-4 w-4 text-primary" /> } label="Ayah" value={ `${ user.namaAyah } (${ user.pekerjaanAyah ?? "-" })` } />
					<InfoItem label="Ibu" value={ `${ user.namaIbu } (${ user.pekerjaanIbu ?? "-" })` } />
					<InfoItem label="Wali" value={ `${ user.namaWali ?? "-" } (${ user.pekerjaanWali ?? "-" })` } />
				</section>
			</CardContent>
		</Card>
	)
}

/* 🔹 Komponen kecil untuk tampilkan data rapih */
export function InfoItem({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
	return (
		<div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
			<div className="flex items-center gap-2">
				{ icon }
				<span className="font-medium">{ label }</span>
			</div>
			<span className="text-sm text-right">{ value }</span>
		</div>
	)
}

/* 🔹 Divider dengan judul section */
export function Divider({ title }: { title: string }) {
	return (
		<div className="relative flex items-center py-2">
			<div className="flex-grow border-t border-muted" />
			<span className="px-3 text-xs uppercase text-muted-foreground font-semibold">{ title }</span>
			<div className="flex-grow border-t border-muted" />
		</div>
	)
}
