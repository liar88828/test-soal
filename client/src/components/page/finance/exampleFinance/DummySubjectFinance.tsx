type CostItem = {
	id: number;
	name: string;        // e.g., "Peralatan Lab", "Bahan Praktikum"
	amount: number;      // amount in rupiah
	description?: string; // optional detail
};
export  type SubjectFinance = {
	id: number;
	name: string;
	code: string;
	category: string;
	cost: number;
	description: string;
	semester: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	costList: CostItem[];
};
export const dummySubjectFinance = [
	{
		id: 1,
		name: "Biologi",
		cost: 150000,
		description: "Biaya praktikum laboratorium",
	},
	{
		id: 2,
		name: "Kimia",
		cost: 175000,
		description: "Bahan kimia dan perlengkapan lab",
	},
	{
		id: 3,
		name: "Olahraga",
		cost: 100000,
		description: "Kegiatan lapangan & peralatan",
	},
	{
		id: 4,
		name: "Seni Budaya",
		cost: 75000,
		description: "Bahan prakarya & kunjungan",
	},
]
