import { Absence } from "@/components/page/absence/teacher-absence-page.tsx";

export const dummyAbsences: Absence[] = [
	{
		id: 1,
		date: "2025-08-01",
		status: "Hadir",
		note: "Mengajar seperti biasa",
	},
	{ id: 2, date: "2025-08-02", status: "Izin", note: "Ada urusan keluarga" },
	{ id: 3, date: "2025-08-03", status: "Sakit", note: "Demam" },
	{ id: 4, date: "2025-08-04", status: "Alpha", note: "Tanpa keterangan" },
]
