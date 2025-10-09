type BillStatus = "Lunas" | "Belum";
type Bill = {
	id: number;
	name: string;      // nama siswa
	kelas: string;     // kelas siswa
	bulan: string;     // bulan tagihan
	nominal: number;   // jumlah tagihan
	status: BillStatus; // status pembayaran
	createdAt: Date;
	updatedAt: Date;
};
export const dummyBills: Bill[] = [
	{
		id: 1,
		name: "Ahmad Fauzi",
		kelas: "X IPA 1",
		bulan: "September",
		nominal: 200000,
		status: "Belum",
		createdAt: new Date("2025-09-01"),
		updatedAt: new Date("2025-09-08"),
	},
	{
		id: 2,
		name: "Dina Mulyani",
		kelas: "X IPS 2",
		bulan: "September",
		nominal: 200000,
		status: "Lunas",
		createdAt: new Date("2025-09-01"),
		updatedAt: new Date("2025-09-08"),
	},
	{
		id: 3,
		name: "Bayu Pratama",
		kelas: "XI IPA 3",
		bulan: "September",
		nominal: 200000,
		status: "Belum",
		createdAt: new Date("2025-09-01"),
		updatedAt: new Date("2025-09-08"),
	},
	{
		id: 2,
		name: "Siti Rahma",
		kelas: "X IPA 2",
		bulan: "September",
		nominal: 200000,
		status: "Lunas",
		createdAt: new Date("2025-09-01"),
		updatedAt: new Date("2025-09-08"),
	},
	{
		id: 3,
		name: "Budi Santoso",
		kelas: "XI IPS 1",
		bulan: "September",
		nominal: 200000,
		status: "Belum",
		createdAt: new Date("2025-09-01"),
		updatedAt: new Date(),
	},
]
