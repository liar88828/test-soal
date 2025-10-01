import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { LoaderProps } from "shared";
import { createSoalABCAction, soalListLoader } from "@/action/soal.ts";
import { useState } from "react";
import { SoalABC } from "shared/dist/lib/validate";
import { Input } from "@/components/ui/input.tsx";
import { DrawerDialog } from "@/components/mini/DrawerDialog.tsx";
import { ListEmpty } from "@/components/mini/ListEmpty.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";


export function SoalABCComponent() {
	const soal = useLoaderData() as LoaderProps<typeof soalListLoader>
	const [ isSoalItem, setIsSoalItem ] = useState<SoalABC | undefined>()
	const [ search, setSearch ] = useState("")

	return (
		<div className="space-y-6">

			<div className="flex gap-2">
				<Input
					type="search"
					placeholder="Search SoalItem ..."
					onChange={ (e) => setSearch(e.target.value) }
				/>
				<DrawerDialog
					title="Tambah Soal ABC"
					triggerLabel="Tambah Soal"
					isOpen={ !isSoalItem ? false : true }
					onOpen={ (value) => {
						if (!value) {
							setIsSoalItem(undefined);
						}
					} }
				>
					<CreateSoalABCComponent soalItem={ isSoalItem } />
				</DrawerDialog>
			</div>

			<div className=" xl:grid-cols-2 grid ga">
				{ soal.SoalABC.length === 0
					? <ListEmpty
						title={ "Belum ada soal" }
						description={ "SoalItem ini belum memiliki pertanyaan. Tambahkan pertanyaan baru untuk memulai." }
					/>
					: soal.SoalABC
					.filter(item => {
						const answer = item.answer.toLowerCase().includes(search.toLowerCase())
						const question = item.question.toLowerCase().includes(search.toLowerCase())
						return answer || question
					})
					.map((item, idx) => (

						<Card key={ item.id }>
							<CardHeader>
								<CardTitle><Badge variant="secondary">#{ idx + 1 }</Badge></CardTitle>
								<CardDescription className="font-medium">{ item.question }</CardDescription>
								<CardAction onClick={ () => setIsSoalItem(item) }><EditIcon /></CardAction>
							</CardHeader>
							<CardContent>
								<ul className="ml-6  space-y-1 text-muted-foreground">
									<li>A: { item.A }</li>
									<li>B: { item.B }</li>
									<li>C: { item.C }</li>
									<li>D: { item.D }</li>
									<li>E: { item.E }</li>
								</ul>
							</CardContent>
							<CardFooter>
								<p><strong className="text-emerald-600">Jawaban: { item.answer }</strong></p>
							</CardFooter>
							{/*<Separator />*/ }
						</Card>
					)) }
			</div>
		</div>

	);
}

export function CreateSoalABCComponent({ soalItem }: { soalItem?: SoalABC }) {
	const fetcher = useFetcher<typeof createSoalABCAction>();
	const busy = fetcher.state !== "idle";
	const { id } = useParams();

	return (
		<fetcher.Form method="POST" action={ `/soal/${ id }/question-abc` } className="space-y-6">
			<input type="hidden" name="soalId" value={ id } />
			<input type="hidden" name="questionItemId" value={ soalItem?.id } />

			<div>
				<Label htmlFor="question">Pertanyaan</Label>
				<Textarea
					name="question"
					id="question"
					required
					defaultValue={ soalItem?.question ?? "" }
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="A">Pilihan A</Label>
					<Input name="A" id="A" required defaultValue={ soalItem?.A ?? "" } />
				</div>
				<div>
					<Label htmlFor="B">Pilihan B</Label>
					<Input name="B" id="B" required defaultValue={ soalItem?.B ?? "" } />
				</div>
				<div>
					<Label htmlFor="C">Pilihan C</Label>
					<Input name="C" id="C" required defaultValue={ soalItem?.C ?? "" } />
				</div>
				<div>
					<Label htmlFor="D">Pilihan D</Label>
					<Input name="D" id="D" required defaultValue={ soalItem?.D ?? "" } />
				</div>
				<div>
					<Label htmlFor="E">Pilihan E</Label>
					<Input name="E" id="E" required defaultValue={ soalItem?.E ?? "" } />
				</div>
			</div>

			<div>
				<Label htmlFor="answer">Jawaban yang benar (A–E)</Label>
				<Select name="answer" required defaultValue={ soalItem?.answer ?? "" }>
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

			<Button type="submit" disabled={ busy } className={ "w-full" }>
				{ busy ? "Menyimpan..." : "Simpan Pertanyaan" }
			</Button>
		</fetcher.Form>
	);
}
