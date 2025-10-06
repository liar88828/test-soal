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
import { useMapelClassStore } from "@/stores/use-mapel-class-store.ts";
import { mapelFormSchema, MapelFormValues } from "@/schema/mapel-form-schema.tsx";


export function AcademicScheduleOption() {
	const [ editing, setEditing ] = useState<MapelFormValues | null>(null);
	const { mapels, removeMapelForTeacher, addMapelForTeacher, updateMapelForTeacher } = useMapelClassStore();

	const handleSave = (data: MapelFormValues) => {
		console.log(data);
		if (editing && editing.id) {
			updateMapelForTeacher(editing.id, data);
			setEditing(null);
		} else {
			addMapelForTeacher(data);
		}
	};
// console.log(editing,'test')
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Daftar Mata Pelajaran yy</CardTitle>

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
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP xx</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">No</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead className="text-center">Jumlah JP</TableHead>
							<TableHead className="text-center">Guru</TableHead>
							<TableHead className="text-center w-[160px]">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapels.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameSubject }</TableCell>
								<TableCell className="text-center">{ m.jp }</TableCell>
								<TableCell className="text-center">{ m.nameTeacher }</TableCell>
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

// ---- Schema ----
// const formSchema = z.object({
// 	nameSubject: z.string().min(2, "Nama minimal 2 karakter"),
// 	nameTeacher: z.string().min(2, "Nama Guru minimal 2 karakter"),
// 	idTeacher: z.string().min(2, "id Guru minimal 2 karakter"),
// 	id: z.string().min(2, "ID minimal 2 karakter"),
// 	jp: z.number().min(1, "JP minimal 1"),
// });
//
// type TeacherFormValues = z.infer<typeof formSchema>;

// ---- Form Reusable ----
function AcademicScheduleOptionForm(
	{
		editing,
		onSave,
		onClose,
	}: {
		editing: MapelFormValues | null;
		onSave: (data: MapelFormValues) => void;
		onClose?: () => void;
	}) {

	const form = useForm<MapelFormValues>({
		resolver: zodResolver(mapelFormSchema),
		defaultValues: { nameSubject: "", jp: 1, nameTeacher: "", idTeacher: "", id: "" },
	});

	useEffect(() => {
		if (editing) {
			form.reset({ nameSubject: editing.nameSubject, jp: editing.jp });
		} else {
			form.reset({ nameSubject: "", jp: 1 });
		}
	}, [ editing, form ]);

	const onSubmit = (values: MapelFormValues) => {
		console.log(values);
		onSave(values);
		form.reset();
		onClose?.();
	};
	console.log(form.formState.errors)
	return (
		<Form { ...form }>
			<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4">
				<FormField
					control={ form.control }
					name="nameSubject"
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
