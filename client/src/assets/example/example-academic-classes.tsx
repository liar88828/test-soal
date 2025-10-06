export type AcademicClass = {
	id: string
	name: string
	level: "PAUD" | "TK" | "SD" | "SMP" | "SMK"
	grade: number | null,
	// list?: ClassRow[]
}
export const exampleAcademicClasses: AcademicClass[] = [
	{ id: "PAUD", name: "PAUD", level: "PAUD", grade: null},
	{ id: "TK-KECIL", name: "TK Kecil", level: "TK", grade: null },
	{ id: "TK-BESAR", name: "TK Besar", level: "TK", grade: null },

	{ id: "SD-1", name: "Kelas 1", level: "SD", grade: 1 },
	{ id: "SD-2", name: "Kelas 2", level: "SD", grade: 2 },
	{ id: "SD-3", name: "Kelas 3", level: "SD", grade: 3 },
	{ id: "SD-4", name: "Kelas 4", level: "SD", grade: 4 },
	{ id: "SD-5", name: "Kelas 5", level: "SD", grade: 5 },
	{ id: "SD-6", name: "Kelas 6", level: "SD", grade: 6 },

	{ id: "SMP-7", name: "Kelas 7", level: "SMP", grade: 7 },
	{ id: "SMP-8", name: "Kelas 8", level: "SMP", grade: 8 },
	{ id: "SMP-9", name: "Kelas 9", level: "SMP", grade: 9 },

	{ id: "SMK-10", name: "Kelas 10", level: "SMK", grade: 10 },
	{ id: "SMK-11", name: "Kelas 11", level: "SMK", grade: 11 },
	{ id: "SMK-12", name: "Kelas 12", level: "SMK", grade: 12 },
]
