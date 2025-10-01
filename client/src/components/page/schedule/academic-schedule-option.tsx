import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog.tsx"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const mapelOptions: Mapel[] = [
	{ id: "1", name: "Matematika", sks: 4 },
	{ id: "2", name: "Ilmu Pengetahuan Alam (IPA)", sks: 6 },
	{ id: "3", name: "Bahasa Indonesia", sks: 2 },
	{ id: "4", name: "Bahasa Inggris", sks: 2 },
	{ id: "5", name: "Ilmu Pengetahuan Sosial (IPS)", sks: 3 },
	{ id: "6", name: "Pendidikan Agama", sks: 2 },
	{ id: "7", name: "Pendidikan Jasmani", sks: 1 },
]

export const FormSchema = z.object({
	mapelId: z.string().min(1, "Pilih mata pelajaran"),
	sks: z.number().min(1),
})

export function EditModal(
	{
		handleSave,
		setEditing,
		editing

	}: {
		handleSave: (data: Mapel) => void
		setEditing: () => void
		editing: Mapel | null
	}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					onClick={ setEditing }
				>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Edit Mata Pelajaran</DialogTitle>
				</DialogHeader>
				{ editing && (
					<MapelForm
						initialData={ editing }
						onSave={ handleSave }
					/>
				) }
			</DialogContent>
		</Dialog>
	);
}

export function AddMapelModal({ onSave }: { onSave: (data: Mapel) => void }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">+ Tambah Mapel</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] p-6">
				<DialogHeader>
					<DialogTitle>Tambah Mata Pelajaran</DialogTitle>
				</DialogHeader>
				<MapelForm onSave={ onSave } />
			</DialogContent>
		</Dialog>
	)
}

export function MapelForm(
	{
		onSave,
		initialData,
	}: {
		onSave: (data: Mapel) => void
		initialData?: Mapel
	}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			mapelId: initialData?.id ?? "",
			sks: initialData?.sks ?? 0,
		},
	})

	const selectedMapel = mapelOptions.find((m) => m.id === form.watch("mapelId"))

	return (
		<Form { ...form }>
			<form
				onSubmit={ form.handleSubmit(() => {
					const data: Mapel = {
						id: initialData?.id ?? String(Date.now()),
						name: selectedMapel?.name ?? "",
						sks: selectedMapel?.sks ?? 0,
					}
					onSave(data)
				}) }
				className="space-y-6"
			>
				{/* Select Mapel */ }
				<FormField
					control={ form.control }
					name="mapelId"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Pilih Mata Pelajaran</FormLabel>
							<Select
								onValueChange={ (val) => {
									field.onChange(val)
									const mapel = mapelOptions.find((m) => m.id === val)
									if (mapel) {
										form.setValue("sks", mapel.sks)
									}
								} }
								value={ field.value }
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Pilih mapel" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ mapelOptions.map((m) => (
										<SelectItem key={ m.id } value={ m.id }>
											{ m.name }
										</SelectItem>
									)) }
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					) }
				/>

				{/* SKS (auto filled) */ }
				<FormField
					control={ form.control }
					name="sks"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Jumlah SKS</FormLabel>
							<FormControl>
								<Input { ...field } type="number" value={ selectedMapel?.sks ?? 0 } readOnly />
							</FormControl>
							<FormMessage />
						</FormItem>
					) }
				/>

				<div className="flex justify-end">
					<Button type="submit">{ initialData ? "Update" : "Simpan" }</Button>
				</div>
			</form>
		</Form>
	)
}

export type Mapel = {
	id: string
	name: string
	sks: number
}

export const exampleMapelOptions: Mapel[] = [
	{ id: "1", name: "Matematika", sks: 4 },
	{ id: "2", name: "Ilmu Pengetahuan Alam (IPA)", sks: 6 },
	{ id: "3", name: "Bahasa Indonesia", sks: 2 },
	{ id: "4", name: "Bahasa Inggris", sks: 2 },
	{ id: "5", name: "Ilmu Pengetahuan Sosial (IPS)", sks: 3 },
	{ id: "6", name: "Pendidikan Agama", sks: 2 },
	{ id: "7", name: "Pendidikan Jasmani", sks: 1 },
]

export function AcademicScheduleOption({ mapelOptions }: { mapelOptions: Mapel[] }) {
	const [ mapels, setMapels ] = useState<Mapel[]>(mapelOptions)
	const [ editing, setEditing ] = useState<Mapel | null>(null)

	const handleSave = (data: Mapel) => {
		if (editing) {
			// update
			setMapels((prev) =>
				prev.map((m) => ( m.id === editing.id ? { ...m, ...data } : m ))
			)
			setEditing(null)
		} else {
			// add new
			setMapels((prev) => [ ...prev, { ...data, id: String(Date.now()) } ])
		}
	}

	const handleDelete = (id: string) => {
		setMapels((prev) => prev.filter((m) => m.id !== id))
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>Daftar Mata Pelajaran</CardTitle>
					<AddMapelModal onSave={ handleSave } />
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Daftar Mata Pelajaran & Jumlah SKS</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">No</TableHead>
							<TableHead>Nama Mata Pelajaran</TableHead>
							<TableHead className="text-center">Jumlah SKS</TableHead>
							<TableHead className="text-center w-[120px]">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapels.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.name }</TableCell>
								<TableCell className="text-center">{ m.sks }</TableCell>
								<TableCell className="text-center space-x-2">
									<EditModal setEditing={ () => setEditing(m) }
									           handleSave={ handleSave }
									           editing={ editing }
									/>
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => handleDelete(m.id) }
									>
										Hapus
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>

			</CardContent>
		</Card>
	)
}
