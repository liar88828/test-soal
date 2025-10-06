import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useParams } from "react-router-dom";
import { useClassStore } from "@/stores/use-class-store.ts";


function JadwalSekolah(props: { idGrade: string }) {
	// const { data: classes } = useAcademicClassesDetailTabel(param.id)
	const classes = useClassStore(state => state.getClassByIdGrade)(props.idGrade)

	if (!classes) {
		return <h1>Data is Null</h1>
	}
	return (
		<Card>
			<CardContent className="space-y-4">
				{ classes.map((kelas) => (
					<div
						key={ kelas.nameTeacher }
						className="rounded-xl border shadow bg-white p-4"
					>
						<h2 className="text-xl font-bold mb-4">{ props.idGrade } { kelas.section } Room { kelas.room } </h2>
						<Table>
							<TableCaption>Jadwal pelajaran { kelas.idGrade }</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Hari</TableHead>
									<TableHead>Jam 1</TableHead>
									<TableHead>Jam 2</TableHead>
									<TableHead className="text-center">Istirahat</TableHead>
									<TableHead>Jam 3</TableHead>
									<TableHead>Jam 4</TableHead>
									<TableHead>Total JP</TableHead>
									<TableHead>Total Waktu</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{ [ 1 ].map(() => {

									return (
										<TableRow>
											<TableCell className="font-semibold">
												{/*{ hari.day }*/ }
											</TableCell>
											<TableCell>
												{/*{ lessons[0] ? `${ lessons[0].start } - ${ lessons[0].mapel }` : "-" }*/ }
											</TableCell>
											<TableCell>
												{/*{ lessons[1] ? `${ lessons[1].start } - ${ lessons[1].mapel }` : "-" }*/ }
											</TableCell>
											<TableCell className="text-center bg-yellow-100 font-medium">
												🍱 Istirahat
											</TableCell>
											<TableCell>
												{/*{ lessons[2] ? `${ lessons[2].start } - ${ lessons[2].mapel }` : "-" }*/ }
											</TableCell>
											<TableCell>
												{/*{ lessons[3] ? `${ lessons[3].start } - ${ lessons[3].mapel }` : "-" }*/ }
											</TableCell>
											<TableCell className="font-semibold text-blue-600">
												{/*{ totalJP }*/ }
											</TableCell>
											<TableCell className="font-semibold text-green-600">
												{/*{ hours } jam { minutes } mnt*/ }
											</TableCell>
										</TableRow>
									);
								}) }
							</TableBody>

						</Table>
					</div>
				)) }
			</CardContent>
		</Card>
	);
}

export default function JadwalSekolahPage() {
	const param = useParams<{ id: string }>()
	// if (!param) {
	// 	redirect("/login")
	// }
	return (
		<div>
			<JadwalSekolah idGrade={ param.id as string } />
		</div>
	);
}
