import { ClassType } from "@/assets/example/exampleClass.ts";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { InputSearch } from "@/components/mini/InputSearch.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";


export function TeacherClasses({ classes }: { classes: ClassType[] }) {
	const [ search, setSearch ] = useState<string>("")

	return (
		<Card>
			<CardHeader>
				<InputSearch onChangeAction={ setSearch } />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">No</TableHead>
							<TableHead>Nama Kelas</TableHead>
							<TableHead>Jumlah Siswa</TableHead>
							<TableHead className="text-right">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ classes
						.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
						.map((item, idx) => (
							<TableRow key={ idx }>
								<TableCell>{ idx + 1 }</TableCell>
								<TableCell>{ item.name }</TableCell>
								<TableCell>{ item.students }</TableCell>
								<TableCell className="text-right">
									<Button asChild variant="outline" size="sm">
										<Link
											to={ `/teacher/classes/${ item.name
											.replace(/\s+/g, "-")
											.toLowerCase() }` }
										>
											Lihat Detail
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
