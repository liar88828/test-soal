import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { Badge } from "client/src/components/ui/badge";
import { Separator } from "client/src/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "client/src/components/ui/card.tsx";
import { Button } from "client/src/components/ui/button";
import { Label } from "client/src/components/ui/label.tsx";
import { Input } from "client/src/components/ui/input.tsx";
import { Textarea } from "client/src/components/ui/textarea.tsx";
import { ListEmpty } from "client/src/components/ListEmpty.tsx";
import { DrawerDialog } from "client/src/components/DrawerDialog.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "client/src/components/ui/select.tsx";
import { type LoaderProps } from "shared";
import { createSoalListAction, soalListLoader } from "@/action/soal.action";

export const SoalListPage = () => {
	const soal = useLoaderData<LoaderProps<typeof soalListLoader>>()

	return (
		<div className="p-6 space-y-6">
			<div className={'flex justify-between items-end'}>
				<div className="">
					<h1 className="text-2xl">{soal.name}</h1>
					<p>Penulis: {soal.author}</p>
				</div>
				<DrawerDialog
					title="Tambah Soal"
					// description="Tambahkan Soal "
					triggerLabel="Tambah Soal"
				// footer={ <Button type="submit">Save changes</Button> }
				>
					<CreateQuestionForm />
				</DrawerDialog>
			</div>



			{soal.list.length === 0
				? <ListEmpty
					title={'Belum ada soal'}
					description={'Soal ini belum memiliki pertanyaan. Tambahkan pertanyaan baru untuk memulai.'}
				/>
				: <div className="grid gap-6 lg:grid-cols-2 grid-cols-1 ">{soal.list.map((item, idx) => (
					<Card key={item.id} className="gap-2">
						<CardHeader >
							<CardTitle >
								<Badge variant="secondary">#{idx + 1}</Badge>
							</CardTitle >
							<CardDescription className=" font-bold  "> {item.question} </CardDescription>
						</CardHeader>
						<CardContent >
							<ul className="ml-6 space-y-3 text-muted-foreground ">
								<li>A: {item.A}</li>
								<li>B: {item.B}</li>
								<li>C: {item.C}</li>
								<li>D: {item.D}</li>
								<li>E: {item.E}</li>
							</ul>
							{/* <p>
								</p> */}
						</CardContent>
						<CardFooter>
							{/* <Separator /> */}
							<strong className="text-emerald-600">Jawaban: {item.answer}</strong>

						</CardFooter>
					</Card>
				))}</div>
			}

		</div>
	);
};

export function CreateQuestionForm() {
	const fetcher = useFetcher<LoaderProps<typeof createSoalListAction>>();
	const { id } = useParams()

	const busy = fetcher.state !== "idle";
	console.log(fetcher.formAction)
	return (
		<fetcher.Form method="POST"
			action={`/soal/${id}`}
			className="space-y-6"
		>
			<input type="hidden" name={'soalId'} value={id} />
			<div>
				<Label htmlFor="question">Pertanyaan</Label>
				<Textarea name="question" id="question" required />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="A">Pilihan A</Label>
					<Input name="A" id="A" required />
				</div>
				<div>
					<Label htmlFor="B">Pilihan B</Label>
					<Input name="B" id="B" required />
				</div>
				<div>
					<Label htmlFor="C">Pilihan C</Label>
					<Input name="C" id="C" required />
				</div>
				<div>
					<Label htmlFor="D">Pilihan D</Label>
					<Input name="D" id="D" required />
				</div>
				<div>
					<Label htmlFor="E">Pilihan E</Label>
					<Input name="E" id="E" required />
				</div>
			</div>

			<div>
				<Label htmlFor="answer">Jawaban yang benar (A–E)</Label>
				<Select name="answer" required>
					<SelectTrigger id="answer">
						<SelectValue placeholder="Pilih jawaban benar" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="A">A</SelectItem>
						<SelectItem value="B">B</SelectItem>
						<SelectItem value="C">C</SelectItem>
						<SelectItem value="D">D</SelectItem>
						<SelectItem value="E">E</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Separator />

			<Button type="submit" disabled={busy}>
				{busy ? "Menyimpan..." : "Simpan Pertanyaan"}
			</Button>
		</fetcher.Form>
	);
}
