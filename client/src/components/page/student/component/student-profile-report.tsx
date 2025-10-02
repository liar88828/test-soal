import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { TableLoading } from "@/components/mini/TableComponent.tsx";
import { useStudentNilai } from "@/lib/swr/use-student.tsx";


export function StudentProfileReport(props: { idStudent?: string }) {
	const { data: nilai } = useStudentNilai(props.idStudent)
	return (
		<Card className="shadow-md border rounded-2xl">
			<CardHeader>
				<h2 className="text-xl font-semibold text-primary">Daftar Nilai</h2>
				<p className="text-sm text-muted-foreground">
					Rekap nilai akademik siswa pada setiap mata pelajaran
				</p>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">No</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead className="text-center">Nilai</TableHead>
							<TableHead className="text-center">Keterangan</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							!nilai ? <TableLoading spanCol={ 4 } /> :
								nilai.map((n, idx: number) => (
									<TableRow key={ idx }>
										<TableCell>{ idx + 1 }</TableCell>
										<TableCell>{ n.mataPelajaran }</TableCell>
										<TableCell className="text-center font-semibold">{ n.nilai }</TableCell>
										<TableCell className="text-center">{ n.keterangan }</TableCell>
									</TableRow>
								)) }

					</TableBody>
				</Table>
			</CardContent>
		</Card>

	);
}
