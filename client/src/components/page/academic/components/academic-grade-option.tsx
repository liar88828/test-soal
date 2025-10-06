import { Button } from "@/components/ui/button.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { TrashIcon } from "lucide-react";
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { formatToHour } from "@/lib/format-to-hour.tsx";

// ---- Main Component ----
export function AcademicGradeOption(props: { idGrade: string }) {
	const { mapels: data, removeMapelForTeacher, } = useMapelClassStore();
	const mapels = data.filter(i => i.idGrade === props.idGrade);

	// console.log(result);
	return ( <div className={ "space-y-6" }>

			<Card>
				<CardHeader>
				</CardHeader>
				<CardContent>
					<Table>
						<TableCaption>Daftar Mata Pelajaran & Jumlah JP Teacher</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px] text-center">No</TableHead>
								<TableHead className="text-end">Guru</TableHead>
								<TableHead>Mata Pelajaran</TableHead>
								<TableHead className="text-end">Jumlah JP</TableHead>
								<TableHead>Jumlah Jam</TableHead>
								<TableHead className="text-center w-[160px]">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ mapels.map((m, i) => (
								<TableRow key={ m.id }>
									<TableCell className="text-center">{ i + 1 }</TableCell>
									<TableCell className="text-end">{ m.nameTeacher }</TableCell>
									<TableCell>{ m.nameSubject }</TableCell>
									<TableCell className="text-end">{ m.jp }</TableCell>
									<TableCell>{ formatToHour(m.jp * 45) }</TableCell>
									<TableCell className="text-center space-x-2">
										<Button
											size="sm"
											variant="destructive"
											onClick={ () => removeMapelForTeacher(m.id) }
										>
											<TrashIcon />
										</Button>
									</TableCell>
								</TableRow>
							)) }
						</TableBody>
					</Table>
				</CardContent>
			</Card>

		</div>

	);
}
