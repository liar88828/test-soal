export type SiswaType = {
	// Identitas dasar
	id: string;             // Unique identifier
	nis: string;            // Nomor Induk SiswaType
	namaLengkap: string;    // Full name
	jenisKelamin: "L" | "P"; // L = Laki-laki, P = Perempuan
	tanggalLahir: string;   // Format: YYYY-MM-DD
	tempatLahir: string;

	// Data akademik
	kelas: string;          // Contoh: "XII IPA 1"
	jurusan: string;        // Contoh: "IPA", "IPS", "TKJ", "RPL"
	tahunMasuk: number;     // Tahun masuk sekolah
	tahunKeluar?: number;   // Tahun lulus (opsional)

	// Data kontak
	alamat: string;
	noHp?: string;
	email?: string;

	// Data orang tua / wali
	namaAyah?: string;
	pekerjaanAyah?: string;
	namaIbu?: string;
	pekerjaanIbu?: string;
	namaWali?: string;
	pekerjaanWali?: string;
	noHpWali?: string;

	// Metadata
	status: "aktif" | "lulus" | "keluar"; // Status siswa
	createdAt: string;     // Timestamp created
	updatedAt?: string;    // Timestamp updated (opsional)
};
