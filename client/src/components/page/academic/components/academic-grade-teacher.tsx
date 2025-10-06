import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form.tsx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TrashIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { toast } from "sonner";
import { Input } from "@/components/ui/input.tsx";
import { formatToHour } from "@/lib/format-to-hour.tsx";
import type { FormDialog } from "@/interface/form-dialog.tsx";
import { onError } from "@/lib/on-error.tsx";
import { teacherGet, teacherGetNotByIDClass } from "@/lib/swr/teacher-swr.ts";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { mapelCreate, mapelDelete, mapelGetByGradeID, mapelGetCountByGradeID, mapelUpdate } from "@/lib/swr/mapel-swr.ts";
import { type MapelOptionalDefaults, MapelOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { optionGet } from "@/lib/swr/option-swt.tsx";

// type Grouped = {
// 	nameSubject: string;
// 	totalJP: number;
// 	totalCount: number;
// 	totalMaxJP: number;
// };

function DaftarMataPelajaran(props: { idGrade: string }) {
	const [ open, setOpen ] = useState(false);
	const [ editing, setEditing ] = useState<MapelOptionalDefaults | null>(null);
	const mapel = mapelGetByGradeID(props.idGrade)
	const teachers = teacherGetNotByIDClass(props.idGrade)
	const options = optionGet(props.idGrade)
	const mapelsCounts = mapelGetCountByGradeID(props.idGrade)

	const handleSave = async (data: MapelOptionalDefaults) => {
		console.log(data)
		if (editing && editing.id) {
			await mapelUpdate(editing.id, data);
			setEditing(null);
		} else {
			await mapelCreate(data);
		}
		await mapel.mutate();
		await teachers.mutate()
		await options.mutate()
		await mapelsCounts.mutate()
	};

	async function handleDelete(id: string) {
		await mapelDelete(id);
		await mapel.mutate();
		await teachers.mutate()
		await options.mutate()
		await mapelsCounts.mutate()
	}

	if (mapel.isLoading) {
		return <Spinner />;
	}

	if (!mapel.data) {
		return <EmptyComponent />
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Daftar Mata Pelajaran</CardTitle>
					<Button onClick={ () => {
						setEditing(null);
						setOpen(true);
					} }
					>
						Add Teacher
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				<Table>
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP dfsfvssddf</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className=" text-center">No</TableHead>
							<TableHead>Guru</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead className="text-end">Jumlah JP</TableHead>
							<TableHead className="text-start">Jumlah Jam</TableHead>
							<TableHead className="text-center w-[160px]">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapel.data.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameTeacher }</TableCell>
								<TableCell>{ m.name }</TableCell>
								<TableCell className="text-end">{ m.jp }</TableCell>
								<TableCell className="text-start">{ formatToHour(m.jp * 45) }</TableCell>
								<TableCell className="text-center space-x-2">
									{/* Edit */ }
									{/*<Dialog*/ }
									{/*	open={ !!editing && editing.id === m.id }*/ }
									{/*	onOpenChange={ (isOpen) => {*/ }
									{/*		if (!isOpen) setEditing(null);*/ }
									{/*	} }*/ }
									{/*>*/ }
									{/*	<DialogTrigger asChild>*/ }
									{/*		<Button size="sm" onClick={ () => setEditing(m) }*/ }
									{/*		>*/ }
									{/*			<EditIcon />*/ }
									{/*		</Button>*/ }
									{/*	</DialogTrigger>*/ }
									{/*	<DialogContent>*/ }
									{/*		<DialogHeader>*/ }
									{/*			<DialogTitle>Edit Mapel</DialogTitle>*/ }
									{/*		</DialogHeader>*/ }
									{/*		<AcademicScheduleOptionForm*/ }
									{/*			editing={ editing }*/ }
									{/*			onSave={ handleSave }*/ }
									{/*			idGrade={ props.idGrade }*/ }
									{/*			onClose={ () => setEditing(null) }*/ }
									{/*		/>*/ }
									{/*	</DialogContent>*/ }
									{/*</Dialog>*/ }

									{/* Delete */ }

									<Button size="sm"
									        onClick={ () => {
										        setEditing(m);
										        setOpen(true);
									        } }
									>Edit</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => handleDelete(m.id) }
									>
										<TrashIcon />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
			<AcademicScheduleOptionForm
				setOpen={ setOpen }
				onSubmit={ handleSave }
				open={ open }
				editData={ editing }
				idGrade={ props.idGrade }
			/>
		</Card>
	);
}

function TotalGuru(props: { idGrade: string }) {
	// const { countTotalTeacher, countTotalJP, combinedData, totalMaxJP, totalNeedJP } = useMapelClassStore(state => state.filterMapelByGrade)(props.idGrade)
	const mapelsCounts = mapelGetCountByGradeID(props.idGrade)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Guru Mapel</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Total JP per Subject adfad</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>No.</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead className="text-center">Total Teacher</TableHead>
							<TableHead className="text-center">Total JP</TableHead>
							<TableHead className="text-center">Max JP</TableHead>
							<TableHead className="text-center">Need JP</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ mapelsCounts.data?.map((r, i) => (
							<TableRow key={ r.nameSubject }>
								<TableCell>{ i + 1 }</TableCell>
								<TableCell className="font-medium text-start">{ r.nameSubject }</TableCell>
								<TableCell className="text-center">{ r.count }</TableCell>
								<TableCell className="text-center">{ r.totalJP }</TableCell>
								<TableCell className="text-center">{ r.totalMaxJP }</TableCell>
								<TableCell className="text-center text-red-400">{ r.totalNeedJP }</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Total</TableCell>
							<TableCell className={ "text-center" }>{ mapelsCounts.countTotalTeacher }</TableCell>
							<TableCell className={ "text-center" }>{ mapelsCounts.countTotalJP }</TableCell>
							<TableCell className={ "text-center" }>{ mapelsCounts.countTotalMaxJP }</TableCell>
							<TableCell className={ "text-center text-red-400" }>{ mapelsCounts.countTotalNeedJP }</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	);
}

function AcademicScheduleOptionForm(props: { idGrade: string } & FormDialog<MapelOptionalDefaults>) {
	const { open, setOpen, idGrade, editData, onSubmit } = props
	const teachers = teacherGet()
	const mapels = mapelGetByGradeID(props.idGrade)
	const options = optionGet(props.idGrade)

	const form = useForm<MapelOptionalDefaults>({
		resolver: zodResolver(MapelOptionalDefaultsSchema),
		defaultValues: editData ? editData : {
			name: "Math",
			jp: 0,
			idTeacher: "",
			nameTeacher: "",
			idGrade
		},
	});

	useEffect(() => {
		if (editData) {
			form.reset(editData);
		} else {
			form.reset({
				name: "Math",
				jp: 0,
				idTeacher: "",
				nameTeacher: "",
				idGrade
			});
		}
	}, [ editData, form ]);

	if (teachers.isLoading || mapels.isLoading || options.isLoading) {
		return <Spinner />
	}

	if (!teachers.data || !mapels.data || !options.data) {
		return <EmptyComponent />
	}

	const teacherFilter = teachers.data?.filter(teacher => {
		const optionFilter = options.data?.some(option => option.nameSubject === teacher.subject);
		const mapelFilter = mapels.data?.some(mapel => mapel.idTeacher === teacher.id);
		return optionFilter && !mapelFilter
	});

	return (
		<Dialog onOpenChange={ setOpen } open={ open }>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tambah Mapel</DialogTitle>
					<DialogDescription>Isi form untuk menambahkan mata pelajaran baru</DialogDescription>
				</DialogHeader>
				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit, onError) } className="space-y-4">
						{/*Jumlah JP */ }
						<FormField
							control={ form.control }
							name="jp"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Jumlah JP</FormLabel>
									<FormControl>
										<Input
											max={ 8 }
											type="number"
											{ ...field }
											onChange={ (e) => field.onChange(e.target.valueAsNumber) }
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>

						{/* Teacher */ }
						<FormField
							control={ form.control }
							name="idTeacher"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Teacher</FormLabel>
									<Select
										onValueChange={ (valueIdTeacher) => {
											const teacher = teacherFilter.find((i) => i.id === valueIdTeacher);
											if (!teacher) {
												toast.error("Teacher not found!");
												return
											}
											// const option = options.data?.find(i => i.nameSubject === teacher.subject)
											// if (!option) {
											// 	toast.error("Subject not found!");
											// 	return;
											// }
											console.log(teacher)
											form.setValue("nameTeacher", teacher.name);
											form.setValue("idTeacher", teacher.id);
											form.setValue("name", teacher.subject);
											form.setValue("jp", 0);

										} }
										defaultValue={ field.value }
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select teacher" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ teacherFilter.map((i) => (
												<SelectItem key={ i.id } value={ i.id }>
													{ i.name } - { i.subject }
												</SelectItem>
											)) }
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							) }
						/>

						<Button type="submit" className="w-full">
							{ editData ? "Update Mapel" : "Tambah Mapel" }
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default function AcademicGradeTeacher(props: { idGrade: string }) {

	return (
		<div className={ "space-y-6" }>
			<DaftarMataPelajaran idGrade={ props.idGrade } />
			<TotalGuru idGrade={ props.idGrade } />
		</div>
	);
}
