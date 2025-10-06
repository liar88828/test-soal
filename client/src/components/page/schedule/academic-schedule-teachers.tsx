import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditIcon, Plus, TrashIcon } from "lucide-react";
import { type MapelOptionalDefaults, MapelSchema } from "shared/dist/lib/validate";


function AcademicScheduleOptionForm(
	{
		editing,
		onSave,
		onClose,
	}: {
		editing: MapelOptionalDefaults | null;
		onSave: (data: MapelOptionalDefaults) => void;
		onClose?: () => void;
	}) {

	const form = useForm<MapelOptionalDefaults>({
		resolver: zodResolver(MapelSchema),
		// defaultValues: { nameSubject: "", jp: 1 },
	});

	useEffect(() => {
		if (editing) {
			form.reset({
				name: editing.name,
				jp: editing.jp,
				nameTeacher: editing.nameTeacher,
				idTeacher: editing.idTeacher,
				idGrade: editing.idGrade,
			});
		} else {
			form.reset({ name: "", jp: 1, nameTeacher: "", idTeacher: "", idGrade: "" });
		}
	}, [ editing, form ]);

	const onSubmit = (values: MapelOptionalDefaults) => {
		onSave(values);
		form.reset();
		onClose?.();
	};

	return (
		<Form { ...form }>
			<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
				<FormField
					control={ form.control }
					name="name"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Nama Mapel</FormLabel>
							<FormControl>
								<Input placeholder="contoh: Matematika" { ...field } />
							</FormControl>
							<FormMessage />
						</FormItem>
					) }
				/>

				<FormField
					control={ form.control }
					name="jp"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Jumlah JP</FormLabel>
							<FormControl>
								<Input type="number" { ...field } onChange={ (e) => field.onChange(e.target.valueAsNumber) } />
							</FormControl>
							<FormMessage />
						</FormItem>
					) }
				/>

				<Button type="submit" className="w-full">
					{ editing ? "Update Mapel" : "Tambah Mapel" }
				</Button>

			</form>
		</Form>
	);
}

export function AcademicScheduleOption() {
	const [ editing, setEditing ] = useState<MapelOptionalDefaults | null>(null);
	// const { mapels, removeMapelForTeacher, addMapelForTeacher, updateMapelForTeacher } = useMapelClassStore();

	const handleSave = (data: MapelOptionalDefaults) => {
		if (editing) {
			// updateMapelForTeacher(editing.id, data);
			setEditing(null);
		} else {
			// addMapelForTeacher({
			// 	...data,
			// 	id: nanoid(),
			//
			// });
		}
	};
// console.log(editing,'test')
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Daftar Mata Pelajaran xxx</CardTitle>

					{/* Tombol Add */ }
					<Dialog>
						<DialogTrigger asChild>
							<Button><Plus /></Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Tambah Mapel</DialogTitle>
								<DialogDescription>
									Isi form untuk menambahkan mata pelajaran baru
								</DialogDescription>
							</DialogHeader>
							<AcademicScheduleOptionForm
								editing={ null }
								onSave={ handleSave }
							/>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP yy</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">No</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead className="text-center">Jumlah JP</TableHead>
							<TableHead className="text-center w-[160px]">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapels.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameSubject }</TableCell>
								<TableCell className="text-center">{ m.jp }</TableCell>
								<TableCell className="text-center space-x-2">
									{/* Edit */ }
									<Dialog
										open={ !!editing && editing.id === m.id }
										onOpenChange={ (isOpen) => {
											if (!isOpen) setEditing(null);
										} }
									>
										<DialogTrigger asChild>
											<Button size="sm" onClick={ () => setEditing(m) }
											>
												<EditIcon />
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Edit Mapel</DialogTitle>
											</DialogHeader>
											<AcademicScheduleOptionForm
												editing={ editing }
												onSave={ handleSave }
												onClose={ () => setEditing(null) }
											/>
										</DialogContent>
									</Dialog>

									{/* Delete */ }
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
	);
}
