// ✅ type definition for a single announcement
export type AnnouncementType = {
	id: number
	title: string
	content: string
	date: string
	category: string[]
	author?: string
}

export const exampleAnnouncements: AnnouncementType[] = [
	{
		id: 1,
		title: "Pengumpulan Nilai UTS",
		content: "Harap seluruh guru mengumpulkan nilai UTS paling lambat tanggal 10 Agustus 2025.",
		date: "2025-08-01",
		category: [ "Akademik", "Informasi", "Informasi Umum" ],
		author: "Wakil Kepala Sekolah",
	},
	{
		id: 2,
		title: "Rapat Guru",
		content: "Rapat dewan guru akan dilaksanakan pada hari Jumat pukul 13.00 WIB di ruang rapat utama.",
		date: "2025-07-29",
		category: [ "Informasi" ],
		author: "Kepala Sekolah",
	},
	{
		id: 3,
		title: "Ujian Tengah Semester",
		content: "UTS akan dilaksanakan pada tanggal 15-20 Agustus 2025. Semua siswa wajib hadir tepat waktu.",
		date: "2025-08-01",
		category: [ "Akademik" ],
		author: "Wakil Kepala Sekolah",
	},
	{
		id: 4,
		title: "Perubahan Jadwal Ekstrakurikuler",
		content: "Jadwal kegiatan Pramuka dan PMR telah diperbarui. Silakan cek papan pengumuman sekolah.",
		date: "2025-07-28",
		category: [ "Kegiatan" ],
		author: "Pembina Ekstrakurikuler",
	},
	{
		id: 5,
		title: "Hari Libur Nasional",
		content: "Sekolah akan diliburkan pada 17 Agustus 2025 dalam rangka Hari Kemerdekaan RI.",
		date: "2025-07-25",
		category: [ "Informasi Umum" ],
		author: "Kepala Tata Usaha",
	},
	{
		id: 6,
		title: "Ujian Akhir Semester",
		content: `Ujian Akhir Semester akan dilaksanakan mulai tanggal 10 Desember 2025. Seluruh siswa diwajibkan mempersiapkan diri dengan baik dan membawa perlengkapan yang diperlukan. Harap diperhatikan juga jadwal yang akan diumumkan melalui papan pengumuman.`,
		category: [ "Akademik", "SiswaType" ],
		date: "2025-09-27",
		author: "Kepala Sekolah",
	},
	{
		id: 7,
		title: "Libur Nasional",
		content: `Tanggal 1 Januari diliburkan untuk memperingati Tahun Baru. Seluruh kegiatan belajar mengajar akan dimulai kembali pada tanggal 2 Januari 2025.`,
		category: [ "Umum" ],
		date: "2025-09-25",
		author: "Wakil Kepala Sekolah",
	},
]
