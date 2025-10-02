import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { exampleGradeClass } from "@/assets/example/exampleClass.ts";
import { ClassRow } from "@/interface/class-row.ts";

export type AcademicClass = {
	id: string
	name: string
	level: "PAUD" | "TK" | "SD" | "SMP" | "SMK"
	grade: number | null,
	list?: ClassRow[]
}

export const exampleAcademicClasses: AcademicClass[] = [
	{ id: "paud", name: "PAUD", level: "PAUD", grade: null, list: exampleGradeClass },
	{ id: "tk-kecil", name: "TK Kecil", level: "TK", grade: null },
	{ id: "tk-besar", name: "TK Besar", level: "TK", grade: null },

	{ id: "sd-1", name: "Kelas 1", level: "SD", grade: 1 },
	{ id: "sd-2", name: "Kelas 2", level: "SD", grade: 2 },
	{ id: "sd-3", name: "Kelas 3", level: "SD", grade: 3 },
	{ id: "sd-4", name: "Kelas 4", level: "SD", grade: 4 },
	{ id: "sd-5", name: "Kelas 5", level: "SD", grade: 5 },
	{ id: "sd-6", name: "Kelas 6", level: "SD", grade: 6 },

	{ id: "smp-7", name: "Kelas 7", level: "SMP", grade: 7 },
	{ id: "smp-8", name: "Kelas 8", level: "SMP", grade: 8 },
	{ id: "smp-9", name: "Kelas 9", level: "SMP", grade: 9 },

	{ id: "smk-10", name: "Kelas 10", level: "SMK", grade: 10 },
	{ id: "smk-11", name: "Kelas 11", level: "SMK", grade: 11 },
	{ id: "smk-12", name: "Kelas 12", level: "SMK", grade: 12 },
]

export function AcademicGradeTable({ academicClass }: { academicClass: AcademicClass[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Daftar Semua Kelas</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Daftar Kelas Akademik</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px] text-center">ID</TableHead>
							<TableHead className="text-center">Nama Kelas</TableHead>
							<TableHead className="text-center">Jenjang</TableHead>
							<TableHead className="text-center">Tingkat</TableHead>
							<TableHead className="text-center">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ academicClass.map((cls) => (
							<TableRow key={ cls.id }>
								<TableCell className="font-medium text-center">{ cls.id }</TableCell>
								<TableCell className="text-center">{ cls.name }</TableCell>
								<TableCell className="text-center">{ cls.level }</TableCell>
								<TableCell className="text-center">{ cls.grade ?? "-" }</TableCell>
								<TableCell className="text-center">
									<Button asChild variant={ "outline" }>
										<Link to={ `/academic/classes/${ cls.id }` }>
											<Eye />
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card> )
}
