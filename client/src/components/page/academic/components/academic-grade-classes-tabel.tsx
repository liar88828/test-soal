import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useParams } from "react-router-dom";
import { EditIcon, Eye, Plus, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { toast } from "sonner";
import { subjects } from "@/assets/subjects.tsx";
import { formatToHour } from "@/lib/format-to-hour.tsx";
import { useClassStore } from "@/stores/use-class-store.ts";
import { buildings } from "@/assets/buildings.tsx";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { classCreate, classGet, classUpdate } from "@/lib/swr/classes.ts";
import {
	Classes,
	ClassesOptionalDefaults,
	ClassesOptionalDefaultsSchema,
	type OptionClassSchedule,
	OptionClassScheduleOptionalDefaults,
	OptionClassScheduleOptionalDefaultsSchema
} from "shared/dist/lib/validate";
import { teacherGet } from "@/lib/swr/teacher.ts";
import { optionCreate, optionDelete, optionGet, optionUpdate } from "@/lib/swr/option.tsx";


function AcademicGradeClassesTable(props: { idGrade: string }) {
	// useAcademicClassesDetailTabel(props.idGrade);
	// const classes = useClassStore(state => state.getClassByIdGrade)(props.idGrade)
	const classes = classGet(props.idGrade)
	const [ open, setOpen ] = useState(false);
	const [ editData, setEditData ] = useState<Classes | null>(null);
	const [ deleteId, setDeleteId ] = useState<string | null>(null);

	const handleEdit = (row: Classes) => {
		setEditData(row);
		setOpen(true);
	};

	if (classes.isLoading) {
		return <Spinner />;
	}

	if (!classes.data) {
		return <EmptyComponent />
	}

	return (
		<Card>
			<CardHeader className="flex justify-between items-center">
				<CardTitle>Daftar Kelas { props.idGrade }</CardTitle>
				<Button
					onClick={ () => {
						setEditData(null);
						setOpen(true);
					} }
				>
					+ Tambah Kelas
				</Button>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							{/*<TableHead>Level</TableHead>*/ }
							{/*<TableHead>Class</TableHead>*/ }
							<TableHead>Section</TableHead>
							<TableHead>Teacher</TableHead>
							{/*<TableHead>Students</TableHead>*/ }
							<TableHead>Room</TableHead>
							{/*<TableHead>Schedule</TableHead>*/ }
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ classes?.data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={ 8 } className="text-center text-gray-500">
									No data
								</TableCell>
							</TableRow>
						) : (
							classes?.data.map((row) => (
								<TableRow key={ row.id }>
									{/*<TableCell>{ row.idGrade }</TableCell>*/ }
									{/*<TableCell>{ row.titleName }</TableCell>*/ }
									<TableCell>{ row.section }</TableCell>
									<TableCell>{ row.nameTeacher }</TableCell>
									{/*<TableCell>{ row.students }</TableCell>*/ }
									<TableCell>{ row.room }</TableCell>
									{/*<TableCell>{ row.schedule }</TableCell>*/ }
									<TableCell className="flex gap-2">
										<Button size="sm" variant="outline">
											<Link to={ `/academic/classes/${ row.section }/schedule` }>
												<Eye />
											</Link>
										</Button>
										<Button
											size="sm"
											variant="outline"
											onClick={ () => handleEdit(row) }
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={ () => setDeleteId(row.id as string) }
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))
						) }
					</TableBody>
				</Table>
			</CardContent>

			{/* Dialog Components */ }
			<ClassDialogForm
				section={ classes.data.length ?? 1 }
				idGrade={ props.idGrade }
				open={ open }
				setOpen={ setOpen }
				editData={ editData }
			/>
			<ClassDeleteDialog deleteId={ deleteId } setDeleteId={ setDeleteId } />
		</Card>
	);
}

type ClassFormDialog = {
	section: number;
	idGrade: string;
	open: boolean;
	setOpen: (v: boolean) => void;
	editData?: Classes | null;
};

function ClassDialogForm(props: ClassFormDialog) {
	const { section, idGrade, open, setOpen, editData } = props

	const classes = classGet(idGrade)
	const teachers = teacherGet()

	// const teachers = useTeacherStore(state => state.teachers)
	// const { addClass, updateClass } = useClassStore();

	const form = useForm<ClassesOptionalDefaults>({
		resolver: zodResolver(ClassesOptionalDefaultsSchema),
		defaultValues: {
			idGrade: idGrade,
			// titleName: "",
			section: "",
			nameTeacher: "",
			idTeacher: "",
			// students: 0,
			room: "",
			// schedule: "",
		},
	});

	useEffect(() => {
		if (editData) {
			form.reset(editData);
		} else {
			form.reset({
				idGrade: idGrade,
				// titleName: "",
				section: "",
				nameTeacher: "",
				idTeacher: "",
				// students: 0,
				room: "",
				// schedule: "",
			});
		}
	}, [ editData, form, idGrade ]);

	const onSubmit = async (values: ClassesOptionalDefaults) => {
		if (editData && editData.id) {
			// updateClass(editData.id, values);
			await classUpdate(idGrade, editData.id, values)
		} else {
			await classCreate(idGrade, values)

			// addClass(values);
		}
		await classes.mutate()
		setOpen(false);
	};
	console.log(form.formState.errors);
	if (!teachers.data || teachers.isLoading) {
		return <Spinner />
	}

	return (
		<Dialog open={ open } onOpenChange={ setOpen }>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						{ editData ? "Edit Class" : "Add New Class" }
					</DialogTitle>
				</DialogHeader>

				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-3 mt-2">

						<FormField
							control={ form.control }
							name="section"

							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Section</FormLabel>
									<FormControl>
										<Input

											maxLength={ 2 }
											defaultValue={ field.value }
											onChange={ e => field.onChange(`${ idGrade }-${ e.target.value }-${ section }`) }
											placeholder="Enter section"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							) }
						/>
						{ }
						<FormField
							control={ form.control }
							name="idTeacher"
							render={ ({ field }) => (
								<FormItem>
									<FormLabel>Teacher</FormLabel>
									<Select
										onValueChange={ (idTeacher) => {

											const teacher = teachers.data?.find(i => i.id === idTeacher)
											if (teacher) {
												form.setValue("nameTeacher", teacher.name)
												form.setValue("idTeacher", teacher.id)
											}
										} }
										defaultValue={ field.value }
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select teacher" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ teachers.data?.map((i) => (
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

						{/*<FormField*/ }
						{/*	control={ form.control }*/ }
						{/*	name="students"*/ }
						{/*	render={ ({ field }) => (*/ }
						{/*		<FormItem>*/ }
						{/*			<FormLabel>Students</FormLabel>*/ }
						{/*			<FormControl>*/ }
						{/*				<Input*/ }
						{/*					{ ...field }*/ }
						{/*					type="number"*/ }
						{/*					onChange={ (e) => field.onChange(Number(e.target.value)) }*/ }
						{/*					placeholder="Enter total students"*/ }
						{/*				/>*/ }
						{/*			</FormControl>*/ }
						{/*			<FormMessage />*/ }
						{/*		</FormItem>*/ }
						{/*	) }*/ }
						{/*/>*/ }

						<FormField
							control={ form.control }
							name="room"
							render={ ({ field }) => {
								const [ buildingName, roomNumber ] = field.value?.split(" - ") ?? [ "", "" ];

								return (
									<FormItem>
										<FormLabel>Room</FormLabel>
										<div className="flex gap-2">
											{/* Select for building name */ }
											<Select
												onValueChange={ (value) =>
													field.onChange(`${ value } - ${ roomNumber }`)
												}
												value={ buildingName }
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Pilih Gedung" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{ buildings.map((name) => (
														<SelectItem key={ name } value={ name }>
															{ name }
														</SelectItem>
													)) }
												</SelectContent>
											</Select>

											{/* Input for room number */ }
											<Input
												type="number"
												placeholder="No Room"
												value={ roomNumber }
												onChange={ (e) =>
													field.onChange(`${ buildingName } - ${ e.target.value }`)
												}
											/>
										</div>
										<FormMessage />
									</FormItem>
								);
							} }
						/>

						{/*<FormField*/ }
						{/*	control={ form.control }*/ }
						{/*	name="schedule"*/ }
						{/*	render={ ({ field }) => {*/ }
						{/*		const [ start, end ] = field.value?.split(" - ") ?? [ "08:00", "14:00" ];*/ }
						{/*		return (*/ }
						{/*			<FormItem>*/ }
						{/*				<FormLabel>Schedule</FormLabel>*/ }
						{/*				<div className="flex items-center gap-2">*/ }
						{/*					<Input*/ }
						{/*						type="time"*/ }
						{/*						value={ start }*/ }
						{/*						onChange={ (e) =>*/ }
						{/*							field.onChange(`${ e.target.value } - ${ end }`)*/ }
						{/*						}*/ }
						{/*						className="border rounded px-2 py-1 w-full"*/ }
						{/*					/>*/ }
						{/*					<span>-</span>*/ }
						{/*					<Input*/ }
						{/*						type="time"*/ }
						{/*						value={ end }*/ }
						{/*						onChange={ (e) =>*/ }
						{/*							field.onChange(`${ start } - ${ e.target.value }`)*/ }
						{/*						}*/ }
						{/*						className="border rounded px-2 py-1 w-full"*/ }
						{/*					/>*/ }
						{/*				</div>*/ }
						{/*				<FormMessage />*/ }
						{/*			</FormItem>*/ }
						{/*		);*/ }
						{/*	} }*/ }
						{/*/>*/ }

						<Button type="submit" className="w-full">
							{ editData ? "Update" : "Create" }
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

function ClassDeleteDialog({ deleteId, setDeleteId, }: { deleteId: string | null; setDeleteId: (v: string | null) => void; }) {
	const { deleteClass } = useClassStore();

	const handleDelete = () => {
		if (deleteId) {
			deleteClass(deleteId);
			setDeleteId(null);
		}
	};

	return (
		<Dialog open={ !!deleteId } onOpenChange={ () => setDeleteId(null) }>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle>Delete this class?</DialogTitle>
				</DialogHeader>
				<div className="flex justify-end gap-2 mt-4">
					<Button variant="outline" onClick={ () => setDeleteId(null) }>
						Cancel
					</Button>
					<Button variant="destructive" onClick={ handleDelete }>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function AcademicGradeOptionTable(props: { idGrade: string }) {
	const option = optionGet(props.idGrade);
	const [ editing, setEditing ] = useState<OptionClassSchedule | null>(null);
	// const { removeOption, addOption, updateOption, } = useOptionGradePerClassStore();//table
	// const { dataAvailableOnClass, totalJP, totalTime, totalJPPerClass } = getDataByGrade(props.idGrade)
	// const { data: classes } = useAcademicClassesDetailTabel(props.idGrade)

	const handleSave = async (data: OptionClassScheduleOptionalDefaults) => {
		if (editing && editing.id) {
			// updateOption(editing.id, data);
			await optionUpdate(props.idGrade, editing.id, data)
			setEditing(null);
		} else {
			await optionCreate(props.idGrade, data)
			// addOption({ ...data, id: nanoid() });
		}
		await option.mutate()
	};

	if (option.isLoading) {
		return <Spinner />;
	}
	if (!option.data) {
		return <EmptyComponent />
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle>Option Mata Pelajaran { props.idGrade }</CardTitle>

					{/* Tombol Add */ }
					<Dialog>
						<DialogTrigger asChild>
							<Button><Plus /></Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Tambah Mapel</DialogTitle>
								<DialogDescription>
									Isi form untuk menambahkan option mata pelajaran baru
								</DialogDescription>
							</DialogHeader>
							<AcademicScheduleOptionForm
								editing={ null }
								onSave={ handleSave }
								idGrade={ props.idGrade }
							/>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>

			<CardContent>
				<Table className={ "text-center" }>
					<TableCaption>Daftar Mata Pelajaran & Jumlah JP dds dasdad</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">No</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							{/*<TableHead className="text-end">Jumlah JP</TableHead>*/ }
							<TableHead className="text-end">Jumlah JP/Class</TableHead>
							<TableHead className="text-start">Jumlah Jam</TableHead>
							<TableHead className="text-center ">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ option.data.map((m, i) => (
							<TableRow key={ m.id }>
								<TableCell className="text-center">{ i + 1 }</TableCell>
								<TableCell>{ m.nameSubject }</TableCell>
								<TableCell className="text-end">{ m.jp }/
									{/*{ m.totalMaxJP }*/ }
								</TableCell>
								{/*<TableCell className="text-end">{ m.jp * classes?.length }</TableCell>*/ }
								<TableCell className="text-start">{ formatToHour(m.jp * 45) }</TableCell>
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
												idGrade={ props.idGrade }
												onClose={ () => setEditing(null) }
											/>
										</DialogContent>
									</Dialog>

									{/* Delete */ }
									<Button
										size="sm"
										variant="destructive"
										onClick={ async () => {
											await optionDelete(props.idGrade, m.id)
											await option.mutate()
										} }
									>
										<TrashIcon />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							{/*<TableCell className={ "text-end" }>{ totalJP }/{ totalJPPerClass }</TableCell>*/ }
							{/*<TableCell className={ "text-start" }>{ totalTime }</TableCell>*/ }
						</TableRow>
					</TableFooter>

				</Table>
			</CardContent>
		</Card>
	);
}

type AcademicScheduleOptionFormProps = {
	editing: OptionClassSchedule | null;
	onSave: (data: OptionClassScheduleOptionalDefaults) => void;
	onClose?: () => void; idGrade: string;
}

function AcademicScheduleOptionForm(props: AcademicScheduleOptionFormProps) {
	const { editing, onSave, onClose, idGrade } = props
	const option = optionGet(idGrade);
	// const { dataOptions } = useOptionGradePerClassStore();//form

	const form = useForm<OptionClassScheduleOptionalDefaults>({
		resolver: zodResolver(OptionClassScheduleOptionalDefaultsSchema),
		defaultValues: editing ? editing : {
			nameSubject: "Math",
			jp: 1,
			idGrade,
		},
	});

	const onSubmit = (values: OptionClassScheduleOptionalDefaults) => {
		onSave(values);
		form.reset({
			nameSubject: "Math",
			jp: 1,
			idGrade,

		});
		onClose?.();

	};

	const onError = (errors: typeof form.formState.errors) => {
		const firstError = Object.values(errors)[0]?.message as string | undefined;
		if (firstError) {
			toast.error(`Error Values: ${ firstError }`);
		} else {
			toast.error("Please fix the errors in the form");
		}
	};

	console.log(form.formState.errors);

	const newSubject = subjects.filter((i) => {
			return !option.data?.some((j) => {
				if (editing && editing.nameSubject === i) return false;
				const name = j.nameSubject === i;
				const grande = j.idGrade === idGrade
				return name && grande;
			})
		}
	);

	return (
		<Form { ...form }>
			<form onSubmit={ form.handleSubmit(onSubmit, onError) } className="space-y-4">
				{/* Subject */ }

				<FormField
					control={ form.control }
					name="nameSubject"
					render={ ({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<Select onValueChange={ field.onChange } defaultValue={ field.value }>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select subject" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ newSubject.map((subject) => (
										<SelectItem key={ subject } value={ subject }>
											{ subject }
										</SelectItem>
									)) }
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					) }
				/>

				{/* Jumlah JP */ }
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

				<Button type="submit" className="w-full">
					{ editing ? "Update Option" : "Tambah Option" }
				</Button>
			</form>
		</Form>
	);
}

export default function AcademicGradeClassesTabelPage() {
	const params = useParams<{ id: string }>();

	return (
		<div className={ "space-y-6" }>
			<AcademicGradeClassesTable idGrade={ params.id ?? "" } />
			<AcademicGradeOptionTable idGrade={ params.id ?? "" } />
		</div>
	);
}
