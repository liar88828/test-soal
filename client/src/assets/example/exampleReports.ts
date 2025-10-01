export type ReportType = {
	subject: string
	grade: number
	semester: string
}

export const exampleReports: ReportType[] = [
	{ subject: "Matematika", grade: 88, semester: "Ganjil" },
	{ subject: "Bahasa Indonesia", grade: 92, semester: "Ganjil" },
	{ subject: "Fisika", grade: 79, semester: "Ganjil" },
	{ subject: "Kimia", grade: 85, semester: "Ganjil" },
	{ subject: "Sejarah", grade: 90, semester: "Ganjil" },
]
